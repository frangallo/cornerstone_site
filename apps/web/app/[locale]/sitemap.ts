import fs from "node:fs";
import path from "node:path";
import { blog, legal } from "@repo/cms";
import type { MetadataRoute } from "next";

const baseUrl = "https://cornerstoneai.co";

const appDir = path.join(process.cwd(), "app", "[locale]");
const pages = fs
  .readdirSync(appDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((dir) => !dir.name.startsWith("_"))
  .filter((dir) => !dir.name.startsWith("("))
  .filter((dir) => !dir.name.startsWith("["))
  .filter((dir) => dir.name !== "components")
  .filter((dir) => fs.existsSync(path.join(appDir, dir.name, "page.tsx")))
  .map((dir) => dir.name);

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = (await blog.getPosts()).map((post) => post._slug);
  const legals = (await legal.getPosts()).map((post) => post._slug);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
    })),
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
