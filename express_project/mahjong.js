//'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),// creates express http server
  
  _ = require('lodash');
  const async = require('async');
  //var bearcat = require('bearcat');
  
var cardCfg = require("./config/cardConfig.json");  
// global.BC = bearcat;
// global.CFG = BC.getBean('cfgApi');
var TYPE = {
    CardType : {
        Unknow: 0,
        Zfb: 1,
        Feng: 2,
        Wan: 3,
        Tiao: 4,
        Bing: 5,
        Hua: 6
    }
};

// var CardType;
// (function (CardType) {
//     CardType[CardType["Unknow"] = 0] = "Unknow";
//     CardType[CardType["Zfb"] = 1] = "Zfb";
//     CardType[CardType["Feng"] = 2] = "Feng";
//     CardType[CardType["Wan"] = 3] = "Wan";
//     CardType[CardType["Tiao"] = 4] = "Tiao";
//     CardType[CardType["Bing"] = 5] = "Bing";
//     CardType[CardType["Hua"] = 6] = "Hua";
// })(CardType || (CardType = {}));

var f1 = function () {
  console.log("-----------------------------");
    var room = getRoom();
    var game = room.game;
    var players = room.game.players;
    var jing = game.jing;
    var xiaJing = [jing[2], jing[3]];
    var jingBipin = [];
    
    var data = getChowCombs(players[0].wall, "22");
    //console.log(data[0][0]);
    console.log(data);

    // for (let i = 0; i < players.length; i++) {
    //     let tmpJing = [];
    //     _.map(players[i].wall.cards, function (tile) {
    //         if (_.includes(xiaJing, tile)) {
    //             tmpJing.push(tile);
    //         };
    //     });
    //     jingBipin.push(tmpJing);
    // }
    // console.log(jingBipin);



  console.log("-----------------------------");
};

var getChowCombs = function (wall, tile, csid) {
    if (_.isNil(wall) || _.isNil(tile) || _.isNil(wall.cards) || wall.cards.length < 2) {
        return [];
    }

    var cards = _.cloneDeep(wall.cards);
    if (!_.isNil(csid)) {
        // 去除掉财神
        cards = _.filter(cards, function (t) {
            return t !== csid;
        });

        // 将白板转换成财神
        for (var i = 0; i < cards.length; ++i) {
            if (cards[i] == CARD_BAI_BAN) {
                cards[i] = csid;
            }
        }

        // 将打出的白板转换成财神
        if (tile == CARD_BAI_BAN) {
            tile = csid;
        }
    }



    // 条饼万 中发白 风
    //var cfg = CFG.get('cardConfig', tile);
    var cfg = cardCfg[tile];
    var type = cfg.type;
    if (type == TYPE.CardType.Zfb) {
        let tempArr = _.difference(["11", "12", "13"], [tile.toString()])
        let tempCards = _.uniq(wall.cards);
        return _.intersection(tempArr, tempCards).length == 2 ? tempArr : [];
    }

    if (type == TYPE.CardType.Feng) {
        let tempArr = _.difference(["21", "22", "23", "24"], [tile.toString()])
        let tempCards = _.uniq(wall.cards);
        let otherCards = _.intersection(tempArr, tempCards);
        return otherCards.length >= 2 ? otherCards : [];
    }
    if (type != TYPE.CardType.Tiao && type != TYPE.CardType.Bing && type != TYPE.CardType.Wan) {
        return [];
    }

    var getOffsetTile = function (tile, offset) {
        return (Number(tile) + offset).toString();
    };

    var isOffsetTileExist = function (selfTiles, tile, offset) {
        var offsetTile = getOffsetTile(tile, offset);
        //var tileCfg = CFG.all('cardConfig')[offsetTile];
        var tileCfg = cardCfg[offsetTile];
        if (!tileCfg) {
            return false;
        }

        return _.findIndex(selfTiles, function (t) {
            return t == offsetTile;
        }) !== -1;
    };

    var combs = [];
    if (isOffsetTileExist(cards, tile, -2) && isOffsetTileExist(cards, tile, -1)) {
        combs.push([getOffsetTile(tile, -2), getOffsetTile(tile, -1)]);
    }
    if (isOffsetTileExist(cards, tile, -1) && isOffsetTileExist(cards, tile, 1)) {
        combs.push([getOffsetTile(tile, -1), getOffsetTile(tile, 1)]);
    }
    if (isOffsetTileExist(cards, tile, 1) && isOffsetTileExist(cards, tile, 2)) {
        combs.push([getOffsetTile(tile, 1), getOffsetTile(tile, 2)]);
    }

    // 财神替代牌转换成白板
    if (!_.isNil(csid)) {
        for (var i = 0; i < combs.length; ++i) {
            for (var ii = 0; ii < combs[i].length; ++ii) {
                if (combs[i][ii] == csid) {
                    combs[i][ii] = CARD_BAI_BAN;
                }
            }
        }
    }

    return combs;
};

