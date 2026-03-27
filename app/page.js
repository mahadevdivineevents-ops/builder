import Link from "next/link";
import { HiArrowUpRight, HiShieldCheck, HiWrenchScrewdriver } from "react-icons/hi2";
import QuoteForm from "@/components/QuoteForm";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Testimonial from "@/components/Testimonial";
import { companyInfo, quickStats, whyChooseUs } from "@/data/site";
import { getProjects, getServices, getSettings, getTestimonials } from "@/lib/site-data";

export default async function HomePage() {
  const [services, projects, settings, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getSettings(),
    getTestimonials(),
  ]);

  const runningProjects = projects.filter((project) =>
    ["Running Project", "Under Construction"].includes(project.category),
  );
  const completedProjects = projects.filter((project) =>
    ["Completed Project", "Interior Work", "House Design"].includes(project.category),
  );

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${settings.bannerImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(2,6,23,0.95),_rgba(15,23,42,0.75),_rgba(245,158,11,0.2))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Mahadev Builders & Designer
            </p>
            <h1 className="font-display max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
              {settings.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">{settings.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${settings.phone}`}
                className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Call Now
              </a>
              <a
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickStats.map((item) => (
                <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/10 p-8 text-white backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Why Clients Trust Us</p>
            <div className="mt-6 space-y-5">
              <div className="flex gap-4 rounded-3xl bg-white/5 p-5">
                <HiShieldCheck className="mt-1 text-amber-400" size={26} />
                <div>
                  <h2 className="text-lg font-semibold">Built with planning and precision</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    We combine map design, structure planning, finishing, and site coordination into one reliable workflow.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-3xl bg-white/5 p-5">
                <HiWrenchScrewdriver className="mt-1 text-amber-400" size={26} />
                <div>
                  <h2 className="text-lg font-semibold">One partner from drawing to handover</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    House planning, construction, interiors, modular kitchen, electrical, plumbing, and finishing all stay connected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Construction services built around your project stage"
          description="Flexible packages for design, civil execution, interior finishing, and turnkey delivery."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service._id || service.title}
              service={service}
              whatsappLink={companyInfo.whatsappLink}
            />
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Running Projects"
            title="On-site progress with active supervision"
            description="A quick look at homes and structural work currently moving toward completion."
            light
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {runningProjects.slice(0, 4).map((project) => (
              <article
                key={project._id || project.title}
                className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  {project.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Daily progress tracking, material coordination, and clean execution remain central to every active site.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Completed Projects"
          title="Finished spaces with practical planning and strong detailing"
          description="Our completed and design-led projects showcase exteriors, interiors, and home concepts that balance beauty with durability."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {completedProjects.slice(0, 3).map((project) => (
            <div
              key={project._id || project.title}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                {project.category}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">{project.title}</h3>
              <Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                View gallery <HiArrowUpRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A construction partner focused on trust, finish quality, and practical design"
            description="We guide each project with transparent communication and clear execution."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whyChooseUs.map((point) => (
              <div key={point} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-lg font-semibold text-slate-950">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say after working with us"
            description="Feedback from homeowners and families who trusted us with planning, construction, and interiors."
            light
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial._id || testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="Request Quote"
              title="Tell us about your project and we'll get back with the next step"
              description="Share your plot size, construction stage, or service interest and our team will connect with you quickly."
            />
            <p className="text-sm leading-7 text-slate-600">
              Prefer quick support? Call {settings.phone || companyInfo.phoneDisplay} or send a message on WhatsApp.
            </p>
          </div>
          <QuoteForm services={services} />
        </div>
      </section>
    </div>
  );
}
