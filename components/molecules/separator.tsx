import Image from 'next/image';
import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type SeparatorItemProps = {
  image?: any;
  headline: string;
  subline?: string;
  content: string;
  cta?: { title: string; url: string };
};

export type SeparatorProps = {
  content: SeparatorItemProps;
};

function Separator({ content }: SeparatorProps) {
  const imageUrl = content?.image?.url || content?.image?.data?.attributes?.url;

  if (!imageUrl) {
    return (
      <div className="relative py-8 bg-slate-200">
        <div className="text-center relative z-10 max-w-3xl px-4 py-8 lg:py-32 mx-auto">
          <Typography size={'h1'} textColor={'white'} weight={'bold'}>
            {content?.headline}
          </Typography>
        </div>
      </div>
    );
  }

  const fullImageUrl = imageUrl.startsWith('http')
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL}${imageUrl}`;

  return (
    <div className="relative py-32 w-full">
      <Image
        src={fullImageUrl}
        alt={content?.image?.alternativeText || 'busco Ausflug'}
        fill
        sizes="100vw"
        priority={false}
        className="absolute top-0 left-0 z-0 object-cover w-full h-full"
      />
      <div className="text-center relative z-10 max-w-3xl px-4 py-8 lg:py-32 mx-auto">
        {!!content.subline && (
          <Typography
            size={'h4'}
            textColor={'white'}
            weight={'semibold'}
            className="pb-8"
          >
            {content?.subline}
          </Typography>
        )}
        <Typography size={'h1'} textColor={'white'} weight={'bold'}>
          {content?.headline}
        </Typography>
        <Typography size={'h4'} textColor={'white'} className="mt-6 pb-8">
          {content?.content}
        </Typography>

        {!!content?.cta && (
          <Link
            href={content.cta.url}
            className="inline-flex flex-row gap-4 px-12 py-4 rounded-lg bg-black text-white font-semibold tracking-wider"
          >
            {content.cta.title}
            <ArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Separator;
