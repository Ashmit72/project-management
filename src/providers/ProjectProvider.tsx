import useSocket from '@/hooks/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export default function ProjectProvider() {
  const { projectId } = useParams();
  const { socket, connected } = useSocket();
  const queryClient = useQueryClient();

  const handleBoardUpdate = useCallback(async () => {
    queryClient.invalidateQueries({
      queryKey: ['projects', projectId, 'board'],
    });
  }, [projectId]);

  useEffect(() => {
    if (!connected || !projectId) return;
    socket.emitWithAck('project:subscribe', { projectId });
    socket.on('board:update', handleBoardUpdate);

    return () => {
      socket.emitWithAck('project:unsubscribe', { projectId });
      socket.off('board:update', handleBoardUpdate);
    };
  }, [connected, projectId, handleBoardUpdate]);
  return <Outlet />;
}
