/* global $ */
/* global console */
/* global location */
$(document).ready(function() {
    /**
     * Created by fangchen on 2015-7-26.
     */
    'use strict';

    var audio = document.getElementById('bg-audio');
    $('.wp-inner').fullpage({
        drag: true,afterChange: function(data) {
            if (data.prev < data.cur) {
                var array = $('.page' + (data.cur + 1) + ' img');
                for (var i = 0; i < array.length; i++) {
                    if ($(array[i]).attr('src') === '') {
                        $(array[i]).attr('src', $(array[i]).attr('data-img'));
                    }
                }
            }
            if (data.prev < data.cur && data.cur === 6) {
                $('#to-next').hide();
            } else if (data.prev > data.cur && data.prev === 6) {
                $('#to-next').show();
            }
        }
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

