import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarFallbackProps,
  type AvatarProps,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Utility function to get the initials of a name
export function getInitials(name: string) {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() ?? '';
  }
  return (
    (parts[0][0]?.toUpperCase() ?? '') +
    (parts[parts.length - 1][0]?.toUpperCase() ?? '')
  );
}

type AvatarGroupProps = AvatarProps & {
  size?: string;
  avatarFallbackProps?: AvatarFallbackProps;
  avatars: { name: string; image: string }[];
};

export default function AvatarGroup({
  avatars,
  size = '32',
  avatarFallbackProps = {},
  ...rest
}: AvatarGroupProps) {
  return (
    <div className="flex -space-x-2.5">
      {avatars.map(person => (
        <Avatar
          size={size}
          {...rest}
          className={cn('border-bg border-4 hover:z-10', rest.className)}
          key={person.name || person.image}
        >
          <AvatarImage src={person.image} />
          <AvatarFallback {...avatarFallbackProps}>
            {getInitials(person.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      <Avatar size={size} className="border-4 border-bg hover:z-10">
        <AvatarFallback
          {...avatarFallbackProps}
          className={cn('text-sm font-semibold', avatarFallbackProps.className)}
        >
          +9
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
