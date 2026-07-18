import { Faq } from '@/components/organisms/faq';
import HeadlineContent from '@/components/organisms/headline-content';
import HeroHeader from '@/components/organisms/hero-header';
import Separator from '@/components/molecules/separator';
import Spacer from '@/components/ui/spacer';
import Typography from '@/components/ui/typography';
import Image from 'next/image';
import Shape from '@/public/elements/shape.svg';
import { HorizontalCardType } from '@/types/Post';
import HorizontalCard from '@/components/molecules/horizontal-card';
import { Metadata } from 'next';
import { homeQueryParams } from '@/lib/strapi-queries';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

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
      <HeroHeader
        headline={heroSection.headline}
        content={heroSection.content}
        showBookingForm={true}
      />
      <main className="py-16">
        <div className="hidden md:block">
          <Spacer size={'lg'} />
          <Spacer size={'lg'} />
        </div>
        <div className="container mx-auto px-4">
          <div>
            <Image src={Shape} width={64} height={34} alt="Shape Busco" />
          </div>
          <HeadlineContent
            content={{
              headline: intro.headline,
              content: intro.content,
            }}
          />
          <Spacer size={'lg'} />
          <Spacer size={'lg'} />
        </div>
        <div className="text-center px-4">
          <Typography size={'h4'} weight={'bold'} className="text-secondary">
            {sectionTwo.content}
          </Typography>
          <Typography size={'h3'} weight={'bold'}>
            {sectionTwo.headline}
          </Typography>
        </div>
        <Spacer size={'lg'} />
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
        <Spacer size={'lg'} />
        <Separator content={separatorOne} />
        <div className="px-4">
          <Spacer size={'lg'} />
          {faqs.length > 0 && <Faq items={faqs} />}
        </div>
        <Spacer size={'lg'} />
        <Separator content={separatorTwo} />
      </main>
    </>
  );
}
