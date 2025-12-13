import { SocketContext } from '@/providers/SocketProvider';
import { useContext } from 'react';

export default function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used inside SocketProvider');
  }

  return context;
}
