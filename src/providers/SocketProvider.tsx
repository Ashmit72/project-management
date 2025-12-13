import { socket } from '@/lib/socket';
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket;
  connected: boolean;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export default function SocketProvider(props: PropsWithChildren) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {props.children}
    </SocketContext.Provider>
  );
}
