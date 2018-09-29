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
            if (data.prev < data.cur && data.cur === 12) {
                $('#img-next').hide();
                $('#img-before').show();
            } else if (data.prev > data.cur && data.prev === 12) {
                $('#img-next').show();
                $('#img-before').hide();
            }
        }
    });
    $('#img-before').click(function() {
        $.fn.fullpage.moveTo(0, true);
    });
});

