// 字面量： 123 'this is a string' 2.34 true
// 基本类型：string boolean null undefined
// 对象： object

// 1、
var str1 = 'string';
var str2 = String('string');
var str3 = new String('string');

if(str1 === str2){
    console.log('str1 === str2');
}

if(str1 === str3){
    console.log('str1 === str3');
}

if(str2 === str3){
    console.log('str2 === str3');
}

// 输出 str1 === str2

// 2、
// 从字符串 'this is a list of items: check, radio, text, submit, button.' 提取出:之后，分隔的列表
function getAry(str){
    // 截取： 之后的字符串
    var sstr1 = str.slice(str.indexOf(':')+1);
    // 去掉字符串前后的空白符，最后的'.' 以及中间 单词前','后的空白符
    sstr1 = sstr1.replace(/^\s|\s$|\.$|\s+\b|\b\s+/g, '');

    // 返回字符串列表数组
    return sstr1.split(',');
}

// 链化
function getAry1(str){
    return str.slice(sstr.indexOf(':')+1, sstr.length-1).trim().split(/\s*,\s*/);
}

var sstr = 'this is a list of items: check, radio, text, submit, button.';
getAry1(sstr);// ["check", "radio", "text", "submit", "button"]
getAry(sstr); // ["check", "radio", "text", "submit", "button"]


// 3、
// 检查存在的非空的字符串
function checkStr(str){
    // 从左直右 依次判断，是否定义str， str是否有长度，str是否为String对象或string基本类型
    if(typeof str !== 'undefined' && str && str.length>0 && typeof Object.prototype.valueOf.call(str) === 'string'){
        return true;
    }

    return false;
}

// 4、
// 在一个字符串中找到一个模式的所有实例
function findAllReg(str, regexp){
    var ary = [];
    var matchAry;
    var pattern;
    if(typeof regexp === 'string'){
        pattern = new RegExp(regexp);
    }else{
        pattern = regexp;
    }

    while((matchAry = pattern.exec(str)) != null){
        ary.push(matchAry[0]);
    }

    return ary;
}

var searchstr='now is the time and this is the time and that is the time';
findAllReg(searchstr, /t\w*e/g);//["the", "time", "the", "time", "the", "time"]


// 5、
// 循环中输出循环变量
for(var i=0; i<10; i++){
    setTimeout(function(){console.log(i);}, 300);
}
// 10 10 10 10...

// 利用闭包函数作用域保存变量i
for(var i=0; i<10; i++){
    setTimeout((function(i){return function(){console.log(i);}}(i)), 300);
}
// 0 1 2 3 ....

// 6、
// 十进制转16进制
new Number(1212).toString(16); // '4bc'

