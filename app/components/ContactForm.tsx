import { useState, type FormEvent } from "react";
import { Button } from "~/components/Button";
import { env } from "~/data/env";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!env.formEndpoint) { setStatus("error"); return; }
    setStatus("sending");
    try { const response = await fetch(env.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } }); if (!response.ok) throw new Error("Request failed"); form.reset(); setStatus("success"); } catch { setStatus("error"); }
  }
  return <form onSubmit={submit} className="space-y-6" noValidate>
    <input type="hidden" name="subject" value="New Creaova project enquiry" />
    <div className="grid gap-6 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Name<input required name="name" autoComplete="name" className="form-input" /></label><label className="space-y-2 text-sm font-medium">Email<input required type="email" name="email" autoComplete="email" className="form-input" /></label></div>
    <div className="grid gap-6 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Service needed<select required name="service" defaultValue="" className="form-input"><option value="" disabled>Select a service</option><option>Web design</option><option>Web development</option><option>Mobile app development</option></select></label><label className="space-y-2 text-sm font-medium">Budget <span className="font-normal text-muted">(optional)</span><select name="budget" defaultValue="" className="form-input"><option value="">Not sure yet</option><option>Under AED 5,000</option><option>AED 5,000–10,000</option><option>AED 10,000–25,000</option><option>AED 25,000+</option></select></label></div>
    <label className="block space-y-2 text-sm font-medium">Tell us about the project<textarea required name="message" rows={6} minLength={20} className="form-input resize-y" placeholder="What are you trying to make, improve, or launch?" /></label>
    <div className="hidden" aria-hidden="true"><label>Leave this blank<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="flex flex-wrap items-center gap-5"><Button type="submit" disabled={status === "sending"} loading={status === "sending"}>Send enquiry</Button>{status === "success" && <p className="text-sm text-success" role="status">Thanks—your enquiry is on its way.</p>}{status === "error" && <p className="max-w-md text-sm text-error" role="alert">The form is not connected yet. Please email <a className="underline" href={`mailto:${"hello@example.com"}`}>hello@example.com</a> instead.</p>}</div>
  </form>;
}
