import { Link } from "react-router";

import logoFull from "~/assets/logo-full.svg";
import { Container } from "~/components/Container";
import type { FooterLink } from "~/data/constants";
import { site, socialLinks } from "~/data/constants";

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = "transition-colors duration-200 hover:text-[#F97316]";
  if (link.to) return <Link to={link.to} className={className}>{link.label}</Link>;
  if (link.href) return <a href={link.href} className={className}>{link.label}</a>;
  return <span>{link.label}</span>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return <footer id="contact" className="border-t border-neutral-200 bg-white pb-12 pt-16 text-neutral-600">
    <Container>
      <div className="grid gap-10 border-b border-neutral-200 pb-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <Link to="/" className="group flex items-center gap-3"><img src={logoFull} alt="Creaova" className="h-9 w-auto" /></Link>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-500">Creaova architects next-generation digital products, performant web platforms, and native applications that convert traffic into category-defining enterprise value.</p>
          <div className="pt-2 text-xs text-neutral-400">{site.footer.location}</div>
          <nav aria-label="Social links" className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-neutral-500">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#F97316]">{social.label}</a>)}
          </nav>
        </div>
        <div className="space-y-3"><h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Services</h4><ul className="space-y-2 text-sm"><li><Link className="transition-colors hover:text-[#F97316]" to="/services#web-design">Web Architecture</Link></li><li><Link className="transition-colors hover:text-[#F97316]" to="/services#web-development">Mobile Engineering</Link></li><li><Link className="transition-colors hover:text-[#F97316]" to="/services#mobile-apps">Conversion Rate CRO</Link></li><li><Link className="transition-colors hover:text-[#F97316]" to="/services#cloud">Cloud Infrastructure</Link></li></ul></div>
        <div className="space-y-3"><h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Company</h4><ul className="space-y-2 text-sm"><li><Link className="transition-colors hover:text-[#F97316]" to="/portfolio">Selected Work</Link></li><li><Link className="transition-colors hover:text-[#F97316]" to="/services#process">Engineering Process</Link></li><li><Link className="transition-colors hover:text-[#F97316]" to="/about">About Creaova</Link></li><li><Link className="transition-colors hover:text-[#F97316]" to="/contact">Schedule Consultation</Link></li></ul></div>
        <div className="space-y-3"><h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Architecture Insights</h4><p className="text-xs leading-relaxed text-neutral-500">Get our quarterly briefing on front-end performance, conversion metrics, and minimalist web frameworks.</p><form className="space-y-2" onSubmit={(event) => event.preventDefault()}><input className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="name@company.com" aria-label="Email for architecture insights" type="email" required /><button className="w-full rounded-lg bg-[#111111] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#F97316]" type="submit">Subscribe Briefing</button></form></div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-neutral-400 sm:flex-row"><p>© {year} {site.legalName}. All rights reserved.</p><nav aria-label="Legal"><ul className="flex items-center gap-6">{site.footer.legal.map((link) => <li key={link.label}><FooterLinkItem link={link} /></li>)}</ul></nav></div>
    </Container>
  </footer>;
}
