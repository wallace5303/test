//'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),// creates express http server
  
  _ = require('lodash');
  const async = require('async');
  const fs = require('fs');
  //var bearcat = require('bearcat');
  const outCardLogic = require('./outCardLogic');
  
var cardCfg = require("./config/cardConfig.json");  

var MaJiangDef = {
  MAX_NUM: 42,
  Zfb: 1,
  Feng: 2,
  Wan: 3,
  Tiao: 4,
  Bing: 5,
  Hua: 6
};

const Table = {
  "AITable": {},
  "AITableFeng": {},
  "AITableJian": {},
  "AITableDemo": {},
};
// const AITable = {};
// const AITableFeng = {};
// const AITableJian = {};

var f1 = function () {
  console.log("-----------------------------");
  //console.log(this.AITable);
  load();
  //console.log("table:%j", Table);return;

  var cards = [32, 37, 51, 51, 22, 24];
  var guiCard = [];
  //var r = outAI(cards, guiCard);
  var out = new outCardLogic();
  var r = out.outAI(cards, guiCard);

  console.log('r:', r);
  console.log("-----------------------------");
};

var load = function () {
  _load('/majiang_ai_normal.txt', "AITable");
  _load('/majiang_ai_feng.txt', "AITableFeng");
  _load('/majiang_ai_jian.txt', "AITableJian");
  _load('/majiang_ai_jian_demo.txt', 'AITableDemo');
};

var _load = function (fileName, flag) {
  //var keyDic = Table[flag];
  //console.log(Table[flag]);return;
  if (!fs.existsSync(__dirname + fileName)) {
    console.log(fileName, "文件不存在");
    return;
  }

  const fileDoc = fs.readFileSync(__dirname + fileName);
  const keyArray = String(fileDoc).split('\n');
  //console.log(keyArray);
  for (let i = 0; i < keyArray.length; i++) {
    var key = keyArray[i];
    if (key) {
      var childrenKeyArray = String(key).split(' ');
      if (childrenKeyArray.length == 3) {
        var decKey = childrenKeyArray[0].replace(/[\r]/g, "");
        var jiang = childrenKeyArray[1].replace(/[\r]/g, "");
        var p = childrenKeyArray[2].replace(/[\r]/g, "");
        var aiTableInfos = Table[flag][decKey] ? Table[flag][decKey] : [];
        var aiTableInfo = {
          jiang: jiang,
          p: p
        };
        aiTableInfos.push(aiTableInfo);
        Table[flag][childrenKeyArray[0]] = aiTableInfos;
      }
    }
  }
  //console.log(keyDic);return;
};

var outAI = function (originalCards, originalGuiCard) {
  var ret = 0;
  var originalRet = 0;
  var max = 0;
  var input = [];
  var guiCard = [];

  _.forEach(originalCards, function(e){  
    if (cardCfg[e]) {
      input.push(cardCfg[e].private_point2);
    }
  });
  _.forEach(originalGuiCard, function(e){  
    if (cardCfg[e]) {
      guiCard.push(cardCfg[e].private_point2);
    }
  });

  for (var i = 0; i < input.length; i++)
  {
    var c = input[i];
    var originalC = originalCards[i];
    // if (cache[c.toString()] == 0)
    // {
      if (!_.includes(guiCard, c))
      {
        var tmpInput = _.cloneDeep(input);
        tmpInput.splice(i, 1);
        console.log("tmpInput:%j, input:%j, guiCard:%j", tmpInput, input, guiCard);
        var score = calc(tmpInput, guiCard);
        //return;
        if (score > max)
        {
          max = score;
          ret = c;
          originalRet = originalC;
          console.log("max:%j, ret:%j, originalRet:%j", max, ret, originalRet);
        }
      }
    }
  //   cache[c] = 1;
  // }

  // 再转换原来的


  return originalRet;
};

var calc = function(input, guiCard)
{
  var cards = [];
  for (var i = 0; i < MaJiangDef.MAX_NUM; i++)
  {
    cards.push(0);
  }
  for (var n = 0; n < input.length; n++) {
    let tmpC = input[n];
    cards[tmpC- 1] += 1;
  }
  //console.log("cards:%j", cards);
  var guiNum = 0;
  for (var m = 0; m < guiCard.length; n++) {
    let tmpD = guiCard[n];
    guiNum += cards[tmpD - 1];
    cards[tmpD - 1] = 0;
  }

  // List<Integer> ting = HuUtil.isTingCard(cards, guiNum);
  // if (!ting.isEmpty())
  // {
  //   return ting.size() * 10;
  // }

  var wanKey = 0;
  var tongKey = 0;
  var tiaoKey = 0;
  var fengKey = 0;
  var jianKey = 0;

  for (let i = cardCfg[31].private_point2; i <= cardCfg[39].private_point2; i++)
  {
    var num = cards[i - 1];
    wanKey = wanKey * 10 + num;
  }
  for (let i = cardCfg[51].private_point2; i <= cardCfg[59].private_point2; i++)
  {
    var num = cards[i - 1];
    tongKey = tongKey * 10 + num;
  }
  for (let i = cardCfg[41].private_point2; i <= cardCfg[49].private_point2; i++)
  {
    var num = cards[i - 1];
    tiaoKey = tiaoKey * 10 + num;
  }
  for (let i = cardCfg[21].private_point2; i <= cardCfg[24].private_point2; i++)
  {
    var num = cards[i - 1];
    fengKey = fengKey * 10 + num;
  }
  for (let i = cardCfg[11].private_point2; i <= cardCfg[13].private_point2; i++)
  {
    var num = cards[i - 1];
    jianKey = jianKey * 10 + num;
  }
  console.log("wanKey:%j,tongKey:%j,tiaoKey:%j,fengKey:%j,jianKey:%j", wanKey, tongKey, tiaoKey, fengKey, jianKey);
  var tmp = [];

  var wanAITableInfo = Table['AITable'][wanKey.toString()];
  tmp.push(wanAITableInfo);

  var tongAITableInfo = Table['AITable'][tongKey.toString()];
  tmp.push(tongAITableInfo);

  var tiaoAITableInfo = Table['AITable'][tiaoKey.toString()];
  tmp.push(tiaoAITableInfo);

  var fengAITableInfo = Table['AITableFeng'][fengKey.toString()];
  tmp.push(fengAITableInfo);

  var jianAITableInfo = Table['AITableJian'][jianKey.toString()];
  tmp.push(jianAITableInfo);

  console.log("tmpInfo:%j", tmp);

  var ret = [];
  calcAITableInfo(ret, tmp, 0, false, 0);

  console.log("ret:%j", ret);

  var d = _.max(ret);
  console.log("d:%j", d);
  return d;
}

var calcAITableInfo = function(ret,  tmp,  index,  jiang, cur)
{
  if (index >= tmp.length)
  {
    if (jiang)
    {
      ret.push(cur);
    }
    return;
  }
  var aiTableInfos = tmp[index];

  for (var i = 0; i < aiTableInfos.length; i++) {
    var aiTableInfo = aiTableInfos[i];
    //console.log("index:%j, i:%j, aiTableInfo:%j", index, i, aiTableInfo);
    if (jiang)
    {
      if (!!Number(aiTableInfo.jiang) == false)
      {
        calcAITableInfo(ret, tmp, index + 1, jiang, Number(cur) + Number(aiTableInfo.p));
      }
    }
    else
    {
      calcAITableInfo(ret, tmp, index + 1, !!Number(aiTableInfo.jiang), Number(cur) + Number(aiTableInfo.p));
    }
  }
}

f1();