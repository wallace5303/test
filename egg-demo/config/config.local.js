'use strict';
// 本地环境-配置文件

exports.mysql = {
  clients: {
    default: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
    },
  },
  // 所有数据库配置的默认值
  default: {},
  app: true,
  agent: false,
};

exports.redis = {
  clients: {
    default: {
      // instanceName. See below
      port: 6379, // Redis port
      host: '', // Redis host
      password: '',
      db: 0,
    },
  },
};
