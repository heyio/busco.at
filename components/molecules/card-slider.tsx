'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { PostType } from '@/types/Post';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import ServiceCard from './service-card';

export type CardSliderProps = {
  posts: PostType[];
};

function CardSlider({ posts }: CardSliderProps) {
  const breakpoints = {
    0: {
      slidesPerView: 1.25,
    },
    640: {
      slidesPerView: 2.25,
    },
    1024: {
      slidesPerView: 3.25,
    },
    1280: {
      slidesPerView: 4.25,
    },
  };
  return (
    <Swiper
      spaceBetween={32}
      breakpoints={breakpoints}
      modules={[Autoplay]}
      effect="slide"
      fadeEffect={{ crossFade: true }}
      speed={800}
      autoplay={{ delay: 4000 }}
      className="h-full"
      loop={true}
    >
      {posts.map((post: PostType, index: number) => {
        return (
          <SwiperSlide key={index}>
            <ServiceCard key={index} post={post} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CardSlider;
