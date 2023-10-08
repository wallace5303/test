/**
 * Created by xiangyuguo on 17/5/27.
 */
'use strict';

var _ = require('lodash');
var fs = require('fs');
var crypto = require('crypto');

var START_KEY = '___';
var END_KEY = '___';

var ConfigEncipher = function () {

};

/**
 * 加密
 * @param data
 * @returns {*}
 */
ConfigEncipher.prototype.encode = function (data) {
  var typeBit = null;
  switch (typeof data) {
    case 'string':
      typeBit = '0';
      break;

    case 'number':
      typeBit = '1';
      data = data.toString();
      break;

    case 'boolean':
      typeBit = '2';
      data = data.toString();
      break;

    default:
      throw new Error('encode data error');
  }

  var cipher = crypto.createCipher('aes-256-cbc', 'aes-256-cfb');
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return typeBit + crypted;
};

/**
 * 解密
 * @param encodeData
 * @returns {*}
 */
ConfigEncipher.prototype.decode = function (encodeData) {
  var typeBit = encodeData[0];
  encodeData = encodeData.substr(1);

  var decipher = crypto.createDecipher('aes-256-cbc', 'aes-256-cfb');
  var dec = decipher.update(encodeData, 'hex', 'utf8');
  dec += decipher.final('utf8');

  switch (typeBit) {
    case '0':
      return dec;

    case '1':
      return Number(dec);

    case '2':
      return Boolean(dec);

    default:
      throw new Error('Decode data error.');
  }
};

/**
 * 加密对象(对象不能循环引用)
 * @param obj
 * @returns {*}
 */
ConfigEncipher.prototype.encodeObject = function (obj) {
  if (_.isArray(obj)) {
    for (var i = 0; i < obj.length; ++i) {
      if (_.isObject(obj[i])) {
        obj[i] = this.encodeObject(obj[i]);
      } else {
        obj[i] = this.encode(obj[i]);
      }
    }
  } else if (_.isObject(obj)) {
    for (var key in obj) {
      if (_.isObject(obj[key])) {
        this.encodeObject(obj[key]);
        continue;
      }

      if (_.startsWith(key, START_KEY) && _.endsWith(key, END_KEY)) {
        continue;
      }

      var newKey = START_KEY + key + END_KEY;
      obj[newKey] = this.encode(obj[key]);

      delete obj[key];
    }
  } else {
    return this.encode(obj);
  }

  return obj;
};

/**
 * 解密对象
 * @param obj
 */
ConfigEncipher.prototype.decodeObject = function (obj) {
  if (_.isArray(obj)) {
    for (var i = 0; i < obj.length; ++i) {
      if (_.isObject(obj[i])) {
        obj[i] = this.decodeObject(obj[i]);
      } else {
        obj[i] = this.decode(obj[i]);
      }
    }
  } else if (_.isObject(obj)) {
    for (var key in obj) {
      if (_.isObject(obj[key])) {
        this.decodeObject(obj[key]);
        continue;
      }

      if (!_.startsWith(key, START_KEY) || !_.endsWith(key, END_KEY)) {
        continue;
      }

      var realKey = _.chain(key).trimStart(START_KEY).trimEnd(END_KEY).value();
      obj[realKey] = this.decode(obj[key]);

      delete obj[key];
    }
  } else {
    return this.decode(obj);
  }

  return obj;
};

/**
 * 转换配置
 * @param filePath
 * @param outputPath
 */
ConfigEncipher.prototype.encodeJsonFile = function (filePath, outputPath) {
  var encodeCfg = this.encodeObject(require(filePath));

  outputPath = outputPath || filePath;
  fs.writeFileSync(outputPath, JSON.stringify(encodeCfg));
};

/**
 * 加载配置
 * @param configPath
 */
ConfigEncipher.prototype.loadConfig = function (configPath) {
  return this.decodeObject(require(configPath));
};

module.exports = {
  id: 'configEncipher',
  func: ConfigEncipher,
  lazy: true
};