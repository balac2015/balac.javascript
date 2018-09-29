/**
 * @file 文件的描述
 * @author Y50 <yujun.li@partner.midea.com.cn>
 * @copyright
 * @license Released under the Commercial license.
 * @since 1.0.1
 * @version 1.0.1 - 2015-9-8
 */
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

    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
