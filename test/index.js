'use strict';

const _ = require('lodash');
const service = require('./service');
const test = require('./test');
const chain = require('./service/chain');
global.context = {
    name: 'gsx',
    age: 13,
    sex: 1
};

let res = null;

let arrs = ['a', 'b'];
let ac = {
    name: 'gsx',
    age: 21
};
let b = [...arrs];

console.log(b);
return;

console.log(context2.name);
service.hello.a('str1');
console.log(res);

return;

function Person(){};
Person.prototype.status =1;
Person.prototype.married =function(){
this.status = 2;
return this;
};
Person.prototype.unmerried = function(){
    this.status = 3;
    return this;
};
Person.prototype.process = function(){
    return this;
}
let a = new Person();
a.married().unmerried();
console.log(a.status);
return;

res = chain()();
return;

service.hello.a();
console.log(res);
return;

let services = {};
_.each(require('./service'), (service, name) => {
    
    console.log('[ Service ] name', name);
    console.log('[ service ] service', service);
    services[name] = service;
  });
let res2 = services.hello.a();
return;

res = hello.a();
console.log(res);
return;

let arr = [];
console.log(!_.isEmpty(arr));
return;


let award_item = '';
let free_stone = 0;
let bonus = {};
bonus.reward = [
    { 
        quantity: 70,
        reward_type: 'quartz',
        probability: 1,
        description: '初心者ログボ２日目' 
    },
    { 
        quantity: 10,
        reward_type: 'item',
        probability: 1,
        description: '初心者ログボ２日目' ,
        item_id: 'test1'
    },
    { 
        quantity: 1,
        reward_type: 'dress',
        probability: 1,
        description: '初心者ログボ２日目' ,
        dress_id: 'test1'
    },
];

// for (let i = 0; i < bonus.reward.length; i++) {
//     let rewardItem = bonus.reward[i];    
//     if (rewardItem.reward_type === 'item') {
//         award_item.push({ 
//             item_id: rewardItem.item_id, 
//             num: rewardItem.probability, 
//             name: master.item[rewardItem.item_id].name 
//         });
//     }
//     else if (rewardItem.reward_type === 'quartz') {
//         free_stone += rewardItem.quantity;
//     }
//     else if(bonus.reward.reward_type === 'dress') {
//         award_item.push({ 
//             item_id: rewardItem.dress_id, 
//             num: rewardItem.probability, 
//             name: master.dress[rewardItem.dress_id].name 
//         });
//     }
// }


// test.login(1, 2, function (err, data) {
//     console.log(data);
// });

//let data = test.login(1, 2);
// test.login(1, 2)()
// console.log('ss');

// _.each(require('./service'), (service, name) => {
//     services = {};
//     logger.debug('[ Service ] name', name);
//     logger.debug('[ service ] service', service);
//     services[name] = service;
//   });