import type {
  Notification,
  NotificationsResponse,
} from '@/lib/types/notificationTypes';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { UnreadCountData } from './useNotificationsUnreadCount';
import { apiBase } from '@/lib/api';
import { noop } from '@/lib/noop';

export default function useNotificationActions() {
  const queryClient = useQueryClient();

  const addNewNotificationToList = (notification: Notification) => {
    const status = queryClient.getQueryState(['notifications', 'list'])?.status;

    if (status === 'success') {
      queryClient.setQueryData(
        ['notifications', 'list'],
        (old: InfiniteData<NotificationsResponse>) => {
          if (!old) return old;

          return {
            ...old,
            pages: [
              {
                ...old.pages[0],
                data: [notification, ...old.pages[0].data],
              },
              ...old.pages.slice(1),
            ],
          };
        }
      );
    }
  };

  const incrementUnreadCount = () => {
    queryClient.setQueryData(
      ['notifications', 'unread-count'],
      (old: UnreadCountData) => {
        const newCount = (old.count ?? 0) + 1;
        return { count: newCount };
      }
    );
  };

  const readAll = async () => {
    queryClient.setQueryData(['notifications', 'unread-count'], () => {
      return { count: 0 };
    });

    await apiBase.get('/notifications/read-all').catch(noop);
  };

  return {
    addNewNotificationToList,
    incrementUnreadCount,
    readAll,
  };
}
