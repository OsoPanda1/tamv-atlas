import { wikiStructure } from "@/data/wikiStructure";

export type WikiArticleMeta = {
  moduleIndex: number;
  moduleTitle: string;
  sectionId: string;
  slug: string;
  title: string;
};

export const articleCatalog: WikiArticleMeta[] = wikiStructure.flatMap((section, moduleIndex) =>
  section.children.map((page) => ({
    moduleIndex,
    moduleTitle: section.title,
    sectionId: section.id,
    slug: page.slug,
    title: page.title,
  }))
);

export const articleBySlug = new Map(articleCatalog.map((article) => [article.slug, article]));

export const getAdjacentArticles = (slug: string) => {
  const index = articleCatalog.findIndex((article) => article.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? articleCatalog[index - 1] : undefined,
    next: index < articleCatalog.length - 1 ? articleCatalog[index + 1] : undefined,
  };
};
