'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const ObjectID = require('mongodb').ObjectID;

const _ = require('lodash');
const calc = require('calcjs');
const crypto = require('crypto');
const moment = require('moment');

const ngWord = require('./ng_word');

const web = require('proteus-web');
const putil = web.util;

let master, constant, config, error;
let isHealth = true;
let setupFinished = false;
let statProtocol;

exports.gUuid = () => {
	return new ObjectID().toString();
}

exports.setup = (context) => {
  context.on('setup.constant.ready', () => {
    constant = context.get('constant');
    config = context.get('config');
    statProtocol = url.parse(config.stat.url).protocol;
  });

  let commonSettingSetupFinished = false;
  let commonSystemSettingSetupFinished = false;

  context.on('setup.common_setting.master.ready', () => {
    commonSettingSetupFinished = true;
    if (commonSystemSettingSetupFinished)
      master = context.get('master');
  });
  context.on('setup.common_system_setting.master.ready', () => {
    commonSystemSettingSetupFinished = true;
    if (commonSettingSetupFinished)
      master = context.get('master');
  });

  context.on('setup.ready', () => {
    error = require('../error');
    setupFinished = true;
  });
};

/**
 * get api method name for proteus-web
 * ex.) jsname='user' method='get' => 'userGet'
 * @param {String} jsname
 * @param {String} method
 */
exports.getApiName = (jsname, method) => {
  return jsname + method.charAt(0).toUpperCase() + method.slice(1);
};

/**
 * get common setting from master or constant
 * common_settingとconstantのキー名を合わせとくと良い感じに取得できます
 * @param {String} key
 * @param {*} defaultValue
 */
exports.getSetting = (key, defaultValue) => {
  let value = putil.find(master.common_setting, key);
  if (value !== undefined && value !== null) {
    return value;
  }
  value = putil.find(master.common_system_setting, key);
  if (value !== undefined && value !== null) {
    return value;
  }
  value = putil.find(constant, key);
  if (value !== undefined && value !== null) {
    return value;
  }

  if (defaultValue !== undefined)
    return defaultValue;

  throw error('setting.not_found');
};

/**
 * JSTの拡張ISO8601に変換
 * @param {number} time unixtime
 */
exports.toLocalISO8601 = (time) => {
  time = time || Date.now();
  const jstDate = new Date(time + 9 * 60 * 60 * 1000);
  return jstDate.toISOString().replace('Z', '+09:00');
};

/**
 * 文字列を暗号化する
 * @param {string} str
 * @param {string} encKey
 */
exports.encrypt = (str, encKey) => {
  const cipher = crypto.createCipher('aes-256-cbc', encKey);
  cipher.update(str, 'utf8', 'hex');
  return cipher.final('hex');
};

/**
 * 文字列をハッシュ化する
 * @param {string} str
 * @param {string} algorithm
 * @param {string} encode
 */
exports.createHash = (str, algorithm, encode) => {
  return this.createHashWithSalt(str, '', algorithm, encode);
};

/**
 * 文字列をsaltつきでハッシュ化する
 * @param {string} str
 * @param {string} salt
 * @param {string} algorithm
 * @param {string} encode
 */
exports.createHashWithSalt = (str, salt, algorithm, encode) => {
  const hash = crypto.createHash(algorithm || 'sha256');
  hash.update(salt + str);
  return hash.digest(encode || 'hex');
};

/**
 * 配列中の重複がある場合true, なければfalseを返す
 * @param {Array} array
 */
exports.hasDuplicates = (array) => {
  const set = new Set();
  return _.some(array, (elem) => {
    if (set.has(elem)) {
      return true;
    }
    set.add(elem);
  });
};

/**
 * 配列の報酬をオブジェクトに整形する
 * @param {Object[]} rewards - 報酬リスト
 * @returns {Object} クライアント用の reward 形式
 */
