import type { Metadata } from "next";

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://adroitoneconsult.co";
};

const rawUrl = getSiteUrl();
export const siteUrl = rawUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "AdroitOne",
  indiaEntity: "Adroitone Consulting Pvt Ltd",
  usEntity: "AdroitOne Inc.",
  tagline: "Technology · Talent · AI",
  positioning: "People × Technology × AI",
  title: "AdroitOne — Technology, Talent & AI, Hyderabad, India",
  description:
    "AdroitOne (Adroitone Consulting Pvt Ltd) helps businesses build stronger technology teams, modern software and practical AI solutions — from Hyderabad, India, with international reach through AdroitOne Inc., New York.",
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

/** Builds consistent SEO metadata for every route. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
