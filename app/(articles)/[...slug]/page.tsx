import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import ArticleHeader from '@/components/organisms/article-header';
import AuthorBox from '@/components/molecules/author-box';
import SectionBlock from '@/components/molecules/section-block';
import ChildList from './child-list';
// Strapi navigation hooks für nested article routing
// - resolveStrapiArticleSiloByPath: Holt Artikel-Daten inkl. Items/Kinder aus Strapi
// - getStrapiNavFlat: Bekommt flache Navigation für static param generation
import {
  resolveStrapiArticleSiloByPath,
  getStrapiNavFlat,
} from '@/hooks/use-strapi-navigation';
import type { ArticleSiloSection } from '@/types/ArticleSilo';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generiert statische Routen für alle Artikel aus der Strapi-Navigation
// Konvertiert Paths wie '/wien/flughafentransfer' → slug arrays ['wien', 'flughafentransfer']
export async function generateStaticParams() {
  const flat = await getStrapiNavFlat();
  return flat
    .map((item: any) => {
      const path = (item.path ?? '').split('/').filter(Boolean);
      return path.length > 0 ? { slug: path } : null;
    })
    .filter(Boolean) as { slug: string[] }[];
}

// Generiert SEO-Metadaten (Title, Description, OG-Image) für jede Artikelseite
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Holt komplette Artikel-Daten inklusive SEO-Infos
  const data = await resolveStrapiArticleSiloByPath(slug);
  if (!data?.article) return {};

  const seo = data.article.seo;
  const ogImageUrl =
    seo?.ogImage?.data?.attributes?.url ??
    seo?.ogImage?.url ??
    data.article.coverImage?.data?.attributes?.url ??
    data.article.coverImage?.url;

  return {
    title: seo?.title ?? data.article.title ?? undefined,
    description: seo?.description ?? undefined,
    alternates: { canonical: `/${slug.join('/')}` },
    openGraph: ogImageUrl ? { images: [{ url: ogImageUrl }] } : undefined,
  };
}

// Haupt-Seite für verschachtelte Artikel (z.B. /wien/flughafentransfer/info)
// Rendert: Header + Cover-Image + Content + Author-Box + Kind-Artikel
export default async function ArticleSiloPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  // Holt Artikel-Daten vom Strapi CMS basierend auf slug-Pfad
  // Returns: { article, items (Kinder), nodeType (category|article|nested-article) }
  const data = await resolveStrapiArticleSiloByPath(slug);

  if (!data?.article) notFound();

  const { article, items, nodeType } = data;
  const seo = article.seo;

  // Cover-Image mit Fallback-Strategie für verschiedene Strapi-Response-Formate
  // Handles: Nested media objects, direct URLs, oder nur den URL-String
  const coverImage =
    article.coverImage?.data?.attributes?.url ||
    article.coverImage?.attributes?.url ||
    article.coverImage?.url ||
    article.coverImage;

  // Alt-Text mit Fallback auf Artikel-Title
  const coverAlt =
    article.coverImage?.data?.attributes?.alternativeText ||
    article.coverImage?.attributes?.alternativeText ||
    article.title;

  // Erzeugt Breadcrumbs aus slug-Array
  // z.B. ['wien', 'flughafentransfer'] → [{title: 'wien', url: '/wien'}, {title: 'flughafentransfer', url: '/wien/flughafentransfer'}]
  const breadcrumbItems = slug.map((_, idx) => ({
    title: slug[idx],
    url: `/${slug.slice(0, idx + 1).join('/')}`,
  }));

  return (
    <>
      {seo?.jsonLd && (
        <Script
          id="article-silo-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}

      <ArticleHeader title={article.title} breadcrumbItems={breadcrumbItems} />

      <article className="container mx-auto px-4 md:px-0 pb-16 max-w-4xl">
        {/* Cover-Image oder Placeholder */}
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={coverAlt}
            className="w-full rounded-lg object-cover mt-8 mb-12 shadow-lg"
          />
        ) : (
          <div className="w-full bg-gray-200 rounded-lg mt-8 mb-12 h-96 flex items-center justify-center text-gray-500">
            Kein Bild verfügbar
          </div>
        )}

        {/* Autor-Info mit Separator */}
        {article.authorBox && (
          <div className="my-8 py-6 border-y border-gray-200">
            <AuthorBox
              name={article.authorBox.name}
              bio={article.authorBox.bio}
              avatar={article.authorBox.avatar}
            />
          </div>
        )}

        {/* Haupt-Artikel-Content (Richtext HTML) */}
        {article.content && (
          <div
            className="prose prose-lg max-w-none my-8 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Zusätzliche Content-Sections (Text + Bild Blöcke) */}
        {(article.sections ?? []).map(
          (section: ArticleSiloSection, i: number) => (
            <SectionBlock
              key={i}
              headline={section.headline}
              text={section.text}
              image={section.image}
            />
          ),
        )}

        {/* Kind-Artikel anzeigen (für nested structure) */}
        <ChildList items={items} nodeType={nodeType} parentSlug={slug} />
      </article>
    </>
  );
}
