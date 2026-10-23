import { useRef, useState, type FormEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Link } from "react-router";

import { Button } from "~/components/Button";
import { site } from "~/data/constants";
import { env } from "~/data/env";

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
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const captchaRef = useRef<HCaptcha>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // Native HTML5 validation (required, type=email, minLength, maxLength).
    if (!form.reportValidity()) return;

    // Guard: if either the endpoint or the access key is missing, don't even
    // attempt the fetch — fail fast with a helpful message.
    if (!env.formEndpoint || !env.formAccessKey) {
      setErrorMessage("Form is not configured. Please email us directly.");
      setStatus("error");
      return;
    }

    // hCaptcha must be completed before sending. The provider-side check is
    // still authoritative; this only avoids a pointless round trip.
    if (env.formCaptchaSiteKey && !captchaToken) {
      setErrorMessage("Please complete the anti-bot check before sending.");
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

    // The `subject` hidden input in the form sets the notification subject.
    // Kept as a note in case the hidden input is ever removed:
    // formData.append("subject", "New Creaova project enquiry");

    try {
      const response = await fetch(env.formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        referrerPolicy: "no-referrer",
      });

      // Web3Forms returns JSON with { success: boolean, message: string }.
      // A 200 status alone isn't enough — validate `success` in the body.
      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data.success !== true) {
        throw new Error(data?.message || "Submission failed. Please try again.");
      }

      form.reset();
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      setStatus("success");
    } catch (err) {
      // Keep the message generic for security; log the real error in dev.
      if (import.meta.env.DEV) {
        console.error("[ContactForm] submission failed:", err);
      }
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      setErrorMessage(
        err instanceof Error && err.message && err.message !== "Submission failed. Please try again."
          ? err.message
          : "Something went wrong. Please try again, or email us directly.",
      );
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {/* Web3Forms uses `subject` to set the email subject in the notification. */}
      <input type="hidden" name="subject" value="New Creaova project enquiry" />

      {/* Honeypot: hidden field named `botcheck` is a Web3Forms-recognized spam trap.
          If a bot fills it, the submission is rejected silently. We ALSO keep our
          own `company` hidden field as a second trap (harmless, just extra coverage). */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={100}
            className="form-input"
          />
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
          Service needed
          <select required name="service" defaultValue="" className="form-input">
            <option value="" disabled>Select a service</option>
            <option>Web design</option>
            <option>Web development</option>
            <option>Mobile app development</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          Budget <span className="font-normal text-muted">(optional)</span>
          <select name="budget" defaultValue="" className="form-input">
            <option value="">Not sure yet</option>
            <option>Under AED 5,000</option>
            <option>AED 5,000–10,000</option>
            <option>AED 10,000–25,000</option>
            <option>AED 25,000+</option>
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
          className="form-input resize-y"
          placeholder="What are you trying to make, improve, or launch?"
        />
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
        <p className="text-xs leading-5 text-muted">
          Protected by hCaptcha. Its challenge is subject to{" "}
          <a
            className="underline"
            href="https://www.hcaptcha.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            hCaptcha&apos;s privacy policy
          </a>{" "}
          and{" "}
          <a
            className="underline"
            href="https://www.hcaptcha.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            terms
          </a>
          .
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" disabled={status === "sending"} loading={status === "sending"}>
          Send enquiry
        </Button>

        {status === "success" && (
          <p className="text-sm text-success" role="status">
            Thanks — your enquiry is on its way. We&apos;ll reply within one business day.
          </p>
        )}

        {status === "error" && (
          <p className="max-w-md text-sm text-error" role="alert">
            {errorMessage || "Something went wrong."} You can also email{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        )}
      </div>

      <p className="text-xs leading-5 text-muted">
        We use the details you submit only to respond to your enquiry and manage
        our conversation. Read our{" "}
        <Link className="underline" to="/privacy">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
