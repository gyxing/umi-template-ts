import request from 'gdin-request';
import config from '@/constants/config';
import { notification } from 'antd';
import storage, { storageKeys } from '@/utils/storage';
import { history } from 'umi';

// 第一次进来页面
let firstEnter = true;

request.base.prefix = config.hostApi;
request.base.skipErrorMessage = config.request.skipErrorMessage;
request.base.dataMode = config.request.dataMode;
request.base.getAuthorization = () => {
  // 登录信息
  const tokenType =
    storage.get(storageKeys.sysTokenType) || config.auth.tokenType;
  const accessToken =
    storage.get(storageKeys.sysToken) || config.auth.accessToken;

  return `${tokenType} ${accessToken}`;
};
request.base.interceptError = (data: any) => {
  if (data.code === 401) {
    if (!firstEnter) {
      notification.warning({ message: '登录已过期，请重新登录' });
    }
    firstEnter = false;
    storage.remove([
      storageKeys.sysToken,
      storageKeys.sysTokenExpire,
      storageKeys.sysTokenType,
      storageKeys.userInfo,
    ]);
    history.replace('/login');
    return false;
  }
  return true;
};

export default request;
