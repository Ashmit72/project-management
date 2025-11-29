import AvatarGroup from '@/components/ui/avatar-group';
import { Badge } from '@/components/ui/badge';
import { Button, IconButton } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { apiBase } from '@/lib/api';
import type { BoardColumn, Project } from '@/lib/types/projectTypes';
import { useQuery } from '@tanstack/react-query';
import { EllipsisVertical, PlusIcon, UserRoundPlusIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export default function ProjectBoardPage() {
  const { projectId } = useParams();
  const { data: project, isPending: isLoadingProject } = useQuery({
    enabled: !!projectId,
    select: res => res.data,
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const data = await apiBase.get<Project>(`/projects/${projectId}`);
      return data;
    },
  });

  // use this to render columns
  const { data: board, isPending: isLoadingBoard } = useQuery({
    enabled: !!projectId,
    select: res => res.data,
    queryKey: ['projects', projectId, 'board'],
    queryFn: async () => {
      const data = await apiBase.get<BoardColumn[]>(
        `/projects/${projectId}/board`
      );
      return data;
    },
  });

  if (isLoadingProject) return <Spinner />;

  const boardColors = {
    Backlog: 'bg-error-accent',
    'In Progress': 'bg-info-accent',
    Review: 'bg-primary-accent',
    Testing: 'bg-fill1',
    Done: 'bg-success-accent',
  };
  const menuColors = {
    Backlog: 'error',
    'In Progress': 'info',
    Review: 'primary',
    Testing: 'neutral',
    Done: 'success',
  };
  const ticketColors = {
    Backlog: 'bg-error-focus',
    'In Progress': 'bg-info-focus',
    Review: 'bg-primary-focus',
    Testing: 'bg-soft',
    Done: 'bg-success-focus',
  };
  function getBoardColor(name: string) {
    return boardColors[name] || 'bg-fill1';
  }

  function getMenuColors(
    name: string
  ): 'error' | 'info' | 'warning' | 'neutral' | 'success' | 'primary' {
    return (
      (menuColors[name as keyof typeof menuColors] as
        | 'error'
        | 'info'
        | 'warning'
        | 'neutral'
        | 'success'
        | 'primary') || 'neutral'
    );
  }
  function getTicketColor(name: string) {
    return ticketColors[name] || 'bg-fill2';
  }

  console.log(board);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-fg">{project?.name}</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            {project?.members && (
              <AvatarGroup size="40" avatars={project.members} />
            )}
            <IconButton
              size={'32'}
              className="rounded-full"
              variant={'outline'}
              color="neutral"
            >
              <UserRoundPlusIcon size={25} />
            </IconButton>
          </div>
          <Button>
            <PlusIcon />
            Create Task
          </Button>
        </div>
      </div>
      <div className="flex gap-3">
        {board?.map(board => (
          <div
            className={`w-68 self-start rounded-xl flex gap-3 flex-col p-2 ${getBoardColor(board.name)}`}
            key={board.id}
          >
            <section className="flex items-center justify-between">
              <h2 className="text-base font-medium truncate text-black-inverse px-3">
                {board.name}
              </h2>
              <IconButton
                size="28"
                color={getMenuColors(board.name)}
                variant="ghost"
              >
                <EllipsisVertical />
              </IconButton>
            </section>
            <div className="flex flex-col gap-3 items-center justify-center">
              {board.tasks.map(task => (
                <div
                  key={task.id}
                  className={`${getTicketColor(board.name)} rounded-xl p-3 w-full flex flex-col  gap-1 cursor-grab active:cursor-grabbing`}
                >
                  <h3 className="text-sm">{task.title}</h3>
                  <p className="text-sm text-fg-secondary font-medium">
                    {format(parseISO(task.dueDate), 'PPP')}
                  </p>
                  <span className="">
                    <Badge
                      color={`${getMenuColors(board.name)}`}
                      variant="soft"
                    >
                      {task.status.name}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
