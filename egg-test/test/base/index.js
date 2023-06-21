'use strict';

const _ = require('lodash');
var urlencode = require('urlencode');
var locutus_php_url = require('locutus/php/url');
var EventEmitter = require('events').EventEmitter
var path = require('path');
const assert = require('assert');
var res;

let app = {}
Object.defineProperty(app, 'service', {
  get() {
    return 11;
  },
  name: 's'
})

console.log(app.service.name);
return;

const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

person.printIntroduction();
me.printIntroduction();

console.log(person)
console.log(me)
return;

let name = 0;
assert(name, 'options.property is required');

return;
let percent = '100';
let endIndex = percent.indexOf('.') != -1 ? percent.indexOf('.') : percent.length;
let percentNumber = percent.substring(0, endIndex);
console.log(percentNumber)
return;
function bytesChange (limit) {
  let size = "";
  if(limit < 0.1 * 1024){                            
      size = limit.toFixed(2) + "B"
  }else if(limit < 0.1 * 1024 * 1024){            
      size = (limit/1024).toFixed(2) + "KB"
  }else if(limit < 0.1 * 1024 * 1024 * 1024){        
      size = (limit/(1024 * 1024)).toFixed(2) + "MB"
  }else{                                            
      size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
  }

  let sizeStr = size + "";     
  console.log(size)                   
  let index = sizeStr.indexOf(".");                    
  let dou = sizeStr.substring(index + 1 , index + 3);
  console.log(dou)           
  if(dou == "00"){
    console.log(sizeStr.substring(index + 3, index + 5))
      return sizeStr.substring(0, index) + sizeStr.substring(index + 3, index + 5)
  }
  return size;
}

let num = bytesChange(1024);
console.log(num);return

function start1(param){
  let a = 1;
  let b = 2;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // return;
      resolve('ok');
    }, 2000);
    // setTimeout(() => {

    //   reject('f');
    // }, 3000);
  });
}
async function start2(){

  res = await start1(3).then((res) => res, (err) => err);
  console.log("res:", res);
}

start2();

// start1(3, function(err, data){
//   console.log("err:", err);
//   console.log("data:", data);
// });

return;

// function getElectronPath (filepath) {
  
//   filepath=filepath.replace("resources",""); 
//   filepath=filepath.replace("app.asar",""); 
//   filepath = path.resolve(filepath);
//   return filepath;
// };
// res = getElectronPath('./resources/app.asar/storage/xls2json/output');
// console.log(res);return;

// function getUserPaymentTable (timestamp = null) {
//   console.log('timestamp1', timestamp);
//   if (!timestamp) {
//     timestamp = Date.now();
//   }

//   console.log('timestamp2', timestamp);
//   let date = new Date(timestamp);
//   console.log('date', date);
//   let year = date.getFullYear();
//   console.log('year', year);
//   let month = date.getMonth() + 1;
//   console.log('month', month);
// 	if(month < 10) month = '0'+month;
// 	return 'user_payment_' + year + month;
// }

// console.log(getUserPaymentTable(Date.now()));
// return;

let user = {
  user_id : "\"e2bdba1281e737374b1e6c00e97d92e0\""
}

//user.user_id = "\"e2bdba1281e737374b1e6c00e97d92e0\"";
console.log(user.user_id);
// if (user.user_id.indexOf('\\') != -1) {
//   logger.warn(`[updateBestDeckPower] abnormal user_id: ${user.user_id}`);
//   user.user_id = user.user_id.replace('"','').replace(/[\\]/g,'');
//   logger.warn(`[updateBestDeckPower] fix user_id: ${user.user_id}`);
// }

return;

let content = '张三(￣ェ￣;)明 天';
console.log('content:', content);
content = new Buffer.from(content).toString('base64');
//content = locutus_php_url.base64_encode(content);
console.log('base64:', content);
content = urlencode(content);
console.log('urlencode:', content);

return;


var life = new EventEmitter();

//
life.on('求安慰', function(who){
  console.log('xxxx')
})



function check(){
  console.log('xxxx4354')
}

life.on('boys',check)


// 移除监听
life.removeListener('boys', check)

var hasconforListeren1 = life.emit('求安慰', '汉子');
console.log(hasconforListeren1)
var hasconforListeren2 = life.emit('boys', check);
console.log(hasconforListeren2)

console.log(life.listeners('boys'))

console.log(EventEmitter.listenerCount(life, '求安慰'))

return;



var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];
 
var youngest = _
  .chain(users)
  .sortBy('age')
  .map(function(o) {
    return o.user + ' is ' + o.age;
  })
  .head()
  .value();

console.log(youngest);return;  


var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];
   
//   res = _.find(users, function(o) { return o.age < 40; });
//   console.log(res);
  // => object for 'barney'
   
  // The `_.matches` iteratee shorthand.
//   res = _.find(users, { 'age': 1, 'active': true });
//   console.log(res);
  // => object for 'pebbles'
   
  // The `_.matchesProperty` iteratee shorthand.
  res = _.find(users, ['active', false]);
  console.log(res);
  // => object for 'fred'
   
  // The `_.property` iteratee shorthand.
  _.find(users, 'active');
  // => object for 'barney'

// let consumed = {
//     name: 'gao',
//     age:12,
//     earn: 'gao1'
// };
// // let consumed;

// //res = _.get(consumed, 'earn', 0);
// res = _.get(consumed, 'earns') ? consumed.earn : 0;
// console.log(res);

// let a = ['1', '2'].slice();
// console.log(a.pop());



// function argument (a, b) {
//     console.log(arguments.length);
// }
// argument.$test = 1;
// argument.test = 2;
// res = argument(1,2);
// console.log(argument);


// function Product(name, price) {
//     this.name = name;
//     this.price = price;
// }

// function Food(name, price) {
//     Product.call(this, name, price);
//     this.category = 'food';
// }

// function Toy(name, price) {
//     Product.call(this, name, price);
//     this.category = 'toy';
// }

// var cheese = new Food('feta', 5);
// var fun = new Toy('robot', 40);
// //console.log(JSON.stringify(cheese));
// console.log(cheese);

// var person = {
//     fullName: function() {
//         return this.firstName + " " + this.lastName;
//     }
// }
// var person1 = {
//     firstName:"Bill",
//     lastName: "Gates",
// }
// var person2 =function (a, b) {
//     this.firstName = a;
//     this.lastName = b
// }

// res = person.fullName.call(person1, "Seattle", "USA");