exports.formatRewards = (rewards) => {
  const result = {};
  rewards = rewards || [];
  if (!_.isArray(rewards))
    rewards = [rewards];
  const linearize = (rewards) => {
    for (let i = 0, len = rewards.length; i < len; i++) {
      const r = rewards[i];

      if (r.set_id && r.rewards && r.chosen)
        return linearize(r.rewards);

      const o = {};

      const rewardCategory = r.category || constant.rewardCategory.normal;
      result[rewardCategory] = result[rewardCategory] || {};
      const category = result[rewardCategory];
      category[r.reward_type] = category[r.reward_type] || [];

      for (let k in r) {
        if (k !== 'reward_type' && k !== 'chosen' && k !== 'category')
          o[k] = r[k];
      }
      category[r.reward_type].push(o);
    }
  };
  linearize(rewards);
  return result;
};

/**
 * 配列の消費一覧をオブジェクトに整形する
 * @param {Object[]} consumptions - 消費リスト
 * @returns {Object} クライアント用の consumption 形式
 */
exports.formatConsumptions = (consumptions) => {
  const result = {};
  consumptions = consumptions || [];
  if (!_.isArray(consumptions))
    consumptions = [consumptions];
  for (let i = 0, len = consumptions.length; i < len; i++) {
    const c = consumptions[i];
    result[c.consumption_type] = result[c.consumption_type] || [];
    const o = {};
    for (let k in c) {
      if (k !== 'consumption_type')
        o[k] = c[k];
    }
    result[c.consumption_type].push(o);
  }
  return result;
};

/**
 * 配列の条件一覧をオブジェクトに整形する
 * @param {Object[]} conditions - 消費リスト
 * @returns {Object} クライアント用の condition 形式
 */
exports.formatConditions = (conditions) => {
  const result = {};
  conditions = conditions || [];
  if (!_.isArray(conditions))
    conditions = [conditions];
  for (let i = 0, len = conditions.length; i < len; i++) {
    const c = conditions[i];
    result[c.condition_type] = result[c.condition_type] || [];
    const o = {};
    for (let k in c) {
      if (k !== 'condition_type')
        o[k] = c[k];
    }
    result[c.condition_type].push(o);
  }
  return result;
};

/**
 * メロ日付書式（YYYY.MM.DD HH:mm）に整形します
 * @param {number} time - 時間
 * @param {string} [format] - フォーマット
 */
exports.formatDate = (time, format) => {
  return moment(time).format(format || 'YYYY.MM.DD HH:mm');
};

/**
 * オブジェクトから配列に変換します
 * @param {string} key - キー
 * @param {Object} values - 値
 * @returns {Array}
 */
exports.assignKey = (key, values) => {
  return _.map(values, (value, id) => {
    const obj = {};
    obj[key] = id;
    return _.assign(obj, value);
  });
};

/**
 * 数値配列の平均値を整数で取得
 * @param {number[]} array
 */
exports.average = (array) => {
  return Math.round(calc.div(_.sum(array), array.length));
};

/**
 * conditionから期間終了チェックを行う
 * @param {object[]} conditions
 * @param {number} now
 */
exports.isAlreadyPast = (conditions, now) => {
  now = Date.now();
  conditions = conditions || [];
  if (!_.isArray(conditions))
    conditions = [ conditions ];

  for (let i = 0; i < conditions.length; i++) {
    const c = conditions[0];
    if (c.condition_type === 'time' && c.type === 'now') {
      if (!exports.checkTermEnd(c, now))
        return true;
    }
  }
  return false;
};

/**
 * 期間終了チェックを行う
 * @param {number} term.start
 * @param {number} term.end
 * @param {number} now
 */
exports.checkTermEnd = (term, now) => {
  if (!term)
    return true;
  now = now || Date.now();
  const end = term.end;
  return !end || end >= now;
};

/**
 * 期間チェックを行う
 * @param {number} term.start
 * @param {number} term.end
 * @param {number} now
 */
exports.checkInTerm = (term, now) => {
  if (!term)
    return true;
  now = now || Date.now();
  const start = term.start;
  const end = term.end;

  if (start && now < start)
    return false;

  if (end && now > end)
    return false;

  return true;
};

/**
 * 期間チェックを行う
 * @param {number} term.start
 * @param {number} term.close
 * @param {number} now
 */
exports.checkInCloseTerm = (term, now) => {
  return exports.checkInTerm({
    term: {
      start: _.get(term, 'start'),
      end: _.get(term, 'close'),
    },
    now
  });
};

/**
 * セットアップが完了しているかチェックを行う
 * @returns {boolean}
 */
