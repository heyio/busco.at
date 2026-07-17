import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import { UI } from '@/components/index';
import AuthorBox from '@/components/molecules/author-box';
import SectionBlock from '@/components/molecules/section-block';
import ChildList from './child-list';
import {
  resolveStrapiArticleSiloByPath,
  getStrapiNavFlat,
} from '@/hooks/use-strapi-navigation';
import type { ArticleSiloSection } from '@/types/ArticleSilo';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  const flat = await getStrapiNavFlat();
  return flat
    .map((item: any) => {
      const path = (item.path ?? '').split('/').filter(Boolean);
      return path.length > 0 ? { slug: path } : null;
    })
    .filter(Boolean) as { slug: string[] }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
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

export default async function ArticleSiloPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const data = await resolveStrapiArticleSiloByPath(slug);

  if (!data?.article) notFound();

  const { article, items, nodeType } = data;
  const seo = article.seo;
  const coverImage =
    article.coverImage?.data?.attributes?.url ?? article.coverImage?.url;
  const coverAlt =
    article.coverImage?.data?.attributes?.alternativeText ?? article.title;

  const breadcrumbItems = slug.slice(0, -1).map((_, idx) => ({
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

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        {breadcrumbItems.length > 0 && (
          <UI.Breadcrumbs items={breadcrumbItems} />
        )}

        {article.title && (
          <UI.Typography type="h1" size="h2" weight="bold" className="mt-6">
            {article.title}
          </UI.Typography>
        )}

        {coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={coverAlt}
            className="w-full rounded-xl object-cover my-6 max-h-96"
          />
        )}

        {article.authorBox && (
          <AuthorBox
            name={article.authorBox.name}
            bio={article.authorBox.bio}
            avatar={article.authorBox.avatar}
          />
        )}

        {article.content && (
          <div
            className="prose prose-lg max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

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

        <ChildList items={items} nodeType={nodeType} parentSlug={slug} />
      </div>
    </>
  );
}
