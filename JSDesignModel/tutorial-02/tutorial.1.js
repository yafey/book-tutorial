// 创建型设计模式： 处理对象创建的设计模式

// 简单工厂模式
function CreateBook(name, time, type){
    var obj = Object.create();
    obj.name = name;
    obj.time = time;
    obj.type = type;

    obj.getName = function(){
        this.name;
    }

    return obj;
}

// 工厂方法模式  将不同的过程放在原型中，然后根据传入的参数确定使用那个执行方式，这样使用者不用关心创建对象的具体类，只需要调用工厂方法
var Factory = function(type, content){
    if(this instanceof Factory){
        var s = new this[type](content);
        return s; 
    }
    else{
        return new Factory(type, content);
    }
};
Factory.prototype = {
    js: function(content){

    },
    java: function(content){

    },
    UI: function(content){
        
    }
};

// 抽象工厂模式 过渡函数原型=new了一个父类对象，子类又new了一个过渡函数作为原型
var VehicleFactory = function(subType, superType){
	if(typeof VehicleFactory[superType] === 'function'){
		function F(){};
		F.prototype = new VehicleFactory[superType]();
		F.prototype.constructor = subType;
		
		subType.prototype = new F();
	}
	else{
		throw new Error('为创建该抽象类');
	}
}

VehicleFactory.Car = function(){
	this.type = 'Car';
};
VehicleFactory.Car.prototype = {
	getPrice: function(){
		return new Error('抽象方法');
	},
	getSpeed: function(){
		return new Error('抽象方法');
	}
};

VehicleFactory.Bus = function(){
	this.type = "Bus";
};
VehicleFactory.Bus.prototype = {
	getPrice: function(){
		return new Error('抽象方法');
	},
	getPassengetNum: function(){
		return new Error('抽象方法');
	}
};

// 建造者模式：关注创建对象过程，将复杂的整体拆分成细小可复用的模块，根据过程进行组装
var Human = function(param){
	this.skill = param && param.skill || '保密';
	this.hobby = param && param.hobby || '保密';
};
Human.prototype = {
	getSkill: function(){
		return this.skill;
	},
	getHobby: function(){
		return this.hobby;
	}
};

var Named = function(name){
	var that = this;
	(function(name, that){
		that.wholeName = name;
		if(name.indexOf(' ') > -1){
			that.firstName = name.slice(0, name.indexOf(' '));
			that.lastName  = name.slice(name.indexOf(' '));
		}
	})(name, that);
};

var Work = function(work){
	var that = this;
	(function(work, that){
		switch(word){
			case 'code': 
				that.work = '工程师',
				that.workDescript = "每天沉醉于编程";
				break;
			case 'UI':
			case 'UE':
				that.work = '设计师';
				that.workDescript = '设计更是一种艺术';
				break;
				
			default: 
				that.work = work;
				that.workDescript = '不可描述'; 
		}
	})(work, that);
};
Work.prototype.changeWork = function(work){
	this.work = work;
}
Work.prototype.changeDescript = function(descript){
	this.workDescript = descript;
}


var Person = function(name, work){
	var _person = new Human();
	_person.name = new Named(name);
	_person.work = new Work(work);
	
	return _person;
}

// 原型模式


//单例模式
var LazySingle = (function(){
	var _instance = null;
	
	function Single(){
		return {
			publicMethod: function(){},
			publicProperty: '1.0'
		}
	}
	
	return function(){
		if(!instance){
			_instance = Single();
		}
		
		return _instance;
	}
})();

console.log(LazySingle().publicProperty);