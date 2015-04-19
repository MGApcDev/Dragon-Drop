var varX;
var varY;
var varSrc;
var highlight_element;
var dragonNum = 0;
var normalSrc = '/images/article/dragon-drop/dragon1.png';
$(document).ready(function(){
    $('.dragon').removeClass('border_dragon');
    dragonNum = $('#totalDragon').attr('totalDragon');
    $("#drag").draggable({helper:"clone",
      start: function() {
        
      },
      drag: function(event) {
          event = event || window.event;
//          $('#drag').html(event.clientX+' and '+event.clientY);
          varX = event.clientX -100;
          varY = event.clientY -100;
          $('#dragon').show().css('top',event.clientY-100).css('left',event.clientX-100);
      },
      stop: function() {
          $('#dragon').hide();
          $('#dragonImg').append('<img src="/images/article/dragon-drop/dragon1.png" style="top:'+varY+'px; left:'+varX+'px;" class="dragon" dragonNum="'+dragonNum+'">');
          $.post('/php/article/dragonDrop/setDragonCookie.php',{dragonSrc: normalSrc, dragonTop: varY+'px', dragonLeft:varX+'px', dragonClass:'dragon', num: dragonNum});
          dragonNum++;
      }
    });
    
    $(document).on('click', '.dragon',function(){
        $('.dragon').removeClass('border_dragon');
        $(this).addClass('border_dragon');
        highlight_element = $(this);
        varSrc = highlight_element.attr('src');
        
    });
    $('#changeD').click(function(){
        varSrc = highlight_element.attr('src');
        if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon1.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon2.png');
        }else if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon2.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon1.png');
        }else if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon3.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon4.png');
        }else if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon4.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon3.png');
        }
        getAttr();
        setCookie();
        
    });
    $('#changeA').click(function(){
        varSrc = highlight_element.attr('src');
        if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon1.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon3.png');
        }else if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon2.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon4.png');
        }else if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon3.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon1.png');
        }else if(highlight_element.attr('src')=='/images/article/dragon-drop/dragon4.png'){
            highlight_element.attr('src','/images/article/dragon-drop/dragon2.png');
        }
        getAttr();
        setCookie();
    });
    $('#changeF').click(function(){
        varSrc = highlight_element.attr('src');
        topV = highlight_element.css('top');
        topV = topV.replace(/\D/g,'');
        leftV = highlight_element.css('left');
        if(varSrc == '/images/article/dragon-drop/dragon1.png' || varSrc == '/images/article/dragon-drop/dragon3.png'){
            leftV = parseInt(leftV.replace(/\D/g,'')) - 341;
        }else if(varSrc == '/images/article/dragon-drop/dragon2.png' || varSrc == '/images/article/dragon-drop/dragon4.png'){
            leftV = parseInt(leftV.replace(/\D/g,'')) - 248;
        }        
        //$('#drag').html(topV +' and ' +leftV);
            
        $('#dragonImg').append('<img src="'+varSrc+'" style="top:'+topV+'px; left:'+leftV+'px;" class="dragon flip-horizontal" dragonNum="'+dragonNum+'">');
        $.post('/php/article/dragonDrop/setDragonCookie.php',{dragonSrc: varSrc, dragonTop: topV+'px', dragonLeft:leftV+'px', dragonClass:'dragon flip-horizontal', num: dragonNum});
        dragonNum++;
        //highlight_element.addClass('flip-horizontal');
        getAttr();
        setCookie();
    });
    $(document).click(function(e) {
        if ( $(e.target).closest('.dragon').length === 0 ) {
            if ( $(e.target).closest('#toolbar').length === 0 ) {
                $('.dragon').removeClass('border_dragon');
                highlight_element=null;
            }
        }
    });
    $('#clearDragon').click(function(){
        $.post('/php/article/dragonDrop/clearDragonCookie.php', function(){
            window.location.href = "/project/dragon-drop-demo";
        });
    });
});
var topPX;
var leftPX;
var varClass;
var varDragon;

function getAttr(){
    varSrc = highlight_element.attr('src');
    topPX = highlight_element.css('top');
    leftPX = highlight_element.css('left');
    varClass = highlight_element.attr('class');
    varDragon = highlight_element.attr('dragonNum');
    
}
function setCookie(){
    $.post('/php/article/dragonDrop/setDragonCookie.php',{dragonSrc: varSrc, dragonTop: topPX, dragonLeft:leftPX, dragonClass:varClass, num: varDragon});
}