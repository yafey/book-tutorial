$(function(){
    $('div').before('xxxx').on('contextmenu',function(){return false;}).on('selectstart',function(){return false});
    $('<p>insertBefore</p>').insertBefore($('div'));

    $('input').on('input propertychange', function(){
        console.log(this.value);
    });
});