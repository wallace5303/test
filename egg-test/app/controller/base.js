'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const moment = require('moment');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    const { lang } = ctx.request.header;
    this.lang = lang ? lang : 'zh';
  }

  /*
   * return success
   * @params: object data
   * @params: string msg
   * @return: object { success, code, msg, data }
   */
  sendSuccess(data, msg) {
    const { ctx } = this;
    ctx.body = {
      success: true,
      code: 0,
      msg,
      data,
    };
    ctx.status = 200;
  }

  /*
   * return fail
   * @params: object data
   * @params: string msg
   * @return: object { success, code, msg, data }
   */
  sendFail(data, msg, code) {
    const { ctx } = this;
    ctx.body = {
      success: false,
      code,
      msg,
      data,
    };
    ctx.status = 200;
  }
}

module.exports = BaseController;
