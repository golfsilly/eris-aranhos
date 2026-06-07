import { Metadata } from "next";
import { APP_CONFIG } from "@/config/app-config";

export interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  pathname?: string;
  keywords?: string[];
  canonical?: string;
  robots?: Metadata["robots"];
  alternates?: {
    languages?: Record<string, string>;
    media?: Record<string, string>;
  };
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  other?: Metadata["other"];
}

export function genPageMetadata({
  title,
  description,
  image,
  pathname,
  canonical,
  alternates,
  keywords,
  ...rest
}: PageSEOProps): Metadata {
  const url = pathname
    ? `${APP_CONFIG.hospital.website}${pathname}`
    : APP_CONFIG.hospital.website;

  return {
    title,
    description: description ?? APP_CONFIG.seo.description,

    keywords: [
      ...APP_CONFIG.seo.keywords,
      ...(keywords ?? []),
    ],

    applicationName: APP_CONFIG.app.name.th,
    creator: APP_CONFIG.hospital.name.th,
    publisher: APP_CONFIG.hospital.name.th,
    category: "Healthcare",

    alternates: {
      canonical: canonical ?? url,
      languages: alternates?.languages,
      media: alternates?.media,
    },

    openGraph: {
      title: `${title} | ${APP_CONFIG.seo.title}`,
      description: description ?? APP_CONFIG.seo.description,
      url,
      siteName: APP_CONFIG.seo.title,
      locale: "th_TH",
      type: "website",
      images: [
        {
          url: image ?? APP_CONFIG.seo.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${APP_CONFIG.seo.title}`,
      description: description ?? APP_CONFIG.seo.description,
      images: [image ?? APP_CONFIG.seo.image],
    },

    ...rest,
  };
}