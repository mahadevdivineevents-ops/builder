import Link from "next/link";
import { companyInfo, defaultServices, navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-xl font-semibold text-white">{companyInfo.name}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Owner: {companyInfo.owner}
            <br />
            Phone: {companyInfo.phoneDisplay}
            <br />
            Email: {companyInfo.email}
            <br />
            Barhuliya, Arer, Madhubani- 847222
            <a
              className="inline-flex rounded-full bg-amber-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-400"
              href={companyInfo.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {defaultServices.slice(0, 6).map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Service Area
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>Madhubani</p>
            <p>Darbhanga</p>
            <p>Samastipur</p>
            <p>We proudly serve these areas! and surrounding regions. Contact us to discuss your project location.</p>
            
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-5 text-center text-sm text-slate-400">
        Copyright © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
