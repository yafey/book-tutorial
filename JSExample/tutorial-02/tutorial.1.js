// 1、 
// 通过数组方法concat 与 apply 实现 二维数组扁平化
var fruit = [];
fruit[0] = [1,2,3];
fruit[1] = [4,5,6];
fruit[2] = [7,8,9];

Array.prototype.concat.apply([], fruit);
// [1,2,3,4,5,6,7,8,9]

// 2、
// 数组中找到特定值，删除或者替换
var ary = ['123', 'hcxowe', 'wangbujun', 'heqi'];
ary.splice(ary.indexOf('hcxowe'), 1, 'chenglong'); // 返回删除的元素数组 [hcxowe]
ary; // ['123', 'chenglong', 'wangbujun', 'heqi'];

// 3、
// 提取数组一部分，保持原数组不变 slice---对数组一个部分进行浅拷贝
var xxx = [{x:1}, {y:2}, {z:3}];
xxx.slice(0, 1)[0].x = 2;
xxx; // [{x:2}, {y:2}, {z:3}]

// 4、
// 为数组每个元素应用一个函数 forEach(value, index, array)
var array = ['hcx', 'owe', 'feng', 'rachel'];
array.forEach(console.log);
//hcx 0 ["hcx", "owe", "feng", "rachel"]0: "hcx"1: "owe"2: "feng"3: "rachel"length: 4__proto__: Array[0]
//owe 1 ["hcx", "owe", "feng", "rachel"]0: "hcx"1: "owe"2: "feng"3: "rachel"length: 4__proto__: Array[0]
//feng 2 ["hcx", "owe", "feng", "rachel"]0: "hcx"1: "owe"2: "feng"3: "rachel"length: 4__proto__: Array[0]
//rachel 3 ["hcx", "owe", "feng", "rachel"]

// 5、
// 如果对querySelectorAll返回的nodeList，使用forEach遍历
var list = document.querySelectorAll('div');
Array.prototype.forEach.call(list, cosole.log); // 会输出每一个Node元素

// 6、
// 对数组中每个元素执行一个函数并返回一个新数组 map
// 把十进制数组转换成十六进制表示的数组？
var intAry = ['11', '22', '33', , ,'44', '55'];
var fAry = intAry.map(function(value){
    if(value === 'undefined'){
         return 0;
    }

    return parseInt(value, 10).toString(16);
});
fAry; //["b", "16", "21", undefined × 2, "2c", "37"]
// map 会跳过未定义的元素，并原封不动的返回，不会进入执行方法


// 7、
// 创建过滤后的数组 filter
var intAry = ['11', '22', '33', , ,'44', '55'];
var fAry = intAry.filter(function(value){
     return true;
});
fAry;// ["11", "22", "33", "44", "55"]

fAry = intAry.map(function(value){
     if(value === 'undefined'){
         return true;
    }
    return true;
});
fAry; //[true, true, true, undefined × 2, true, true]


