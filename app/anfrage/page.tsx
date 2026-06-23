import { remark } from 'remark';
import html from 'remark-html';
import { UI } from '@/components/index';
import RequestForm from '@/components/organisms/request-form';
import '@/app/assets/styles/markdown.css';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const strapiUrl = `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL}/api/contact-page?populate[0]=seo&populate[1]=seo.ogImage`;
  const pageData = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const data = await pageData.json();
  const contactPage = data?.data?.attributes ?? data?.data;
  const metaData = contactPage?.seo ?? contactPage?.SEO;
  const ogImageData = metaData?.ogImage?.data?.attributes ?? metaData?.ogImage;
  const ogImage = ogImageData?.url;

  return {
    title: metaData?.title,
    description: metaData?.description,
    alternates: {
      canonical: `./`,
    },
    openGraph: {
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

export default async function Page() {
  const strapiUrl = `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL}/api/contact-page?populate=*`;
  const response = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const { data } = await response.json();
  const pageData = data?.attributes ?? data;
  const processedContent = await remark().use(html).process(pageData?.content ?? '');
  const contentHtml = processedContent.toString();

  return (
    <>
      <header className="min-h-24">
        <UI.Navigation />
      </header>
      <main className="max-w-3xl w-full mx-auto mt-8 px-4 ">
        <UI.Typography
          type="h1"
          size="h3"
          weight="bold"
          className="text-center"
        >
          {pageData.title}
        </UI.Typography>
        {contentHtml && (
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="pb-2 pt-4 markdown"
          />
        )}
        <div className="mt-4">{<RequestForm />}</div>
      </main>
    </>
  );
}
