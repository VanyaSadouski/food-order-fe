export const CALL_API = 'CALL_API';

export const get = (payload) => {
  return {
    type: CALL_API,
    payload: {
      method: 'get',
      ...payload,
    },
  };
};

export const post = (payload) => {
  return {
    type: CALL_API,
    payload: {
      method: 'post',
      ...payload,
    },
  };
};

export const put = (payload) => {
  return {
    type: CALL_API,
    payload: {
      method: 'put',
      ...payload,
    },
  };
};

export const del = (payload) => {
  return {
    type: CALL_API,
    payload: {
      method: 'del',
      ...payload,
    },
  };
};
