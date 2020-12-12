import request from '@/utils/request';

export function queryList(params: any) {
  return request.get('/example/list', { params });
}
