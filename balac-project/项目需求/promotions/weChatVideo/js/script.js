/* global $ */
/* global console */
/* global location */
$(document).ready(function() {
    /**
     * Created by fangchen on 2015-7-26.
     */
    'use strict';

    $('.wp-inner').fullpage({
        drag: true,afterChange: function(data) {
        if (data.prev === 0 && data.cur === 1) {
            $('.anto-text1').removeClass('toBottom');
            $('.anto-text1').addClass('toTop');
            $('.anto-text2').removeClass('toBottom');
            $('.anto-text2').addClass('toTop');
        } else if (data.prev === 1 && data.cur === 0) {
            $('.anto-text1').removeClass('toTop');
            $('.anto-text1').addClass('toBottom');
            $('.anto-text2').removeClass('toTop');
            $('.anto-text2').addClass('toBottom');
        }

        if (data.prev < data.cur && data.cur === 5) {
            $('.anto-text1').addClass('hide');
            $('.anto-text2').addClass('hide');
            $('.anto-title').addClass('hide');
            $('.anto-download').addClass('hide');
            $('.download-button').addClass('hide');
            $('.anto-logo').addClass('hide');
        } else if (data.prev > data.cur && data.prev === 5) {
            $('.anto-text1').removeClass('hide');
            $('.anto-text2').removeClass('hide');
            $('.anto-title').removeClass('hide');
            $('.anto-download').removeClass('hide');
            $('.download-button').removeClass('hide');
            $('.anto-logo').removeClass('hide');
        }
    }
    });
    $('.anto-download').click(function() {
        location.href = 'http://ztb.annto.com.cn/';
    });
    $('#last-play').click(function() {
        $.fn.fullpage.moveTo(0, true);
        $('.anto-text1').addClass('toBottom');
        $('.anto-text1').removeClass('toTop');
        $('.anto-text2').addClass('toBottom');
        $('.anto-text2').removeClass('toTop');
    });
    $('#first-play').click(function() {
        $.fn.fullpage.moveTo(1, true);
        $('.anto-text1').removeClass('toBottom');
        $('.anto-text1').addClass('toTop');
        $('.anto-text2').removeClass('toBottom');
        $('.anto-text2').addClass('toTop');
    });
});

