// 类如何继承，继承有那些方式

// 方式一: 类式继承： 通过将子类的原型指定为父类的实例
function SuperClass(){
    this.superValue = true;
}
SuperClass.prototype.getSuperValue = function(){
    return this.superValue;
};

function SubClass(){
    this.subValue = true;
}
SubClass.prototype = new SuperClass();
SubClass.prototype.getSubValue = function(){
    return this.subValue;
};

// 方式二： 构造函数继承： 在子类构造函数中通过call或者apply调用父类的构造函数，实现继承父类定义的属性方法
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

// 方式三：组合继承： 方式一与方式二的组合模式
function SuperClass(name){
    this.name = name;
    this.books = ['js', 'css','html'];
}
SuperClass.prototype.getName = function(){
    console.log(this.name);
};

function SubClass(name, time){
    SuperClass.call(this, name);
    this.time = time;
}
SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function(){
    console.log(this.time);
}

// 方式四： 原型式继承： 使用过渡函数作为构造函数，传入的对象作为过渡函数的原型
function inheritObject(o){
    function F(){}
    F.prototype = o;
    return new F();
}

// 方式五： 寄生式继承： 在方式四的基础上进行二次封装
function createBook(obj){
    var o = inheritObject(obj);
    o.getName = function(){
        console.log(this.name);
    };

    return o;
}

//  方式六： 寄生组合式继承： 寄生式继承跟够构造函数继承的组合
function inheritPrototype(SubClass, SuperClass){
    var p = inheritObject(SuperClass.prototype);
    p.constructor = SubClass;
    SubClass.prototype = p;
}

function SuperClass(name){
    this.name = name;
    this.books = ['js', 'css','html'];
}

SuperClass.prototype.getName = function(){
    console.log(this.name);
};

function SubClass(name, time){
    SuperClass.call(this, name);
    this.time = time;
}

inheritPrototype(SubClass, SuperClass);

SubClass.prototype.getTime = function(){
    console.log(this.time);
}