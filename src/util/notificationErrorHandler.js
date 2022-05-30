import { notification } from '../shared/antd/services';

export const notificationErrorHandler = (err) => {
  notification.error({
    message: err?.status,
    description: err?.data?.message,
  });
};
