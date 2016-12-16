function formatTemplate(template, data){
    var result = "";
    if(Object.prototype.toString.call(data) === "[object Array]"){
        for (var i=0,len=data.length; i<len; i++) {
            result += template.replace(/\{#\w+#\}/g, function(word){
                var item = word.replace(/^\{#|#\}$/g, '');
                if(typeof data[i][item] !== 'undefined'){
                    return data[i][item];;
                }

                return "";
            });
        }
    }
    else if(typeof data === 'object'){
        result = template.replace(/\{#\w+#\}/g, function(word){
            var item = word.replace(/^\{#|#\}$/g, '');
            if(typeof data[item] !== 'undefined'){
                return data[item];;
            }

            return "";
        });
    }

    return result;
}

window.onload = function(){
    // 从注释节点中获取模板
    var list = document.getElementById('list');
    var listTemp = list.firstChild.nodeValue;
    var itemStr = formatTemplate(listTemp, {url:'http://www.baidu.com', name:'百度一下'});
    console.log(itemStr);
    list.innerHTML = itemStr;

    // 从script标签中获取模板
    var script = document.getElementById('template');
    listTemp = script.text.replace(/^\s*|\s*$/, '');
    console.log(listTemp);
    itemStr = formatTemplate(listTemp, [{url:'http://www.baidu.com', name:'百度一下'},{url:'http://www.baidu.com', name:'百度一下'}]);
    console.log(itemStr);
    list.innerHTML += itemStr;
};