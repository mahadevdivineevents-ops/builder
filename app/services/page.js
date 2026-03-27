import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { companyInfo } from "@/data/site";
import { getServices } from "@/lib/site-data";

export const metadata = {
  title: "Services",
  description: "Explore construction, design, interior, and turnkey services by Mahadev Builders & Designer.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Service Pricing"
        title="Detailed construction and design services"
        description="Each service includes planning support, dependable workmanship, and direct assistance via call or WhatsApp."
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
    </div>
  );
}
