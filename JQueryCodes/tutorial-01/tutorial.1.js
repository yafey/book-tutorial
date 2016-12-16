(function($){
    console.log('start');
}(jQuery));

$(document).ready(function(){
    console.log('end');
});

$(function(){
    console.log('end');

    $('#showDiv').click(function(){
        $('div').show(1000, function(){console.log('finish show');});
    });

    $('#hideDiv').click(function(){
        $('div').hide(1000, function(){console.log('finish hide');});
    });

    $('#toggleDiv').click(function(){
        $('div').toggle(1000, function(){console.log('finish toggle');});
    });

    $('#fadeInDiv').click(function(){
        $('div').fadeIn(1000, function(){console.log('finish fadeIn');});
    });

    $('#fadeOutDiv').click(function(){
        $('div').fadeOut(1000, function(){console.log('finish fadeOut');});
    });

    $('#fadeToggleDiv').click(function(){
        $('div').fadeToggle(1000, function(){console.log('finish fadeToggle');});
    });

    $('#fadeToDiv').click(function(){
        $('div').fadeTo(1000, 0.6, function(){console.log('finish fadeTo');});
    });

    $('#slideUpDiv').click(function(){
        $('div').slideUp(1000, function(){console.log('finish slideUp');});
    });

    $('#slideDownDiv').click(function(){
        $('div').slideDown(1000, function(){console.log('finish slideDown');});
    });

    $('#slideToggleDiv').click(function(){
        $('div').slideToggle(1000, function(){console.log('finish slideToggle');});
    });

    $('#animateDiv').click(function(){
        $('div').animate({backgroundColor: 'yellow', opacity: '0.2'}, 2000, function(){console.log('finish animate');});
    });

    $('#animateStopDiv').click(function(){
        $('div').stop(true, true);
    });

    $('#backTop').click(function(e){
        $('body').animate({scrollTop: 0}, 1000);
        console.log(e.screenX, e.screenY, e.clientX, e.clientY, e.pageX, e.pageY);
    });
});