import { HiPhone, HiChatBubbleLeftRight } from "react-icons/hi2";

export default function FloatingActions({ phone, whatsappLink }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <HiChatBubbleLeftRight size={24} />
      </a>
      <a
        href={`tel:${phone}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 transition hover:scale-105"
        aria-label="Call now"
      >
        <HiPhone size={24} />
      </a>
    </div>
  );
}
