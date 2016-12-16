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

function displayAbbreviations(){
    var abbreviations = document.getElementsByTagName('abbr');
    if(abbreviations.length <= 0){
        return false;
    }

    var defs = {};
    [].slice.call(abbreviations).forEach(function(item){
        defs[item.lastChild.nodeValue.trim()] = item.getAttribute('title');
    });

    console.log(defs);

    var dlist = document.createElement('dl');

    for(key in defs){
        var definition = defs[key];
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);

        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);

        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }

    document.getElementsByTagName('body')[0].appendChild(dlist);
}

addLoadEvent(displayAbbreviations);