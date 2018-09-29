$(function(){
    $('.go-top').show();
    var downeloadWidth = $('.img-download')[0].width,
        reviewWidth = $('.img-review')[0].width;

    //$('.img-download').css('margin-left', -downeloadWidth / 2);
    //$('.img-review').css('margin-left', -reviewWidth / 2);
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
            if (data.prev < data.cur && data.cur === 6) {
                $('#go-top').hide();
            } else if (data.prev > data.cur && data.prev === 6) {
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
function download() {
    window.location.href = 'http://ztbapp.annto.com.cn';
}