exports.isSetupReady = () => {
  return setupFinished;
};

/**
 * health check用の生存チェック
 * isHealth: 通常はtrue。LBから切り離したい時など、monitor経由でON/OFFを行う。
 * setupFinished: セットアップが完了したらtrue。
 * @returns {boolean}
 */
exports.isAlive = () => {
  return isHealth && setupFinished;
};

/**
 * isHealthフラグを設定する
 * @param health
 */
exports.setHealth = (health) => {
  isHealth = health;
};

/**
 * 画像パスをHash化する
 * @param {string} imagePath
 */
exports.genHashPath = (imagePath) => {
  if (!imagePath)
    return;
  /*
  if (_.includes(imagePath, 'banner/')) {
    const imagePathArray = imagePath.split('/');
    const fileName = imagePathArray[imagePathArray.length - 1];
    const hashName = this.createHashWithSalt(fileName, constant.banner_salt, 'sha1');
    imagePath = imagePath.replace(fileName, hashName);
  }
  */
  return imagePath;
};


/**
 * statの画像URLを組み立てる
 * @param {string} imagePath
 * @param {boolean} useDummyQuery
 */
exports.genImagePath = (imagePath, useDummyQuery) => {
  if (!imagePath)
    return;
  if (_.startsWith(imagePath, statProtocol))
    return imagePath;
  imagePath = exports.genHashPath(imagePath);

  if (useDummyQuery) {
    if (config.master.tag) {
      return `${config.stat.url}${path.join('/', imagePath)}?dummy=${config.master.tag}`;
    } else {
      // for dev,stg
      // 現在時刻（10分単位で）をつける
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const min = Math.floor(date.getMinutes() / 10) * 10;
      return `${config.stat.url}${path.join('/', imagePath)}?dummy=${year}${month}${day}${hour}${min}`;
    }
  } else {
    return `${config.stat.url}${path.join('/', imagePath)}`;
  }
};

/**
 * master_versionをconfig.master.tagに設定する
 * @param {object} config
 */
exports.setMasterTag = (config) => {
  if (config && config.master && config.master.tag_enabled) {
    try {
      const tagVersion = _.trim(fs.readFileSync(path.resolve(__dirname, '../../master_version'), 'utf8'));
      if (tagVersion) // タグ名のルール決めてバリデーション入れたほうが良さ気
        _.set(config, 'master.tag', tagVersion);
    } catch (e) {
      return; // ファイルがない場合は無視
    }
  }
};

exports.isNgWord = ngWord.isNgWord;

/**
 * user_quartzがconsumptionに対して十分かチェックします
 * @param {object} userQartz
 * @param {object} consumption
 */
exports.isSufficientQuartz = (userQuartz, consumption) => {
  if (_.isEmpty(consumption))
    return true;

  if (consumption.consumption_type === 'paid_quartz') {
    return (userQuartz.paidBalance + userQuartz.additionalBalance) >= consumption.quantity;
  } else {
    return (userQuartz.paidBalance + userQuartz.additionalBalance + userQuartz.earnedBalance) >= consumption.quantity;
  }
};

/**
 * pre環境でstrに_invite_が入ってたらtrue
 * @param {string} str
 */
exports.ignoreInvite = (str) => {
  if (config.mode !== 'pre')
    return false;
  return /^.*invite.*$/.test(str);
};

/**
 * 改行コードを<br>に変換します
 * @param {string} str
 */
exports.nl2br = (str) => {
  if (!str)
    return;
  return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
};

/**
 * baseから半日離れているかどうか
 * @param {number} base - 基準日時(unixtime)
 * @param {number} [now] - 現在日時(unixtime)
 */
exports.isHalfDayOver = (base, now) => {
  now = now || Date.now();
  const baseDateKey = putil.date.getDateKey(base);
  const nowDateKey = putil.date.getDateKey(now);
  // 基準日時と現在日時の日付が異なるとtrue
  if (baseDateKey !== nowDateKey)
    return true;

  const baseHour = exports.getGameHour(base);
  const nowHour = exports.getGameHour(now);
  // 日付が一致する場合
  // アプリ換算時間でお互いの午前午後が一致しないときにtrue
  return (nowHour < 12 && baseHour >= 12) || (nowHour >= 12 && baseHour < 12);
};

