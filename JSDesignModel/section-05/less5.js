var A = function(selector){
	return A.fn.init(selector);
}

A.fn = A.prototype = {
	init: function(selector){
		this[0] = selector;
		this.length = 1;
		return this;
	},
	length: 0,
	size: function(){
		return this.size;
	}
}
