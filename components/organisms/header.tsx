'use client';

import HeroSection from '../molecules/hero-section';
import { HeroHeaderProps } from '@/types/HeroHeader';
import { BreadcrumbType } from '@/types/Breadcrumbs';
import { PriceItemType } from '@/types/PriceItem';
import { RouteType } from '@/types/RouteType';
import { Navigation } from './navigation';

export type HeaderProps = {
  content: HeroHeaderProps;
  breadCrumbs: BreadcrumbType;
  priceInfo: { prices: { attributes: PriceItemType }[]; routeInfo: RouteType };
};

export default function Header({
  content,
  breadCrumbs,
  priceInfo,
}: HeaderProps) {
  return (
    <header>
      <Navigation />
      <div>
        <HeroSection
          content={content}
          breadCrumbs={breadCrumbs}
          priceInfo={priceInfo}
        />
      </div>
    </header>
  );
}
