import { useEffect, useRef, useState, type FormEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Link } from "react-router";

import { Button } from "~/components/Button";
import { site } from "~/data/constants";
import { env } from "~/data/env";
import { services } from "~/data/services";

/**
 * ContactForm — the site's single real form.
 *
 * Submits to Web3Forms (https://web3forms.com). The access key is a public,
 * inbox-scoped identifier: it is safe to ship in the client bundle, but it must
 * be sent in the POST body as `access_key`. The endpoint alone
 * (`https://api.web3forms.com/submit`) will reject requests without it.
 *
 * Required public configuration (see `.env.example`):
 *   VITE_FORM_ENDPOINT    https://api.web3forms.com/submit
 *   VITE_FORM_ACCESS_KEY  the inbox's Web3Forms access key
 *
 * hCaptcha is rendered in the form and its token is sent as
 * `h-captcha-response`. Enable hCaptcha in the Web3Forms dashboard as well;
 * client-side widgets alone are not a security boundary.
 */
type Web3FormsResponse = { success: boolean; message?: string };

function isWeb3FormsResponse(value: unknown): value is Web3FormsResponse {
  if (typeof value !== "object" || value === null) return false;
  return typeof (value as { success?: unknown }).success === "boolean";
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captchaRef = useRef<HCaptcha>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // Native HTML5 validation (required, type=email, minLength, maxLength).
    if (!form.reportValidity()) return;

    // Guard: if either the endpoint or the access key is missing, don't even
    // attempt the fetch — fail fast with a helpful message.
    if (!env.formEndpoint || !env.formAccessKey) {
      setErrorMessage("The contact form isn't available right now.");
      setStatus("error");
      return;
    }

    // hCaptcha must be completed before sending. The provider-side check is
    // still authoritative; this only avoids a pointless round trip.
    if (env.formCaptchaSiteKey && !captchaToken) {
      setErrorMessage("Please complete the hCaptcha check, then send your brief again.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Web3Forms requires the access key in the request body. We build the
    // FormData from the form, then append the key and the hCaptcha token so
    // they travel alongside the user's input. (Do NOT put the key in the URL.)
    const formData = new FormData(form);
    formData.append("access_key", env.formAccessKey);
    if (captchaToken) formData.set("h-captcha-response", captchaToken);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(env.formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        referrerPolicy: "no-referrer",
        signal: controller.signal,
      });

      let data: unknown;
      try {
        data = await response.json();
      } catch (cause) {
        throw new Error("Web3Forms returned a non-JSON response.", { cause });
      }

      if (!isWeb3FormsResponse(data)) {
        throw new Error("Web3Forms returned an unexpected response shape.");
      }
      if (!response.ok || data.success !== true) {
        throw new Error(data.message || `Web3Forms rejected the submission (${response.status}).`);
      }

      form.reset();
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      setStatus("success");
    } catch (err) {
      if (controller.signal.aborted) return;

      // Keep provider wording out of the UI: it can expose an internal code or
      // a configuration problem the visitor cannot act on. The real context
      // stays in the development log.
      if (import.meta.env.DEV) {
        console.error("[ContactForm] submission failed", err);
      }
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      setErrorMessage("Your brief couldn't be sent. Please try again.");
      setStatus("error");
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }

  return (
    <form onSubmit={submit} aria-labelledby="contact-form-heading" className="space-y-6" noValidate>
      <h2 id="contact-form-heading" className="sr-only">
        Project enquiry form
      </h2>
      {/* Web3Forms uses `subject` to set the email subject in the notification. */}
      <input type="hidden" name="subject" value="New Creaova project enquiry" />

      {/* Honeypot: hidden field named `botcheck` is a Web3Forms-recognized spam trap.
          If a bot fills it, the submission is rejected silently. We ALSO keep our
          own `company` hidden field as a second trap (harmless, just extra coverage). */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Name
          <input required name="name" autoComplete="name" maxLength={100} className="form-input" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            className="form-input"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          What do you need? <span className="font-normal text-muted">(best guess is fine)</span>
          <select name="service" defaultValue="" className="form-input">
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service.id}>{service.title}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          What stage are you at? <span className="font-normal text-muted">(optional)</span>
          <select name="stage" defaultValue="" className="form-input">
            <option value="">Not sure yet</option>
            <option>Just an idea</option>
            <option>Scope is clear</option>
            <option>Ready to start</option>
          </select>
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium">
        Tell us about the project
        <textarea
          required
          name="message"
          rows={6}
          minLength={20}
          maxLength={5000}
          aria-describedby="project-details-hint"
          className="form-input resize-y"
          placeholder="What are you trying to make, improve, or launch?"
        />
        <span id="project-details-hint" className="block text-xs leading-5 text-muted">
          A few sentences is plenty. What are you trying to launch or fix? Please write at least 20
          characters.
        </span>
      </label>

      {/* Spam traps — not visible, not focusable, not read by screen readers. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this blank
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-2">
        <HCaptcha
          ref={captchaRef}
          sitekey={env.formCaptchaSiteKey}
          reCaptchaCompat={false}
          theme="light"
          size="normal"
          sentry={false}
          userJourneys={false}
          onVerify={setCaptchaToken}
          onExpire={() => setCaptchaToken("")}
          onError={() => setCaptchaToken("")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" disabled={status === "sending"} loading={status === "sending"}>
          {status === "sending" ? "Sending brief…" : "Send my brief"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-success" role="status">
            Thanks — we&apos;ve got it. We&apos;ll reply during business hours (Sun–Thu, 9am–6pm
            GST).
          </p>
        )}

        {status === "error" && (
          <p className="max-w-md text-sm text-error" role="alert">
            {errorMessage || "Your brief couldn't be sent."} Reach us directly at{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        )}
      </div>

      <p className="font-mono text-meta uppercase tracking-[0.12em] text-muted">
        One short form. No obligation. A real reply, not a sales sequence.
      </p>

      <p className="text-xs leading-5 text-muted">
        Spam protection by{" "}
        <a
          className="underline"
          href="https://www.hcaptcha.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          hCaptcha
        </a>
        .
      </p>

      <p className="text-xs leading-5 text-muted">
        We use the details you submit only to respond to your enquiry and manage our conversation.
        Read our{" "}
        <Link className="underline" to="/privacy">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
