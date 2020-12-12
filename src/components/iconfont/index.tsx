import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import config from '@/constants/config';

const IconFont = createFromIconfontCN({
  scriptUrl: config.iconfont,
});

export default ({ type, ...props }: any) => <IconFont type={type} {...props} />;
