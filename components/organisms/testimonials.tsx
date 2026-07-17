import { TestimonialType } from '@/types/TestimonialItem';
import Typography from '../ui/typography';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

export type TestimonialsProps = {
  items: TestimonialType[];
};

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <div>
      <Typography size={'h3'} weight={'bold'} className="text-center">
        Kundenmeinungen zu Busco
      </Typography>
      <Typography size={'h5'} className="mt-2 mb-8 text-center">
        Einige Worte unserer zufriedenen Kunden
      </Typography>
      <Carousel className="w-full max-w-[80%] mx-auto">
        <CarouselContent>
          {items.map((item: TestimonialType, index: number) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col gap-4 items-center justify-center p-6 bg-gray-50 shadow-0 text-center">
                    <Typography
                      size={'h4'}
                      className="max-w-[80%] leading-8 !tracking-wider"
                    >
                      {item.content}
                    </Typography>
                    <div className="flex flex-col md:flex-row md:gap-4 items-center mt-4">
                      <Typography weight={'bold'} size={'h5'}>
                        {item.author}
                      </Typography>
                      <span className="hidden md:block">{' / '}</span>
                      <Typography textColor={'gray'} size={'h5'}>
                        {item.company}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
