$(document).ready(function () {
    /**
     * Created by Jun on 2015-5-22.
     */
    var viewList = $('ul.view-list');
    var viewsCount = viewList.children().length;
    var currentView = 0;
    var lastPercent = 100;
    var scrolling = false;
    var direction = -1;
    var animationConfig = {
        name: 'scroll',
        duration: 400,
        delay: 0,
        repeat: 0,
        easing: 'ease-out'
    };
    var scrollAnimation = collide.animation(animationConfig);
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    viewList.find('.msg, .line').css('max-width', windowHeight / 1.777);
    viewList.find('.msg, .line').css('left', (windowWidth - windowHeight / 1.777) / 2);
    $('.line').css('background-size', '100% ' + windowHeight + 'px');

    function viewChangeStart() {
        scrolling = true;
        $('.next-button').hide();
        console.log('Scroll start');
        if (currentView == 0) {
            rocketIn();
            $('.start-button').show();
        } else {
            $('.start-button').hide();
        }
        if (currentView == 1 && direction == -1) {
            rocketOut();
        }
        $('#code').hide();
    }

    function viewChanged() {
        scrolling = false;
        lastPercent = scrollAnimation.percent() * 100;
        var view = viewList.children().eq(currentView);
        if (currentView >= 1 && !view.hasClass('active')) {
            view.addClass('active');
            view.find('line').addClass('active');
            lineIn();
        }
        if (currentView != viewsCount - 1 && currentView != 0) {
            $('.next-button').show();
            $('.replay-button').hide();
        } else if (currentView == viewsCount - 1) {
            $('#code').show();
            $('.replay-button').show();
        }
    }

    $('ul.view-list li, .next-button, .rocket, .fire').on('swipeup swipedown', function (ev) {
        direction = ev.type == 'swipeup' ? -1 : 1;
        if (direction == -1 && !(direction == -1 && currentView < viewsCount - 1) || direction == 1 && !(direction == 1 && currentView > 0)) return;
        if (scrolling) scrollAnimation.stop();
        currentView -= direction;
        scrollToNext();
    });
    $('.start-button, .next-button').click(function () {
        direction= -1;
        if (scrolling) scrollAnimation.stop();
        currentView -= direction;
        scrollToNext();
    });
    $('body').on('touchmove', function (e) {
        e.preventDefault();
    });
    $('.replay-button').click(function () {
        $('.msg').hide();
        $('.line').removeClass('active').css('height', 0);
        viewList.find('li').removeClass('active');
        direction = 1;
        currentView = 0;
        $(this).hide();
        scrollToNext();
    });
    function scrollToNext () {
        scrollAnimation
            .on('step', function (v) {
                viewList.css('-webkit-transform', 'translate3d(0, -'
                    + (parseFloat(((currentView + direction) * 100) + 100 * v * -direction))
                    + '%, 0)');
            })
            .on('stop', viewChanged)
            .on('start', viewChangeStart);
        scrollAnimation.restart();
    }

    /******************************* --火箭开始-- **********************************/
    var rocket = $('.rocket');
    var fire = $('.fire');
    var rocketInAnimation = collide.animation($.extend(animationConfig,
        {
            duration: 2500,
            easing: {
                type: 'spring',
                fn: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)'
            }
        }))
        .on('step', function (v) {
            rocket.css('-webkit-transform', 'translate3d(0, ' + (1 - v) * 60 + '%, 0)');
            fire.css('-webkit-transform', 'translate3d(0, ' + (1 - v) * 60 + '%, 0)');
        })
        .on('stop', function () {
            fire.removeClass('active');
        })
        .on('start', function () {
            fire.addClass('active');
        });
    var rocketOutAnimation = collide.animation($.extend(animationConfig,
        {
            duration: 800,
            easing: 'cubic-bezier(.21, .59, .80, .14)'
        }))
        .on('step', function (v) {
            if (v < .5) {
                setCss(v * 30);
            } else {
                setCss(30 + v * -130);
            }
            function setCss(value) {
                rocket.css('-webkit-transform', 'translate3d(0, ' + value + '%, 0)');
                fire.css('-webkit-transform', 'translate3d(0, ' + value + '%, 0)');
            }
        })
        .on('stop', function () {
            fire.removeClass('active');
        })
        .on('start', function () {
            fire.addClass('active');
        });

    function rocketIn() {
        if (rocketInAnimation.isRunning()) rocketInAnimation.stop();
        rocketInAnimation.restart();
    }

    function rocketOut() {
        if (rocketInAnimation.isRunning()) rocketInAnimation.stop();
        rocketOutAnimation.restart();
    }

    /******************************* --火箭结束-- **********************************/
    /*************************** --线条开始-- *******************************/
    var viewsPoint = [
        [20, 44, 60],
        [10, 40, 50],
        [5, 33, 59],
        [10, 35, 60],
        [10, 20, 50, 65]
    ];
    function lineIn() {
        var view = viewList.children().eq(currentView);
        var line = view.find('.line');
        var viewPoints = viewsPoint[currentView - 1];
        var msg = view.find('.msg');
        collide.animation(
            $.extend(animationConfig, {
                duration: 1000,
                easing: 'linear'
            }))
            .on('step', function (v) {
                line.css('height', v * windowHeight + 'px');
                for (var i = 0; i < viewPoints.length; i++) {
                    if (v >= viewPoints[i] / 100) {
                        msg.eq(i).show();
                    }
                }
                if (v >= .95) {
                    view.find('.next-button').show();
                }
            }).start();
    }

    /*************************** --线条结束-- *******************************/

    rocketIn();
});