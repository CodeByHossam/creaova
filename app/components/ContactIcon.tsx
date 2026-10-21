import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  BehanceIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "~/components/BrandIcon";
import type { ContactIconId, SocialIconId } from "~/data/constants";

/**
 * The single place where a contact/social channel is turned into an icon.
 *
 * The ids live in `data/constants.ts` (next to the values they belong to),
 * so a channel can never end up with a value but no glyph, or a glyph with no
 * value. Lucide covers the functional channels (mail, phone, clock, pin);
 * the brand channels use the inlined marks from `BrandIcon.tsx`.
 *
 * The icons are decorative — `aria-hidden` — because the label next to them
 * already says what the row is.
 */
export function ContactIcon({
  id,
  className,
}: {
  id: ContactIconId;
  className?: string;
}) {
  switch (id) {
    case "email":
      return <Mail className={className} aria-hidden="true" strokeWidth={1.75} />;
    case "phone":
      return <Phone className={className} aria-hidden="true" strokeWidth={1.75} />;
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
    case "hours":
      return <Clock className={className} aria-hidden="true" strokeWidth={1.75} />;
    case "location":
      return <MapPin className={className} aria-hidden="true" strokeWidth={1.75} />;
  }
}

export function SocialIcon({
  id,
  className,
}: {
  id: SocialIconId;
  className?: string;
}) {
  switch (id) {
    case "instagram":
      return <InstagramIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "behance":
      return <BehanceIcon className={className} />;
  }
}
