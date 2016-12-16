function showPic(whicepic){
    var src = whicepic.getAttribute('href');
    var title = whicepic.getAttribute('title');
    var placeholder = document.getElementById('placeholder');
    var desc = document.getElementById('description');
    placeholder.setAttribute('src', src);
    desc.firstChild.nodeValue = whicepic.getAttribute('title');
}

var alist = document.getElementsByTagName('a');
Array.prototype.slice.call(alist).forEach(function(item){
    item.onclick = function(evt){
        showPic(this);
        return false;
    }
});

function countBodyChildren(){
    var body = document.getElementsByTagName('body')[0];
    console.log(body.childNodes.length);
}

window.onload = function(){
    countBodyChildren();

    document.getElementById('btnWnd').onclick = function(){
        popUp('http://www.baidu.com');
    };
}

function popUp(url){
    window.open(url, 'popUp', 'width=800,height=600');
}