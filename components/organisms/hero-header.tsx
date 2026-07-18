'use client';

import { Navigation } from './navigation';
import BookingFormIndex from './booking-form-index';
import Typography from '@/components/ui/typography';
import Image from 'next/image';

export type HeroHeaderProps = {
  headline: string;
  content: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  showBookingForm?: boolean;
};

export default function HeroHeader({
  headline,
  content,
  backgroundImage = '/images/busco-hero.jpg',
  backgroundAlt = 'Bus finden mit Busco',
  showBookingForm = false,
}: HeroHeaderProps) {
  return (
    <header className="min-h-24">
      <Navigation />
      <div className="relative py-8 px-4 lg:min-h-64 lg:max-h-[800px] pt-24">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="absolute top-0 left-0 z-0 object-cover object-bottom object-left"
        />
        <div className="lg:grid lg:grid-cols-2 justify-between text-white relative z-20 container mx-auto h-full md:pt-16 md:mb-32">
          <div className="flex flex-col gap-12 lg:gap-24">
            <div>
              <Typography textColor="white" size="h4">
                {content}
              </Typography>
              <Typography
                type="h1"
                textColor="white"
                size="h2"
                weight={'semibold'}
              >
                {headline}
              </Typography>
            </div>
          </div>
        </div>
        {showBookingForm && (
          <div className="container relative z-1 pt-8 md:pt-0 mx-auto">
            <div className="md:absolute z-1 md:-top-20 left-0 w-full">
              <BookingFormIndex />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
