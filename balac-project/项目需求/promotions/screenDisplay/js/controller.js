/**
 * @file 控制页面的逻辑
 * @author Jun <yujun.li@partner.midea.com.cn>
 * @copyright
 * @license Released under the Commercial license.
 * @since 1.0.1
 * @version 1.0.1 - 2015-9-24
 */
(function($, window) {
    'use strict';

    var viewControl = {},
        $html = $('html'),
        initSize = parseInt($html.css('font-size')),
        zoomSize = parseInt($html.css('font-size')) * 2;

    function init() {
        var $commonBox = $('.common-box'),
            i = 0,
            isZoom = false,
            $back = $('.back-main'),
            currentIndex;

        $back.hide();
        initSize = parseInt($html.css('font-size'));
        zoomSize = parseInt($html.css('font-size')) * 2;

        $back.delegate('', 'mousedown.activated, touchstart.activated', function() {
            $(this).addClass('activated');
        });
        $back.delegate('', 'mouseup.activated, touchend.activated', function() {
            $(this).removeClass('activated');
        });
        $commonBox.each(function() {
            $(this).attr('data-index', i++);
        });
        $commonBox.delegate('', 'mousedown.activated, touchstart.activated', function() {
            if (isZoom) {
                return;
            }
            $(this).addClass('activated');
        });
        $commonBox.delegate('', 'mouseup.activated, touchend.activated', function() {
            if (isZoom) {
                return;
            }
            $(this).removeClass('activated');
        });

        viewControl.zoomView = function (index) {
            if (isZoom) {
                return;
            }
            isZoom = true;
            currentIndex = index;
            $commonBox.removeClass('in').removeClass('back');
            $commonBox.each(function(i) {
                if (currentIndex != i) {
                    $(this).addClass('out');
                }
            });

            $commonBox.eq(index).addClass('active');
            $back.show();
        };
        viewControl.back = function() {
            $back.hide();
            $commonBox.removeClass('active').removeClass('out');
            $commonBox.each(function(index) {
                if (currentIndex != index) {
                    $(this).addClass('in');
                } else {
                    $(this).addClass('back');
                }
            });
            setTimeout(function() {
                isZoom = false;
                currentIndex = null;
            }, 1000);
        };

        $commonBox.delegate('', 'click.control, tap.control', function() {
            viewControl.zoomView($(this).attr('data-index'));
        });
        $back.delegate('', 'click.control', function() {
            viewControl.back();
        });

        $commonBox.addClass('in');

        //var $side1 = $('.side1'),
        //    $side2 = $('.side2');

        viewControl.flipCard = function() {
            var card = $('.flip-card');
            if (card.hasClass('flipY')) {
                card.removeClass('flipY');
            } else {
                card.addClass('flipY');
            }
        };
        var flipTimer = setInterval(viewControl.flipCard, 30000);

    }

    var configUrls = CONFIGURATION.com.midea,
        services = {
            default: {
                dataType: 'jsonp',
                jsonp: 'callBack',
                type: 'get'
            },
            getData: function(url, params, config) {
                var option = $.extend({}, services.default, config);

                option.url = url;
                option.data = params;
                return $.ajax(option);
            },
            /**
             * 获取单一股票数据
             * @param code 编号
             * @returns {*}
             */
            getStock: function(code) {
                return services.getData(configUrls.location + configUrls.stock, {stockid: code});
            },
            /**
             * 获取面板一明细
             * @param id
             * @returns {*}
             */
            getDetail: function(id) {
                return services.getData(configUrls.location + configUrls.detail, {stockid: id}, {jsonp: 'jsonpcallback'});
            },
            /**
             * 获取面板一数据，所有股票
             * @returns {*}
             */
            getAllStocks: function() {
                return $.when(services.getStock('sz000333'), services.getStock('sz000418'), services.getStock('hk00382'), services.getStock('sz200418'));
            },
            /**
             * 获取指定日期的财务数据
             * @param date 日期
             * @returns {*}
             */
            getBiDetail: function(date) {
                var params = {
                    uid: 'zouhb',
                    sc: 2,
                    first: 'y',
                    m: 'OM_DLY',
                    pid: date
                };
                return services.getData(configUrls.location + configUrls.biDetail, params,{jsonp:'callback'});
            },
            /**
             * 获取指定日期的事业部经营数据
             * @param date
             * @returns {*}
             */
            getSale: function(date) {
                var params = {
                    uid: 'zouhb',
                    sc: 2,
                    first: 'y',
                    m: 'OM_DLY',
                    pid: date
                };
                return services.getData(configUrls.location + configUrls.getSale, params,{jsonp:'callback'});
            },
            /**
             * 获取零售数据
             * @returns {*}
             */
            getRetail: function() {
                var params = {
                    uid: 'zouhb',
                    sc: 1
                };
                return services.getData(configUrls.location + configUrls.getRetail, params,{jsonp:'callback'});
            },
            /**
             * 获取指定日期的事业部经营库存数据
             * @param date
             * @returns {*}
             */
            getInv: function(date) {
                var params = {
                    uid: 'zouhb',
                    sc: 2,
                    first: 'y',
                    m: 'INV_WEEKLY',
                    pid: date
                };
                return services.getData(configUrls.location + configUrls.biDetail, params,{jsonp:'callback'});
            },
            /**
             * 获取指定日期的财务数据
             * @param date 日期
             * @returns {*}
             */
            getBackDetail: function(date) {
                var params = {
                    uid: 'zouhb',
                    sc: 2,
                    first: 'y',
                    m: 'AR_DLY',
                    pid: date
                };
                return services.getData(configUrls.location + configUrls.biDetail, params,{jsonp:'callback'});
            },
            /**
             * 获取全部事业部经营库存数据
             * @returns {*}
             */
            getAllBi: function(data) {
                return $.when(services.getBiDetail(data), services.getInv(data));
            },
            /**
             * 获取上月销售数据
             * @returns {*}
             */
            getRatioSale: function() {
                var params = {
                    m: 'OM_DLY'
                };
                return services.getData(configUrls.location + configUrls.getRatio, params,{jsonp:'callback'});
            },
            /**
             * 获取上月和本月销售数据
             * @returns {*}
             */
            getSaleAll: function(data) {
                return $.when(services.getBiDetail(data), services.getRatioSale());
            },
            /**
             * 获取上月回款数据
             * @returns {*}
             */
            getRatio: function() {
                var params = {
                    m: 'AR_DLY'
                };
                return services.getData(configUrls.location + configUrls.getRatio, params,{jsonp:'callback'});
            },
            /**
             * 获取上月和本月回款数据
             * @returns {*}
             */
            getBackAll: function(data) {
                return $.when(services.getBackDetail(data), services.getRatio());
            }
        };

    window.viewControl = viewControl;
    window.stockService = services;

    $(document).ready(init);
})($, window);
