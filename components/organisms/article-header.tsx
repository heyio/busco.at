'use client';

import { Navigation } from './navigation';
import Breadcrumbs from '@/components/molecules/breadcrumbs';
import Typography from '@/components/ui/typography';

export type ArticleHeaderProps = {
  title: string;
  breadcrumbItems: Array<{ title: string; url: string }>;
};

export default function ArticleHeader({
  title,
  breadcrumbItems,
}: ArticleHeaderProps) {
  return (
    <header className="min-h-2">
      <Navigation />
      <div className="relative py-6 px-4 pt-36">
        <div className="container mx-auto max-w-4xl">
          {breadcrumbItems.length > 0 && (
            <div className="mb-4">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          )}
          <Typography type="h1" size="h2" weight="bold" className="mt-4">
            {title}
          </Typography>
        </div>
      </div>
    </header>
  );
}
