'use client';
import { useEffect, useState } from 'react';
import { PostType } from '@/types/Post';
import Image from 'next/image';
import Typography from '@/components/ui/typography';
import colors from '@/constants/postColors';

export type ServiceCardProps = {
  post: PostType;
};

function ServiceCard({ post }: ServiceCardProps) {
  const [colorIndex, setColorIndex] = useState<number>(0);

  useEffect(() => {
    handleCardColor();
  }, []);

  const handleCardColor = () => {
    const newColorIndex = randNumber();
    setColorIndex(newColorIndex !== colorIndex ? newColorIndex : randNumber());
  };

  const randNumber = () => {
    const max = colors.length - 1;
    return Math.floor(Math.random() * (max - 0 + 1) + 0);
  };

  return (
    <article className="flex flex-col items-start">
      <div
        className={`flex flex-col gap-4 w-full rounded-xl p-6 pb-10`}
        style={{ backgroundColor: colors[colorIndex].background }}
      >
        <div className="flex flex-wrap gap-2">
          {!!post.tags?.length &&
            post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full text-sm px-2 py-0.5 whitespace-nowrap"
                style={{
                  color: colors[colorIndex].textTag,
                  backgroundColor: colors[colorIndex].backgroundTag,
                }}
              >
                {tag}
              </span>
            ))}
        </div>
        <div>
          <div className="group relative">
            <a href={post.href}>
              <Typography
                weight={'semibold'}
                size={'h4'}
                style={{ color: colors[colorIndex].title }}
              >
                {post.title}
              </Typography>
            </a>
          </div>
        </div>
        <div className="relative flex items-center gap-x-4">
          <div
            className="text-sm leading-6 text-green-50"
            style={{ color: colors[colorIndex].copy }}
          >
            <Typography
              style={{ color: colors[colorIndex].copy }}
              className="text-[16px]"
            >
              {post.content}
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative w-full aspect-square -mt-6">
        <Image
          src={post.image}
          alt={post.imageAlt ? post.imageAlt : post.title}
          fill
          layout="cover"
          className="aspect-16/9 w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
    </article>
  );
}

export default ServiceCard;