function getRoom(){
    let leftCardsArr = [
        "32", "12", "12", "12", "12", "13", "13", "13", "23", "51", "47", "38", "47", "55", "41", "45", "49", "47", "23", "39",
        "51", "38", "21", "35", "31", "13", "59", "48", "57", "33", "47", "38", "47", "55", "41", "45", "49", "47", "23", "39",
        "44", "35", "12", "49", "58", "54", "56", "42", "13", "34", "22", "36", "56", "45", "33", "11", "22", "56", "55", "47",
        "44", "41", "12", "52", "45", "11", "59", "31", "39", "37", "54", "34", "35", "11", "43", "42", "48", "33", "21", "12",
        "33", "21", "12",
    ];
    let cardsArr = [
        ["31", "32", "33", "34", "35", "36", "37", "38", "51", "52", "22", "24", "23"],
        ["41", "42", "43", "44", "45", "46", "47", "48", "52", "52", "54", "11", "32", "59"],
        ["57", "58", "59", "41", "42", "43", "43", "44", "45", "21", "23", "24", "38"],
        ["51", "52", "53", "54", "55", "56", "57", "58", "21", "39", "31", "11", "22"]
    ];
    let wallsArr = [
        {"cards": cardsArr[0], "chi": [], "peng": [], "mingGang": [], "anGang": [], "playHua": [], "mingGangFrom": [],
            "chiFrom": [], "chiTile": [], "pengFrom": [], "buGang": [], "buGangFrom": [], "chiPengGangIndex": []},
        {"cards": cardsArr[1], "chi": [], "peng": [], "mingGang": [], "anGang": [], "playHua": [], "mingGangFrom": [],
            "chiFrom": [], "chiTile": [], "pengFrom": [], "buGang": [], "buGangFrom": [], "chiPengGangIndex": []},
        {"cards": cardsArr[2], "chi": [], "peng": [], "mingGang": [], "anGang": [], "playHua": [], "mingGangFrom": [],
            "chiFrom": [], "chiTile": [], "pengFrom": [], "buGang": [], "buGangFrom": [], "chiPengGangIndex": []},
        {"cards": cardsArr[3], "chi": [], "peng": [], "mingGang": [], "anGang": [], "playHua": [], "mingGangFrom": [],
            "chiFrom": [], "chiTile": [], "pengFrom": [], "buGang": [], "buGangFrom": [], "chiPengGangIndex": []},
    ];
    let playersArr = [
        {"totalScore": 0, "online": true, "prepared": true, "dismissState": 0, "uid": 10005, "username": "gao1", "platform": null, "icon": "mrtx_png", "gender": 0, "roomId": 0, "nickname": "游客10005", "coin": 5000, "diamond": 0, "groundId": "1", "channel": 1, "created_at": "2018-12-26T16:00:00.000Z", "updated_at": "2019-01-07T09:15:42.000Z",},
        {"totalScore": 0, "online": true, "prepared": true, "dismissState": 0, "uid": 10006, "username": "gao2", "platform": null, "icon": "mrtx_png", "gender": 0, "roomId": 0, "nickname": "游客10006", "coin": 5000, "diamond": 0, "groundId": "1", "channel": 1, "created_at": "2018-12-26T16:00:00.000Z", "updated_at": "2019-01-07T09:15:42.000Z", "zhuang": true},
        {"totalScore": 0, "online": true, "prepared": true, "dismissState": 0, "uid": 10007, "username": "gao3", "platform": null, "icon": "mrtx_png", "gender": 0, "roomId": 0, "nickname": "游客10007", "coin": 5000, "diamond": 0, "groundId": "1", "channel": 1, "created_at": "2018-12-26T16:00:00.000Z", "updated_at": "2019-01-07T10:07:27.771Z"},
        {"totalScore": 0, "online": true, "prepared": true, "dismissState": 0, "uid": 10008, "username": "gao4", "platform": null, "icon": "mrtx_png", "gender": 0, "roomId": 0, "nickname": "游客10008", "coin": 5000, "diamond": 0, "groundId": "1", "channel": 1, "created_at": "2018-12-26T16:00:00.000Z", "updated_at": "2019-01-07T10:07:33.430Z"}
    ];
    let roomData = {
        "id": 263957,
        "players": playersArr,
        "startTime": 1546855748335,
        "gameType": "ncmj",
        "roomType": 2,
        "game": {
            "trustee": false,
            "gameType": "ncmj",
            "end": false,
            "gameSequence": 1,
            "zhuangIndex": 1,
            "turnIndex": 1,
            "_timeOutInterval": 15000,
            "_trusteeInterval": 2000,
            "_lastPlayTime": 0,
            "_poorPassInterval": 5000,
            "cards": leftCardsArr,
            "cardsNum": 83,
            "curCard": null,
            "players": [
                {
                    "info": playersArr[0],
                    "trustee": false,
                    "cards": cardsArr[0],
                    "lastPlayedCards": null,
                    "_playedCounter": 0,
                    "score": 0,
                    "playCards": [],
                    "state": 3,
                    "selectItem": [],
                    "wall": wallsArr[0] ,
                    "needPlayTiles": [],
                    "isReadyHand": false,
                    "playUnknowIndex": [],
                    "dismissState": 0,
                    "isAfterDraw": false,
                    "isLastDraw": false,
                    "scoreList": {},
                    "chatTime": 1546855748336,
                    "customState": 1,
                    "customWall": [],
                    "isKongDraw": false,
                    "caiShen": [],
                    "chiNum": 0,
                    "chiZhang": 0,
                    "chiSanKou": {},
                    "isWinMore": 0,
                    "round": [],
                    "dealerWinTimes": 0,
                    "endScore": [],
                    "isTing": false,
                    "isContract": false,
                    "selectType": 0,
                    "contractScore": 0,
                    "totalContractScore": 0,
                    "chisankou": {},
                    "cardRule" : null
                },
                {
                    "info": playersArr[1],
                    "trustee": false,
                    "cards": cardsArr[1],
                    "lastPlayedCards": null,
                    "_playedCounter": 0,
                    "score": 0,
                    "playCards": [],
                    "state": 1,
                    "selectItem": [],
                    "wall": wallsArr[1],
                    "needPlayTiles": [],
                    "isReadyHand": false,
                    "playUnknowIndex": [],
                    "dismissState": 0,
                    "isAfterDraw": false,
                    "isLastDraw": false,
                    "scoreList": {},
                    "chatTime": 1546855748336,
                    "customState": 1,
                    "customWall": [],
                    "isKongDraw": false,
                    "caiShen": [],
                    "chiNum": 0,
                    "chiZhang": 0,
                    "chiSanKou": {},
                    "isWinMore": 0,
                    "round": [],
                    "dealerWinTimes": 0,
                    "endScore": [],
                    "isTing": false,
                    "isContract": false,
                    "selectType": 0,
                    "contractScore": 0,
                    "totalContractScore": 0,
                    "chizhang": null,
                    "chisankou": {},
                    "cardRule" : null
                },
                {
                    "info": playersArr[2],
                    "trustee": false,
                    "cards": cardsArr[2],
                    "lastPlayedCards": null,
                    "_playedCounter": 0,
                    "score": 0,
                    "playCards": [],
                    "state": 3,
                    "selectItem": [],
                    "wall": wallsArr[2],
                    "needPlayTiles": [],
                    "isReadyHand": false,
                    "playUnknowIndex": [],
                    "dismissState": 0,
                    "isAfterDraw": false,
                    "isLastDraw": false,
                    "scoreList": {},
                    "chatTime": 1546855748336,
                    "customState": 1,
                    "customWall": [],
                    "isKongDraw": false,
                    "caiShen": [],
                    "chiNum": 0,
                    "chiZhang": 0,
                    "chiSanKou": {},
                    "isWinMore": 0,
                    "round": [],
                    "dealerWinTimes": 0,
                    "endScore": [],
                    "isTing": false,
                    "isContract": false,
                    "selectType": 0,
                    "contractScore": 0,
                    "totalContractScore": 0,
                    "chizhang": null,
                    "chisankou": {},
                    "cardRule" : null
                },
                {
                    "info": playersArr[3],
                    "trustee": false,
                    "cards": cardsArr[3],
                    "lastPlayedCards": null,
                    "_playedCounter": 0,
                    "score": 0,
                    "playCards": [],
                    "state": 3,
                    "selectItem": [],
                    "wall": wallsArr[3],
                    "needPlayTiles": [],
                    "isReadyHand": false,
                    "playUnknowIndex": [],
                    "dismissState": 0,
                    "isAfterDraw": false,
                    "isLastDraw": false,
                    "scoreList": {},
                    "chatTime": 1546855748336,
                    "customState": 1,
                    "customWall": [],
                    "isKongDraw": false,
                    "caiShen": [],
                    "chiNum": 0,
                    "chiZhang": 0,
                    "chiSanKou": {},
                    "isWinMore": 0,
                    "round": [],
                    "dealerWinTimes": 0,
                    "endScore": [],
                    "isTing": false,
                    "isContract": false,
                    "selectType": 0,
                    "contractScore": 0,
                    "totalContractScore": 0,
                    "chizhang": null,
                    "chisankou": {},
                    "cardRule" : null
                }
            ],
            "preIndex": -1,
            "date": 1546855748335,
            "startTime": 1546855748336,
            "caiShen" : ["37", "38"],
            "chaoZhuangStatus": false,
            "settlement": {
                "winnerIndex": [],
                "zhuangIndex": -1,
                "winTiles": [],
                "paoIndex": -1,
                "gangIndex": -1,
                "players": [
                    {
                        "total": 0,
                        "shangJing": {
                            "score": 0,
                            "type": []
                        },
                        "xiaJing": {
                            "score": 0,
                            "type": []
                        },
                        "gang": {
                            "score": 0,
                            "type": []
                        },
                        "chaoZhuang": 0,
                        "hu": 0
                    },
                    {
                        "total": 0,
                        "shangJing": {
                            "score": 0,
                            "type": []
                        },
                        "xiaJing": {
                            "score": 0,
                            "type": []
                        },
                        "gang": {
                            "score": 0,
                            "type": []
                        },
                        "chaoZhuang": 0,
                        "hu": 0
                    },
                    {
                        "total": 0,
                        "shangJing": {
                            "score": 0,
                            "type": []
                        },
                        "xiaJing": {
                            "score": 0,
                            "type": []
                        },
                        "gang": {
                            "score": 0,
                            "type": []
                        },
                        "chaoZhuang": 0,
                        "hu": 0
                    },
                    {
                        "total": 0,
                        "shangJing": {
                            "score": 0,
                            "type": []
                        },
                        "xiaJing": {
                            "score": 0,
                            "type": []
                        },
                        "gang": {
                            "score": 0,
                            "type": []
                        },
                        "chaoZhuang": 0,
                        "hu": 0
                    }
                ],
                "huType": [],
                "chaoZhuang": 0
            },
            "multipleSelected": [],
            "dice" : [6, 6],
            "jing": ["37", "38", "45", "46"],
            "baseScore": 3,
            "cardRule" : null
        },
        "dismissTime": null,
        "gameCount": 2,
        "ownerIndex": 0,
        "createTime": 1546855694017,
        "zhuangIndex": 1,
        "scoreList": [],
        "teaMoney": 0,
        "title": "南昌麻将",
        "baseScore": 1,
        "playerNumber": 4,
        "gameNumber": 2,
        "settlementList": [],
        "__settings": {
            "gameType": "ncmj",
            "playerNumber": 4,
            "gameNumber": 4,
            "title": "南昌麻将",
            "baseScore": 1,
            "teaMoney": 0
        },
        "payorId": 10005,
        "_lastWinIndex": 1,
        "_recordId": 92599748335000400
    };

    return roomData
};

function isAllEqual(array){
    if(array.length>0){
       return !array.some(function(value,index){
         return value !== array[0];
       });   
    }else{
        return true;
    }
};

f1();
