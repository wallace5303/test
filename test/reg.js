var str="Is this all there is?";
var patt1=/[ah]/g;

var res1=str.match(patt1);
console.log('res1:', res1); 

var res2=patt1.exec(str);
console.log('res2:', res2); 