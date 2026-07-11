import type { MetadataRoute } from "next";

const BASE_URL = "https://www.tandys.com";
const routes = ["", "/services", "/about", "/reviews", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
