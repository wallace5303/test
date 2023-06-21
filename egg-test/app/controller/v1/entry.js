'use strict';

const BaseController = require('../base');
const _ = require('lodash');
const msgConfig = require('../../config/msgConfig');

class LoginController extends BaseController {
  /*
   * 注册
   */
  async register() {
    const self = this;
    const { app, ctx, service } = this;

    let {
      type,
      email,
      password,
      phone,
      country,
      code,
      agent_uid,
    } = ctx.request.body;
    agent_uid = Number(agent_uid);
    const data = {
      // uid,
      // access_token,
    };
    self.sendSuccess(data, msgConfig.REGISTER_SUCCESS[this.lang]);
  }

  /*
   * 登录 todo
   */
  async login() {
    const self = this;
    const { app, ctx, service } = this;
    let { type, country, phone, code, email, password } = ctx.request.body;
    country = country ? country : '86';

    if (_.isEmpty(type)) {
      self.sendFail(
        {},
        msgConfig.SYS_PARAMS_ERROR[this.lang],
        CODE.SYS_PARAMS_ERROR
      );
      return;
    }

    const data = {};
    self.sendSuccess(data, msgConfig.LOGIN_SUCCESS[this.lang]);
  }
}

module.exports = LoginController;
