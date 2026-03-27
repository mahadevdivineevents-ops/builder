import GalleryClient from "@/components/GalleryClient";
import SectionHeading from "@/components/SectionHeading";
import { getProjects } from "@/lib/site-data";

export const metadata = {
  title: "Projects",
  description: "Browse design, under-construction, completed, and interior project images.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Projects & Gallery"
        title="A visual record of planning, on-site work, and finished spaces"
        description="Filter the gallery by category to explore design concepts, active construction, completed projects, and interior work."
      />
      <div className="mt-10">
        <GalleryClient projects={projects} />
      </div>
    </div>
  );
}
