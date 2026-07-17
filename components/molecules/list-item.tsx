import { Check } from 'lucide-react';

export type ListItemProps = {
  item: string;
};

function ListItem({ item }: ListItemProps) {
  return (
    <li className="flex gap-2 items-center">
      <Check className="h-4" /> {item}
    </li>
  );
}

export default ListItem;
