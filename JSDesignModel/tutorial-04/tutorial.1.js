// 行为型设计模式

// 模板方法模式
// --- 父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类算法结构的同时可重新定义算法中的某些实现步骤
// --- 模板方法的核心在于对方法的重用，把核心方法封装在基类中，让子类继承基类的方法，实现基类方法共享。基类中的方法通常是不变的或者具有稳定的调用方式
//     子类继承的方法是可以扩展的，对继承的基类方法进行重新。

// 观察者模式
// --- 发布-订阅者模式

// 观察者
var Observer = (function(){
	var __messge = {};

	return {
		regist: function(type, fn){
			// 不存在的消息类型，新增
			if(typeof __messge[type] === 'undefined'){
				__messge[type] = [fn];
			}
			// 已存在消息类型，则添加到执行函数队列中
			else{
				__messge[type].push(fn);
			}
		},
		fire: function(type, args){
			if(!__messge[type]){
				return;
			}

			var event = {
				type: type,
				data: args || {}
			};

			for(var i=0, len=__messge[type].length; i<len; i++){
				__messge[type][i].call(this, event);
			}
		},
		remove: function(type, fn){
			if(typeof __messge[type] instanceof Array){
				return;
			}

			for(var i=__messge[type].length; i>=0; i--){
				__messge[type][i] === fn && __messge[type].splice(i, 1);
			}
		}
	};
}());


// 状态模式 
var MarryState = function(){
	var _currentState = {};
	var states = {
		jump: function(){
			console.log('jump');
		},
		move: function(){
			console.log('move');
		},
		shoot: function(){
			console.log('shoot');
		},
		squat: function(){
			console.log('squat');
		}
	};

	var Action = {
		changeState: function(){
			var arg = arguments;
			_currentState = {};
			if(arg.length){
				for(var i=0, len=arg.length; i<len; i++){
					_currentState[arg[i]] = true;
				}
			}

			return this;
		},
		goes: function(){
			for(var i in _currentState){
				states[i] && states[i]();
			}

			return this;
		}
	};

	return {
		change: Action.changeState,
		goes: Action.goes
	};
}

// 策略模式
// --- 将定义的一组算法封装起来，使其相互之间可以替换，封装的算法具有一定的独立性，不会随客户端变化而变化
// --- 
var InputStrategy = function(){
	var startegy = {
		notNull: function(value){
			return /\s+/.test(value) ? '请输入内容' : '';
		},
		number: function(value){
			return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字';
		},
		phone: function(value){
			return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value) ? '' : '请输入正确的电话号码格式,如：010-12345678 或者 0832-2345678';
		}
	};

	return {
		check: function(type, value){
			value = value.replace(/^\s+|\s+$/g, '');
			return startegy[type] ? startegy[type](value) : '未找到该类型的检测方法';
		},
		addStartegy: function(type, fn){
			startegy[type] = fn;
		}
	}
}();

// 职责链模式 
// --- 解决请求的发送者与请求的接受者之间的耦合，通过职责链上的多个对象对分解请求流程，实现请求在多个对象上传递，直到最后一个对象完成请求的处理


// 命名模式
// --- 将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化
var viewCommand = (function(){
	var tpl = {
		product: [
			'<div>',
				'<img src="{#src#}"/>',
				'<p>{#text#}</p>',
			'</div>'
		].join(""),
		title: [
			'<div class="title">',
				'<div class="main">',
					'<h2>{#title#}</h2>',
					'<p>{#tips#}</p>',
				'</div>',
			'</div>'
		].join('')
	};

	var html = '';

	function formateString(str, obj){
		return str.replace(/\{#(\w+)#\}/g, function(match, key){
			return obj[key];
		});
	} 

	var Action = {
		create: function(data, view){
			if(data.length){
				for(var i=0, len=data.length; i<len; i++){
					html += formateString(tpl[view], data[i]);
				}
			}
			else{
				html += formateString(tpl[view], data);
			}
		},
		display: function(container, data, view){
			if(data){
				this.create(data, view);
			}

			document.getElementById(container).innerHTML = html;

			html = "";
		}
	};

	return function excute(msg){
		msg.param = Object.prototype.toString.call(msg.param) === "[Object Array]" ? msg.param : [msg.param];

		Action[msg.comman].applay(Action, msg.param);
	};
}());


// 访问者模式
// --- 针对于对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法
var Visitor = (function(){
	return {
		splice: function(){
			var args = Array.prototype.splice.call(arguments, 1);
			return Array.prototype.splice.apply(arguments[0], args);
		},
		push: function(){
			//var len = arguments[0].length || 0;
			var args = Array.prototype.splice.call(arguments, 1);
			//arguments[0].length = len + args.length - 1;
			return Array.prototype.push.apply(arguments[0], args);
		},
		pop: function(){
			return Array.prototype.pop.apply(arguments[0]);
		}
	};
});

// 中介者模式
// --- 通过中介者对象封装一些列对象之间的交互，是对象之间不在相互引用，降低他们之间的耦合


// 备忘录模式
// --- 在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对对象使用或者对象恢复到以前的某个状态
function showPage(page, data){
	console.log(page, data);
}
var Page = function(){
	var cache = {};

	return function(page, fn){
		if(cache[page]){
			showPage(page, cache(page));
			fn && fn();
		}
		else{
			$.post('xxxx.action', {page: page}, function(ret){
				if(ret.header.ret != 0){
					showPage(page, ret.body);
					cache[page] = ret.body;
					fn && fn();
				}
				else{
					console.log('未获取到数据');
				}
			});
		}
	};
};


// 迭代器模式
// --- 在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素


// 解释器模式
// ---对于一种语言，给出其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子
