import { LegalPage, type LegalSection } from "~/components/LegalPage";
import { site } from "~/data/constants";
import { pageMeta } from "~/data/pageMeta";

export function meta() {
  return pageMeta({
    path: "/privacy",
    title: "Privacy Policy | Creaova",
    description:
      "How Creaova Digital Solutions handles personal information submitted through this website.",
  });
}

const email = site.contact.email;

const sections: LegalSection[] = [
  {
    title: "Who we are",
    body: (
      <>
        Creaova Digital Solutions is a digital studio based in the United Arab Emirates. For the
        purposes of applicable data-protection law, Creaova is the controller of the personal
        information described in this policy. Questions or requests can be sent to{" "}
        <a
          className="underline underline-offset-4 text-ink transition-colors duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text"
          href={`mailto:${email}`}
        >
          {email}
        </a>
        .
      </>
    ),
  },
  {
    title: "Information we receive",
    body: (
      <>
        When you submit the contact form, we receive the information you choose to provide: your
        name, email address, the service and project stage you select, and your project message. We
        receive any information you include in later correspondence. The site does not create user
        accounts and does not run advertising or analytics tracking. Our hosting and security
        providers may process limited technical data (such as IP address, browser type and request
        metadata) to serve the site and protect it from abuse.
      </>
    ),
  },
  {
    title: "How we use information",
    body: (
      <>
        We use enquiry details to understand your request, reply to you, prepare a proposal, manage
        a project conversation, and keep appropriate business records. We may also use technical
        data to maintain security, prevent spam and abuse, diagnose faults, and comply with legal
        obligations. We do not sell personal information or use it for automated decision-making
        that produces legal or similarly significant effects.
      </>
    ),
  },
  {
    title: "Legal bases",
    body: (
      <>
        Where required, we process enquiry data on the basis of your consent, the steps needed
        before entering a contract, our legitimate interests in responding to business enquiries and
        keeping the site secure, and compliance with legal obligations. You may withdraw consent at
        any time, without affecting processing that already took place.
      </>
    ),
  },
  {
    title: "Contact-form delivery and anti-bot checks",
    body: (
      <>
        The form is delivered through{" "}
        <a
          className="underline underline-offset-4 text-ink transition-colors duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text"
          href="https://web3forms.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web3Forms
        </a>
        , which processes the submission and forwards it to our business inbox. The form is
        protected by{" "}
        <a
          className="underline underline-offset-4 text-ink transition-colors duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text"
          href="https://www.hcaptcha.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          hCaptcha
        </a>
        , an anti-bot service operated by Intuition Machines, Inc. hCaptcha may process device and
        browser signals and may set cookies or local storage as part of its challenge. Web3Forms may
        retain submissions according to its account settings and privacy policy; we keep our own
        copy only for the periods described below.
      </>
    ),
  },
  {
    title: "Hosting, security and email",
    body: (
      <>
        The site is hosted by{" "}
        <a
          className="underline underline-offset-4 text-ink transition-colors duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text"
          href="https://render.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Render
        </a>{" "}
        and protected by{" "}
        <a
          className="underline underline-offset-4 text-ink transition-colors duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text"
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare
        </a>
        . These providers may process request logs and security data on our behalf. Email
        correspondence is handled through Google Gmail; Google’s privacy terms apply to that
        service. Fonts and images are served from this website rather than from third-party font or
        image hosts.
      </>
    ),
  },
  {
    title: "Cookies and similar technologies",
    body: (
      <>
        Creaova does not set advertising or analytics cookies. hCaptcha may use cookies or local
        storage for its anti-bot challenge, and our hosting or security providers may use strictly
        necessary technical storage. You can control cookies through your browser settings, although
        blocking them may prevent the contact form’s anti-bot check from working.
      </>
    ),
  },
  {
    title: "Retention",
    body: (
      <>
        We retain enquiry correspondence and related records for up to 24 months after our last
        meaningful contact, unless a longer period is needed for an active project, a legal claim, a
        security investigation, or a legal obligation. When information is no longer needed, we
        delete it or anonymise it. Provider-side retention is governed by the provider’s settings
        and policy; we choose the shortest practical retention available to us.
      </>
    ),
  },
  {
    title: "Sharing",
    body: (
      <>
        We share information only with service providers that help us operate the site and respond
        to enquiries (including the providers named above), professional advisers where necessary,
        authorities when required by law, and a successor in connection with a business transfer.
        Providers are expected to protect the information and use it only for the service they
        provide. We do not sell personal information.
      </>
    ),
  },
  {
    title: "International transfers",
    body: (
      <>
        Some providers may process information outside the United Arab Emirates. Where required, we
        rely on appropriate safeguards for those transfers, such as contractual protections and
        provider security commitments. You can contact us for more information about the safeguards
        relevant to your information.
      </>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        Subject to applicable law, you may request access to your personal information, correction
        of inaccurate information, deletion, restriction of processing, portability, or object to
        certain processing. You may also withdraw consent and lodge a complaint with the UAE Data
        Office or another competent authority. To exercise a right, email{" "}
        <a
          className="underline underline-offset-4 text-ink transition-colors duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text"
          href={`mailto:${email}`}
        >
          {email}
        </a>
        . We may need to verify your identity before acting on a request.
      </>
    ),
  },
  {
    title: "Security",
    body: (
      <>
        We use HTTPS, restrict access to the business inbox and hosting settings, collect only the
        fields needed to respond, and keep dependencies patched. No internet transmission or storage
        method is completely secure, so we cannot guarantee absolute security. If you believe
        information has been compromised, contact us immediately.
      </>
    ),
  },
  {
    title: "Children",
    body: (
      <>
        This website is intended for business visitors and is not directed to children under 16. We
        do not knowingly collect personal information from children. If you believe a child has
        submitted information, contact us so we can delete it.
      </>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <>
        We may update this policy when our providers or practices change. The current version is
        always available on this page, with the effective date below. Material changes will be
        reflected here before they take effect.
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy policy"
      lede="This policy explains how Creaova Digital Solutions handles personal information when you visit this website or contact us."
      sections={sections}
    />
  );
}
