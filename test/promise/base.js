'use strict';

const _ = require('lodash');

let p = new Promise(function(reslove,reject){

    //reslove('成功')  //状态由等待变为成功，传的参数作为then函数中成功函数的实参

    reject('失败')  //状态由等待变为失败，传的参数作为then函数中失败函数的实参

})

//then中有2个参数，第一个参数是状态变为成功后应该执行的回调函数，第二个参数是状态变为失败后应该执行的回调函数。

p.then((data)=>{

    console.log('success:'+data)

},(err)=>{

    console.log('failed:'+err)

})
console.log('hello')