/**
 * config.date.start_hour_of_dayを基準とした時間を返す
 * @param {number} time - unixtime
 */
exports.getGameHour = (time) => {
  const diff = (24 - config.date.start_hour_of_day) * 3600000;
  const date = new Date(time + diff);
  // 現在日時からstart_hour_of_day分ずらした時を取得
  return date.getUTCHours();
};

/**
 * 次の週の開始日時を返す(ゲーム内時間)
 * @param {number} [base] - 基準時間(unixtime)
 */
exports.getNextWeekDate = (base) => {
  // UTCで次の日曜のstart_hour_of_day時
  base = base || Date.now();
  const nowDateInfo = putil.date.getDateInfo(base);
  return new Date(Date.UTC(
    nowDateInfo.year,
    nowDateInfo.month,
    nowDateInfo.date + (nowDateInfo.day === 0 ? 0 : 7 - nowDateInfo.day),
    config.date.start_hour_of_day
  ));
};

/**
 * 次の月の開始日時を返す(ゲーム内時間で月末切り替え)
 * @param {number} [base] - 基準時間(unixtime)
 */
exports.getNextMonthDate = (base) => {
  // UTCで今月末のstart_hour_of_day時
  base = base || Date.now();
  const nowDateInfo = putil.date.getDateInfo(base);
  const nextDate = new Date(Date.UTC(
    nowDateInfo.year,
    nowDateInfo.month + 1,
    -1,
    config.date.start_hour_of_day
  ));
  const baseDateKey = putil.date.getDateKey(base);
  const nextDateKey = putil.date.getDateKey(nextDate.getTime());
  if (baseDateKey < nextDateKey) {
    return nextDate;
  }

  // 月末だった場合は次の月の月末を取得
  // ex) 12月だった場合30,31日は1月31日をとる
  return new Date(Date.UTC(
    nowDateInfo.year,
    nowDateInfo.month + 2,
    -1,
    config.date.start_hour_of_day
  ));
};

/**
 * baseと比較して日を跨いだかを返す(実時間)
 * @param {number} base - 基準時間(unixtime)
 * @param {number} [target] - 比較時間(unixtime)
 */
exports.isDateChanged = (base, target) => {
  base = new Date(base);
  // ローカル時間に変換します
  base = base.getTime() - (base.getTimezoneOffset() * 60000);
  target = target || Date.now();
  target = new Date(target);
  target = target.getTime() - (target.getTimezoneOffset() * 60000);
  const oneDayTime = 24 * 60 * 60 * 1000;
  const targetTotalDay = Math.floor(target / oneDayTime);
  const baseTotalDay = Math.floor(base / oneDayTime);
  return targetTotalDay > baseTotalDay;
};

/**
 * baseと比較して月を跨いだかを返す(ゲーム内時間)
 * @param {number} base - 基準時間(unixtime)
 * @param {number} [target] - 比較時間(unixtime)
 */
exports.isMonthChanged = (base, target) => {
  target = target || Date.now();
  if (!base)
    return true;

  return exports.getNextMonthDate(base).getTime() !== exports.getNextMonthDate(target).getTime();
};

/**
 * baseと比較して週を跨いだかを返す(ゲーム内時間)
 * @param {number} base - 基準時間(unixtime)
 * @param {number} [target] - 比較時間(unixtime)
 */
exports.isWeekChanged = (base, target) => {
  target = target || Date.now();
  if (!base)
    return true;

  const nextWeekDateFromTarget = exports.getNextWeekDate(target);
  const nextWeekDateFromBase = exports.getNextWeekDate(base);

  return nextWeekDateFromTarget.getTime() !== nextWeekDateFromBase.getTime();
};

/**
 * 日付変更時間を返します
 * @param {number} [base] - 基準時間(unixtime)
 */
exports.getDateChangeTime = (base) => {
  base = base || Date.now();
  const nowDateInfo = putil.date.getDateInfo(base);
  const changeTime = new Date(Date.UTC(
    nowDateInfo.year,
    nowDateInfo.month,
    nowDateInfo.date - 1,
    config.date.start_hour_of_day
  ));
  return changeTime.getTime();
};
