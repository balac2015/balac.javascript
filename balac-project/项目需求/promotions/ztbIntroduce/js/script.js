/* global $ */
/* global console */
/* global location */
$(document).ready(function() {
    /**
     * Created by fangchen on 2015-7-26.
     */
    'use strict';

    //var u = navigator.userAgent;
    //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //if (isiOS) {
    //    $('.img-page2-icon1').addClass('animate');
    //    $('.img-page2-icon2').addClass('animate');
    //    $('.img-page2-icon3').addClass('animate');
    //    $('.img-page2-icon4').addClass('animate');
    //    $('.img-page2-icon5').addClass('animate');
    //    $('.img-page2-icon6').addClass('animate');
    //    $('.img-page2-icon7').addClass('animate');
    //    $('.img-page2-icon-all').hide();
    //}
    var audio = document.getElementById('bg-audio');
    $('.wp-inner').fullpage({
        drag: true,afterChange: function(data) {
            if (data.prev < data.cur) {
                var array = $('.page' + (data.cur + 2) + ' img');
                for (var i = 0; i < array.length; i++) {
                    if ($(array[i]).attr('src') === '') {
                        $(array[i]).attr('src', $(array[i]).attr('data-img'));
                    }
                }
            }

            if (data.prev < data.cur && data.cur === 7) {
                $('#to-next').hide();
            } else if (data.prev > data.cur && data.prev === 7) {
                $('#to-next').show();
            }
        }
    });
    $('#img-review').click(function() {
        $.fn.fullpage.moveTo(0, true);
    });
    $('#text-review').click(function() {
        $.fn.fullpage.moveTo(0, true);
    });
    $('#img-music-on').click(function() {
        audio.pause();
        $('#img-music-on').hide();
        $('#img-music-off').show();
    });
    $('#img-music-off').click(function() {
        audio.play();
        $('#img-music-on').show();
        $('#img-music-off').hide();
    });
    $('#img-download').click(function() {
        window.location.href = 'http://ztbapp.annto.com.cn';
    });
});

