import request from '@/utils/request';

export function queryList(params: any) {
  return request.get('/example/list', { params });
}

export function post(params: any) {
  return request('/example/list', { params, method: 'POST' });
}
