import { defineConfig } from 'umi';
import config from './src/constants/config';
import { routes } from './src/routes';

const isProd = process.env.NODE_ENV === 'production';

const proxy = config.hostApi
  ? {
      [config.hostApi]: {
        target: config.host,
        changeOrigin: true,
        // pathRewrite: { '^/api': '' },
      },
    }
  : {};

export default defineConfig({
  proxy,
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  title: config.name,
  hash: true,
  history: { type: 'hash' },
  ignoreMomentLocale: true,
  publicPath: isProd ? `${config.prefix}/` : '/',
  runtimePublicPath: !isProd,
  define: {
    // 是否开启权限控制
    'process.env.PERMISSION': false,
  },
  dynamicImport: {
    loading: '@/pages/loading',
  },
  targets: {
    android: 4,
    chrome: 48,
    edge: 13,
    firefox: 40,
    ie: 9,
    ios: 7,
    safari: 5,
  },
});
