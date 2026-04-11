import merge from "lodash.merge";
import type { Metadata } from "next";

type MetadataGenerator = Omit<Metadata, "description" | "title"> & {
  title: string;
  description: string;
  image?: string;
};

const applicationName = "Cornerstone AI";
const author: Metadata["authors"] = {
  name: "Francesco Gallo",
  url: "https://cornerstoneai.co",
};
const publisher = "Cornerstone AI";
const twitterHandle = "@cornerstoneai";
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const baseMetadata: Metadata = {
  applicationName,
  metadataBase: productionUrl
    ? new URL(`${protocol}://${productionUrl}`)
    : undefined,
  title: applicationName,
  authors: [author],
  creator: author.name,
  publisher,
  formatDetection: {
    telephone: false,
  },
};

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const defaultMetadata: Metadata = {
    title,
    description,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: applicationName,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      creator: twitterHandle,
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
  }

  return metadata;
};
