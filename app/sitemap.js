export default function sitemap() {
  const routes = ["", "/about", "/services", "/projects", "/contact", "/admin"];

  return routes.map((route) => ({
    url: `https://mahadevbuildersdesigner.example.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
