'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.v1.home.index);

  // 登录页数据
  router.get('/api/v1/stat', controller.v1.home.stat);
  router.post('/api/v1/error_report', controller.v1.home.errorReport);
  router.get('/api/v1/sys_info', controller.v1.home.sysInfo);

  // 缓存数据清理
  // router.get('/api/clean_cache', controller.home.cleanCache);

  // 引入其他路由
  require('./initialize')(app);
  require('./user')(app);
  require('./test')(app);
  require('./sms')(app);
};
