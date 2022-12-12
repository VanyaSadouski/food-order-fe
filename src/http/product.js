/* eslint-disable consistent-return */
import { $authHost, $host } from '.';
import { notificationErrorHandler } from '../util/notificationErrorHandler';

export const getProducts = async (body = {}) => {
  let { pagination = true } = body;
  const { limit = 5, page = 1 } = body;
  if (limit === 0) {
    pagination = false;
  }
  try {
    return await $host.post('products', { pagination, limit, page });
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const addProduct = async (body) => {
  try {
    return await $authHost.post('products/add', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const getImage = async (imageName) => {
  try {
    return await $host.get(`products/image/${imageName}`);
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const deleteProduct = async (id) => {
  try {
    return await $authHost.delete(`products/remove/${id}`);
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};
