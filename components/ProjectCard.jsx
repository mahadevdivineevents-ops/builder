import Image from "next/image";

export default function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(project)}
      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          {project.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-slate-950">{project.title}</h3>
      </div>
    </button>
  );
}
