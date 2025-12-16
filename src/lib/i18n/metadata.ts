import type { Metadata } from "next";
import { getServerLocale } from "@/src/lib/locale";
import { createT, getDict } from "@/src/lib/i18n/server";

type PageKey = string; // ej: "login", "home", "about"

export async function createMetadataForPage(page: PageKey): Promise<Metadata> {
  const locale = await getServerLocale();

  const dict = await getDict(locale);
  const t = await createT(locale);

  const pageMeta = dict?.metadata?.pages?.[page];
  const defaultMeta = dict?.metadata?.default;
  const metaRoot = dict?.meta;

  const title =
    pageMeta?.title ??
    (defaultMeta?.titleKey ? t(defaultMeta.titleKey) : metaRoot?.title);

  const description =
    pageMeta?.description ??
    (defaultMeta?.descriptionKey
      ? t(defaultMeta.descriptionKey)
      : metaRoot?.description);

  const keywords = defaultMeta?.keywordsKey
    ? t(defaultMeta.keywordsKey)
    : metaRoot?.keywords;

  const robots = pageMeta?.robots ?? defaultMeta?.robots;

  const ogImage =
    pageMeta?.openGraph?.image ??
    (defaultMeta?.openGraph?.imageKey
      ? t(defaultMeta.openGraph.imageKey)
      : metaRoot?.ogImage);

  return {
    title,
    description,
    keywords,
    robots,

    openGraph: {
      type: "website",
      siteName:
        pageMeta?.openGraph?.siteName ??
        (defaultMeta?.openGraph?.siteNameKey
          ? t(defaultMeta.openGraph.siteNameKey)
          : metaRoot?.ogSiteName),
      title:
        pageMeta?.openGraph?.title ??
        (defaultMeta?.openGraph?.titleKey
          ? t(defaultMeta.openGraph.titleKey)
          : title),
      description:
        pageMeta?.openGraph?.description ??
        (defaultMeta?.openGraph?.descriptionKey
          ? t(defaultMeta.openGraph.descriptionKey)
          : description),
      images: ogImage ? [{ url: ogImage }] : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title:
        pageMeta?.twitter?.title ??
        (defaultMeta?.twitter?.titleKey
          ? t(defaultMeta.twitter.titleKey)
          : title),
      description:
        pageMeta?.twitter?.description ??
        (defaultMeta?.twitter?.descriptionKey
          ? t(defaultMeta.twitter.descriptionKey)
          : description),
      images: ogImage ? [ogImage] : undefined,
      creator:
        metaRoot?.twitterHandle && metaRoot.twitterHandle.startsWith("@")
          ? metaRoot.twitterHandle
          : undefined,
    },
  };
}
