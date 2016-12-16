/**
 * A library v1.0.0
 * Author Zhangromgming
 * Date: 2014-11-30
 */
~(function(window){
    /**
     * @name 框架单体对象A
     * @param selector 选择器或页面加载完成回调函数
     * @param context 查找元素上下文
     */
    var A = function(selector, context){
        // 如果selector为函数，则添加页面加载完成事件监听
        if(typeof selector == 'function'){
            // 这里只是简单使用window.onload事件，处理页面加载完成事件回调
            A(window).on('load', selector);
        }
        else{
            return A.fn.init(selector, context);
        }
    };

    // 原型方法
    A.fn = A.prototype = {
        constructor: A,
        init: function(selector, context){
            // 选择器为元素
            if(typeof selector === 'object'){
                this[0] = selector;
                this.length = 1;
                return this;
            }

            // 重置获取到的元素个数
            this.length = 0;

            // 校正上下文
            context = document.getElementById(context) || document;

            if(~selector.indexOf('#')){
                // ID选择器
                this[0] = document.getElementById(selector.slice(1));
                this.length = 1;
            }
            else if(~selector.indexOf('.')){
                // 类选择器
                var doms = [];
                var className = selector.slice(1);
                // 是否支持通过类获取元素的方法，没有则获取所有子类
                if(context.getElemntsByClassName){
                    doms = context.getElementsByClassName(className);
                }
                else{
                    doms = context.getElementsByTagName('*');
                }

                // 设置获取到的元素
                for(var i=0, len=doms.length; i<len; i++){
                    // 从获取到的元素中排除不包含指定类的元素
                    // 这里利用indexOf未找到字符串返回-1 取反 然后经过转十进制的 取反-1  最后~（-1） = 0
                    if(dom[i].className && !!~doms[i].className.indexOf(className)){
                        this[this.length] = dom[i];
                        this.length++;
                    }
                }
            }
            else{
                // 元素选择器
                var doms = context.getElementsByTagName(selector);
                var i =0;
                var len = doms.length;
                for(; i<len; i++){
                    this[i] = doms[i];
                }
                this.length = len;
            }

            // 设置对象的上下文对象
            this.context = context;
            this.selector = selector;
            return this;
        },
        length: 0,
        push: [].push,
        splice: [].splice
    };

    // 设置构造函数原型
    A.fn.init.prototype = A.fn;

    /**
     * @name 对象拓展
     * @param 目标对象
     * @param 拓展对象 
     */
    A.extend = A.fn.extend = function(){
        var i = 1;
        var len = arguments.length;
        var target = arguments[0];
        var j = null;

        // 如果只有一个参数，则拓展当前对象
        if(i == len){
            target = this;
            i--;
        }

        // 遍历拓展对象
        for(; i<len; i++){
            for(j in arguments[i]){
                // 浅复制
                target[j] = arguments[i][j];
            }
        }

        return target;
    }

    // 单体对象A方法拓展
    A.extend({
        /**
         * @name 将横线式命名字符串转为驼峰式
         * eg： test-demo => testDemo
         */
        camelCase: function(str){
            return str.replace(/\-(\w)/g, function(match, letter){
                return letter.toUpperCase();
            });
        },
        /**
         * @name 除去字符串两端空白
         */
        trim: function(str){
            return str.replace(/^\s+ | \s+$/g, '');
        },
        /**
         * @name 创建一个元素并包装成A对象
         * @param type 元素类型
         * @param value 元素属性对象
         */
        create: function(type, value){
            var dom = document.createElement(type);
            return A(dom).attr(value);
        },
        /**
         * @name 从格式化模板
         * @param str 模板字符串
         * @param data 渲染数据
         * eg '<div>{#value#}</div>' + {value: 'etst'} -> '<div>etst</div>'
         */
        formatString: function(str, data){
            var html = '';
            // 如果传入的是数组，则遍历数组并渲染
            if(data instanceof Array){
                for(var i=0,len=data.length; i<len; i++){
                    html += arguments.callee(str, data[i]);
                }

                return html;
            }
            else{
                return str.replace(/\{#(\w+)#\}/g, function(match, key){
                    return typeof data === 'string' ? data : (typeof data[key] === 'undefined' ? '': data[key]);
                });
            }

        }
    });

    // 事件绑定方法
    var _on = (function(){
        // 如果为标准浏览器
        if(document.addEventListener){
            return function(dom, type, fn, data){
                dom.addEventListener(type, function(e){
                    fn.call(dom, e, data);
                });
            };
        }
        else if(document.attachEvent){
            //IE浏览器
            return function(dom, type, fn, data){
                dom.attachEvent('on'+type, function(e){
                    fn.call(dom, e, data);
                });
            }
        }
        else{
            // 老版本浏览器
            return function(dom, type, fn, data){
                dom['on'+type] = function(e){
                    fn.call(dom, e, data);
                };
            }
        }
    })();

    A.fn.extend({
        // 添加事件
        on: function(type, fn, data){
            var i = this.length;
            for(; --i>=0;){
                // 闭包 保存i
                _on(this[i], type, fn, data);
            }
            return this;
        },
        css: function(){
            var arg = arguments;
            var len = arguments.length;
            // 如果没有元素则返回
            if(this.length < 1){
                return this;
            }

            // 如果是一个参数
            if(len === 1){
                if(typeof arg[0] === 'string'){
                    if(this[0].currentStyle){
                        // IE浏览器
                        return this[0].currentStyle[arg[0]];
                    }
                    else{
                        return getComputedStyle(this[0], false)[arg[0]];
                    }
                }
                else if(typeof arg[0] === 'object'){
                    // 如果参数为对象，则为所有元素设置样式
                    for(var i in arg[0]){
                        for(var j=this.length-1; j>=0; j--){
                            this[j].style[A.camelCse(i)] = arg[0][i];
                        }
                    }
                }
            }
            else if(len === 2){
                // 如果是两个参数
                for(var j=this.length-1; j>=0; j--){
                    this[j].style[A.camelCase(arg[0])] = arg[1];
                }
            }

            return this;
        },
        attr: function(){
            var arg = arguments;
            var len = arguments.length;
            if(this.length < 1){
                return this;
            }

            if(len == 1){
                if(typeof arg[0] === 'string'){
                    return this[0].getAttribute(arg[0]);
                }
                else if(typeof arg[0] === 'object'){
                    for(var i in arg[0]){
                        for(var j=this.length-1; j>=0; j--){
                            this[j].setAttribute(i, arg[0][i]);
                        }
                    }
                }
            }
            else if(len == 2){
                for(var j=this.length-1; j>=0; j--){
                    this[j].setAttribute(arg[0], arg[1]);
                }
            }

            return this;
        },
        // 获取或设置元素内容
        html: function(){
            var arg = arguments;
            var len = arguments.length;

            if(this.length < 1){
                return this;
            }

            // 如果没有参数则返回获取到的第一个元素内容
            if(len == 0){
                return this[0].innerHTML;
            }
            else if(len == 1){
                // 如果是一个参数，则设置所有获取到的元素的内容
                for(var i=this.length-1; i>=0; i--){
                    this[i].innerHTML = arg[0];
                }
            }
            // 如果两个参数，并且第二个参数为true，则为所有元素追加内容
            else if(len == 2 && arg[1]){
                for(var i=this.length-1; i>=0; i--){
                    this[i].innerHTML += arg[0];
                }
            }

            return this;
        },
        // 判断类名是否存在
        hasClass: function(val){
            if(!this[0]){
                return;
            }

            // 类名除去前后空白符
            var value = A.trim(val);

            return this[0].ClassName && this[0].className.indexOf(value)!=-1 ? true : false; 
        },
        // 添加类名
        addClass: function(val){
            var value = A.trim(val);
            var str = '';

            for(var i=0,len=this.length; i<len; i++){
                str = this[i].className;
                if(-1 == str.indexOf(value)){
                    this[i].className += ' ' + value;
                }
            }

            return this;
        },
        // 移除类名
        removeClass: function(val){
            var value = A.trim(val);
            var classNameArr = [];
            var result = '';

            for(var i=0, len=this.length; i<len; i++){
                if(this[i].className && ~this[i].className.indexOf(value)){
                    classNameArr = this[i].className.split(' ');
                    result = '';
                    for(var j=classNameArr.length-1; j>=0; j--){
                        classNameArr[j] = A.trim(classNameArr[j]);
                        result += className[j] && classNameArr[j]!=value ? (" " + classNameArr[j]) : "";
                    }

                    this[i].className = result;
                }
            }

            return this;
        },
        // 插入元素
        appendTo: function(parent){
            var doms = A(parent);
            if(dom.length){
                for(var j=this.length-1; j>=0; j--){
                    // 这里是简化操作，只像第一个父元素添加子元素
                    doms[0].appendChild(this[j]);
                }
            }
        }
    });

    /**
     * 运动框架单体对象
     */
    var Tween = {
        timer: 0, // 计数器句柄
        queen: [], // 运动成员队列
        interval: 16, // 运动间隔
        // 缓冲函数
        easing: {
            // 默认 匀速运动
            def: function(time, startValue, changeValue, duration){
                return changeValue * time / duration + startValue;
            },
            // 缓慢结束
            easeOutQuart: function(time, startValue, changeValue, duration){
                return -changeValue * ((time=time/duration-1)*time*time*time-1) + startValue;
            }
        },
        /**
         * 添加运动成员
         */
        add: function(instance){
            this.queen.push(instance);
            this.run;
        },
        /**
         * 停止框架运行
         */
        clear: function(){
            clearInterval(this.timer);
            this.timer = 0;
        },
        /**
         * 运行框架
         */
        run: function(){
            if(this.timer){
                return;
            }

            this.clear();

            this.timer = setInterval(this.loop, this.interval);
        },
        /**
         * 运动框架循环方法
         */
        loop: function(){
            if(Tween.queen.length == 0){
                Tween.clear();
                return;
            }

            var now = +new Date();
            for(var i=Tween.queen.length-1; i>=0; i--){
                var instance = Tween.queen[i];
                instance.passed = now - instance.start;
                if(instance.passed < instance.duration){
                    Tween.workFn(instance);
                }
                else{
                    Tween.endFn(instance);
                }
            }
        },
        /**
         * 运行方法
         */
        workFn: function(instance){
            instance.tween = this.easeing[instance.type](instance.passed, instance.from, instance.to - intance.from, instance.duration);
            this.exec(instance);
        },
        /**
         * 结束方法
         */
        endFn: function(instance){
            instance.passed = instance.duration;
            instance.tween = instance.to;
            this.exec(instance);
            this.distory(intance);
        },
        /**
         * 执行主函数
         */
        exec: function(instance){
            try{
                instance.main(instance.dom);
            }
            catch(e){

            }
        },
        /**
         * 注销运动成员
         */
        distory: function(instance){
            instance.end();
            this.queen.splice(this.queen.indexOf(instance), 1);
            for(var i in instance){
                delete instance[i];
            }
        }
    };

    Tween.queen.indexOf = function(){
        var that = this;
        return Tween.queen.indexOf || function(instance){
            for(var i=0, len=that.length; i<len; i++){
                if(that[i] === instance){
                    return i;
                }
            }
            
            return -1;
        }
    }();

    A.fn.extend({
        /**
         * 动画模块
         */
        animate: function(obj){
            var obj = A.extend({
                duration: 400,
                type: 'def',
                from: 0,
                to: 1,
                start: +new Date(),
                dom: this, 
                main: function(){},
                end: function(){}
            }, obj);

            Tween.add(obj);
        }
    });

    /**
     * @name 避免框架别名冲突
     */
    A.noConflict = function(library){
        if(library){
            window.$ = library;
        }
        else{
            window.$ = null;
            delete window.$;
        }

        return A;
    };

    window.$ = window.A = A;
})(window);