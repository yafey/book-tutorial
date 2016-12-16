//--------------------------------------------------------------------------------------------------
var Book = function(name, price){
	this.name = name;
	this.price = price;
};

var b = new Book('javaScript', 34);

Book.prototype.display = function(){
	console.log(this.name);
}

var c = new Book('java', 45);
c.display(); // 输出java
b.display(); // 输出javaScript

Book.prototype = {
	getPrice: function(){
		console.log(this.price);
	}
};

var d = new Book('php', 67);
d.getPrice(); // 输出 67
d.display();  // Uncaught TypeError: d.display is not a function(…)
b.getPrice(); // Uncaught TypeError: b.getPrice is not a function(…)
c.getPrice(); // Uncaught TypeError: c.getPrice is not a function(…)

/*
 * JavaScript中任意对象都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过__proto__来访问。
 * ES5中有了对于这个内置属性标准的Get方法Object.getPrototypeOf().
 * Object.prototype 这个对象是个例外，它的__proto__值为null
*/

//js中__proto__和prototype的区别和关系？ https://www.zhihu.com/question/34183746/answer/58068402

//--------------------------------------------------------------------------------------------------
var Person = (function(){
	
	// 静态私有变量与静态私有方法
	var personCount = 0;
	function getPersonCount(){
		return personCount;
	}
	
	var __person = function (name, sex, age){
		if(this instanceof __person){
			// 公有属性
			this.name = name;
			this.sex  = sex;
			this.age  = age;
			
			// 公有方法
			this.getName = function(){return name;};
			this.getWeight = function(){return weight;};
			
			// 私有属性
			var weight = 70;
			var height = 176;
			
			// 私有方法
			function sayHello(){
				console.log('hello');
			}
		}
		else{
			return new __person(name, sex, age);
		}
	};
	
	__person.prototype = {
		// 共有方法
		run: function(){console.log('run');},
		say: function(){console.log('say');},
		// 共有方法
		handleCount: 2,
		hairColor: 'black',
		// constructor指向构造函数
		constructor: __person
	}

	// 静态属性与方法
	__person.isAlive = true;
	__person.lastTime = "2016-11-16 10:22:30";
	__person.getStatus = function(){return Person.isAlive;};
	
	return __person;
})();
//---------------------------------------------------------------------------------------------------------------
// 继承

// 类式继承
function SuperClass(){
	this.pvalue = true;
	this.books = ['js', 'css', 'html'];
}
SuperClass.prototype.getBooks = function(){
	console.log(this.books.join());
}

function SubClass(){	
	this.cvalue = false;
	this.files = ['exx', 'txt', 'pdf'];
}
SubClass.prototype = new SuperClass();
SubClass.prototype.getFiles = function(){
	console.log(this.files.join());
}

var instance1 = new SubClass();
var instance2 = new SubClass();
instance1.files.push('word');
instance1.books.push('nodejs');
instance1.cvalue = true;

instance1.getFiles();  // exx,txt,pdf,word
instance1.getBooks();  // js,css,html,nodejs
instance1.cvalue;      // true;

instance2.getFiles();  // exx,txt,pdf
instance2.getBooks();  // js,css,html,nodejs
instance2.cvalue;      // false;

//类式继承中，如果父类中存在引用类型的属性，则创建的实例会共用该引用属性， 基本类型不会共用；  原因就是引用类型传递的是地址，基本类型传递的是值

//---------------------------------------------------------------------------------------------------------------

// 构造函数继承
function SuperClass(id){
	this.books = ['js', 'css', 'html'];
	this.id = id;
}
SuperClass.prototype.showBooks = function(){
	console.log(this.books.join());
};

function SubClass(id){
	SuperClass.call(this, id);
}

var instance1 = new SubClass(10);
var instance2 = new SubClass(20);

instance1.books.push('nodejs');

instance1.books;      // ["js", "css", "html", "nodejs"]
instance1.showBooks(); // Uncaught TypeError: instance1.showBooks is not a function(…)
instance2.showBooks(); // Uncaught TypeError: instance1.showBooks is not a function(…)

// 构造函数继承，通过子类可以向父类传递参数, 这种写法利用了call方法改变构造函数的调用对象，实际作用跟在子类中声明父类的属性一样/
// 并且子类不能继承父类的原型对象

//--------------------------------------------------------------------------------------------------------------------------------

// 组合继承
function SuperClass(id){
	this.books = ['js', 'css', 'html'];
	this.id = id;
}
SuperClass.prototype.showBooks = function(){
	console.log(this.books.join());
};
SuperClass.prototype.vegetables = ['potato', "tomato"];

function SubClass(id){
	SuperClass.call(this, id);
}

SubClass.prototype = new SuperClass();
SubClass.prototype.getId = function(){console.log(id);};

var instance1 = new SubClass(10);
var instance2 = new SubClass(20);

instance1.books.push('nodejs');
instance1.vegetables.push('cucumber');
instance1.books;      // ["js", "css", "html", "nodejs"]
instance1.showBooks(); // js,css,html,nodejs
instance1.vegetables; // ["potato", "tomato", "cucumber"]
instance2.showBooks(); // js,css,html
instance2.vegetables; // ["potato", "tomato", "cucumber"]

// 组合继承虽然能结成父类的原型，但是在结成父类时，父类的构造函数执行了两次
// 组合继承虽然继承父类的引用属性不能在子类实例间共享，但是父类原型中的引用属性会共享

//----------------------------------------------------------------------------------------

// 原型式继承
function inheritObject(o){
	function F(){}
	F.prototype = o;
	
	return new F();
}

// 上面的方法，将传入的对象作为临时构造函数F的原型，inheritObject返回F的实例，这样子其实跟类式继承一样，父类存在引用类型属性将会被所有实例共享

// 寄生式继承
var book = {
	name: 'js',
	otherbooks: ['css', 'html']
}
function createBook(obj){
	var o = inheritObject(obj);
	o.getName = function(){
		console.log(name);
	}
	
	return o;
}

// 寄生式继承 继承原型
function inheritPrototype(subClass, superClass){
	var p = inheritObject(superClass.prototype);
	p.constructor = subClass;
	subClass.prototype = p;
}

// 寄生组合式继承
function SuperClass(name){
	this.name = name;
	this.colors = ['red', 'blue'];
}
SuperClass.prototype.getName = funtion(){
	console.log(this.name);
};

function SubClass(name, time){
	SuperClass.call(this, name);
	this.time = time;
}

inheritPrototype(SubClass, SuperClass);

SubClass.prototype.getiTime = function(){
	console.log(this.time);
}

var instance1 = new SubClass('hcxowe', 2015);
var instance2 = new SubClass('hcx', 2016);

instance1.colors.push('green');

instance1.colors; // ["red", "blue", "green"]
instance2.colors; // ["red", "blue"]

//------------------------------------------------------------------------------------------
