/**
 * Created by xiangyuguo on 16/12/11.
 */
'use strict';

const _ = require('lodash');
const path = require('path');
const chokidat = require('chokidar');
const fs = require('fs');
const cwd = process.cwd();

const CfgApi = function () {
  this.dir = '';
  this.configs = {};
};

CfgApi.prototype.init = function (dir) {
    // this.dir = path.join(baseDir, '../common/config/');
    this.dir = dir;
    let files = _getAllFiles(this.dir, ".json");
    this.filePaths = [];
    this.filePaths = _.concat(this.filePaths, files);
    this.loadAll();

    let watcher = chokidat.watch(this.dir, {
        ignored: /[\/\\]\./,
        ignoreInitial: true,
    });

    if (!watcher) {
        return;
    }
    let self = this;
    watcher.on('all', function (event, filename) {
        if (event !== 'change' && event !== 'add') {
            return;
        }
        if (!_.isString(filename) || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
            return;
        }
        if(path.extname(filename) !== ".json") {
            return;
        }
        process.nextTick(function () {
            self.loadJson(filename);
        });
    });
};

/**
 * 读取json文件并解析存储
 * @param fileName
 */
CfgApi.prototype.loadJson = function(fileName) {
    let baseName = path.basename(fileName, ".json");
    try {
        this.configs[baseName] = JSON.parse(fs.readFileSync(fileName).toString());
    } catch (e) {
        console.log("==> filename", fileName);
        console.log("==> parse configfile error: ", e);
    }
};

/**
 * 获取配置内容
 * @param cfgName
 * @return {*}
 */
CfgApi.prototype.get = function (cfgName) {
    if(this.configs[cfgName]) {
        return this.configs[cfgName];
    }
    let filename = path.join(this.dir, cfgName + ".json");
    this.loadJson(filename);
    return this.configs[cfgName];
};

CfgApi.prototype.all = function (cfgName) {
  let cfgData = require(path.join(this.dir, cfgName));
  return cfgData.data || cfgData;
};

CfgApi.prototype.loadAll = function () {
    for (let i = 0; i < this.filePaths.length; i++) {
        this.loadJson(this.filePaths[i]);
    }
};

const _getAllFiles = function (root, suffix) {
    let res = [];
    let files = fs.readdirSync(root);
    files.forEach(function (file) {
        let pathname = path.join(root, file);
        let stat = fs.lstatSync(pathname);

        if (stat.isDirectory()) {
            res = res.concat(_getAllFiles(pathname, suffix));
        } else if (path.extname(pathname) === suffix) {
            res.push(pathname.replace(cwd, '.'));
        }
    });
    return res
};

module.exports = {
  id: 'cfgApi',
  func: CfgApi,
  lazy: true
};