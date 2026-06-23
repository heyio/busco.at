import { UI } from '@/components/index';
import BookingFormIndex from '@/components/organisms/booking-form-index';
import { Navigation } from '@/components/organisms/navigation';
import Typography from '@/components/ui/typography';
import Image from 'next/image';
import Shape from '@/public/elements/shape.svg';
import { HorizontalCardType } from '@/types/Post';
import HorizontalCard from '@/components/molecules/horizontal-card';
import { Metadata } from 'next';
import { homeQueryParams } from '@/lib/strapi-queries';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/home-page?populate=*`;
  const response = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const { data } = await response.json();
  const pageData = data?.attributes ?? data;
  const metaData = pageData?.seo ?? pageData?.SEO;
  return {
    title: metaData?.title ?? 'Busco',
    description: metaData?.description,
  };
}

export default async function Index() {
  // Page Data
  const urlParams = new URLSearchParams(homeQueryParams);
  const strapiUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/home-page?${urlParams}`;
  const response = await fetch(strapiUrl, {
    next: { revalidate: 10 },
  });

  const { data } = await response.json();
  const pageData = data?.attributes ?? data;

  if (!pageData) {
    notFound();
  }

  const { heroSection, intro, sectionTwo, cards, separatorOne, separatorTwo } =
    pageData;

  const horizontalCards = (cards ?? []).map((card: any) => {
    const image = card.image?.data?.attributes ?? card.image;

    return {
      title: card.title,
      content: card.content,
      tags: (card.tags ?? []).map((item: any) => item.tag),
      cta: card.cta,
      image: image?.url,
      imageAlt: image?.alternativeText,
    };
  });

  // FAQs
  const strapiFaqUrl = `${process.env.NEXT_APOLLO_CLIENT_URL}/api/faqs`;
  const responseFaq = await fetch(strapiFaqUrl);
  const faqsData = await responseFaq.json();

  const faqs = (faqsData?.data ?? []).map(
    (faq: { attributes: { question: string; answer: string } }) =>
      faq.attributes ?? faq,
  );

  return (
    <>
      <header className="min-h-24">
        <Navigation />
        <div className="relative py-8 px-4 lg:min-h-64 lg:max-h-[800px] pt-24">
          <Image
            src="/images/busco-hero.jpg"
            alt="Bus finden mit Busco"
            fill
            className="absolute top-0 left-0 z-0 object-cover object-bottom object-left"
          />
          <div className="lg:grid lg:grid-cols-2 justify-between text-white relative z-20 container mx-auto h-full md:pt-16 md:mb-32">
            <div className="flex flex-col gap-12 lg:gap-24">
              <div>
                <Typography textColor="white" size="h4">
                  {heroSection.content}
                </Typography>
                <Typography
                  type="h1"
                  textColor="white"
                  size="h2"
                  weight={'semibold'}
                >
                  {heroSection.headline}
                </Typography>
              </div>
            </div>
          </div>
          <div className="container relative z-1 pt-8 md:pt-0 mx-auto">
            <div className="md:absolute z-1 md:-top-20 left-0 w-full">
              <BookingFormIndex />
            </div>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="hidden md:block">
          <UI.Spacer size={'lg'} />
          <UI.Spacer size={'lg'} />
        </div>
        <div className="container mx-auto px-4">
          <div>
            <Image src={Shape} width={64} height={34} alt="Shape Busco" />
          </div>
          <UI.HeadlineContent
            content={{
              headline: intro.headline,
              content: intro.content,
            }}
          />
          <UI.Spacer size={'lg'} />
          <UI.Spacer size={'lg'} />
        </div>
        <div className="text-center px-4">
          <UI.Typography size={'h4'} weight={'bold'} className="text-secondary">
            {sectionTwo.content}
          </UI.Typography>
          <UI.Typography size={'h3'} weight={'bold'}>
            {sectionTwo.headline}
          </UI.Typography>
        </div>
        <UI.Spacer size={'lg'} />
        <div className="container mx-auto px-4 flex flex-col gap-12 md:gap-24">
          {horizontalCards.map((card: HorizontalCardType, index: number) => (
            <div key={index}>
              <HorizontalCard
                post={card}
                alignment={index % 2 === 1 ? 'left' : 'right'}
              />
            </div>
          ))}
        </div>
        <UI.Spacer size={'lg'} />
        <UI.Separator content={separatorOne} />
        <div className="px-4">
          <UI.Spacer size={'lg'} />
          {faqs.length > 0 && <UI.Faq items={faqs} />}
        </div>
        <UI.Spacer size={'lg'} />
        <UI.Separator content={separatorTwo} />
      </main>
    </>
  );
}
