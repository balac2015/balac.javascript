/**
 * Created by fzb on 2015/10/15.
 */
/* global $ */

/* global checkDevice */
/* global navigator */
/* global alert */
/* global setTimeout */
window.onload = function() {
    'use strict';

    function checkDevice() {
        var u = navigator.userAgent;

        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            /*
             * 美创测试环境android
             **/
            // window.location.href = 'http://appstest.midea.com/map/mam/apps/download/com.midea.open.test/1.1.1/android?appKey=a55a425624280563c24a6f2b70ddd963';
            /*
             * 美创正式环境android
             **/
            window.location.href = 'http://map.midea.com/map/mam/apps/download/com.midea.open/1.0.1/android?appKey=0c1b88cd9d23081255990d210e1af20d';
        } else if (u.indexOf('iPhone') > -1) {
            /*
             * 美创测试环境ios
             **/
            // window.location.href = 'http://appstest.midea.com/map/mam/apps/download/com.midea.open.test/1.0.8/ios?appKey=a55a425624280563c24a6f2b70ddd963';
            /*
             * 美创正式环境ios
             **/
            window.location.href = 'http://map.midea.com/map/mam/apps/download/com.midea.open/ios?appKey=0c1b88cd9d23081255990d210e1af20d';
        } else if (u.indexOf('Windows Phone') > -1) {
            /**
             * Windows Phone
             */
            alert('目前只支持iphone和android两种方式下载！');

            return false;
        }
    }
    checkDevice();
    $('.download-option').click(function() {
        checkDevice();
    });
}
