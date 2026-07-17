import { remark } from 'remark';
import html from 'remark-html';
import { Navigation } from '@/components/organisms/navigation';
import Typography from '@/components/ui/typography';
import '@/app/assets/styles/markdown.css';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/imprint?populate=*`;
  const response = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const { data } = await response.json();
  const pageData = data?.attributes ?? data;
  const metaData = pageData?.seo ?? pageData?.SEO;
  return {
    title: metaData?.title ?? 'Impressum',
    description: metaData?.description,
  };
}

export default async function Page() {
  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/imprint`;
  const response = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const { data } = await response.json();
  const pageData = data?.attributes ?? data;
  const processedContent = await remark()
    .use(html)
    .process(pageData?.content ?? '');
  const contentHtml = processedContent.toString();

  return (
    <>
      <header className="min-h-24">
        <Navigation />
      </header>
      <main className="pt-32 container mx-auto max-w-3xl px-4">
        <Typography
          type="h1"
          size="h3"
          weight="bold"
          className="text-center"
        >
          {pageData.title}
        </Typography>
        <div
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="pb-2 markdown"
        />
      </main>
    </>
  );
}
