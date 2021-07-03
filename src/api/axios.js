/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '@/store/index';
import {
  setCookie,
} from '../util/userCookie';

const ins = axios.create();

ins.defaults.baseURL = 'https://mallapi.duyiedu.com';

ins.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.userInfo.appkey,
    },
  };
}, (error) => Promise.reject(error));

ins.interceptors.response.use((req) => {
  const result = req.data;
  if (result.status === 'success' && result.msg === '登陆成功') {
    setCookie(result.data);
  }
  return result;
}, (error) => Promise.reject(error));

export default ins;
