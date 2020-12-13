// 状态码对应的描述
import config from '@/constants/config';
import { message } from 'antd';
import storage, { storageKeys } from '@/utils/storage';
import { history } from 'umi';
import ex from 'umi/dist';

export const DATA_MODE_SIMPLE = 'simple';
// 第一次进来页面
let firstEnter = true;

export const codeMessage: { [nameSpace: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  408: '请求超时。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export function callbackData(data: any) {
  if (data.code !== 0 && data.msg && config.request.skipErrorMessage) {
    // 错误提示
    message.error(data.msg);
  }
  if (config.request.dataMode === DATA_MODE_SIMPLE) {
    if (data.code === 0) {
      return data.data;
    }
    return Promise.reject(data.msg);
  }
  return data;
}

// 数据处理
export function handleData(data: any) {
  // 后台正常返回
  if (
    data &&
    (typeof data === 'string' ||
      typeof data.code === 'undefined' ||
      (typeof data.code !== 'undefined' && !!data.id))
  ) {
    return { data, code: 0 };
  }
  // 后台返回为null
  if (!data) {
    return { data: null, code: -2, msg: '返回为空' };
  }
  return data;
}

// 错误处理
export function errorHandler({ data, response, type }: any) {
  if (type === 'Timeout') {
    return { code: 408, msg: codeMessage[408] };
  }
  const { status, statusText } = response;
  if (status === 401) {
    if (!firstEnter) {
      message.warning('登录已过期，请重新登录');
    }
    firstEnter = false;
    storage.remove([
      storageKeys.sysToken,
      storageKeys.sysTokenExpire,
      storageKeys.sysTokenType,
      storageKeys.userInfo,
    ]);
    history.replace('/login');
    return;
  }
  const errMsg =
    (data && data.msg) || codeMessage[status] || statusText || '错误请求';
  // message.error(errMsg);
  if (!data || status !== 200) {
    return { code: status, msg: errMsg };
  }
  return data;
}

// export const getFetchOptions() {
//
// }
