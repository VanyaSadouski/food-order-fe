/* eslint-disable consistent-return */
import { $authHost } from '.';
import { notificationErrorHandler } from '../util/notificationErrorHandler';

export const sendOrder = async (order) => {
  try {
    return await $authHost.post('orders/create', order);
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const getOrders = async (customerId) => {
  try {
    return await $authHost.get(`orders/${customerId}`);
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};
