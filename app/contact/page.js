import SectionHeading from "@/components/SectionHeading";
import { companyInfo } from "@/data/site";
import { getSettings } from "@/lib/site-data";

export const metadata = {
  title: "Contact",
  description: "Contact Mahadev Builders & Designer for house planning, construction, interiors, and turnkey service.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let's discuss your next construction project"
            description="Reach out for planning, estimates, execution support, and site consultation."
          />
          <div className="rounded-4xl bg-slate-950 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Contact Details</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
              <p>Owner: {companyInfo.owner}</p>
              <p>Phone: {settings.phone || companyInfo.phone}</p>
              <p>Email: {settings.email || companyInfo.email}</p>
              <p>{companyInfo.address}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`tel:${settings.phone || companyInfo.phone}`}
                className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-950"
              >
                Call Now
              </a>
              <a
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
          <iframe
            title="Mahadev Builders & Designer Location"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212.25087298612257!2d85.98508055747413!3d26.43016300997009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec35c8c985c0ab%3A0xb4ef8375546daa4d!2sMahadev%20Divine%20Events!5e1!3m2!1sen!2sin!4v1774591074014!5m2!1sen!2sin"
            className="h-130 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
