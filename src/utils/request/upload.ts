import qs from 'qs';
import config from '@/constants/config';
import storage, { storageKeys } from '@/utils/storage';
import { createRequest } from './request';
import { callbackData, errorHandler } from './helper';

// 上传，用XMLHttpRequest做上传进度监控
export default function upload(url: string, options: any = {}) {
  return new Promise((resolve, reject) => {
    const onProgress = options.onProgress;
    delete options.onProgress;

    // 登录信息
    const tokenType =
      storage.get(storageKeys.sysTokenType) || config.auth.tokenType;
    const accessToken =
      storage.get(storageKeys.sysToken) || config.auth.accessToken;

    // url
    let apiUrl = `${config.hostApi}${url}`;
    if (options.params) {
      apiUrl += `?${qs.stringify(options.params)}`;
    }
    // 新建XMLHttpRequest实例
    const xhr: any = new XMLHttpRequest();
    xhr.open('POST', apiUrl);
    // 添加请求头信息
    xhr.setRequestHeader('authorization', `${tokenType} ${accessToken}`);
    for (let key in options.headers || {}) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
    xhr.onload = (e: any) => {
      if (e.target.status >= 200 && e.target.status < 300) {
        resolve(callbackData(JSON.parse(e.target.responseText)));
      } else {
        resolve(callbackData(errorHandler({ response: e.target })));
      }
    };
    xhr.onerror = reject;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = ({ loaded, total }: any) => {
        const percent = Math.floor((loaded / total) * 100);
        onProgress(percent);
      };
    }
    xhr.send(options.data);
  });
}

// TODO
/*
export default function upload(url: string, options: any = {}) {
  return new Promise((resolve, reject) => {
    const onProgress = options.onProgress;
    delete options.onProgress;
    const _options = {
      method: 'POST',
      parseResponse: false,
      responseType: 'blob',
      getResponse: true,
      timeout: 60000,
      ...options
    };
    createRequest()(url, _options).then((response: any) => {
      if (response.code && !response.body) {
        return response
      }
      const decoder = new TextDecoder();
      const reader = response.body.getReader();
      let bytesReceived: number = 0;
      let resultData: any = null;
      reader.read().then(function processResult(result: any) {
        if (result.done) {
          onProgress(100);
          resolve(callbackData(JSON.parse(resultData)));
          return;
        }
        bytesReceived += result.value.length;
        onProgress(bytesReceived);
        if (result.value) {
          resultData = decoder.decode(result.value, { stream: true })
        }
        return reader.read().then(processResult);
      });
    })
  })
}*/
