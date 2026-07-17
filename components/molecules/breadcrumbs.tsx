import { Home } from 'lucide-react';
import Link from 'next/link';

export type BreadcrumbsItem = { title: string; url: string };

export type BreadcrumbsProps = {
  items: BreadcrumbsItem[];
};

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="gap-4 text-base hidden md:flex">
      <div>
        <Link href="/">
          <Home className="w-4" />
        </Link>
      </div>
      {items.map((item: BreadcrumbsItem) => (
        <div key={item.title} className="flex gap-4">
          {' '}
          <span>/</span>
          <Link href={item.url}>
            <span>{item.title}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Breadcrumbs;
