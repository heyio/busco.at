import Image from 'next/image';
import { UI } from '../index';
import BookingForm from '../organisms/booking-form';
import { HeroHeaderProps } from '@/types/HeroHeader';
import { BreadcrumbType } from '@/types/Breadcrumbs';
import { PriceItemType } from '@/types/PriceItem';
import { RouteType } from '@/types/RouteType';

export type HeroProps = {
  content: HeroHeaderProps;
  breadCrumbs: BreadcrumbType;
  priceInfo: { prices: { attributes: PriceItemType }[]; routeInfo: RouteType };
};

function HeroSection({ content, breadCrumbs, priceInfo }: HeroProps) {
  const breadcrumbs = [
    { title: 'Service', url: '/service' },
    { title: breadCrumbs.title, url: breadCrumbs.url },
  ];

  // Support both Strapi v4 nested (data.attributes.url) and flat (url) structures
  const imageUrl = content?.image?.data?.attributes?.url || content?.image?.url;
  const imageAlt =
    content?.image?.data?.attributes?.alternativeText ||
    content?.image?.alternativeText ||
    'busco Bus';

  return (
    <div className="relative py-8 px-4 min-h-screen lg:min-h-64 lg:max-h-[800px] pt-24">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="absolute top-0 left-0 z-0 object-cover"
        />
      )}
      <div className="lg:grid lg:grid-cols-2 justify-between text-white relative z-20 container mx-auto h-full md:py-16">
        <div className="flex flex-col gap-12 lg:gap-24">
          <UI.Breadcrumbs items={breadcrumbs} />
          <div>
            <UI.Typography textColor="white" size="h4">
              {content.subline}
            </UI.Typography>
            <UI.Typography
              type="h1"
              textColor="white"
              size="h2"
              weight={'semibold'}
            >
              {content.headline}
            </UI.Typography>
            <UI.List className="mt-8 hidden md:block">
              {content.benefits.map((benefit) => (
                <UI.ListItem key={benefit.id} item={benefit.title} />
              ))}
            </UI.List>
          </div>
          <div className="pb-8 hidden md:block">
            <UI.Rating value={content.rating} />
          </div>
        </div>
        <div className="pt-8 md:pt-0">
          <BookingForm priceInfo={priceInfo} />
        </div>
        <UI.List className="mt-8 block md:hidden">
          {content.benefits.map((benefit) => (
            <UI.ListItem key={benefit.id} item={benefit.title} />
          ))}
        </UI.List>
        <div className="pt-8 block md:hidden">
          <UI.Rating value={content.rating} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
