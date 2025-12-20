import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  notificationTypeToColor,
  notificationTypeToIcon,
  notificationTypeToTitle,
} from '@/lib/notificationTypeMap';
import { cn } from '@/lib/utils';
import { formatDate, formatDistanceToNow } from 'date-fns';
import { Bell } from 'lucide-react';
import { apiBase } from '@/lib/api';
import {
  NotificationStatus,
  type Notification,
  type NotificationsResponse,
} from '@/lib/types/notificationTypes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '../ui/avatar-group';

const getNotificationMessage = (notification: Notification): string => {
  const { type, payload, actor, task } = notification;

  switch (type) {
    case 'TASK_ASSIGNED':
      return `${actor?.name} assigned you to "${task?.title}"`;
    case 'TASK_UNASSIGNED':
      return `${actor?.name} unassigned you from "${task?.title}"`;
    //   case 'TASK_COMMENT_ADDED':
    //     return `${actor?.name} commented on "${task?.title}": ${payload.commentPreview}`;
    //   case 'PROJECT_INVITATION_RECEIVED':
    //     return `${actor?.name} invited you to join "${payload.projectName}"`;
    case 'TASK_STATUS_CHANGED':
      return `${actor?.name} changed the status of "${task?.title}".`;
    case 'TASK_DUE_DATE_CHANGED':
      const oldDate = payload?.old
        ? formatDate(payload.old as string, 'MMM d, yyyy')
        : null;
      const newDate = payload?.new
        ? formatDate(payload.new as string, 'MMM d, yyyy')
        : null;

      if (oldDate && !newDate) {
        return `${actor?.name} removed the due date of "${task?.title}".`;
      }
      return `${actor?.name} changed the due date of "${task?.title}" ${oldDate ? `from ${oldDate}` : ''} to ${newDate || 'no due date'}.`;
    case 'TASK_UPDATED':
      return `${actor?.name} updated the ${payload.field} for "${task?.title}"`;

    //   case 'MEMBER_ADDED':
    //     return `${payload.memberName} joined "${payload.projectName}"`;
    //   case 'TASK_CREATED':
    //     return `${payload.createdBy} created "${task?.title}" in ${payload.projectName}`;
    //   case 'SYSTEM':
    //     return payload.message as string;
    default:
      return 'You have a new notification';
  }
};

type Props = {
  isOpen: boolean;
};

export default function NotificationBox({ isOpen }: Props) {
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
  console.log('🚀 ~ NotificationBox ~ notifications:', notifications);
  //   const pagination = data?.pagination;
  console.log('🚀 ~ NotificationBell ~ notifications:', notifications);

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
        {/* {unreadCount > 0 && (
                    <Button
                        variant="ghost"
                        size="28"
                        onClick={markAllAsRead}
                        className="h-7 text-xs hover:bg-fill2"
                    >
                        <CheckCheck className="h-3.5 w-3.5 mr-1" />
                        Mark all read
                    </Button>
                )} */}
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

            return (
              <div
                key={notification.id}
                className={cn(
                  'group relative p-3 transition-all duration-200 hover:bg-fill1 flex',
                  isUnread && 'border-l-3 border-l-primary'
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
                    <p className="text-sm text-fg-secondary line-clamp-2 mb-2">
                      {getNotificationMessage(notification)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-fg-tertiary">
                        {formatDistanceToNow(notification.createdAt, {
                          addSuffix: true,
                        })}
                      </span>
                      {/* {isUnread && (
                                                <Button
                                                    variant="ghost"
                                                    size="28"
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="h-6 text-xs px-2 hover:bg-fill2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Check className="h-3 w-3 mr-1" />
                                                    Mark read
                                                </Button>
                                            )} */}
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Footer */}
      {/* {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-border/50 bg-fill1/50">
          <Button
            variant="ghost"
            size="32"
            className="w-full hover:bg-fill2 text-primary-text font-medium"
          >
            Load more
          </Button>
        </div>
      )} */}
    </div>
  );
}
