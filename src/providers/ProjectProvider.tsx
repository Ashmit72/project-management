import useSocket from '@/hooks/useSocket';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export default function ProjectProvider() {
  const { projectId } = useParams();
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (!connected || !projectId) return;
    socket.emitWithAck('project:subscribe', { projectId });

    return () => {
      socket.emitWithAck('project:unsubscribe', { projectId });
    };
  }, [connected, projectId]);
  return <Outlet />;
}
