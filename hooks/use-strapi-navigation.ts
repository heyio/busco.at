const STRAPI_URL = process.env.NEXT_APOLLO_CLIENT_URL;
export const STRAPI_REVALIDATE = 60;

const CONTENT_TYPE_ENDPOINT_MAP: Record<string, string> = {
  'api::article.article': 'articles',
  'api::article-category.article-category': 'article-categories',
  'api::nested-article.nested-article': 'nested-articles',
};

export type StrapiNodeType = 'category' | 'article' | 'nested-article';

export interface StrapiArticleSiloData {
  article: any;
  items: any[];
  nodeType: StrapiNodeType;
}

export async function getStrapiNavTree(): Promise<any[]> {
  const url = `${STRAPI_URL}/api/navigation/render/navigation?type=TREE`;
  try {
    const res = await fetch(url, { next: { revalidate: STRAPI_REVALIDATE } });
    if (!res.ok) {
      console.error(`[getStrapiNavTree] ${res.status}`);
      return [];
    }
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (e) {
    console.error('[getStrapiNavTree] error:', e);
    return [];
  }
}

export async function getStrapiNavFlat(): Promise<any[]> {
  const url = `${STRAPI_URL}/api/navigation/render/navigation?type=FLAT`;
  try {
    const res = await fetch(url, { next: { revalidate: STRAPI_REVALIDATE } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

async function fetchStrapiRelatedContent(
  contentType: string,
  slug: string,
): Promise<any | null> {
  const endpoint = CONTENT_TYPE_ENDPOINT_MAP[contentType];
  if (!endpoint) return null;

  const url = `${STRAPI_URL}/api/${endpoint}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  try {
    const res = await fetch(url, { next: { revalidate: STRAPI_REVALIDATE } });
    if (!res.ok) return null;
    const json = await res.json();
    const item = json.data?.[0];
    return item ? (item.attributes ?? item) : null;
  } catch {
    return null;
  }
}

function findStrapiNavNode(
  navItems: any[],
  slugParts: string[],
  depth = 0,
): any | null {
  const target = slugParts[depth];
  for (const item of navItems) {
    const itemSlug = (item.path ?? '').split('/').filter(Boolean).pop();
    if (itemSlug !== target) continue;
    if (depth === slugParts.length - 1) return item;
    if (item.items?.length) {
      return findStrapiNavNode(item.items, slugParts, depth + 1);
    }
  }
  return null;
}

function resolveStrapiNodeType(depth: number): StrapiNodeType {
  if (depth === 0) return 'category';
  if (depth === 1) return 'article';
  return 'nested-article';
}

export async function resolveStrapiArticleSiloByPath(
  slugParts: string[],
): Promise<StrapiArticleSiloData | null> {
  const tree = await getStrapiNavTree();
  const node = findStrapiNavNode(tree, slugParts);
  if (!node) return null;

  const nodeType = resolveStrapiNodeType(slugParts.length - 1);
  const items: any[] = node.items ?? [];

  let article: any = null;

  if (node.related?.contentType && node.related?.slug) {
    article = await fetchStrapiRelatedContent(
      node.related.contentType,
      node.related.slug,
    );
  }

  if (!article && node.related) {
    article = node.related.attributes ?? node.related;
  }

  if (!article) {
    article = { title: node.title, slug: slugParts[slugParts.length - 1] };
  }

  return { article, items, nodeType };
}
