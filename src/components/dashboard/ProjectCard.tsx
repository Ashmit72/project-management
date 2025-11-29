import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AvatarGroup, { getInitials } from '@/components/ui/avatar-group';
import { IconButton } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CalendarIcon, MoreVertical } from 'lucide-react';

export const people = [
  {
    name: 'Noah Brooks',
    image: 'https://avatar.iran.liara.run/public/18',
  },
  {
    name: 'Liam Reed',
    image: 'https://avatar.iran.liara.run/public/32',
  },
  {
    name: 'Ethan Cole',
    image: 'https://avatar.iran.liara.run/public/25',
  },
];

export type ProjectCardProps = {
  name: string;
  description: string;
  createdAt: string;
  members: { name: string; image: string }[];
};

export default function ProjectCard(props: ProjectCardProps) {
  const { name, description, createdAt, members } = props;
  return (
    <div className="flex flex-col gap-3 p-4 transition-colors border rounded-md cursor-pointer hover:border-primary-border">
      <div className="flex items-center gap-2">
        <Avatar size="36">
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <h3 className="overflow-hidden font-medium text-ellipsis text-md text-fg-primary whitespace-nowrap">
            {name}
          </h3>
        </div>
        <IconButton variant={'ghost'} color={'neutral'} size={'28'}>
          <MoreVertical />
        </IconButton>
      </div>
      <p className="flex-1 text-sm text-fg-secondary">{description}</p>
      <div className="flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-fg-tertiary">
              <CalendarIcon size={14} />
              <span className="text-xs ">{createdAt}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent withArrow side="bottom">
            This project was created on {createdAt}
          </TooltipContent>
        </Tooltip>
        <AvatarGroup
          avatars={members}
          size="32"
          avatarFallbackProps={{ className: 'text-xs' }}
        />
      </div>
    </div>
  );
}
