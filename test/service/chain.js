'use strict';

function a () {
    console.log('a');
    return;
}

module.exports = function () {
    // function a () {
    //     console.log('a');
    //     function b () {
    //         console.log('b');
    //         return b;
    //     }
    // }
    console.log('11');
    return a;
}