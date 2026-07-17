import { HorizontalCardType } from '@/types/Post';
import Image from 'next/image';
import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type Alignment = 'left' | 'right';

export type ServiceCardProps = {
  post: HorizontalCardType;
  alignment?: Alignment;
};

function HorizontalCard({ post, alignment }: ServiceCardProps) {
  return (
    <article className="grid md:grid-cols-2 items-start w-full bg-white rounded-2xl overflow-hidden">
      <div
        className={`flex flex-col gap-4 w-full rounded-xl p-6 pb-10 order-2 ${
          alignment === 'right' ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <div className="flex flex-wrap gap-2 pt-4">
          {!!post.tags?.length &&
            post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full text-sm font-semibold px-4 py-1 whitespace-nowrap text-indigo-700 bg-[#E0E7FF]"
              >
                {tag}
              </span>
            ))}
        </div>
        <div>
          <div className="pt-12">
            <Typography weight={'semibold'} size={'h4'}>
              {post.title}
            </Typography>
          </div>
        </div>
        <div className="relative flex items-center gap-x-4">
          <div className="text-md leading-6">
            <Typography className="text-[16px]">
              {post.content}
            </Typography>
          </div>
        </div>
        <div className="mt-16">
          <Link
            href={post.cta.url}
            className="inline-flex gap-4 bg-black rounded-lg px-6 py-3 text-white font-semibold"
          >
            {post.cta.title}
            <ArrowRight />
          </Link>
        </div>
      </div>
      <div
        className={`flex w-full h-full min-h-64 order-1 ${
          alignment === 'right' ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <div className="relative w-full h-full">
          <Image
            src={post.image}
            alt={post.imageAlt ? post.imageAlt : post.title}
            fill
            layout="cover"
            className="w-full rounded-2xl bg-gray-100 object-cover"
          />
        </div>
      </div>
    </article>
  );
}

export default HorizontalCard;
