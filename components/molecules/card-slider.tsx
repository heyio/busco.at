'use client';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PostType } from '@/types/Post';
import ServiceCard from './service-card';

export type CardSliderProps = {
  posts: PostType[];
};

function CardSlider({ posts }: CardSliderProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(autoplayInterval);
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: 'start' }}
      className="h-full"
    >
      <CarouselContent className="-ml-8">
        {posts.map((post: PostType, index: number) => {
          return (
            <CarouselItem
              key={index}
              className="pl-8 basis-[80%] sm:basis-[44.4444%] lg:basis-[30.7692%] xl:basis-[23.5294%]"
            >
              <ServiceCard post={post} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

export default CardSlider;
