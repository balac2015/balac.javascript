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
        if(data.cur%2 === 0){
            $('.next_page .b').addClass('b-gray');
        }else {
            $('.next_page .b').removeClass('b-gray');
        }
        if(data.cur === 6){
            $('#show_next_page').addClass('hide');
        } else {
            $('#show_next_page').removeClass('hide');
        }
    }
    });
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        loop: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false
    });
    $('#last-play').click(function() {
        $.fn.fullpage.moveTo(0, true);

    });
});

