import { extend } from 'umi-request';
import config from '@/constants/config';
import storage, { storageKeys } from '@/utils/storage';
import {
  DATA_MODE_SIMPLE,
  callbackData,
  errorHandler,
  handleData,
} from './helper';

export function createRequest() {
  // 登录信息
  const tokenType =
    storage.get(storageKeys.sysTokenType) || config.auth.tokenType;
  const accessToken =
    storage.get(storageKeys.sysToken) || config.auth.accessToken;

  return extend({
    prefix: config.hostApi,
    errorHandler,
    timeout: 12000,
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
    credentials: 'include',
  });
}

// 请求记录表，用于做节流处理
const requestMap: { [nameSpace: string]: number } = {};

/**
 * 发起请求
 * @param url     地址
 * @param params  eg: {method, params, data, headers}
 * @returns {Promise}
 */
export default function request(url: string, params: any = {}) {
  // 节流处理，非get请求，一秒内不重复相同的请求
  let key = `${url}_${JSON.stringify(params)}`;
  if (
    params.method &&
    params.method.toLowerCase() !== 'get' &&
    requestMap[key] &&
    Date.now() - requestMap[key] < 1000
  ) {
    requestMap[key] = Date.now();
    const errMsg = '重复请求';
    if (config.request.dataMode === DATA_MODE_SIMPLE) {
      return Promise.reject(errMsg);
    }
    return Promise.resolve({ code: -1, msg: errMsg });
  }
  requestMap[key] = Date.now();

  if (params.type === 'form') {
    if (!params.headers) {
      params.headers = {};
    }
    params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    params.requestType = 'form';
    delete params.type;
  } else {
    params.headers['Content-Type'] = 'application/json';
  }

  return createRequest()(url, params)
    .then(handleData)
    .then(callbackData);
}
