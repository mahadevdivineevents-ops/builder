export default function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-3xl space-y-3">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.3em] ${
          light ? "text-amber-300" : "text-amber-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`text-3xl font-semibold sm:text-4xl ${light ? "text-white" : "text-slate-950"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`text-base leading-8 ${light ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
