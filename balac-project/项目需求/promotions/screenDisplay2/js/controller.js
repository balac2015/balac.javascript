/**
 * @file 控制页面的逻辑
 * @author ex_hujie
 * @version 1.0.0 - 2015-10-24
 */

(function($, window) {
    'use strict';

    var timeoutRequest = 100*1000;  // 数据请求的超时时间 (100秒)

    var configUrls = window.SYSTEMCONFIG,
        services = {
            getData: function(url, params, config) {
                // contentType:"application/x-www-form-urlencoded; charset=utf-8"
                var option = $.extend({}, {dataType:'jsonp',jsonp:'callback',type:'get'}, config);
                option.url = url;
                option.data = params;
                option.timeout = timeoutRequest;
                option.error = services.handleAjaxError;

                return $.ajax(option);
            },

            getJsonData: function(url, params, config) {
                var option = $.extend({}, {dataType:'json',type:'get'}, config);
                option.url = url;
                option.data = params;
                option.timeout = timeoutRequest;
                option.error = services.handleAjaxError;

                return $.ajax(option);
            },

            // 处理ajax出错
            handleAjaxError: function(XMLHttpRequest, textStatus, errorThrown) {
                // DEBUG(XMLHttpRequest.status);
                // 401 - Unauthorized 访问被拒绝，客户试图未经授权访问受密码保护的页面
                if(XMLHttpRequest.status=='401' /*|| XMLHttpRequest.status=='0'*/){
                    location.href = window.SYSTEMCONFIG.location;
                }
            },

            /**
             * 获取单一股票数据
             * @param code 编号
             * @returns {*}
             */
            getStock: function(code) {
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.stock, {stockid: code});
            },
            /**
             * 获取面板一明细
             * @param id
             * @returns {*}
             */
            getDetail: function(id) {
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.detail, {stockid: id}, {jsonp: 'jsonpcallback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.biDetail, params,{jsonp:'callback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.getSale, params,{jsonp:'callback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.getRetail, params,{jsonp:'callback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.biDetail, params,{jsonp:'callback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.biDetail, params,{jsonp:'callback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.getRatio, params,{jsonp:'callback'});
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
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.getRatio, params,{jsonp:'callback'});
            },
            /**
             * 获取上月和本月回款数据
             * @returns {*}
             */
            getBackAll: function(data) {
                return $.when(services.getBackDetail(data), services.getRatio());
            },
            /**
             * 获取进销存数据
             * @returns {*}
             */
            getEPD:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetEPD,{},{jsonp:'callback'});
            },
            /**
             * 分销额及分销提货比
             * @returns {*}
             */
            getDistr:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetDistr,{},{jsonp:'callback'});
            },
            /**
             * 库存及库存任务比
             * @returns {*}
             */
            getInvPro:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetInvPro,{},{jsonp:'callback'});
            },
            /**
             * 渠道零售额
             * @returns {*}
             */
            getReChan:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetReChan,{},{jsonp:'callback'});
            },
            /**
             * 事业部零售额
             * @returns {*}
             */
            getCompChan:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetCompChan,{},{jsonp:'callback'});
            },

            /**
             * 年度累计零售结构
             * @returns {*}
             */
            getTotalRet: function() {
                return $.when(services.getOneRet(CHANNEL_TABLE[0].id)
                                ,services.getOneRet(CHANNEL_TABLE[1].id)
                                ,services.getOneRet(CHANNEL_TABLE[2].id)
                                ,services.getOneRet(CHANNEL_TABLE[3].id)
                                ,services.getOneRet(CHANNEL_TABLE[4].id)
                                ,services.getOneRet(CHANNEL_TABLE[6].id)
                    );
            },
            getOneRet:function(code){
                var params = {
                    code:code
                };
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetTotalRet,params,{jsonp:'callback'});
            },
            /**
             * 各渠道零售月度趋势
             * @returns {*}
             */
            getMonthRetail: function() {
                return $.when(services.getOneMonthRetail(CHANNEL_TABLE[0].id)
                    ,services.getOneMonthRetail(CHANNEL_TABLE[1].id)
                    ,services.getOneMonthRetail(CHANNEL_TABLE[2].id)
                    ,services.getOneMonthRetail(CHANNEL_TABLE[3].id)
                    ,services.getOneMonthRetail(CHANNEL_TABLE[4].id)
                    ,services.getOneMonthRetail(CHANNEL_TABLE[6].id)
                );
            },
            getOneMonthRetail:function(code){
                var params = {
                    code:code
                };
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetRetail,params,{jsonp:'callback'});
            },

            /**
             * 销售和回款的去年年度目标
             * @returns {*}
             */
            getPlan:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetPlan,{},{jsonp:'callback'});
            },

            /**
             * 分销年累计
             * @returns {*}
             */
            getRound:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.GetRound,{},{jsonp:'callback'});
            },

            /************************************ 实时数据 ******************************************************/

            /**
             * 获取实时分销数据
             * @returns {*}
             */
            getRealtimeRound: function() {
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.getRound, {},{jsonp:'callback'});
            },

            /**
             * 获取实时零售数据
             * @returns {*}
             */
            getRealtimeSales: function() {
                return services.getJsonData(configUrls.locationReal + '/pentaho/plugin/cda/api/doQuery?path=/public/kepler/No3/Realtime_Sales.cda&dataAccessId=realTimeSales', {},{});
            },

            /************************************ 外销数据 ******************************************************/

            /**
             * 外销月度趋势
             *
             * @returns {*}
             */
            getExpMthsTrend: function() {
                return $.when(services.getOneExpMthsTrend(EXP_REGION_TABLE[0].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[1].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[2].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[3].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[4].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[5].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[6].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[7].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[8].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[9].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[10].region_area_wid)
                    ,services.getOneExpMthsTrend(EXP_REGION_TABLE[11].region_area_wid)
                );
            },
            getOneExpMthsTrend:function(code){
                var params = {
                    regionAreaWid:code
                };
                return services.getData(configUrls.locationExp + configUrls.serviceType.bi + configUrls.services.getExpMthsTrend,params,{jsonp:'callback'});
            },

            /**
             * 获取外销出口占比
             * @returns {*}
             */
            getExpSaleRate:function(){
                return services.getData(configUrls.locationExp + configUrls.serviceType.bi + configUrls.services.getExpSaleRate,{},{jsonp:'callback'});
            },

            /**
             * 外销竞品
             *
             * @returns {*}
             */
            getExpShare: function() {
                return $.when(services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[0].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[1].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[2].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[3].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[4].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[5].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[6].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[7].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[8].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[9].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[10].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[11].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[12].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[13].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[14].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[15].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[16].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[17].prod_category_wid)
                    ,services.getOneExpShare(EXP_PRODUCT_CATEGORY_TABLE[18].prod_category_wid)
                );
            },
            getOneExpShare:function(code){
                var params = {
                    prodCatWid:code,
                    limit:3
                };
                return services.getData(configUrls.locationExp + configUrls.serviceType.bi + configUrls.services.getExpShare,params,{jsonp:'callback'});
            },

            /**
             * 外销市场份额
             *
             * @returns {*}
             */
            getExpMarketShare: function() {
                return $.when(services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[0].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[1].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[2].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[3].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[4].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[5].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[6].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[7].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[8].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[9].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[10].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[11].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[12].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[13].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[14].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[15].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[16].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[17].prod_category_wid)
                    ,services.getOneExpMarketShare(EXP_PRODUCT_CATEGORY_TABLE[18].prod_category_wid)
                );
            },
            getOneExpMarketShare:function(code){
                var params = {
                    prodCatWid:code,
                };
                return services.getData(configUrls.locationExp + configUrls.serviceType.bi + configUrls.services.getExpMarketShare,params,{jsonp:'callback'});
            },

            /************************************ 观星台数据 ******************************************************/
            getStarParams: function() {
                var params = {command: '',category_id: '',category: '',platform_id: '',platform: '',startTime: '',endTime: '',};

                // 平台
                for (var n = 0; n < STAR_PLATFORM_TABLE.length; n++) {
                    params.platform_id += STAR_PLATFORM_TABLE[n].platform_id;
                    params.platform += STAR_PLATFORM_TABLE[n].platform;
                    if (n < STAR_PLATFORM_TABLE.length - 1) {
                        params.platform_id += ',';
                        params.platform += ',';
                    }
                }

                // 时间
                var date = new Date();
                params.endTime = formatDateString2(date);
                date.setMonth(0);
                date.setDate(1);
                params.startTime = formatDateString2(date);

                return params;
            },
            /**
             * 获取线上评价概览
             * @returns {*}
             */
            getStarOnlineEvaluation:function() {
                var params = services.getStarParams();
                params.command = 'onlineEvaluation';
                params.brand = '';

                return services.getStarData(params);
            },
            getStarData:function(params) {
                return $.when(services.getOneStarData(params, 0),
                                services.getOneStarData(params, 1),
                                services.getOneStarData(params, 2),
                                services.getOneStarData(params, 3),
                                services.getOneStarData(params, 4),
                                services.getOneStarData(params, 5),
                                services.getOneStarData(params, 6),
                                services.getOneStarData(params, 7),
                                services.getOneStarData(params, 8),
                                services.getOneStarData(params, 9),
                                services.getOneStarData(params, 10),
                                services.getOneStarData(params, 11)
/*
                                services.getOneStarData(params, 12),
                                services.getOneStarData(params, 13),
                                services.getOneStarData(params, 14),
                                services.getOneStarData(params, 15),
                                services.getOneStarData(params, 16),
                                services.getOneStarData(params, 17),
                                services.getOneStarData(params, 18)
*/
                );
            },
            getOneStarData:function(params, index){
                params.category_id = STAR_PRODUCT_CATEGORY_TABLE[index].category_wid;
                params.category = STAR_PRODUCT_CATEGORY_TABLE[index].category;
                if (params.command === 'onlineEvaluation') {
                    // 品牌
                    params.brand = '';
                    for (var n = 0; n < STAR_PRODUCT_CATEGORY_TABLE[index].brand_online.length && n < 2; n++) {
                        params.brand += STAR_PRODUCT_CATEGORY_TABLE[index].brand_online[n];
                        if (n < STAR_PRODUCT_CATEGORY_TABLE[index].brand_online.length - 1) {
                            params.brand += '|';
                        }
                    }
                }
                else if (params.command === 'productLayout') {
                    // 品牌
                    params.brand = '';
                    for (var n = 0; n < STAR_PRODUCT_CATEGORY_TABLE[index].brand_online.length && n < 3; n++) {
                        params.brand += STAR_PRODUCT_CATEGORY_TABLE[index].brand_online[n];
                        if (n < STAR_PRODUCT_CATEGORY_TABLE[index].brand_online.length - 1) {
                            params.brand += ',';
                        }
                    }
                }

                return services.getData(configUrls.locationStar + configUrls.serviceType.star + configUrls.services.getStarData,params,{});
            },
            /**
             * 获取淘系产品布局
             * @returns {*}
             */
            getStarProductLayout:function(){
                var params = services.getStarParams();
                params.command = 'productLayout';
//                params.brand = STAR_BRAND_TABLE[0] + ',' + STAR_BRAND_TABLE[1] + ',' + STAR_BRAND_TABLE[2];

                return services.getStarData(params);
            },
            /**
             * 获取淘系市场份额
             * @returns {*}
             */
            getStarMarketShare:function(){
                var params = services.getStarParams();
                params.command = 'marketShare';

                return services.getStarData(params);
            },
            /**
             * 获取最新评论
             * @returns {*}
             */
            getStarLatestCommentst:function(){
                var params = services.getStarParams();
                params.command = 'latestComments';
                params.brand = STAR_BRAND_TABLE[0];
                params.count = 5;
                params.page = 1;
                params.perPage = 50;    // 服务器会从4台机器过来, 条数需要乘以4  ( 50x4=200 )

                return services.getData(configUrls.locationStar + configUrls.serviceType.star + configUrls.services.getStarData,params,{});
            },
            /**
             * 获取厂家产品排名
             * @returns {*}
             */
            getStarCompanyProduct:function(){
                var params = {};
                params.command = 'getBrands';

                return services.getData(configUrls.locationStar + configUrls.serviceType.star + configUrls.services.getStarData,params,{});
            },
            /**
             * 获取产品指标表
             * @returns {*}
             */
            getStarProductCriteria:function(){
                return services.getData(configUrls.location + configUrls.serviceType.bi + configUrls.services.getIdcClsfy, {}, {});
            },
        };

    window.stockService = services;

    $(document).ready();
})($, window);
