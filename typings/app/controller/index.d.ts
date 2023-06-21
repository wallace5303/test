// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/controller/base');
import ExportTest = require('../../../app/controller/test');
import ExportV1Home = require('../../../app/controller/v1/home');

declare module 'egg' {
  interface IController {
    base: ExportBase;
    test: ExportTest;
    v1: {
      home: ExportV1Home;
    }
  }
}
