import { notification as AntdNotification } from 'antd';

export const notification = {
  success: (config) => {
    AntdNotification.success(config);
  },
  info: (config) => {
    AntdNotification.info(config);
  },
  warning: (config) => {
    AntdNotification.warning(config);
  },
  error: (config) => {
    AntdNotification.error(config);
  },
  close: (config) => {
    AntdNotification.close(config);
  },
};

export default notification;
