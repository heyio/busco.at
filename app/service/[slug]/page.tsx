import { notFound } from 'next/navigation';
import Shape from '@/public/elements/shape.svg';
import Image from 'next/image';
import { pdpQueryParams } from '@/lib/strapi-queries';
import { Metadata } from 'next';
import Enumeration from '@/components/organisms/enumeration';
import Spacer from '@/components/ui/spacer';
import { pdpQuery } from '@/lib/graphql-queries';
import Header from '@/components/organisms/header';
import CardSlider from '@/components/molecules/card-slider';
import { Faq } from '@/components/organisms/faq';
import { Testimonials } from '@/components/organisms/testimonials';
import { PriceTable } from '@/components/organisms/price-table';
import Separator from '@/components/molecules/separator';
import Typography from '@/components/ui/typography';
import HeadlineContent from '@/components/organisms/headline-content';

export const dynamic = 'force-dynamic';

function collectionItems(collection: any) {
  if (Array.isArray(collection)) {
    return collection;
  }

  if (Array.isArray(collection?.data)) {
    return collection.data;
  }

  return [];
}

function normalizeWithAttributes(items: any[]) {
  return collectionItems(items).map((item: any) => item?.attributes ?? item);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const urlParams = new URLSearchParams(pdpQueryParams);
  urlParams.append('filters[slug][$eq]', slug);

  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/pdps?populate[0]=SEO&populate[1]=SEO.ogImage&filters[slug][$eq]=${slug}`;
  const pdpData = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const data = await pdpData.json();
  const pageData = data?.data[0]?.attributes ?? data?.data[0];
  const metaData = pageData?.SEO ?? pageData?.seo;
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

export async function generateStaticParams() {
  const pages = await fetch(`${process.env.NEXT_APOLLO_CLIENT_URL}/api/pdps`, {
    next: { revalidate: 10 },
  });

  const urls = await pages.json();
  return collectionItems(urls?.data)
    .map(
      (url: { attributes?: { slug?: string }; slug?: string }) =>
        (url.attributes ?? url)?.slug,
    )
    .filter(Boolean)
    .map((slug: string) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // GraphQL API Call
  const response = await fetch(
    `${process.env.NEXT_APOLLO_CLIENT_URL}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: pdpQuery }),
      next: { revalidate: 10 },
    },
  );
  const graphResponse = await response.json();
  const data = graphResponse?.data;

  if (graphResponse?.errors?.length) {
    console.error('Strapi GraphQL errors:', graphResponse.errors);
  }

  // extract graphql objects to sections
  const prices = normalizeWithAttributes(data?.prices).map((price: any) => ({
    attributes: price,
  }));
  console.log('prices', prices);

  // extract graphql objects to sections
  const faqs = normalizeWithAttributes(data?.faqs).map(
    (faq: { attributes: { question: string; answer: string } }) =>
      faq.attributes ?? faq,
  );

  const testimonials = normalizeWithAttributes(data?.testimonials).map(
    (testimonial: {
      attributes: { content: string; author: string; company: string };
    }) => testimonial.attributes ?? testimonial,
  );

  // PDP separated API Call (because graphql strapi plugin has a bug for filters: https://github.com/strapi/strapi/issues/19972)
  const urlParams = new URLSearchParams(pdpQueryParams);

  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/pdps?${urlParams}`;
  const pdpData = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const pageData = await pdpData.json();
  const pdpEntries = collectionItems(pageData?.data);
  const pdps = pdpEntries.map((pdp: any) => pdp.attributes ?? pdp);
  const matchedPdp = pdpEntries.find(
    (pdp: any) => (pdp.attributes ?? pdp).slug === slug,
  );

  // redirect to 404 if no data
  if (!matchedPdp) {
    return notFound();
  }

  const cardsWithRoutes = pdps
    .map((pdp: any) => {
      const routes = collectionItems(pdp.routes);

      if (routes?.length > 0) {
        const image =
          pdp.heroSection?.image?.data?.attributes ?? pdp.heroSection?.image;
        const cardContent = {
          title: pdp.heroSection?.headline,
          content: pdp.cardDescription,
          image: image?.url,
          imageAlt: image?.alternativeText,
          href: pdp.slug,
          tags: collectionItems(pdp.tags).map((tag: any) => tag.tag),
        };

        return cardContent;
      }
      return;
    })
    .filter(Boolean);

  const cardsWithoutRoutes = pdps
    .map((pdp: any) => {
      const routes = collectionItems(pdp.routes);

      if (!routes || routes.length === 0) {
        const image =
          pdp.heroSection?.image?.data?.attributes ?? pdp.heroSection?.image;
        const cardContent = {
          title: pdp.heroSection?.headline,
          content: pdp.cardDescription,
          image: image?.url,
          imageAlt: image?.alternativeText,
          href: pdp.slug,
          tags: collectionItems(pdp.tags).map((tag: any) => tag.tag),
        };

        return cardContent;
      }
      return;
    })
    .filter(Boolean);

  const page = matchedPdp.attributes ?? matchedPdp;
  const pageRoutes = collectionItems(page.routes);
  const pdpPrice = pageRoutes && {
    prices: prices,
    routeInfo: pageRoutes[0]?.attributes ?? pageRoutes[0], // should be changed for multiple routes, not only for the first match
  };
  const breadcrumbs = { title: page.heroSection.headline, url: page.slug };

  const jsonLd = page.SEO.jsonLd;

  return (
    <>
      {page.heroSection && (
        <Header
          content={page.heroSection}
          breadCrumbs={breadcrumbs}
          priceInfo={pdpPrice}
        />
      )}
      <main>
        {/* JSON-LD Start */}
        {jsonLd && (
          <section>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: jsonLd }}
            />
          </section>
        )}
        {/* JSON-LD End */}
        <div className="container mx-auto px-4">
          {!!page?.sectionOne && (
            <>
              <Spacer size={'lg'} />
              <div>
                <Image src={Shape} width={64} height={34} alt="Shape Busco" />
              </div>
              <HeadlineContent content={page.sectionOne} />
              <Spacer size={'lg'} />
            </>
          )}
          {(page?.enumerationOne ?? []).length > 0 && (
            <>
              {/*<Enumeration content={page.enumerationOne} />*/}
              <Spacer size={'lg'} />
            </>
          )}
          {!!page?.sectionTwo && <HeadlineContent content={page.sectionTwo} />}
          <Spacer size={'lg'} />
          <Spacer size={'lg'} />
          {!!page?.popularDestinations && (
            <div className="text-center">
              <Typography
                size={'h4'}
                weight={'bold'}
                className="text-secondary"
              >
                {page?.popularDestinations.content}
              </Typography>
              <Typography size={'h3'} weight={'bold'}>
                {page?.popularDestinations.headline}
              </Typography>
            </div>
          )}
          <Spacer size={'md'} />
          <CardSlider posts={cardsWithRoutes} />
          <Spacer size={'lg'} />
          <Spacer size={'lg'} />
        </div>
        {page?.separatorSectionOne && (
          <Separator content={page.separatorSectionOne} />
        )}
        <div className="container mx-auto px-4">
          {!!page?.sectionThree && (
            <>
              <Spacer size={'lg'} />
              <div>
                <Image src={Shape} width={64} height={34} alt="Logo Busco" />
              </div>
              <HeadlineContent content={page.sectionThree} />
              <Spacer size={'lg'} />
            </>
          )}
          <div className="container mx-auto">
            {(page?.enumerationTwo ?? []).length > 0 && (
              <Enumeration content={page.enumerationTwo} />
            )}
            <Spacer size={'lg'} />
          </div>
        </div>
        <div className="bg-white">
          <Spacer size={'lg'} />
          <div className="container px-4 mx-auto">
            <PriceTable content={page.priceSection} prices={prices} />
          </div>
          <Spacer size={'lg'} />
        </div>
        {page?.separatorSectionTwo && (
          <Separator content={page.separatorSectionTwo} />
        )}
        <Spacer size={'lg'} />
        <div className="container mx-auto px-4">
          {!!page?.sectionFour && (
            <HeadlineContent content={page.sectionFour} />
          )}
          <Spacer size={'lg'} />
          {!!page?.dailyRoutes && (
            <div className="text-center">
              <Typography
                size={'h4'}
                weight={'bold'}
                className="text-secondary"
              >
                {page?.dailyRoutes.subline}
              </Typography>
              <Typography size={'h3'} weight={'bold'}>
                {page?.dailyRoutes.headline}
              </Typography>
              <Typography
                size={'h4'}
                textColor={'gray'}
                className="mt-6 md:max-w-[60%] mx-auto text-center"
              >
                {page?.dailyRoutes.content}
              </Typography>
              <Spacer size={'lg'} />
            </div>
          )}
          {/* Service Card START */}
          <div className="container mx-auto">
            <CardSlider posts={cardsWithoutRoutes} />
          </div>
        </div>
        <Spacer size={'lg'} />
        {/* Service Card END */}
        {page?.separatorSectionThree && (
          <Separator content={page.separatorSectionThree} />
        )}
        <Spacer size={'lg'} />
        <div className="container mx-auto px-4">
          {testimonials.length > 0 && <Testimonials items={testimonials} />}
        </div>
        <div className="px-4">
          <Spacer size={'lg'} />
          {faqs.length > 0 && <Faq items={faqs} />}
        </div>
        <Spacer size={'lg'} />
        {/*{!!page.otherBuses && <RelatedLinks content={page.otherBuses} />}*/}
      </main>
    </>
  );
}
