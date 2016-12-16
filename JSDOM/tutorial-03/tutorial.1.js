function addLoadEvent(fn){
    var oldOnlad = window.onload;
    if(typeof window.onload !== 'function'){
        window.onload = fn;
    }
    else{
        window.onload = function(){
            oldOnlad();
            fn();
        };
    }
}

addLoadEvent(function(){
    var h1 = document.createElement('h1');
    var text = document.createTextNode('this is created by createElement');
    
    h1.appendChild(text);

    document.getElementsByTagName('body')[0].appendChild(h1);

    var h2 = document.createElement('h2');
    var text2 = document.createTextNode('h2 by created');

    h2.appendChild(text2);

    document.getElementsByTagName('body')[0].insertBefore(h2, h1);

    var h3 = document.createElement('h3');
    var text3 = document.createTextNode('h3 by created');

    h3.appendChild(text3);

    insertAfter(h3, h1);

});

function insertAfter(newEle, targetEle){
    var parent = targetEle.parentNode;
    if(parent.lastChild == targetEle){
        parent.appendChild(newEle);
    }
    else{
        parent.insertBefore(newEle, targetEle.nextSibling);
    }
}


var getHttpObject = (function(){
    if(typeof XMLHttpRequest === 'undefined'){
        try{
            new ActiveXObject('Msxml2.XMLHTTP.6.0');
            return function(){
                return new ActiveXObject('Msxml2.XMLHTTP.6.0');
            }
        }
        catch(e){
        }

        try{
            new ActiveXObject('Msxml2.XMLHTTP.3.0');
            return function(){
                return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            }
        }
        catch(e){

        }

        try{
            new ActiveXObject('Msxml2.XMLHTTP');
            return function(){
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
        }
        catch(e){

        }

        return null;
    }

    return function(){
        return new XMLHttpRequest();
    }
}());

function AjaxGet(url, data, callback){
    var request = getHttpObject();
    if(request){
        request.open('GET', url, true);
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                callback && callback(request.responseText);
            }
        };

        request.send(data);
    }
    else{
        console.log('you browser do not support XMLHttpRequest');
    }
}