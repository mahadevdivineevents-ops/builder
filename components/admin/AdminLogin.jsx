"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function seedAdmin() {
    try {
      const response = await fetch("/api/admin/seed", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to seed admin");
      }
      toast.success(`Admin ready. Username: ${data.username}`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="grid min-h-[80vh] place-items-center bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_38%),linear-gradient(180deg,_#020617,_#111827)] px-4">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 text-white backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Admin Access</p>
        <h1 className="mt-3 text-3xl font-semibold">Dashboard Login</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Sign in to manage services, pricing, gallery images, testimonials, and contact settings.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            placeholder="Username"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-amber-400"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-amber-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={seedAdmin}
          className="mt-4 w-full rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Create Default Admin
        </button>
      </div>
    </div>
  );
}
