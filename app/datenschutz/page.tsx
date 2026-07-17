import { remark } from 'remark';
import html from 'remark-html';
import { Metadata } from 'next';
import { Navigation } from '@/components/organisms/navigation';
import Typography from '@/components/ui/typography';
import '@/app/assets/styles/markdown.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/terms-and-condition?populate=*`;
  const response = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const { data } = await response.json();
  const pageData = data?.attributes ?? data;
  const metaData = pageData?.seo ?? pageData?.SEO;
  return {
    title: metaData?.title ?? 'Datenschutz',
    description: metaData?.description,
  };
}

export default async function Page() {
  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/privacy-policy-page?populate=*`;
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
      <main className="pt-32 container mx-auto px-4">
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
