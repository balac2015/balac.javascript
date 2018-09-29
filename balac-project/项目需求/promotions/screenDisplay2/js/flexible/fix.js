/**
 * @file 文件的描述
 * @author Y50 <yujun.li@partner.midea.com.cn>
 * @copyright
 * @license Released under the Commercial license.
 * @since 1.0.1
 * @version 1.0.1 - 2015-9-8
 */
var winFactor = 1;
var docStyleFontSize;

var preSeperateHeight = 0;
var seperateHeight = 0;


(function (doc, win) {
    'use strict';

    var devicePixelRatio = win.devicePixelRatio,
        viewport = document.createElement('meta');

    viewport.name='viewport';
    document.getElementsByTagName('head')[0].appendChild(viewport);

    if (devicePixelRatio === 2) {
        viewport.content='initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no';
    } else if (devicePixelRatio === 3) {
        viewport.content='initial-scale=0.3333333333, maximum-scale=0.3333333333, minimum-scale=0.3333333333, user-scalable=no';
    } else {
        viewport.content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
    //不断检查fontSytle,使其符合设定
    function checkFontStyleSize() {

        setTimeout(function(){
            var htmlFontSize = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2);
            var docFontSize = docStyleFontSize.substr(0,docStyleFontSize.length-2);
            var offset = Number(htmlFontSize) - Number(docFontSize)
            if (preSeperateHeight != seperateHeight) {
                adaptSeperate();
                preSeperateHeight = seperateHeight;
            }
            if (Math.abs(offset) > 0.01){
                document.documentElement.style.fontSize = docStyleFontSize;
                resizeBody();
            }
            checkFontStyleSize();
        },100);
    }

    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            var clientHeight = docEl.clientHeight;
            if (!clientWidth) {
                return;
            }
            var widthFactor = clientWidth / 3840;
            var heightFactor = clientHeight / 2160;
            winFactor =  Math.min(widthFactor,heightFactor);
            if (winFactor == widthFactor) {
                //y方向较大,间隔区分4份
                seperateHeight = (clientHeight*heightFactor - clientHeight*widthFactor)/2;
                if (seperateHeight < 0) {
                    seperateHeight = 0;
                }
            } else {
                seperateHeight = 0;
            }

            docStyleFontSize = 100 * (winFactor) + 'px';
            /*docEl.style.fontSize = 100 * (winFactor) + 'px';*/
            checkFontStyleSize();
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
