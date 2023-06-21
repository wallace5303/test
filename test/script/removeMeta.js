'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let fileDir = "D:/www/xing/test-project/egg-test/test/script/Emb";

let num = 1;
let res = getAllFiles(fileDir, '.meta');
//console.log(res);
//console.log(res.length);


/*
 * 获取目录下指定后缀的所有文件
 * @param dir
 * @param ext
 * @return {Array}
 */
function getAllFiles (dir, ext) {
    if (!dir) {
      return [];
    }
  
    const self = this;
    let extFiles = [];
  
    const files = fs.readdirSync(dir);
    files.forEach(function(file) {
        
      const pathname = path.join(dir, file);
      //console.log(path.extname(pathname.replace(process.cwd(), '.')));return;
      const stat = fs.lstatSync(pathname);
  
      if (stat.isDirectory()) {
        extFiles = extFiles.concat(getAllFiles(pathname, ext));
      } else if (path.extname(pathname) === ext) {
        //extFiles.push(pathname);
        console.log(num + ': ' + pathname);
        fs.unlinkSync(pathname);
        num++;
      }
    });
  
    return extFiles;
};
