'use strict';

const BaseService = require('./base');
const RedisKey = require('../const/redisKey');
const utils = require('../utils/utils');
const moment = require('moment');

class RedisService extends BaseService {}

module.exports = RedisService;
