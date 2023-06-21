'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const readline = require('readline');

// let fileUrlTxt = "D:/www/bilibili/args-resource/melo-assetbundle-unity2017_4_37/Unity_Android/android.txt";
// let outDir = "D:/www/bilibili/args-resource/melo-assetbundle-unity2017_4_37/Unity_Android/out";

let fileUrlTxt = "D:/www/bilibili/args-resource/melo-assetbundle-unity2017_4_37/Unity_iOS/ios.txt";
let outDir = "D:/www/bilibili/args-resource/melo-assetbundle-unity2017_4_37/Unity_iOS/out";

fileUrlTxt = path.resolve(fileUrlTxt);
outDir = path.resolve(outDir);

//console.log(dir);return;
const outFilesArr = fs.readdirSync(outDir);

// mysql导出的资源文件列表
readFileToArr(fileUrlTxt, function (fileUrlArr) {


  console.log(fileUrlArr.length);

  fileUrlArr.forEach(function(one) {
    //console.log(file);
    if (!_.includes(outFilesArr, one)) {
      console.log('not exist file name: ', one);
    }
  });

});

function readFileToArr(fReadName, callback){
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
      input:fRead
  });
  var arr = new Array();
  objReadline.on('line',function (line) {
      arr.push(line);
      //console.log('line:'+ line);
  });
  objReadline.on('close',function () {
      //console.log(arr);
      callback(arr);
  });

  //return arr;
}
