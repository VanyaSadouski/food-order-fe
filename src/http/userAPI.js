/* eslint-disable consistent-return */
import { $authHost, $host } from '.';
import { notificationErrorHandler } from '../util/notificationErrorHandler';

export const registration = async (body) => {
  try {
    return await $host.post('auth/register', body);
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const login = async (body) => {
  try {
    const userInfo = await $host.post('auth/login', body);
    if (userInfo?.data?.token) {
      localStorage.setItem('token', userInfo?.data?.token);
    }
    return userInfo?.data?.user;
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const check = async () => {
  try {
    const checkResponse = await $authHost.get('auth/check');
    return checkResponse?.data;
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};

export const getUserInfoById = async (id) => {
  try {
    return await $authHost.get(`user/info/${id}`);
  } catch (err) {
    notificationErrorHandler(err?.response);
  }
};
