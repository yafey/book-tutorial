//--------------------------------------------------------------
// 模板方法模式

var Alert = function(data){
	if(!data){
		return;
	}
	
	this.content = data.content;
	this.panel   = document.createElement('div');
	this.contentNode = document.createElement("p");
	this.confirmBtn  = document.createElement("span");
	this.closeBtn = document.createElement("b");
	this.panel.className = 'alert';
	this.closeBtn.className = 'a-close';
	this.confirmBtn.className = 'a-confirm';
	this.confirmBtn.innerHTML = data.confirm || '确认';
	this.contentNode.innerHTML = this.content;
	this.success = data.success || function(){};
	this.fail = data.fail || function(){};
}

Alert.prototype = {
	init: function(){
		this.panel.appendChild(this.closeBtn);
		this.panel.appendChild(this.contentNode);
		this.panel.appendChild(this.confirmBtn);
		document.body.appendChild(this.panel);
		this.bindEvent();
		this.show();
	},
	bindEvent: function(){
		var me = this;
		this.closeBtn.onclick = function(){
			me.fail();
			me.hide();
		},
		this.confirmBtn.onclick = function(){
			me.success();
			me.hide();
		}
	},
	hide: function(){
		this.panel.style.display = 'none';
	},
	show: function(){
		this.panel.style.display = 'block';
	}
};

var RightAlert = function(data){
	Alert.call(this, data);
	this.confirmBtn.className = this.confirmBtn.className + ' right';
};

RightAlert.prototype = new Alert();

var rightAlert = new RightAlert({
	content: 'this is a test'
});

rightAlert.init();

//-----------------------------------------------------------
function formateString (str, data) {
	return str.replace(/\{#(\w+)#\}/g, function(match, key){
		return typeof data[key] === undefined ? '' : data[key];
	});
}

var Nav = function(data){
	this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
	this.html = '';
	for(var i=0,len=data.length; i<len; i++){
		this.html += formateString(this.item, data[i]);
	}
	
	return this.html;
};

var nav = Nav([{href:"www.baidu.com", title:'百度一下', name:'baidiyixia'}]);
var container = document.createElement("div");
container.innerHTML = nav;
document.body.appendChild(container);

//--------------------------------------------------------------------------------------
// 观察者模式 / 订阅-发布模式

// 观察者   
var Observer = (function(){
	var __message = {}; // 消息队列
	return {
		// 订阅
		regist: function(type, fn){
			// 判断消息类型是否已经存在，存在则加入到消息执行队列中，不存在则创建该类型消息
			if(typeof __message[type] === 'undefined'){
				__message[type] = [fn];
			}
			else{
				__message[type].push(fn);
			}
		},
		// 发布
		fire: function(type, args){
			// 不存在该类型消息
			if(!__message[type]){
				return;
			}
			// 定义消息格式
			var events = {
				type: type,
				args: args || {}
			},
			i = 0,
			len = __message[type].length;
			
			// 循环执行注册的消息对应的执行方法
			for(; i<len; i++){
				__message[type][i].call(this, events);
			}
		},
		// 取消订阅
		remove: function(type, fn){
			if(__message[type] instanceof Array){
				var i = __message[type].length - 1;
				for(i; i>=0; i--){
					__message[type][i] === fn && __message[type].splice(i, 1);
				}
			}
		}
	}
})();

Observer.regist('test', function(e){
	console.log(e.type, e.args.msg);
});

Observer.fire('test', {msg: 'params'});

//------------------------------------------------------------------

// 状态模式
var MarryState = function() {
	// 保存当前状态
	var __currentState = {};
	
	var states = {
		'jump': function(){
			console.log('marry jump');
		},
		'move': function(){
			console.log('marry move');
		},
		'shoot': function(){
			console.log('marry shoot');
		},
		'squat': function(){
			console.log('marry squat');
		}
	};
	
	var Action = {
		changeState: function (){
			__currentState = {};
			
			for(var i=0; i<arguments.length; i++){
				__currentState[arguments[i]] = true;
			}
			
			return this;
		},
		goes: function (){
			for(type in __currentState){
				if(__currentState[type]){
					states[type] && states[type]();
				}
			}
			
			return this;
		}
	}
	
	return {
		changeState: Action.changeState,
		goes: Action.goes
	}
};

MarryState().changeState('jump', 'shoot').goes().goes().changeState('move').goes();

//------------------------------------------------------------------------------------------

// 对象访问器  
var Visitor = (function(){
	return {
		splice: function(){
			var args = Array.prototype.splice.call(arguments, 1);
			return Array.prototype.splice.apply(arguments[0], args);
		},
		push: function(){
			var len = arguments[0].length || 0;
			var args = this.splice(arguments, 1);
			// 这句代码可以必须， 这里的功能是手动校正类数组的长度
			arguments[0].length = len + arguments.length - 1;
			return Array.prototype.push.apply(arguments[0], args);
		},
		pop: function(){
			return Array.prototype.pop.apply(arguments[0]);
		}
	}
})();
