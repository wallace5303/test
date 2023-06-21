'use strict';
module.exports = {
  // 过期时间

  EXPIRES_TIME_2: 2,
  EXPIRES_TIME_30: 30,
  EXPIRES_TIME_60: 60,
  EXPIRES_TIME_120: 120,
  EXPIRES_TIME_300: 300,
  EXPIRES_TIME_600: 600,
  EXPIRES_TIME_1200: 1200,
  EXPIRES_TIME_1800: 1800,
  EXPIRES_TIME_3600: 3600,
  EXPIRES_TIME_7200: 7200,
  EXPIRES_TIME_86400: 86400,
  EXPIRES_TIME_604800: 604800,
  EXPIRES_TIME_2592000: 2592000,

  REDIS_LOCK: 'lock:', // {uid}
  REDIS_COMMON_LOCK: 'lock:common:', // {type}
  ACCESS_TOKEN: 'access_token:', // {uid}

  // user
  USER: 'user:', // {uid}
  
  // 当天是否登陆过
  USER_LOGIN_TODAY: 'user:login:today:', // {uid}

  // phone
  PHONE_SMS_CODE: 'phone:sms_code:', // {phone}
  PHONE_SEND_SMS_TIMES: 'phone:send_sms_times:', // {phone}
  PHONE_INPUT_CODE_ERROR_TIMES: 'phone:code_error_times:', // {phone}
  
};
