// 如何创建一个类，包含有：静态属性方法，公有私有属性方法？
var Book = (function(){
    // 静态私有变量
    var bookNum = 0;
    function checkName(name){}

    var _book = function(id, newName, newPrice){
        if(this instanceof _book){
            // 私有变量 方法
            var name, price;
            function checkID(){}

            // 共有属性，方法
            this.id = id;
            this.getName = function(){
                return name;
            };
            this.getPrice = function(){
                return price;
            };
            this.setName = function(newName){
                name = newName;
            };
            this.setPrice = function(newName){
                price = newName;
            };

            console.log(++bookNum);

            this.setName(newName);
            this.setPrice(newPrice);            
        }
        else{
            return new _book(id, name, price);
        }
    };

    _book.prototype = {
        // 静态公有属性
        isJSBook: false,
        // 静态共有方法
        displayName: function(){
            console.log(this.getName());
        }
    };

    return _book;
}());

