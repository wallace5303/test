
const GenTable = require('./genTable')
const cardCfg = require("./config/cardConfig.json");  
_ = require('lodash');

const MaJiangDef = {
  MAX_NUM: 42,
};

/**
 * 查表法出牌
 */
class outCardLogic {
    constructor() {
        this.genTable = GenTable.Instance(); 
    };

    init(){
        return this;
    };

    outAI (originalCards, originalGuiCard) {
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
              var score = this.calc(tmpInput, guiCard);
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
      
    calc (input, guiCard){
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
        for (var m = 0; m < guiCard.length; m++) {
            let tmpD = guiCard[m];
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
      
        var wanAITableInfo = this.genTable.AITable[wanKey.toString()];
        tmp.push(wanAITableInfo);
      
        var tongAITableInfo = this.genTable.AITable[tongKey.toString()];
        tmp.push(tongAITableInfo);
      
        var tiaoAITableInfo = this.genTable.AITable[tiaoKey.toString()];
        tmp.push(tiaoAITableInfo);
      
        var fengAITableInfo = this.genTable.AITableFeng[fengKey.toString()];
        tmp.push(fengAITableInfo);
      
        var jianAITableInfo = this.genTable.AITableJian[jianKey.toString()];
        tmp.push(jianAITableInfo);
      
        console.log("tmpInfo:%j", tmp);
      
        var ret = [];
        this.calcAITableInfo(ret, tmp, 0, false, 0);
      
        console.log("ret:%j", ret);
      
        var d = _.max(ret);
        console.log("d:%j", d);
        return d;
    };
      
    calcAITableInfo (ret,  tmp,  index,  jiang, cur){
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
              this.calcAITableInfo(ret, tmp, index + 1, jiang, Number(cur) + Number(aiTableInfo.p));
            }
          }
          else
          {
            this.calcAITableInfo(ret, tmp, index + 1, !!Number(aiTableInfo.jiang), Number(cur) + Number(aiTableInfo.p));
          }
        }
    };
}
module.exports = outCardLogic;