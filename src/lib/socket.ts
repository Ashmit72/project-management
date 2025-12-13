import { io } from 'socket.io-client';
import { toast } from 'sonner';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
});

socket.on('exception', body => {
  toast.error(body.message);
});
