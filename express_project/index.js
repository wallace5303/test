//'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),// creates express http server
  
  _ = require('lodash');
  const async = require('async');
  const rewardConfig = require("./config/rewardConfig.json");  

function isAllEqual(array){
    if(array.length>0){
       return !array.some(function(value,index){
         return value !== array[0];
       });   
    }else{
        return true;
    }
}

var player = {
    name:"ga",
    age: 12,
    test: null
  };


var f1 = function () {
  console.log("-----------------------------");




//   let info = {
//     a:1,
//     name: player.name,
//   };

//   info.name = "zh";
  //player.test();

//   console.log();return;
//   console.log(process);

//   let obj = [
//     {
//       a: 1,
//       b: 2
//     },
//     {
//       a: 10,
//       b: 20
//     },

// let tmp = obj.map((p) => p.a);
// console.log(obj, tmp);
// return;

//   var a = 0x8000;
//   console.log(a);
//   return;

  let leftCardsArr = [
    "42", "11", "12", "12", "12", "13", "13", "13", "23", "51", "47", "38", "47", "55", "41", "45", "49", "47", "23", "39",
    "51", "38", "21", "35", "31", "13", "59", "48", "57", "33", "47", "38", "47", "55", "41", "45", "49", "47", "23", "39",
    "44", "35", "12", "49", "58", "54", "56", "42", "13", "34", "22", "36", "56", "45", "33", "11", "22", "56", "55", "47",
    "44", "41", "12", "52", "45", "11", "59", "31", "39", "37", "54", "34", "35", "11", "43", "42", "48", "33", "21", "12",
    "33", "21", "12",
  ];
  let cardsArr = [
      ["31", "32", "33", "34", "35", "36", "37", "38", "41", "22", "11", "21", "22"],
      ["41", "42", "43", "44", "45", "46", "47", "48", "51", "52", "12", "21", "22", "59"],
      ["51", "52", "53", "54", "55", "56", "57", "58", "31", "32", "33", "42", "42"],
      ["51", "52", "53", "54", "55", "56", "57", "58", "31", "32", "41", "21", "11"]
  ];




  var settlementList = [
    {
        "winnerIndex": [2],
        "zhuangIndex": 1,
        "winTiles": [],
        "paoIndex": -1,
        "gangIndex": -1,
        "players": [
            {
                "total": -15,
                "shangJing": {
                    "score": 0,
                    "type": []
                },
                "xiaJing": {
                    "score": 0,
                    "type": []
                },
                "gang": 0,
                "chaoZhuang": 15,
                "hu": 5
            },
            {
                "total": 10,
                "shangJing": {
                    "score": 0,
                    "type": []
                },
                "xiaJing": {
                    "score": 0,
                    "type": []
                },
                "gang": 0,
                "chaoZhuang": -45,
                "hu": -15
            },
            {
                "total": 15,
                "shangJing": {
                    "score": 0,
                    "type": []
                },
                "xiaJing": {
                    "score": 0,
                    "type": []
                },
                "gang": 0,
                "chaoZhuang": 15,
                "hu": 5
            },
            {
                "total": -10,
                "shangJing": {
                    "score": 0,
                    "type": []
                },
                "xiaJing": {
                    "score": 0,
                    "type": []
                },
                "gang": 0,
                "chaoZhuang": 15,
                "hu": 5
            }
        ],
        "huType": [
            1
        ]
    },
    {
      "winnerIndex": [3],
      "zhuangIndex": 1,
      "winTiles": [],
      "paoIndex": -1,
      "gangIndex": -1,
      "players": [
          {
              "total": 15,
              "shangJing": {
                  "score": 0,
                  "type": []
              },
              "xiaJing": {
                  "score": 0,
                  "type": []
              },
              "gang": 0,
              "hu": 5
          },
          {
              "total": -15,
              "shangJing": {
                  "score": 0,
                  "type": []
              },
              "xiaJing": {
                  "score": 0,
                  "type": []
              },
              "gang": 0,
              "hu": -15
          },
          {
              "total": 25,
              "shangJing": {
                  "score": 0,
                  "type": []
              },
              "xiaJing": {
                  "score": 0,
                  "type": []
              },
              "gang": 0,
              "hu": 5
          },
          {
              "total": 5,
              "shangJing": {
                  "score": 0,
                  "type": []
              },
              "xiaJing": {
                  "score": 0,
                  "type": []
              },
              "gang": 0,
              "hu": 5
          }
      ],
      "huType": [
          1
      ]
    }
  ];


  let settlement = settlementList[0];
  let players = settlement.players;
  let scores = players.map((p) => p.total);
  let coins = [1200, 100, 100, 1000];
  let winScore = 0;
  let loseSore = 0;
  let flags = Array.from({length: players.length}).map(() => null);
  let finalScores = Array.from({length: players.length}).map(() => 0);

  players.map((p, index) => 
  console.log(p, index),
  );
  //return;
  
  scores = [1800, -100, -100, -1200];

  scores.map((score, index) => {
    
    if (coins[index] + score <= 0) {
      //flags[index] = 'poChan';
      finalScores[index] = -coins[index];
      
    } else if (score >= coins[index]) {
      //flags[index] = 'fengDing';
      finalScores[index] = coins[index];
    } else {
      finalScores[index] = score;
    }

    if (finalScores[index] > 0) {
      winScore += finalScores[index];
    } else {
      loseSore += finalScores[index];
    }
  });
  console.log(finalScores, flags, loseSore, winScore);
  // 以小的为基准
  if (-loseSore < winScore) {
    for (let i = 0; i < scores.length; i++) {
      if (finalScores[i] > 0) {
        finalScores[i] = Math.round(finalScores[i] / winScore * -loseSore);
      }
    }
  } else if (-loseSore > winScore) {
    for (let i = 0; i < scores.length; i++) {
        if (finalScores[i] < 0) {
          finalScores[i] = -Math.round(finalScores[i] / loseSore * winScore);
        }
    }
  } else {
    // 正常计算
  }

  for (let j = 0; j < finalScores.length; j++) {
    if (coins[j] + finalScores[j] <= 0) {
        flags[j] = 'poChan';
      } else if (finalScores[j] >= coins[j]) {
        flags[j] = 'fengDing';
      } else {
        flags[j] = '';
      }
  }

//   for (let j = 0; j < players.length; j++) {
//     players[j].total = finalScores[j];
//     players[j].ceilAndBrokeFlag = flags[j];
//   }


  console.log(finalScores, flags);
  return;
  //console.log(winScore, loseSore, winPlayerNum, losePlayerNum);
  return;

  var playersStat = [];
  for (let i = 0; i < 4; i++) {
    playersStat[i] = {
      winTimes: 0,
      loseTimes: 0,
      totalScore: 0
    };
  }
  console.log(playersStat);

  for (let j = 0; j < settlementList.length; j++) {
    let gameStat = settlementList[j];
    // console.log("gameStat:", gameStat);
    // console.log("gameStat.players:", gameStat.players);
    for (let m = 0; m < gameStat.players.length; m++) {
      
      if (_.includes(gameStat.winnerIndex, m)) {
        console.log("win:", m);
        playersStat[m].winTimes++;
      } else {
        console.log("lose:", m);
        playersStat[m].loseTimes++;
      }
      
      playersStat[m].totalScore += gameStat.players[m].total;
      console.log("playersStat:", playersStat);
    }
  }

  console.log(playersStat);

    // async.waterfall(
  //   [
  //     function (cb) {
  //       console.log("a");
  //       cb(null)
  //     },
  //     function (cb) {
  //       console.log("b");
  //       cb(null)
  //     },
  //     function (cb) {
  //       console.log("c");
  //       cb(null)
  //     },
  //   ], function (err) {
  //     console.log("d");
  //   }
  // );

  // console.log("end");
  // return;
  //let a = _.countBy([6.1, 4.2, 6.3], Math.floor);
  // let wall = {
  //   cards: [
  //       '51',
  //       '53',
  //       '54',
  //       '55',
  //       '56',
  //       '57',
  //       '58',
  //       '42',
  //       '39',
  //       '39',
  //       '32'
  //   ],
  //   peng: [
  //       [
  //           32,
  //           32,
  //           32
  //       ]
  //   ]
  // };
  // let res = false;
  // for (var i = 0; i < wall.peng.length; ++i) {
  //   var tile = _.first(wall.peng[i]);
  //   console.log(tile);
  //   if (_.includes(wall.cards, tile.toString())) {
  //     res = true;
  //   }
  // }

  // console.log("b");return
  // let b = [1,2,3, 3];
  // if (_.includes(b, 1) && _.includes(b, 3)) {
  //   _.remove(b, function(ele){
  //     return ele == 3;
  //   });
  //   console.log("a");
  // }
  // console.log("b",b);return
  // let a = ["a", "b", "c"];
  // a.splice(1, 1);

  // console.log(a, a[0], a[1]);
  // return;


  // var room = {
  //   id: 123,
  //   game: {
  //     end: false,
  //     players: [
  //       {
  //         info: [],
  //         playCards: [11]
  //       },
  //       {
  //         info: [],
  //         playCards: [11]
  //       },
  //       {
  //         info: [],
  //         playCards: [11]
  //       },
  //       {
  //         info: [],
  //         playCards: [11]
  //       }
  //     ]
  //   }
  // };

  // let firstCards = [];
  // let players = room.game.players;
  // for (let i = 0; i < players.length; i++) {
  //   firstCards.push(players[i].playCards[0]);
  // }

  // var arr = [];
  // console.log(isAllEqual(firstCards));
  // return;






//   var arr1 = [
//     [1,2,3],
//     [1,2,3]
//   ];
//   var a = arr1[0];

//   a.push(4);
//   console.log(arr1);
// return;

  // let leftCardsArr = [
  //   "42", "11", "12", "12", "12", "13", "13", "13", "23", "51", "47", "38", "47", "55", "41", "45", "49", "47", "23", "39",
  //   "51", "38", "21", "35", "31", "13", "59", "48", "57", "33", "47", "38", "47", "55", "41", "45", "49", "47", "23", "39",
  //   "44", "35", "12", "49", "58", "54", "56", "42", "13", "34", "22", "36", "56", "45", "33", "11", "22", "56", "55", "47",
  //   "44", "41", "12", "52", "45", "11", "59", "31", "39", "37", "54", "34", "35", "11", "43", "42", "48", "33", "21", "12",
  //   "33", "21", "12",
  // ];
  // let cardsArr = [
  //     ["31", "32", "33", "34", "35", "36", "37", "38", "41", "22", "11", "21", "22"],
  //     ["41", "42", "43", "44", "45", "46", "47", "48", "51", "52", "12", "21", "22", "59"],
  //     ["51", "52", "53", "54", "55", "56", "57", "58", "31", "32", "33", "42", "42"],
  //     ["51", "52", "53", "54", "55", "56", "57", "58", "31", "32", "41", "21", "11"]
  // ];

  // let dice = [];
  // let caiSheng = [];
  // let jing = [];
  // let shangJing = 0;
  // let xiaJing = 0;
  // let zhengJing = 0;
  // let fuJing = 0;

  // for (let i = 0; i < 2; i++) {
  //   dice.push(_.random(1, 6));
  // }
  // console.log(dice);
  // console.log(_.sum(dice));

  // let startIndex = _.sum(dice) * 2 * (-1);
  // let endIndex = _.sum(dice) * 2 * (-1) + 2;
  // console.log("start:%j, end:%j", startIndex, endIndex);
  // let jingTmp = leftCardsArr.slice(startIndex, endIndex)
  // shangJing = jingTmp[0];
  // xiaJing = jingTmp[1];
  // console.log("shangJing:%j, xiajing:%j", shangJing, xiaJing);

  // shangJing = '13';
  // xiaJing = '21';
  // var cardCfg = require("./config/cardConfig.json");
  // let shangJingFu = (Number(shangJing) + 1).toString();
  // if (!cardCfg[shangJingFu]) {
  //   shangJingFu = (Math.floor(shangJing / 10) * 10 + 1).toString();
  // }
  // console.log("shangJing:%j, shangJingFu:%j", shangJing, shangJingFu);

  // let xiaJingFu = (Number(xiaJing) + 1).toString();
  // if (!cardCfg[xiaJingFu]) {
  //   xiaJingFu = (Math.floor(xiaJing / 10) * 10 + 1).toString();
  // }
  // console.log("xiaJing:%j, xiaJingFu:%j", xiaJing, xiaJingFu);

  // if (!cardCfg[shangJing] || !cardCfg[shangJingFu] || !cardCfg[xiaJing] || !cardCfg[xiaJingFu]) {
  //   console.log("error tile");
  // }
  // jing = [shangJing, shangJingFu, xiaJing, xiaJingFu];
  // console.log(jing);

  // var getType = Object.prototype.toString;
  // let cards = [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 10, 10, 8];
  // let anGang = [];
  // for (let i = 0; i < anGang.length; i++) {
  //   anGang[i] = Array.from({length: anGang[i].length}).map(()=> "-1");
  // }

  // _.each(anGang, function(val){
  //   console.log(val);
  //   //return Array.from({length: val.length}).map(()=> "-1")
  // });
  // console.log(anGang);
  //console.log(Array.from({length: anGang.length}).map(()=> "-1"));

  // let obj = {"a":null, "b":2};
  // let obj2 = [];
  // let result = {};
  // if (obj2[0]) {
  //   console.log(1);
  // }
  // console.log(2);

  // for (let key in obj) {
  //   console.log(key);
  //   if (obj.hasOwnProperty('a')) {
  //     continue;
  //   }
  //   if (obj.hasOwnProperty(key) && key !== "a") {
  //       result[key] = obj[key]
  //   }
  // }
  // console.log(result);
  // var objects = [{ 'a': 1 }, { 'b': 2 }];
  // var deep = objects;
  // deep[0].a = 2;
  // console.log(objects);
  // console.log(deep);


  // let arr1 = [,,,];
  // let arr2 = [,];
  //arr1[-23] = 3;
  //console.log("arr2", getType.call(arr1));
  // arr1[100] = 1;
  // console.log(arr1[0]);

  //test2();
  // let arr1 = [4,1,2,3];
  // console.log("arr1", 0 in arr1);
  // console.log("arr2", 0 in arr2);

  console.log("-----------------------------");
};



var test = function () {
  console.log("players:%j", 2);
  return;
};

var test2 = function () {
  asyncLib.series([
      function (callback) {
          console.log("players:%j", 1);
          callback(null,"task1") 
      },
      function (callback) {
          console.log("players:%j", "2-2");
          test();
          callback(null,"task2") 
      }
  ], function (err, result) {
      console.log("players:%j", 3);
      console.log(result);
  });

  console.log("players:%j", 4);
  return;
};

f1();
  // console.log('WEBHOOK_VERIFIED');

  // for (var i = 0; i < 3; i++) {

  //   console.log(i);
  // }  



  
// Sets server port and logs message on success
// app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// app.get('/webhook', (req, res) => {

//     // Your verify token. Should be a random string.
//     let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"

//     // Parse the query params
//     let mode = req.query['hub.mode'];


//     console.log('WEBHOOK_VERIFIED');
//     res.status(200).send(challenge);
//   });