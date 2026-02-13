export type RobotsMeta = { index?: boolean; follow?: boolean };

export type I18nDict = {
  meta?: {
    title?: string;
    ogSiteName?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    twitterHandle?: string;
  };

  metadata?: {
    default?: {
      titleKey?: string;
      descriptionKey?: string;
      keywordsKey?: string;
      robots?: RobotsMeta;
      openGraph?: {
        siteNameKey?: string;
        titleKey?: string;
        descriptionKey?: string;
        imageKey?: string;
      };
      twitter?: {
        titleKey?: string;
        descriptionKey?: string;
        imageKey?: string;
      };
    };

    pages?: Record<
      string,
      {
        title?: string;
        description?: string;
        keywords?: string;
        robots?: RobotsMeta;
        openGraph?: {
          siteName?: string;
          title?: string;
          description?: string;
          image?: string;
        };
        twitter?: {
          title?: string;
          description?: string;
          image?: string;
        };
      }
    >;
  };

  // deja el resto abierto (header, hero, auth, footer, etc.)
  [key: string]: unknown;
};
