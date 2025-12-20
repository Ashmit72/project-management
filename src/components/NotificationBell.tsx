import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useNotificationCacheActions from '@/hooks/useNotificationCacheActions';
import useNotificationsUnreadCount from '@/hooks/useNotificationsUnreadCount';
import useSocket from '@/hooks/useSocket';
import { socket } from '@/lib/socket';
import { useQueryClient } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import NotificationBox from './notifications/NotificationBox';

export function NotificationBell() {
  const queryClient = useQueryClient();
  const { connected } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = useNotificationsUnreadCount();
  const { addNewNotificationToList, incrementUnreadCount } =
    useNotificationCacheActions();

  const handleOpen = (state: boolean) => {
    setIsOpen(state);

    if (state === true) {
      queryClient.setQueryData(['notifications', 'unread-count'], () => {
        return { count: 0 };
      });
    }
  };

  useEffect(() => {
    if (!connected) return;

    socket.on('notification:new', notification => {
      incrementUnreadCount();
      if (isOpen) {
        addNewNotificationToList(notification);
      }
    });

    return () => {
      socket.off('notification:new');
    };
  }, [connected, isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="36"
          className="relative hover:bg-fill2 transition-all duration-200 w-9 h-9 p-0"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 aspect-square items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {
                // unreadCount > 9 ? '9+' :
                unreadCount
              }
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[420px] p-0 shadow-xl border-border/80"
        sideOffset={12}
      >
        <NotificationBox isOpen={isOpen} />
      </PopoverContent>
    </Popover>
  );
}
