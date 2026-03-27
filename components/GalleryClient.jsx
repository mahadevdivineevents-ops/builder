"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";

export default function GalleryClient({ projects }) {
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === category
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project._id || project.title}
            project={project}
            onOpen={setActiveProject}
          />
        ))}
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] bg-white">
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Close
            </button>
            <div className="relative h-[65vh]">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="space-y-2 p-6">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                {activeProject.category}
              </span>
              <h3 className="text-2xl font-semibold text-slate-950">{activeProject.title}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
