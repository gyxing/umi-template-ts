import React from 'react';
import { Spin } from 'antd';

export default () => {
  return (
    <div className="dynamic-loading">
      <Spin spinning={true} />
    </div>
  );
};
