'use strict';

const _ = require('lodash');
const web = require('proteus-web');
const putil = require('proteus-web').util;
const path = require('path');



let dir = path.resolve(__dirname, '../../app.js')
console.log(dir);
return;

let config = {};

function a () {
    var name = 'gsx';
    var age = 12;
    console.log('name:'+ name);
    console.log('age:'+ age);
}

//a.call({'name' : 'gsx1', 'age' :13});
web.util.blend(a, config);

//console.log(a);