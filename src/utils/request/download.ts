import { createRequest } from './request';
import { callbackData } from './helper';

// 下载
export default async function download(url: string, options: any = {}) {
  try {
    const _options = {
      parseResponse: false,
      responseType: 'blob',
      getResponse: true,
      timeout: 60000,
      ...options,
    };
    const response: any = await createRequest()(url, _options);
    const contentDisposition = response.headers.get('content-disposition');
    const filename = contentDisposition
      ? contentDisposition.split(';')[1].split('=')[1]
      : Date.now();

    const blob = await response.blob();
    const csvData = new Blob([blob], { type: 'text/csv' });
    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(csvData, filename);
      return callbackData({ code: 0, data: decodeURIComponent(filename) });
    }
    // 非IE
    const link = document.createElement('a');
    link.download = decodeURIComponent(filename);
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
    return callbackData({ code: 0, data: decodeURIComponent(filename) });
  } catch (err) {
    console.log(err);
  }
  return callbackData({ code: -1, msg: '下载失败' });
}
