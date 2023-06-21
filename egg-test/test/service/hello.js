'use strict';
global.context2 = {
    name: 'gsx2',
    age: 132,
    sex: 12
};

exports.a = (params, context) => {
    console.log('a');
    console.log(params);
    console.log(context.name);
}


exports.b = () => {
    console.log('b');
}