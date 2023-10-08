//'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),// creates express http server
  _ = require('lodash'),
  sync = require('async');
  moment = require('moment');


  function objKeySort (obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
  };

  function serialize (obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(p + "=" + obj[p]);
      }
    return str.join("&");
  }

var f1 = function () {
  console.log("-----------------------------");
  var params = {
    "merchantId": "ddd",
    "orderId": "123123",
    "type": 1,
    "orderAmt": 1.00,
    "name": "充值",
    "detail": "充值",
    "returnUrl": "",
    "notifyUrl": "",
    "device": "ios",
    "ip": "127.0.0.1",
    "time": '1231231',
  };
  // _.forIn(params, function(value, key){
  //   console.log("key:%j, value:%j", key, value);
  // });
  for (var key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }
  params = objKeySort(params);
  var res = serialize(params);

  console.log(res);

  // var a = [1,2];
  // var b = [3];
  // var c = a.concat(b);
  // console.log(c);


  // for (var i = 0; i < 5; i++) {
  //   setTimeout(function() {
  //     console.log(i);
  //   }, 1000 * i);
  // }
    // var a = {
    //     name: "gao",
    //     age: 12,
    //     score: {
    //         "yuwen": 21,
    //         "shuxue": 31
    //     }
    // };

    // console.log("a:%j", a);
  console.log("-----------------------------");
};  

getDate = function (flag) {
  if (!flag) {
    flag = '';
  }
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var mytimes = year + flag + month + flag + day;
  return mytimes;
};

f1();