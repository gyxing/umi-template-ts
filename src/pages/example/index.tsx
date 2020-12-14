import React from 'react';
import { Upload, Button } from 'antd';
import { CloudUploadOutlined, DownloadOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import styles from './index.less';

export default () => {
  // 下载
  const onDownload = () => {
    request
      .download('/files/download')
      .then(console.log)
      .catch(console.error);
  };

  // 上传
  const onUpload = ({ file, onProgress, onSuccess }: any) => {
    const form = new FormData();
    form.append('file', file);
    request
      .upload('/files/upload', {
        onProgress,
        params: { id: 1 },
        data: form,
      })
      .then(onSuccess)
      .catch(console.error);
  };
  const onUploadProgress = (res: any) => {
    console.log('upload progress => ', res);
  };
  const onUploadSuccess = (res: any) => {
    console.log('upload success => ', res);
  };

  const uploadProps = {
    multiple: true,
    showUploadList: false,
    customRequest: onUpload,
    onProgress: onUploadProgress,
    onSuccess: onUploadSuccess,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>测试例子</div>
      <div className={styles.content}>
        <div className={styles.item}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={onDownload}
          >
            下载
          </Button>
        </div>
        <div className={styles.item}>
          <Upload {...uploadProps}>
            <Button type="primary" icon={<CloudUploadOutlined />}>
              上传
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};
