import Typography from '@/components/ui/typography';

export interface AuthorBoxProps {
  name?: string | null;
  bio?: string | null;
  avatar?: { url?: string } | null;
}

export default function AuthorBox({ name, bio, avatar }: AuthorBoxProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-y border-gray-200 my-6">
      {avatar?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar.url}
          alt={name ?? ''}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div>
        {name && <Typography weight="semibold">{name}</Typography>}
        {bio && (
          <Typography size="sm" textColor="gray">
            {bio}
          </Typography>
        )}
      </div>
    </div>
  );
}
