import { apiBase } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export type UnreadCountData = {
  count: number;
};

export default function useNotificationsUnreadCount() {
  const { data } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const res = await apiBase.get<UnreadCountData>(
        '/notifications/unread-count'
      );
      return res.data;
    },
  });
  const unreadCount = data?.count || 0;

  return unreadCount;
}
