import AvatarGroup from '@/components/ui/avatar-group';
import { Button, IconButton } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { apiBase } from '@/lib/api';
import type { Project } from '@/lib/types/projectTypes';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, UserRoundPlusIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function ProjectBoardPage() {
  const { projectId } = useParams();
  const { data, isPending } = useQuery({
    enabled: !!projectId,
    select: res => res.data,
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const data = await apiBase.get<Project>(`/projects/${projectId}`);
      return data;
    },
  });
  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-fg">{data?.name}</h2>
          <p className="text-fg-secondary">{data?.description}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            {data?.members && <AvatarGroup size="40" avatars={data.members} />}
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
    </div>
  );
}
