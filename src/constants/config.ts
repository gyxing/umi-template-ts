export default {
  name: '项目名称',
  host: 'https://www.test.com',
  hostApi: '/api',
  prefix: process.env.NODE_ENV === 'production' ? '/pc' : '',
  // 初始token，一般用于登录
  auth: {
    tokenType: 'Basic',
    accessToken: 'dGVzdDp0ZXN0',
  },
  // request.js配置
  request: {
    dataMode: 'default',
    skipErrorMessage: true,
  },
  // 项目自定义iconfont图标地址
  iconfont: 'https://at.alicdn.com/t/font_1562313_8xsxxcvi7q7.js',
};
