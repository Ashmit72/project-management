import { NotificationType } from './types/notificationTypes';

export const notificationTypeToTitle: Record<NotificationType, string> = {
  [NotificationType.TASK_CREATED]: 'New Task Created',
  [NotificationType.TASK_UPDATED]: 'Task Updated',
  [NotificationType.TASK_ASSIGNED]: 'Task Assigned to You',
  [NotificationType.TASK_UNASSIGNED]: 'Task Unassigned',
  [NotificationType.TASK_STATUS_CHANGED]: 'Task Status Changed',
  [NotificationType.TASK_DUE_DATE_CHANGED]: 'Due Date Changed',
  [NotificationType.TASK_COMMENT_ADDED]: 'New Comment Added',
  [NotificationType.TASK_MOVED]: 'Task Moved',
  [NotificationType.PROJECT_UPDATED]: 'Project Updated',
  [NotificationType.MEMBER_ADDED]: 'New Member Added',
  [NotificationType.PROJECT_INVITATION_RECEIVED]: 'Project Invitation',
  [NotificationType.PROJECT_INVITATION_ACCEPTED]: 'Invitation Accepted',
  [NotificationType.SYSTEM]: 'System Notification',
};

export const notificationTypeToIcon: Record<NotificationType, string> = {
  [NotificationType.TASK_CREATED]: '✨',
  [NotificationType.TASK_UPDATED]: '📝',
  [NotificationType.TASK_ASSIGNED]: '👤',
  [NotificationType.TASK_UNASSIGNED]: '👋',
  [NotificationType.TASK_STATUS_CHANGED]: '🔄',
  [NotificationType.TASK_DUE_DATE_CHANGED]: '📅',
  [NotificationType.TASK_COMMENT_ADDED]: '💬',
  [NotificationType.TASK_MOVED]: '🔀',
  [NotificationType.PROJECT_UPDATED]: '🔧',
  [NotificationType.MEMBER_ADDED]: '👥',
  [NotificationType.PROJECT_INVITATION_RECEIVED]: '📬',
  [NotificationType.PROJECT_INVITATION_ACCEPTED]: '✅',
  [NotificationType.SYSTEM]: '⚙️',
};

export const notificationTypeToColor: Record<
  NotificationType,
  'primary' | 'info' | 'success' | 'error' | 'warning' | 'neutral'
> = {
  [NotificationType.TASK_CREATED]: 'success',
  [NotificationType.TASK_UPDATED]: 'info',
  [NotificationType.TASK_ASSIGNED]: 'primary',
  [NotificationType.TASK_UNASSIGNED]: 'neutral',
  [NotificationType.TASK_STATUS_CHANGED]: 'info',
  [NotificationType.TASK_DUE_DATE_CHANGED]: 'warning',
  [NotificationType.TASK_COMMENT_ADDED]: 'info',
  [NotificationType.TASK_MOVED]: 'info',
  [NotificationType.PROJECT_UPDATED]: 'info',
  [NotificationType.MEMBER_ADDED]: 'success',
  [NotificationType.PROJECT_INVITATION_RECEIVED]: 'primary',
  [NotificationType.PROJECT_INVITATION_ACCEPTED]: 'success',
  [NotificationType.SYSTEM]: 'neutral',
};
