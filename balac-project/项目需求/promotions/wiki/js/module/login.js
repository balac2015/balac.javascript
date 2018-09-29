// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
// jscs:disable validateLineBreaks
/* global $ */
// jscs:enable validateLineBreaks
// jscs:disable requireDollarBeforejQueryAssignment
/* jshint -W106 */

/**
 *
 * @file 文件的描述
 * @author hezl2 <zhaolun.he@midea.com.cn>
 * @copyright Midea Co.Ltd 1968-2015
 * @license Released under the Commercial license.
 * @since 1.0.1
 * @version 1.0.2 - 2015-8-25
 */
var chk = false;

function QueryString(item) {
    'use strict';

    var sValue = window.location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)','i'));

    return sValue ? sValue[1] : sValue;
}

$(document).ready(function() {
    'use strict';

    var img = $('.myCheck img');

    if ($.cookie('mideaWikiName')) {
        chk = true;
        $('#os_username').val($.cookie('mideaWikiName'));
        img.eq(0).show();
    } else {
        img.eq(1).show();
    }

    $('.myCheck').click(function() {
        img.hide();
        chk = !chk;

        if (chk) {
            img.eq(0).show();
        } else {
            img.eq(1).show();
        }
    });

    // 初始化某条件 os_destination
    var des = QueryString('os_destination') ? QueryString('os_destination') : '/wiki.html';
   
    $('input[name=os_destination]').val(unescape(des));
});

function mySubmit() {
    'use strict';

    var userName = $('#os_username').val(),
        pwd = $('#os_password').val();

    userName = userName ? userName : '';
    pwd = pwd ? pwd : '';

    if (userName === '') {
        $('.js-name').show();

        return false;
    } else {
        $('.js-name').hide();
    }

    if (pwd === '') {
        $('.js-pwd').show();

        return false;
    } else {
        $('.js-pwd').hide();
    }

    if (chk) {
        $.cookie('mideaWikiName', userName, {
            path: '/', expires: 30
        });
    }

    return true;
}
