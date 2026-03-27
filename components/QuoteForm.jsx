"use client";

import { useState } from "react";
import { toast } from "sonner";
import { companyInfo } from "@/data/site";

const initialState = {
  name: "",
  phone: "",
  email: "",
  service: "Full House Construction",
  message: "",
};

export default function QuoteForm({ services }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send request.");
      }

      const whatsappMessage = [
        "Hello Mahadev Builders, I want construction service.",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email || "Not provided"}`,
        `Service: ${form.service}`,
        `Requirement: ${form.message}`,
      ].join("\n");

      toast.success("Quote request submitted successfully.");
      window.open(
        `https://wa.me/91${companyInfo.phone}?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setForm(initialState);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-[32px] bg-white p-6 shadow-2xl shadow-slate-950/10">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
          placeholder="Your name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <input
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
          placeholder="Phone number"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="email"
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <select
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
          value={form.service}
          onChange={(event) => setForm({ ...form, service: event.target.value })}
        >
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
        placeholder="Tell us about your plot, design idea, or construction requirement"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Request Quote"}
      </button>
    </form>
  );
}
