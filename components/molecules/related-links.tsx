import Link from 'next/link';
import Spacer from '@/components/ui/spacer';
import Typography from '@/components/ui/typography';

export type RelatedLinksItems = {
  headline: string;
  content: string;
  subline: string;
};

export type RelatedLinksProps = {
  content: RelatedLinksItems;
};

function RelatedLinks({ content }: RelatedLinksProps) {
  const linksForPersons = [15, 20, 25, 30, 35];

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-3xl px-4">
        <Spacer size={'lg'} />
        <Typography size={'h3'} weight={'bold'} className="text-center">
          {content.headline}
        </Typography>
        <Spacer size={'xs'} />
        <Typography size={'h5'} className="mt-2 mb-8 text-center">
          {content.content}
        </Typography>
        <Spacer size={'sm'} />
        <Typography size={'h4'} className="mt-2 text-center">
          {content.subline}
        </Typography>
        <Spacer size={'md'} />
        <div className="flex flex-col md:flex-row gap-2 justify-between w-full mx-auto">
          {linksForPersons.map((persons: number) => (
            <Link
              href={`/service/bus-fuer-${persons}-personen`}
              key={persons}
              className="text-indigo-700 underline"
            >
              Für {persons} Personen
            </Link>
          ))}
        </div>
      </div>
      <Spacer size={'lg'} />
    </div>
  );
}

export default RelatedLinks;
