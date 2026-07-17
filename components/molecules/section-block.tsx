import { UI } from '@/components/index';

export interface SectionBlockProps {
  headline?: string | null;
  text?: string | null;
  image?: { url?: string; alternativeText?: string } | null;
}

export default function SectionBlock({
  headline,
  text,
  image,
}: SectionBlockProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 my-8">
      <div>
        {headline && (
          <UI.Typography type="h3" size="h4" weight="semibold">
            {headline}
          </UI.Typography>
        )}
        {text && (
          <UI.Typography textColor="gray" className="mt-4">
            {text}
          </UI.Typography>
        )}
      </div>
      {image?.url && (
        <div className="relative min-h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.alternativeText ?? ''}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
