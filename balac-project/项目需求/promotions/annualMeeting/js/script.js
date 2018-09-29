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
    }
    });
    $('#last-page').click(function() {
        $.fn.fullpage.moveTo(0, true);
        $('.anto-text1').addClass('toBottom');
        $('.anto-text1').removeClass('toTop');
        $('.anto-text2').addClass('toBottom');
        $('.anto-text2').removeClass('toTop');
    });
});

