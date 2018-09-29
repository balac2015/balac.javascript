
function initMenu() {
    setTimeout(function() {
        var rightMenu  = document.getElementById('rightMenuId');
        if (rightMenu != null) {
         $('#rightMenuId').bind("click",function(){
             if (document.getElementById('rightMenuBgId') != null) {
                 var display =$('#rightMenuBgId').css('display');
                 if(display == 'none'){
                     $('#rightMenuBgId').slideDown();
                 } else {
                     $('#rightMenuBgId').slideUp();
                 }
             }
            });
        } else {
            initMenu();
        }
    },100);
}

(function (doc, win) {
    'use strict';
    initMenu();
})(document, window);
