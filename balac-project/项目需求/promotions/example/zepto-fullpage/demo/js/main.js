$(function(){
    $('.go-top').show();
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
            if (data.prev < data.cur && data.cur === 3) {
                $('#go-top').hide();
            } else if (data.prev > data.cur && data.prev === 3) {
                $('#go-top').show();
            }
        }
    });
    $('#img-review').click(function() {
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
});

