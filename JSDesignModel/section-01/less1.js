function checkName(){
	console.log('checkName');
}

function checkEmail(){
	console.log('checkEmail');
}

function checkPassword(){
	console.log('checkPassword');
}
////////////////////////////////////////////
var checkName1 = function(){
	console.log('checkName1');
};

var checkEmail1 = function(){
	console.log('checkEmail');
};

var checkPassword1 = function(){
	console.log('checkPassword');
};
///////////////////////////////////////////////////
var checkObject = {
	checkName: function(){
		console.log('checkObject::checkName');
	},
	checkEmail: function(){
		console.log('checkObject::checkEmail');
	},
	checkPassword: function(){
		console.log('checkPassword');
	}
}
///////////////////////////////////////////////////////
var checkFactory = function(){
	return {
		checkName: function(){
			console.log('checkFactory::checkName');
		},
		checkEmail: function(){
			console.log('checkFactory::checkEmail');
		},
		checkPassword: function(){
			console.log('checkFactory::checkPassword');
		}
	};
}
//////////////////////////////////////////////////////////
var CheckClass = function(){
	this.checkName = function(){
		console.log('checkName1');
	};
	
	this.checkEmail = function(){
		console.log('checkEmail');
	};
	
	this.checkPassword = function(){
		console.log('checkPassword');
	};
};
////////////////////////////////////////////////////////////////
var CheckPrototype = function(){};
CheckPrototype.prototype.checkName = function(){
	console.log('checkName');
};
CheckPrototype.prototype.checkEmail = function(){
	console.log('checkEmail');
};
CheckPrototype.prototype.checkPassword = function(){
	console.log('checkPassword');
};

//or

CheckPrototype.prototype = {
	checkName: function(){
		console.log('checkName');
	},
	checkEmail: function(){
		console.log('checkEmail');
	},
	checkPassword: function(){
		console.log('checkPassword');
	}
}

// 链式调用
CheckPrototype.prototype = {
	checkName: function(){
		console.log('checkName');
		return this;
	},
	checkEmail: function(){
		console.log('checkEmail');
		return this;
	},
	checkPassword: function(){
		console.log('checkPassword');
		return this;
	}
}

//var a = new CheckPrototype();
//a.checkName().checkEmail().checkPassword();
//////////////////////////////////////////////////////////////////
Function.prototype.addMethod = function(name, f){
	this[name] = f;
};

//var methods = function(){};
//methods.addMethod('checkName', function(){console.log('checkName');});
//methods.addMethod('checkEmail', function(){console.log('checkEmail');});
//methods.addMethod('checkPassword', function(){console.log('checkPassword');});
//
//methods.checkName();
////////////////////////////////////////////////////////////////////////
Function.prototype.addMethod = function(name, f){
	this.prototype[name] = f;
};


//var methods = function(){};
//methods.addMethod('checkName', function(){console.log('checkName');});
//methods.addMethod('checkEmail', function(){console.log('checkEmail');});
//methods.addMethod('checkPassword', function(){console.log('checkPassword');});
//
//var n = new methods();
//m.checkName();
////////////////////////////////////////////////////////////////////

