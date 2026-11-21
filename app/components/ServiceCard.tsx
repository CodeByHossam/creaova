import type { LucideIcon } from "lucide-react";
import { Link } from "react-router";

import { SpriteIcon } from "~/components/SpriteIcon";
import type { Service } from "~/data/services";
import { responsiveImageProps } from "~/utils/image";

export function ServiceCard({ service, Icon }: { service: Service; Icon: LucideIcon }) {
  return (
    <article
      id={service.id}
      className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          {...responsiveImageProps(service.image)}
          alt=""
          className="size-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span className="absolute bottom-3 left-3 grid size-10 place-items-center rounded-lg bg-ink text-on-dark">
          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-h3 font-semibold leading-snug text-ink">{service.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-snug text-ink">{service.summary}</p>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{service.details}</p>

        <div className="mt-4 border-t border-line pt-4">
          <Link
            to="/contact"
            className="group/link flex min-h-11 items-center justify-between text-sm font-semibold text-ink transition-all duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text active:translate-y-px"
          >
            Tell us what you need
            <SpriteIcon
              name="arrow-up-right"
              className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-focus/link:-translate-y-0.5 group-focus/link:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
