import type { Notification } from './types/notificationTypes';

export const getNotificationTargetURL = (notification: Notification) => {
  const projectId = notification.project?.id;
  const taskId = notification.task?.id;
  const invitationToken = notification.payload.invitationToken;
  switch (notification.type) {
    case 'PROJECT_INVITATION_RECEIVED':
      if (!invitationToken) return '#';
      return `/invitations/${invitationToken}`;

    case 'PROJECT_INVITATION_ACCEPTED':
    case 'MEMBER_ADDED':
      if (!projectId) return '#';
      return `/projects/${projectId}/members`;

    case 'TASK_ASSIGNED':
    case 'TASK_UNASSIGNED':
    case 'TASK_CREATED':
    case 'TASK_UPDATED':
    case 'TASK_STATUS_CHANGED':
    case 'TASK_DUE_DATE_CHANGED':
    case 'TASK_MOVED':
    case 'TASK_COMMENT_ADDED':
      if (!projectId || !taskId) return '#';
      return `/projects/${projectId}/board?task=${taskId}`;

    default:
      return '#';
  }
};
