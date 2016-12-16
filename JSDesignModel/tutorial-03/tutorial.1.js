// 结构型设计模式

// 外观模式 
// 适用场景：多个子系统统一调用接口，但是各个子系统要达到相同功能的实现不一，使用外观模式进行封装

// DOM2级事件监听  <=ie8 attachEvent 其他 addEventListener
function addEvent(dom, type, fn){
	if(dom.addEventListener){
		dom.addEventListener(type, fn, false);
	}
	else if(dom.attchEvent){
		dom.attchEvent('on'+type, fn);
	}
	else{
		dom['on'+type] = fn;
	}
}

// 移除事件监听
function removeEvent(dom, type, fn){
	if(dom.removeEventListener){
		dom.removeEventListener(type, fn, false);
	}
	else if(dom.detachEvent){
		dom.detachEvent('on'+type, fn);
	}
	else{
		dom['on'+type] = null;
	}
}

// 事件对象获取的兼容
var getEvent = function(event){
	return event || window.event;
};
// 获取元素的兼容
var getTarget = function(event){
	var event = getEvent(event);
	return event.target || event.srcElement;
}
// 阻止默认行为
var preventDefault = function(event){
	var event = getEvent(event);
	if(event.preventDefault){
		event.preventDefault();
	}
	else{
		event.returnValue = false;
	}
}


// 适配器模式  不同类的接口通过适配器实现相同的功能， 通常会将类拆分重新组装


// 代理模式  


// 装饰者模式  在不改变原有对象的基础上通过对其进行包装拓展（添加属性或者方法），使原对象满足新的需求

// 为input添加额外的点击事件
var decorator = function(input, fn){
	var input = document.getElementById(input);

	if(typeof input.onclick === 'function'){
		var oldclick = input.onclick;
		input.onclick = function(){
			oldclick();
			fn();
		}
	}
	else{
		input.onclick = fn;
	}
}


// 桥接模式  


// 组合模式


// 享元模式   利用共享技术有效的支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销