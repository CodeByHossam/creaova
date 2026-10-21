import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import type { Service } from "~/data/services";

export function ServiceCard({ service, Icon }: { service: Service; Icon: any }) {
  return (
    <article
      id={service.id}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition duration-200 ease-out hover:-translate-y-1 hover:border-ink"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="size-full object-cover grayscale-[20%] transition-transform duration-200 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <span className="absolute bottom-4 left-5 grid size-12 place-items-center rounded-lg bg-ink text-on-dark transition duration-200 ease-out group-hover:bg-primary group-hover:text-on-primary">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
          {service.number} / {service.title}
        </span>
        <h3 className="mt-2 text-xl font-semibold text-ink">{service.title}</h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
          {service.summary}
        </p>
        <p className="mt-2 flex min-h-[5.75rem] items-start text-sm leading-relaxed text-muted">
          {service.details}
        </p>
        <div className="mt-auto pt-5">
          <Link
            to="/contact"
            className="flex items-center justify-between text-sm font-semibold text-ink transition duration-200 ease-out group-hover:text-primary-text"
          >
            Start a project
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
