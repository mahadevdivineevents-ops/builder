import { defaultProjects, defaultServices, defaultSettings, defaultTestimonials } from "@/data/site";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Project from "@/models/Project";
import QuoteRequest from "@/models/QuoteRequest";
import Service from "@/models/Service";
import Setting from "@/models/Setting";
import Testimonial from "@/models/Testimonial";

async function safeDB(action, fallback) {
  try {
    await connectDB();
    return await action();
  } catch {
    return fallback;
  }
}

async function ensureDefaultServices() {
  const settings = await Setting.findOne();
  const shouldSeedDefaults = !settings?.serviceDefaultsSeeded;

  if (shouldSeedDefaults) {
    const existingServices = await Service.find({}, "title").lean();
    const existingTitles = new Set(existingServices.map((service) => service.title));
    const missingServices = defaultServices.filter(
      (service) => !existingTitles.has(service.title),
    );

    if (missingServices.length) {
      await Service.insertMany(missingServices);
    }

    await Setting.findOneAndUpdate(
      {},
      { serviceDefaultsSeeded: true },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );
  }

  const services = await Service.find().sort({ createdAt: 1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

export async function getServices() {
  return safeDB(
    async () => ensureDefaultServices(),
    defaultServices,
  );
}

export async function getProjects() {
  return safeDB(
    async () => {
      const projects = await Project.find().sort({ createdAt: -1 }).lean();
      return projects.length ? JSON.parse(JSON.stringify(projects)) : defaultProjects;
    },
    defaultProjects,
  );
}

export async function getTestimonials() {
  return safeDB(
    async () => {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
      return testimonials.length
        ? JSON.parse(JSON.stringify(testimonials))
        : defaultTestimonials;
    },
    defaultTestimonials,
  );
}

export async function getSettings() {
  return safeDB(
    async () => {
      const settings = await Setting.findOne().lean();
      return settings ? { ...defaultSettings, ...JSON.parse(JSON.stringify(settings)) } : defaultSettings;
    },
    defaultSettings,
  );
}

export async function getDashboardData() {
  const session = await getAdminSession();
  if (!session) {
    return { authenticated: false };
  }

  const [services, projects, testimonials, quotes, settings, admins] = await Promise.all([
    safeDB(async () => ensureDefaultServices(), []),
    safeDB(async () => JSON.parse(JSON.stringify(await Project.find().sort({ createdAt: -1 }).lean())), []),
    safeDB(async () => JSON.parse(JSON.stringify(await Testimonial.find().sort({ createdAt: -1 }).lean())), []),
    safeDB(async () => JSON.parse(JSON.stringify(await QuoteRequest.find().sort({ createdAt: -1 }).lean())), []),
    getSettings(),
    safeDB(async () => Admin.countDocuments(), 0),
  ]);

  return {
    authenticated: true,
    username: session.username,
    stats: {
      services: services.length,
      projects: projects.length,
      testimonials: testimonials.length,
      quotes: quotes.length,
      admins,
    },
    services,
    projects,
    testimonials,
    quotes,
    settings,
  };
}
