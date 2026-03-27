import SectionHeading from "@/components/SectionHeading";
import { companyInfo, whyChooseUs } from "@/data/site";

export const metadata = {
  title: "About",
  description: "About Mahadev Builders & Designer and the team led by Gautam Kumar Sahu.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="Construction, design, and execution led by practical site experience"
            description={`${companyInfo.name} is led by ${companyInfo.owner} and focused on delivering reliable residential construction with clear communication and strong finish quality.`}
          />
          <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
            <p>
              We help clients at every stage, from house planning and design drawings to civil work, interiors, modular kitchen, bathroom fitting, and complete turnkey execution.
            </p>
            <p>
              Our approach is simple: understand the family&apos;s vision, recommend practical solutions, supervise the work carefully, and deliver a finished result that balances aesthetics, usability, and budget.
            </p>
          </div>
        </div>

        <div className="rounded-[36px] bg-slate-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Core Values</p>
          <div className="mt-6 space-y-4">
            {whyChooseUs.map((point) => (
              <div key={point} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-medium text-slate-100">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
