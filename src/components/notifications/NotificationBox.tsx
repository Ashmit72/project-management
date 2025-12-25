import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiBase } from '@/lib/api';
import { getNotificationTargetURL } from '@/lib/getNotificatonTargetUrl';
import {
  notificationTypeToColor,
  notificationTypeToIcon,
  notificationTypeToTitle,
} from '@/lib/notificationTypeMap';
import {
  NotificationStatus,
  type NotificationsResponse,
} from '@/lib/types/notificationTypes';
import { cn } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '../ui/avatar-group';
import NotificationMessage from './NotificationMessage';

type Props = {
  isOpen: boolean;
  close: VoidFunction;
};

export default function NotificationBox({ isOpen, close }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<NotificationsResponse>({
      enabled: isOpen,
      queryKey: ['notifications', 'list'],
      staleTime: 1000 * 2,
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        const wasLastPage =
          lastPage.pagination.page >= lastPage.pagination.totalPages;
        if (wasLastPage) return undefined;
        return lastPage.pagination.page + 1;
      },
      queryFn: async ({ pageParam }) => {
        const res = await apiBase.get<NotificationsResponse>('/notifications', {
          params: {
            page: pageParam,
            limit: 3,
          },
        });
        return res.data;
      },
    });

  const notifications = data?.pages.flatMap(page => page.data) || [];

  const unreadCount = notifications.filter(
    n => n.status !== NotificationStatus.READ
  ).length;

  return (
    <div className="flex flex-col max-h-[600px] overscroll-y-contain">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-fill1/50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="soft" color="primary" size="20">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto max-h-[500px] divide-y divide-border/30">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="rounded-full bg-fill2 p-4 mb-3">
              <Bell className="h-8 w-8 text-fg-tertiary" />
            </div>
            <p className="text-sm font-medium text-fg-secondary">
              No notifications
            </p>
            <p className="text-xs text-fg-tertiary mt-1">
              You're all caught up!
            </p>
          </div>
        ) : (
          notifications.map(notification => {
            const isUnread = notification.status !== NotificationStatus.READ;
            const color = notificationTypeToColor[notification.type];
            const icon = notificationTypeToIcon[notification.type];
            const title = notificationTypeToTitle[notification.type];
            const avatar = notification.actor?.image || undefined;

            const targetUrl = getNotificationTargetURL(notification);

            return (
              <Link
                to={targetUrl}
                key={notification.id}
                onClick={() => {
                  close();
                }}
                className={cn(
                  'group relative p-3 transition-all duration-200 hover:bg-fill1 flex border-l-3 border-l-transparent',
                  isUnread && ' border-l-primary'
                )}
              >
                <div className="flex gap-3">
                  {avatar ? (
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback>
                        {getInitials(notification.actor?.name) || icon}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className={cn(
                        'shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg',
                        color === 'primary' && 'bg-primary-accent',
                        color === 'info' && 'bg-info-accent',
                        color === 'success' && 'bg-success-accent',
                        color === 'error' && 'bg-error-accent',
                        color === 'warning' && 'bg-warning-accent',
                        color === 'neutral' && 'bg-fill2'
                      )}
                    >
                      {icon}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-fg line-clamp-1">
                        {title}
                      </h4>
                    </div>
                    <div className="text-sm text-fg-secondary line-clamp-2 mb-2">
                      <NotificationMessage notification={notification} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-fg-tertiary">
                        {formatDistanceToNow(notification.createdAt, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}

        <div className="px-4 py-3   flex justify-center items-center">
          {hasNextPage ? (
            <Button
              variant="ghost"
              size="32"
              className="mx-auto hover:bg-fill2 text-primary-text font-medium"
              onClick={() => fetchNextPage()}
              loading={isFetchingNextPage}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </Button>
          ) : (
            <div className="text-sm text-fg-secondary">
              You're all caught up!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
