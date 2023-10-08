//'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),// creates express http server
  
  _ = require('lodash');

  const async = require('async');
  var cardCfg = require("./config/cardConfig.json");  
  const rewardConfig = require("./config/rewardConfig.json");  
var player = {
    name:"ga",
    age: 12,
    test: null
  };


var f1 = function () {
  console.log("-----------------------------");

  var obj = {
      a: 1,
      b: 2
  };
  console.log(_.keys(obj));
//   var tmpBountyScore = 900;
//   console.log(Math.ceil(tmpBountyScore * _.random(0.5, 0.9)));

//   var rankRules = rewardConfig['rank_rule'];
//   var scores = [2450, -53, 53, -800];
//   var score = scores[0];
//   var round = 5;
//   var rankRule = rankRules[round]['list'];
//   var rankRuleLimit = rankRules[round]['limit'];
//   var rankType = 'rank_' + 120;
//   var rank = 0;
//   var rankRuleIndex = 0;
//   var ruleInfo = {};
//   for (var i = 0; i < rankRule.length; i++) {
//        ruleInfo = rankRule[i];
//     if (ruleInfo.score.min === null && ruleInfo.score.max > score) {
//         rankRuleIndex = i;
//         break;
//     } else if (ruleInfo.score.min <= score && ruleInfo.score.max === null) {
//         rankRuleIndex = i;
//         break;
//     } else if (ruleInfo.score.min !== null && ruleInfo.score.max !== null 
//         && ruleInfo.score.min <= score && ruleInfo.score.max > score) {
//         rankRuleIndex = i;
//         break;
//     }
//   }
// //   console.log('rankRuleIndex:%j', rankRuleIndex);
// //   return;
  
//     // 是否达到晋级限制
//     var isPromote = false;
//     if (score < rankRuleLimit.out) {
//         isPromote = false;
//     } else if (score >= rankRuleLimit.out && score < rankRuleLimit.promote) {
//         var isProbabilityPromote = Math.ceil(Math.random() * 100) <= rankRuleLimit.probability ? true : false;
//         isPromote = isGreaterPromoteScore ? true : false;
//     } else if (score >= rankRuleLimit.promote) {
//         isPromote = true;
//     }

//     console.log('isGreaterPromoteScore:%j, isProbabilityPromote:%j', isGreaterPromoteScore, isProbabilityPromote);
//     var promoteFlag = isPromote ? 'promote' : 'out';
//     console.log('ruleInfo:%j, promoteFlag:%j', ruleInfo, promoteFlag);

//     var randMin = ruleInfo[rankType][promoteFlag].min;
//     var randMax = ruleInfo[rankType][promoteFlag].max;
//     console.log('randMin:%j, randMax:%j', randMin, randMax);
//     rank = Math.floor(Math.random()*(randMax-randMin+1)+randMin);

//   console.log("rankType:%j, promoteFlag:%j, rank:%j", rankType, promoteFlag, rank);
//   return;

//   async.waterfall([
//     // 获取房间ID
//     function (cb) {
//         console.log("1");
//         cb(null, 1001);
//     },
//     function (roomId, cb) {
//         console.log("2");
//         cb(null);
//     },
//     function (cb) {
//         console.log("3");
//         cb(null, 1003);
//     },
//     function (dd, cb) {
//         console.log("4");
//         cb(null, 1003);
//     }
//     ],
//     function (err, data) {
//         if (err) {
//             console.log("5");
//         }
//         console.log(data);
//         console.log("6");
//     });

//   var special = {};
//   special.mj_count = 34;
//   var RemainMap = [];
//   for (var i = 0; i < 34; i++) {
//     RemainMap[i] = 4;
//   }

  //console.log(cardCfg);return;

  //console.log(pai);
  // var data = {};
  // var a = {"name":"gao", "age":12};
  // var b = {"score":2};
  // var c = Object.assign(a, b);

  // data.c = c;
  
  // console.log(data);
  console.log("-----------------------------");
};  





f1();