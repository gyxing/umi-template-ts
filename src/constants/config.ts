export default {
  name: '项目名称',
  // 后端接口地址
  host: 'http://localhost:8100',
  // 接口前缀
  hostApi: '/api',
  // 页面访问地址前缀
  prefix: process.env.NODE_ENV === 'production' ? '/pc' : '',
  // 初始token，一般用于登录
  auth: {
    tokenType: 'Basic',
    accessToken: 'dGVzdDp0ZXN0',
  },
  // request.js配置
  request: {
    // 请求数据返回格式，default是{code, data, msg}； simple是直接返回data，异常情况在catch中捕获
    dataMode: 'default',
    // 接口返回异常是否需要显示message提示窗
    skipErrorMessage: true,
  },
  // 项目自定义iconfont图标地址
  iconfont: 'https://at.alicdn.com/t/font_1562313_8xsxxcvi7q7.js',
};
