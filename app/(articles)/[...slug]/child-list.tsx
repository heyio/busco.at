import Link from 'next/link';
import { UI } from '@/components/index';
import type { StrapiNodeType } from '@/hooks/use-strapi-navigation';

interface ChildListProps {
  items: any[];
  nodeType: StrapiNodeType;
  parentSlug: string[];
}

export default function ChildList({
  items,
  nodeType,
  parentSlug,
}: ChildListProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <UI.Typography type="h3" size="h4" weight="bold" className="mb-6">
        {nodeType === 'category' ? 'Artikel' : 'Unterthemen'}
      </UI.Typography>
      <div className="grid gap-4">
        {items.map((child: any) => {
          const childPath = (child.path ?? '').startsWith('/')
            ? child.path
            : `/${parentSlug.join('/')}/${(child.path ?? '').split('/').filter(Boolean).pop()}`;

          return (
            <Link
              key={child.path ?? child.title}
              href={childPath}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-400 transition"
            >
              <UI.Typography weight="semibold">{child.title}</UI.Typography>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
