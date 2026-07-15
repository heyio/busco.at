export type ArticleSiloNodeType = 'category' | 'article' | 'nested-article';

export type ArticleSiloSeo = {
  title?: string | null;
  description?: string | null;
  ogImage?: { url?: string } | null;
  jsonLd?: Record<string, unknown> | null;
};

export type ArticleSiloAuthorBox = {
  name?: string | null;
  bio?: string | null;
  avatar?: { url?: string } | null;
};

export type ArticleSiloSection = {
  headline?: string | null;
  text?: string | null;
  image?: { url?: string; alternativeText?: string } | null;
};

export type ArticleSiloCategory = {
  id: number;
  slug: string;
  title: string;
  content?: string | null;
  sections?: ArticleSiloSection[] | null;
  seo?: ArticleSiloSeo | null;
  authorBox?: ArticleSiloAuthorBox | null;
  coverImage?: { url?: string; alternativeText?: string } | null;
};

export type ArticleSiloArticle = {
  id: number;
  slug: string;
  title: string;
  content?: string | null;
  sections?: ArticleSiloSection[] | null;
  seo?: ArticleSiloSeo | null;
  authorBox?: ArticleSiloAuthorBox | null;
  coverImage?: { url?: string; alternativeText?: string } | null;
};

export type ArticleSiloNestedArticle = {
  id: number;
  slug: string;
  title: string;
  content?: string | null;
  sections?: ArticleSiloSection[] | null;
  seo?: ArticleSiloSeo | null;
  authorBox?: ArticleSiloAuthorBox | null;
  coverImage?: { url?: string; alternativeText?: string } | null;
};

export type ArticleSiloBreadcrumb = {
  type: ArticleSiloNodeType;
  title: string;
  slug: string;
  path: string;
};

export type ArticleSiloResolveData = {
  nodeType: ArticleSiloNodeType;
  canonicalPath: string;
  breadcrumbs: ArticleSiloBreadcrumb[];
  category?: ArticleSiloCategory | null;
  article?: ArticleSiloArticle | null;
  nestedArticle?: ArticleSiloNestedArticle | null;
};
