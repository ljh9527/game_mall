import axios from 'axios';
import { requestUrl } from '-/config';
import { AUTH_TOKEN, USERNAME } from '-/constants';
import { history } from '-/utils';

import AxiosWrapper from './axiosWrapper';
const service = axios.create({
  baseURL: requestUrl,
  timeout: 500000,
});
const ERROR_TYPES = {
  TOKEN_INVALID_1: 2001,
  TOKEN_INVALID_2: 2003,
};

let loginErr = false;

const errVerifyFunc = async (code) => {
  switch (code) {
    case ERROR_TYPES['TOKEN_INVALID_1']:
    case ERROR_TYPES['TOKEN_INVALID_2']: {
      if (!loginErr) {
        loginErr = true;
        const backUrl = window.location.hash.split('#')[1];
        history.replace(`/?back_url=${encodeURIComponent(backUrl)}`);
      }
      break;
    }
    default: {
      loginErr = false;
      break;
    }
  }
};

// Add a request interceptor
service.interceptors.request.use(config => {
  const authToken = localStorage.getItem([AUTH_TOKEN]);
  if (config.url !== `${requestUrl}/` && authToken) {
    config.headers.token = authToken;
  }
  config.params = {
    ...config.params,
    isAdmin: false,
  };
  return config;
}, error => Promise.reject(error));

// Add a response interceptor
service.interceptors.response.use(async (response) => {
  if (response.data instanceof Blob) {
    return response;
  }
  if (response.data) {
    const data = response.data;
    if (Number(data.code) === 999) {
      localStorage.removeItem([AUTH_TOKEN]);
      localStorage.removeItem([USERNAME]);
      window.location.href = data.data && data.data.loginUrl;
      return;
    }
    if (Number(data.code) !== 200) {
      await errVerifyFunc(data.code);
      if (loginErr) {
        data.notShowError = true;
      }
    } else {
      data.notShowError = false;
    }
    return data;
  }
  return response;
}, (error) => {
  let notShowError = false;
  if (loginErr) {
    notShowError = true;
  }
  return Promise.reject({ error, notShowError });
});

export default new AxiosWrapper(service);
