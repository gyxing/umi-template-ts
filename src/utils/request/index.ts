import request from './request';
import download from './download';
import upload from './upload';

// 定义几种请求策略
export default {
  get(url: string, { params }: any = {}) {
    return request(url, { params });
  },
  post(url: string, { data, params }: any = {}) {
    return request(url, { data, params, method: 'POST' });
  },
  put(url: string, { data, params }: any = {}) {
    return request(url, { data, params, method: 'PUT' });
  },
  delete(url: string, { params }: any = {}) {
    return request(url, { params, method: 'DELETE' });
  },
  // form表单请求
  form(url: string, { data, params }: any = {}) {
    return request(url, { data, params, method: 'POST', type: 'form' });
  },
  // 一般的request请求
  extend(url: string, options?: any) {
    return request(url, options);
  },
  // 下载文件
  download(url: string, options?: any) {
    return download(url, options);
  },
  // 上传文件
  upload(url: string, options?: any) {
    return upload(url, options);
  },
};
