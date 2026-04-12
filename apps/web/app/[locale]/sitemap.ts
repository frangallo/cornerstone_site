import { blog, legal } from "@repo/cms";
import type { MetadataRoute } from "next";

const baseUrl = "https://cornerstoneai.co";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = (await blog.getPosts()).map((post) => post._slug);
  const legals = (await legal.getPosts()).map((post) => post._slug);

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/pricing`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...blogs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
    })),
    ...legals.map((slug) => ({
      url: `${baseUrl}/legal/${slug}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
