var varX;
var varY;
var varSrc;
var highlight_element;
var dragonNum = 0;
var defaultSrc = '/images/article/dragon-drop/dragon1.png';

var baseURL = '/images/article/dragon-drop/';
var extension = '.png';
var dragon1 = baseURL + "dragon1" + extension;
var dragon2 = baseURL + "dragon2" + extension;
var dragon3 = baseURL + "dragon3" + extension;
var dragon4 = baseURL + "dragon4" + extension;

$(document).ready(function(){
    $('.dragon').removeClass('border_dragon');
    dragonNum = $('#totalDragon').attr('totalDragon');
    $("#drag").draggable({helper:"clone",
      start: function() {
        // Nothing
      },
      drag: function(event) {
          event = event || window.event;
          varX = event.clientX -100;
          varY = event.clientY -100;
          $('#dragon').show().css('top',event.clientY-100).css('left',event.clientX-100);
      },
      stop: function() {
          $('#dragon').hide();
          $('#dragonImg').append('<img src="'+dragon1+'"" style="top:'+varY+'px; left:'+varX+'px;" class="dragon" dragonNum="'+dragonNum+'">');
          $.post(
              '/php/article/dragonDrop/setDragonCookie.php',
              {dragonSrc: defaultSrc, dragonTop: varY+'px', dragonLeft:varX+'px', dragonClass:'dragon', num: dragonNum}
          );
          dragonNum++;
      }
    });
    /**
     * Refreshes which 'dragon' to highlight.
     */
    $(document).on('click', '.dragon',function(){
        $('.dragon').removeClass('border_dragon');
        $(this).addClass('border_dragon');
        highlight_element = $(this);
        varSrc = highlight_element.attr('src');
        
    });
    /**
     * Changes between the two 'dragons'.
     */
    $('#changeD').click(function(){
        varSrc = highlight_element.attr('src');
        switch(varSrc){
            case dragon1:
                changeSrc(dragon2);
                break;
            case dragon2:
                changeSrc(dragon1);
                break;
            case dragon3:
                changeSrc(dragon4);
                break;
            case dragon4:
                changeSrc(dragon3);
                break;
        }
        getAttr();
        setCookie();
    });
    
    /**
     * Changes whether to show an ad on 'dragon'.
     */ 
    $('#changeA').click(function(){
        varSrc = highlight_element.attr('src');
        switch(varSrc){
            case dragon1:
                changeSrc(dragon3);
                break;
            case dragon2:
                changeSrc(dragon4);
                break;
            case dragon3:
                changeSrc(dragon1);
                break;
            case dragon4:
                changeSrc(dragon2);
                break;
        }
        getAttr();
        setCookie();
    });
    
    /**
     * Creates a copy of selected dragon and flips it horizontally.
     */
    $('#changeF').click(function(){
        varSrc = highlight_element.attr('src');
        topV = highlight_element.css('top');
        topV = topV.replace(/\D/g,'');
        leftV = highlight_element.css('left');
        
        if(varSrc == dragon1 || varSrc == dragon3){
            leftV = parseInt(leftV.replace(/\D/g,'')) - 341;
        }else if(varSrc == dragon2 || varSrc == dragon4){
            leftV = parseInt(leftV.replace(/\D/g,'')) - 248;
        }        

        $('#dragonImg').append('<img src="'+varSrc+'" style="top:'+topV+'px; left:'+leftV+'px;" class="dragon flip-horizontal" dragonNum="'+dragonNum+'">');
        $.post(
            '/php/article/dragonDrop/setDragonCookie.php',
            {dragonSrc: varSrc, dragonTop: topV+'px', dragonLeft:leftV+'px', dragonClass:'dragon flip-horizontal', num: dragonNum}
        );
        dragonNum++;
        getAttr();
        setCookie();
    });
    
    /**
     * Removes highlight if click event doesn't hit toolbar or a dragon.
     */
    $(document).click(function(e) {
        if ( $(e.target).closest('.dragon').length === 0 ) {
            if ( $(e.target).closest('#toolbar').length === 0 ) {
                $('.dragon').removeClass('border_dragon');
                highlight_element = null;
            }
        }
    });
    
    /**
     * Clears all cookies that specify dragons and refreshes page.
     */
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

/**
 * Changes the source of highlighted element
 */
function changeSrc(source){
     highlight_element.attr('src', source);
}

/**
 * Refreshes the attributes on the highlighted element.
 */
function getAttr(){
    varSrc = highlight_element.attr('src');
    topPX = highlight_element.css('top');
    leftPX = highlight_element.css('left');
    varClass = highlight_element.attr('class');
    varDragon = highlight_element.attr('dragonNum');
}

/**
 * Updates the highlighted dragon's cookie.
 */
function setCookie(){
    $.post(
        '/php/article/dragonDrop/setDragonCookie.php',
        {dragonSrc: varSrc, dragonTop: topPX, dragonLeft: leftPX, dragonClass: varClass, num: varDragon}
    );
}
