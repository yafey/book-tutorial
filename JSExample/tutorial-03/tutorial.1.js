// 1、
// 函数声明提升 提升优先于其他变量的声明提升
foo();// foo
function foo(){console.log('foo')}


// 2、
// 返回一个反向的数组字符串 
// ['hcx', 'owe', 'xyz'] => "xyz owe hcx"
function reverseArray(ary, index, str){
    if(index == 0){
        return str;
    }

    str += str==="" ? ary[index-1] : " " + ary[index-1];

    return reverseArray(ary, index-1, str);
}
var ay = ['hcx','owe', 'xyz'];
reverseArray(ay, ay.length, "");
// "xyz owe hcx"

// 3、
// 使用定时器和回调防止代码阻塞
function factorial(n){
    return n == 1 ? 1 : n * factorial(n-1);
}

function noBlock(n, fn){
    setTimeout(function(){
        var val = factorial(n);
        fn && fn(val);
    }, 0);
}

console.log('top');
noBlock(3, function(n){
    console.log('first', n);
    noBlock(n, function(m){
        console.log('end', m);
    });
});

var test = 0;
for(var i=0; i<10; i++){
    test += i;
}

console.log(test);
//top
//45
//first 6
//end 720

// 4、
// 将类数组转换成数组    
// 函数参数arguments对象转为数组？  利用数组方法slice.call(arguments)转换
function someFunc(){
    var arg = Array.prototype.slice.call(arguments);
    arg.forEach(function(item){
        console.log(item);
    });
}

someFunc(1,2,3,4,5,6);//  1 2 3 4 5 6

// 5、
// 模仿实现ES5的Function.prototype.bind方法？
Function.prototype.binder = function(){
    var args = Array.prototype.slice.call(arguments, 1);
    var that = typeof arguments[0] === 'object' ? arguments[0] : null;
    var self = this;

    return function(){
        args = args.concat(Array.prototype.slice.call(arguments));
        self.apply(that, args);
    }
}
function testBinder(){
    console.log(this.name);
    console.log(arguments);
}
var newTest = test.testBinder.binder({name:'hcxowe'}, 1,2,3);
newTest(4,5,6);
// hcxowe
// [1, 2, 3, 4, 5, 6]

// 6、
// 使用缓存计算提高程序性能
// 一个产生斐波那契数的例子 f(n) = f(n-1) + f(n-2)  f(0) = 0, f(1) = 1
var fibonacci = (function(){
    var memo = [0, 1];
    var fib = function(n){
        var result = memo[n];
        if(typeof result !== 'number'){
            result = fib(n-1) + fib(n-2);
            memo[n] = result;
        }

        return result;
    };

    return fib;
}());

fibonacci(10); //55

// 类似的阶乘例子
var factorialer = (function(){
    var memo = [1];
    var fac = function(n){
        var result = memo[n];
        if(typeof result !== 'number'){
            result = n * fac(n-1);
            memo[n] = result;
        }
        
        return result;
    };

    return fac;
}());

factorialer(10); // 3628800

