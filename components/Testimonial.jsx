import { HiStar } from "react-icons/hi2";

export default function Testimonial({ testimonial }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <HiStar key={index} size={18} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-200">{testimonial.message}</p>
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
        {testimonial.name}
      </p>
    </article>
  );
}
