// 技巧型设计模式

// 链模式
// ---通过在对象方法中将当前对象返回，实现对同一个对象对歌方法的链式调用，从而简化对该对象的对歌方法的多次调用时，对该对象的对此引用
var A = function(selector){
    return new A.fn.init(selector);
};
A.fn = A.prototype = {
    constructor: A,
    init: function(selector){
        this[0] = document.getElementById(selector);
        this.length = 1;
        return this;
    },
    size: function(){
        return this.length;
    }
};
A.fn.init.prototype = A.fn;


// 委托模式
// --- 多个对象接受并处理同一请求，他们将请求委托给另一个对象统一处理请求


// 数据访问对象模式
// ---抽象和封装对数据源的访问和存储，通过对数据源链接的管理方便对数据的访问和存储


// 节流模式
// ---对重复的业务逻辑进行节流控制，执行最后一次操作并取消其他操作，以提高性能，常用于高频连续触发的事件响应


// 简单模板模式
// ---通过格式化字符串拼凑出视图避免创建视图时大量节点操作

// 惰性模式
// ---减少每次代码执行时的重复性的分支判断，通过对对象重定义来屏蔽原对象中的分支判断
// 加载执行
var A = {};
A.on = (function(dom, type, fn){
    if(document.addEventListener){
        return function(dom, type, fn){
            dom.addEventListener(type, fn, false);
        };
    }
    else if(document.attachEvent){
        return function(dom, type, fn){
            dom.attachEvent('on'+type, fn);
        };
    }
    else{
        return function(dom, type, fn){
            dom['on'+type] = fn;
        }
    }
}());
// 惰性执行
var A = {};
A.on = function(dom, type, fn){
    if(document.addEventListener){
        A.on = function(dom, type, fn){
            dom.addEventListener(type, fn, false);
        };
    }
    else if(document.attachEvent){
        A.on = function(dom, type, fn){
            dom.attachEvent('on'+type, fn);
        };
    }
    else{
        A.on = function(dom, type, fn){
            dom['on'+type] = fn;
        }
    }

    A.on(dom, type, fn);
};

// 参与者模式
// ---在特定的作用域中执行给定的函数，并将参数原封不动的传递

// 函数柯里化
function curry(fn){
    var slice = Array.prototype.slice;
    // 预存初始化的函数参数
    var args = slice.call(arguments, 1);

    return function(){
        // 获取调用函数时新增的参数
        var addArgs = slice.call(arguments);
        // 合并所有参数
        var allArgs = args.concat(addArgs);

        return fn.apply(null, allArgs);
    }
}

// bind函数
function bind(fn, context){
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    
    return function(){
        var addArgs = slice.call(arguments);
        var allArgs = addArgs.concat(args);

        return fn.apply(context, allArgs);
    }
}

// 等待者模式
// ---通过对多个异步进程监听，来触发未来发生的动作
