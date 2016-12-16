// 架构型设计模式

// 同步模块模式
// 模块化---将复杂的系统分解成高内聚，低耦合的模块，使系统开发变得可控、可维护、可拓展，提高模块的复用率
var F = F || {};
F.define = function(str, fn){
    var parts = str.split('.');
    var old = parent = this;
    var i = len = 0;

    if(parts[0] === 'F'){
        parts = parts.splice(1);
    }

    if(parts[0] === 'define' || parts[0] === 'module'){
        return;
    }

    for(len=parts.length; i<len; i++){
        if(typeof parent[parts[i]] === 'undefined'){
            parent[parts[i]] = {};
        }

        old = parent;
        parent = parent[parts[i]];
    }

    if(fn){
        old[parent[--i]] = fn();
    }

    return this;
};
F.module = function(){
    var args = [].slice.call(arguments);
    var fn = args.pop();
    var parts = args[0] && args[0] instanceof Array ? args[0] : args;
    var modules = [];
    var modIDs = [];
    var i = 0;
    var ilen = parts.length;
    var parent, j, jlen;

    while(i<ilen){
        if(typeof parts[i] === 'string'){
            parent = this;
            modIDs = parts[i].replace(/^F\./, '').split('.');
            for(j=0,jlen=modIDs.length; j<jlen; j++){
                parent = parent[modIDs[j]] || false;
            }

            modules.push(parent);
        }
        else{
            modules.push(parts[i]);
        }

        i++;
    }

    fn.apply(null, modules);
};

// 异步模块模式



// Widget模式


// MVC 模式

// MVP 模式

// mvvm模式