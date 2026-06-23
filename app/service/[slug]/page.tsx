import { notFound } from 'next/navigation';
import { UI } from '@/components/index';
import Shape from '@/public/elements/shape.svg';
import Image from 'next/image';
import { pdpQuery } from '@/lib/graphql-queries';
import { pdpQueryParams } from '@/lib/strapi-queries';
import { Metadata } from 'next';
import CardSlider from '@/components/molecules/card-slider';

function collectionItems(collection: any) {
  if (Array.isArray(collection)) {
    return collection;
  }

  if (Array.isArray(collection?.data)) {
    return collection.data;
  }

  return [];
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
    `${process.env.NEXT_APOLLO_CLIENT_URL}/graphql?query=${encodeURIComponent(
      pdpQuery,
    )}`,
    {
      next: { revalidate: 10 },
    },
  );
  const { data } = await response.json();

  // extract graphql objects to sections
  const prices = data?.prices?.data ?? [];

  // extract graphql objects to sections
  const faqs = (data?.faqs?.data ?? []).map(
    (faq: { attributes: { question: string; answer: string } }) =>
      faq.attributes ?? faq,
  );

  const testimonials = (data?.testimonials?.data ?? []).map(
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
        <UI.Header
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
              <UI.Spacer size={'lg'} />
              <div>
                <Image src={Shape} width={64} height={34} alt="Shape Busco" />
              </div>
              <UI.HeadlineContent content={page.sectionOne} />
              <UI.Spacer size={'lg'} />
            </>
          )}
          {(page?.enumerationOne ?? []).length > 0 && (
            <>
              <UI.Enumeration content={page.enumerationOne} />
              <UI.Spacer size={'lg'} />
            </>
          )}
          {!!page?.sectionTwo && (
            <UI.HeadlineContent content={page.sectionTwo} />
          )}
          <UI.Spacer size={'lg'} />
          <UI.Spacer size={'lg'} />
          {!!page?.popularDestinations && (
            <div className="text-center">
              <UI.Typography
                size={'h4'}
                weight={'bold'}
                className="text-secondary"
              >
                {page?.popularDestinations.content}
              </UI.Typography>
              <UI.Typography size={'h3'} weight={'bold'}>
                {page?.popularDestinations.headline}
              </UI.Typography>
            </div>
          )}
          <UI.Spacer size={'md'} />
          <CardSlider posts={cardsWithRoutes} />
          <UI.Spacer size={'lg'} />
          <UI.Spacer size={'lg'} />
        </div>
        {page?.separatorSectionOne && (
          <UI.Separator content={page.separatorSectionOne} />
        )}
        <div className="container mx-auto px-4">
          {!!page?.sectionThree && (
            <>
              <UI.Spacer size={'lg'} />
              <div>
                <Image src={Shape} width={64} height={34} alt="Logo Busco" />
              </div>
              <UI.HeadlineContent content={page.sectionThree} />
              <UI.Spacer size={'lg'} />
            </>
          )}
          <div className="container mx-auto">
            {(page?.enumerationTwo ?? []).length > 0 && (
              <UI.Enumeration content={page.enumerationTwo} />
            )}
            <UI.Spacer size={'lg'} />
          </div>
        </div>
        <div className="bg-white">
          <UI.Spacer size={'lg'} />
          <div className="container px-4 mx-auto">
            <UI.PriceTable content={page.priceSection} prices={prices} />
          </div>
          <UI.Spacer size={'lg'} />
        </div>
        {page?.separatorSectionTwo && (
          <UI.Separator content={page.separatorSectionTwo} />
        )}
        <UI.Spacer size={'lg'} />
        <div className="container mx-auto px-4">
          {!!page?.sectionFour && (
            <UI.HeadlineContent content={page.sectionFour} />
          )}
          <UI.Spacer size={'lg'} />
          {!!page?.dailyRoutes && (
            <div className="text-center">
              <UI.Typography
                size={'h4'}
                weight={'bold'}
                className="text-secondary"
              >
                {page?.dailyRoutes.subline}
              </UI.Typography>
              <UI.Typography size={'h3'} weight={'bold'}>
                {page?.dailyRoutes.headline}
              </UI.Typography>
              <UI.Typography
                size={'h4'}
                textColor={'gray'}
                className="mt-6 md:max-w-[60%] mx-auto text-center"
              >
                {page?.dailyRoutes.content}
              </UI.Typography>
              <UI.Spacer size={'lg'} />
            </div>
          )}
          {/* Service Card START */}
          <div className="container mx-auto">
            <CardSlider posts={cardsWithoutRoutes} />
          </div>
        </div>
        <UI.Spacer size={'lg'} />
        {/* Service Card END */}
        {page?.separatorSectionThree && (
          <UI.Separator content={page.separatorSectionThree} />
        )}
        <UI.Spacer size={'lg'} />
        <div className="container mx-auto px-4">
          {testimonials.length > 0 && <UI.Testimonials items={testimonials} />}
        </div>
        <div className="px-4">
          <UI.Spacer size={'lg'} />
          {faqs.length > 0 && <UI.Faq items={faqs} />}
        </div>
        <UI.Spacer size={'lg'} />
        {/*{!!page.otherBuses && <UI.RelatedLinks content={page.otherBuses} />}*/}
      </main>
    </>
  );
}
