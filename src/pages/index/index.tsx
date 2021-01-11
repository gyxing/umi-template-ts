import React from 'react';
import { Link } from 'umi';
import styles from './index.less';
import { storageKeys } from '@/utils/storage';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/example">查看例子</Link>
    </div>
  );
};
