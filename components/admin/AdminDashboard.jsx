"use client";

import { useState } from "react";
import { toast } from "sonner";
import { companyInfo } from "@/data/site";

const categories = [
  "House Design",
  "Under Construction",
  "Completed Project",
  "Interior Work",
  "Running Project",
];

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function jsonRequest(url, method, payload) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

async function formRequest(url, method, payload) {
  const response = await fetch(url, {
    method,
    body: payload,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export default function AdminDashboard({ data }) {
  const [state] = useState(data);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    price: "",
    imageFile: null,
  });
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: categories[0],
    imageFile: null,
  });
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });
  const [settingsForm, setSettingsForm] = useState({
    phone: state.settings?.phone || companyInfo.phone,
    email: state.settings?.email || companyInfo.email,
    heroTitle: state.settings?.heroTitle || "",
    heroSubtitle: state.settings?.heroSubtitle || "",
    bannerFile: null,
  });
  const [busy, setBusy] = useState("");

  async function refreshData() {
    window.location.reload();
  }

  async function addService(event) {
    event.preventDefault();
    setBusy("service");
    try {
      if (!serviceForm.imageFile) {
        throw new Error("Please select a service image.");
      }

      const formData = new FormData();
      formData.append("title", serviceForm.title);
      formData.append("description", serviceForm.description);
      formData.append("price", serviceForm.price);
      formData.append("image", serviceForm.imageFile);

      await formRequest("/api/services", "POST", formData);
      toast.success("Service added");
      setServiceForm({ title: "", description: "", price: "", imageFile: null });
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function deleteService(id) {
    if (!id) {
      toast.error("This service does not have a valid database id yet.");
      return;
    }
    setBusy(id);
    try {
      await jsonRequest(`/api/services/${id}`, "DELETE");
      toast.success("Service deleted");
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function editService(service) {
    if (!service._id) {
      toast.error("This service does not have a valid database id yet.");
      return;
    }
    const title = window.prompt("Service title", service.title);
    if (!title) return;
    const description = window.prompt("Service description", service.description);
    if (!description) return;
    const price = window.prompt("Starting price", service.price);
    if (!price) return;

    setBusy(service._id);
    try {
      await jsonRequest(`/api/services/${service._id}`, "PUT", {
        title,
        description,
        price,
      });
      toast.success("Service updated");
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function addProject(event) {
    event.preventDefault();
    setBusy("project");
    try {
      if (!projectForm.imageFile) {
        throw new Error("Please select a project image.");
      }

      const formData = new FormData();
      formData.append("title", projectForm.title);
      formData.append("category", projectForm.category);
      formData.append("image", projectForm.imageFile);

      await formRequest("/api/projects", "POST", formData);
      toast.success("Project uploaded");
      setProjectForm({ title: "", category: categories[0], imageFile: null });
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function deleteProject(id) {
    if (!id) {
      toast.error("This project does not have a valid database id yet.");
      return;
    }
    setBusy(id);
    try {
      await jsonRequest(`/api/projects/${id}`, "DELETE");
      toast.success("Project deleted");
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function addTestimonial(event) {
    event.preventDefault();
    setBusy("testimonial");
    try {
      await jsonRequest("/api/testimonials", "POST", testimonialForm);
      toast.success("Testimonial added");
      setTestimonialForm({ name: "", message: "", rating: 5 });
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function updateQuoteStatus(id, status) {
    setBusy(id);
    try {
      await jsonRequest(`/api/quotes/${id}`, "PATCH", { status });
      toast.success("Quote status updated");
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    setBusy("settings");
    try {
      const bannerImage = settingsForm.bannerFile
        ? await readFileAsDataUrl(settingsForm.bannerFile)
        : undefined;
      await jsonRequest("/api/settings", "PUT", {
        phone: settingsForm.phone,
        email: settingsForm.email,
        heroTitle: settingsForm.heroTitle,
        heroSubtitle: settingsForm.heroSubtitle,
        bannerImage,
      });
      toast.success("Settings saved");
      await refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  }

  async function logout() {
    try {
      await jsonRequest("/api/admin/login", "DELETE");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const stats = [
    { label: "Services", value: state.stats.services },
    { label: "Projects", value: state.stats.projects },
    { label: "Testimonials", value: state.stats.testimonials },
    { label: "Quote Requests", value: state.stats.quotes },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[32px] bg-slate-950 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Admin Panel</p>
          <h1 className="mt-3 text-2xl font-semibold">{companyInfo.name}</h1>
          <p className="mt-3 text-sm text-slate-300">Logged in as {state.username}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-6 rounded-full bg-amber-500 px-4 py-2 font-semibold text-slate-950"
          >
            Logout
          </button>

          <div className="mt-10 space-y-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          <section className="grid gap-6 xl:grid-cols-2">
            <form onSubmit={addService} className="rounded-[32px] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Add Service</h2>
              <div className="mt-5 grid gap-4">
                <input placeholder="Service title" className="rounded-2xl border border-slate-200 px-4 py-3" value={serviceForm.title} onChange={(event) => setServiceForm({ ...serviceForm, title: event.target.value })} required />
                <textarea placeholder="Description" className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3" value={serviceForm.description} onChange={(event) => setServiceForm({ ...serviceForm, description: event.target.value })} required />
                <input placeholder="Starting price" className="rounded-2xl border border-slate-200 px-4 py-3" value={serviceForm.price} onChange={(event) => setServiceForm({ ...serviceForm, price: event.target.value })} required />
                <input type="file" accept="image/*" className="rounded-2xl border border-slate-200 px-4 py-3" onChange={(event) => setServiceForm({ ...serviceForm, imageFile: event.target.files?.[0] || null })} required />
                <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">{busy === "service" ? "Saving..." : "Add Service"}</button>
              </div>
            </form>

            <form onSubmit={addProject} className="rounded-[32px] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Upload Project Image</h2>
              <div className="mt-5 grid gap-4">
                <input placeholder="Project title" className="rounded-2xl border border-slate-200 px-4 py-3" value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} required />
                <select className="rounded-2xl border border-slate-200 px-4 py-3" value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input type="file" accept="image/*" className="rounded-2xl border border-slate-200 px-4 py-3" onChange={(event) => setProjectForm({ ...projectForm, imageFile: event.target.files?.[0] || null })} required />
                <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">{busy === "project" ? "Uploading..." : "Upload Project"}</button>
              </div>
            </form>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <form onSubmit={addTestimonial} className="rounded-[32px] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Add Testimonial</h2>
              <div className="mt-5 grid gap-4">
                <input placeholder="Client name" className="rounded-2xl border border-slate-200 px-4 py-3" value={testimonialForm.name} onChange={(event) => setTestimonialForm({ ...testimonialForm, name: event.target.value })} required />
                <textarea placeholder="Feedback" className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3" value={testimonialForm.message} onChange={(event) => setTestimonialForm({ ...testimonialForm, message: event.target.value })} required />
                <input type="number" min="1" max="5" className="rounded-2xl border border-slate-200 px-4 py-3" value={testimonialForm.rating} onChange={(event) => setTestimonialForm({ ...testimonialForm, rating: Number(event.target.value) })} />
                <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">{busy === "testimonial" ? "Saving..." : "Add Testimonial"}</button>
              </div>
            </form>

            <form onSubmit={saveSettings} className="rounded-[32px] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Contact & Homepage Settings</h2>
              <div className="mt-5 grid gap-4">
                <input placeholder="Phone number" className="rounded-2xl border border-slate-200 px-4 py-3" value={settingsForm.phone} onChange={(event) => setSettingsForm({ ...settingsForm, phone: event.target.value })} required />
                <input type="email" placeholder="Email address" className="rounded-2xl border border-slate-200 px-4 py-3" value={settingsForm.email} onChange={(event) => setSettingsForm({ ...settingsForm, email: event.target.value })} required />
                <input placeholder="Hero title" className="rounded-2xl border border-slate-200 px-4 py-3" value={settingsForm.heroTitle} onChange={(event) => setSettingsForm({ ...settingsForm, heroTitle: event.target.value })} />
                <textarea placeholder="Hero subtitle" className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3" value={settingsForm.heroSubtitle} onChange={(event) => setSettingsForm({ ...settingsForm, heroSubtitle: event.target.value })} />
                <input type="file" accept="image/*" className="rounded-2xl border border-slate-200 px-4 py-3" onChange={(event) => setSettingsForm({ ...settingsForm, bannerFile: event.target.files?.[0] || null })} />
                <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">{busy === "settings" ? "Saving..." : "Save Settings"}</button>
              </div>
            </form>
          </section>

          <section className="rounded-[32px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Services</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.services.map((service) => (
                    <tr key={service._id || service.title}>
                      <td className="py-4 font-medium text-slate-950">{service.title}</td>
                      <td className="py-4 text-slate-600">{service.price}</td>
                      <td className="py-4">
                        <button type="button" onClick={() => editService(service)} className="mr-2 rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-700">
                          Edit
                        </button>
                        <button type="button" onClick={() => deleteService(service._id)} className="rounded-full bg-rose-100 px-4 py-2 font-semibold text-rose-700">
                          {busy === service._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Projects</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.projects.map((project) => (
                    <tr key={project._id || project.title}>
                      <td className="py-4 font-medium text-slate-950">{project.title}</td>
                      <td className="py-4 text-slate-600">{project.category}</td>
                      <td className="py-4">
                        <button type="button" onClick={() => deleteProject(project._id)} className="rounded-full bg-rose-100 px-4 py-2 font-semibold text-rose-700">
                          {busy === project._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Quote Requests</h2>
            <div className="mt-5 grid gap-4">
              {state.quotes.length ? state.quotes.map((quote) => (
                <article key={quote._id} className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{quote.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {quote.service}
                        <br />
                        {quote.phone}
                        <br />
                        {quote.email || "No email provided"}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-700">{quote.message}</p>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => updateQuoteStatus(quote._id, "contacted")} className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">Mark Contacted</button>
                      <button type="button" onClick={() => updateQuoteStatus(quote._id, "closed")} className="rounded-full bg-slate-950 px-4 py-2 font-semibold text-white">Close</button>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
                    Status: {quote.status}
                  </p>
                </article>
              )) : <p className="text-sm text-slate-500">No quote requests yet.</p>}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
