import { useState, type FormEvent } from "react";
import { Button } from "~/components/Button";
import { site } from "~/data/constants";
import { env } from "~/data/env";

/**
 * ContactForm — the site's single real form.
 *
 * Submits to Web3Forms (https://web3forms.com). The access key is a public,
 * inbox-scoped identifier: it's safe to ship in the client bundle, but it must
 * be sent in the POST body as `access_key`. The endpoint alone
 * (`https://api.web3forms.com/submit`) will reject requests without it.
 *
 * Env vars required (see .env.example):
 *   VITE_FORM_ENDPOINT    e.g. https://api.web3forms.com/submit
 *   VITE_FORM_ACCESS_KEY  e.g. f16a3f68-be64-4ec8-9281-7516ef7ea140
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // Native HTML5 validation (required, type=email, minLength).
    if (!form.reportValidity()) return;

    // Guard: if either the endpoint or the access key is missing, don't even
    // attempt the fetch — fail fast with a helpful message.
    if (!env.formEndpoint || !env.formAccessKey) {
      setErrorMessage("Form is not configured. Please email us directly.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Web3Forms requires the access key in the request body. We build the
    // FormData from the form, then append the key so it travels alongside the
    // user's input. (Do NOT put it in the URL — the body is the documented way.)
    const formData = new FormData(form);
    formData.append("access_key", env.formAccessKey);

    // Optional but recommended: tell Web3Forms what subject line to use in the
    // notification email that arrives in your inbox. The `subject` hidden input
    // in the form already sets this, so no extra work is needed — kept here as
    // a note in case the hidden input is ever removed.
    // formData.append("subject", "New Creaova project enquiry");

    try {
      const response = await fetch(env.formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      // Web3Forms returns JSON with { success: boolean, message: string }.
      // A 200 status alone isn't enough — validate `success` in the body.
      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data.success !== true) {
        throw new Error(data?.message || "Submission failed. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      // Keep the message generic for security; log the real error in dev.
      if (import.meta.env.DEV) {
        console.error("[ContactForm] submission failed:", err);
      }
      setErrorMessage(
        err instanceof Error && err.message && err.message !== "Submission failed. Please try again."
          ? err.message
          : "Something went wrong. Please try again, or email us directly."
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
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Name
          <input required name="name" autoComplete="name" className="form-input" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Email
          <input required type="email" name="email" autoComplete="email" className="form-input" />
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

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" disabled={status === "sending"} loading={status === "sending"}>
          Send enquiry
        </Button>

        {status === "success" && (
          <p className="text-sm text-success" role="status">
            Thanks — your enquiry is on its way. We'll reply within one business day.
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
    </form>
  );
}