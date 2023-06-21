'use strict';

/*
 *Egg插件
 */

// mysql插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// redis插件
exports.redis = {
  enable: true,
  package: 'egg-redis',
};

// exports.xcRedis = {
//   enable: true,
//   package: 'egg-xc-redis',
// };

// jwt登录状态验证插件
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

// 跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// 校验插件,基于parameter
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
