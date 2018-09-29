var factor = winFactor;
var labelFS = 28*factor;
var valFS = 18*factor;
var in_color_1 = '#fe85b7';
var in_color_2 = '#fb0e6b';
var out_color_1 = '#ce5dfd';
var out_color_2 = '#6d0ffb';

function getBar(id,data) {
    var barWidth = 40*winFactor;
    var barGap1 =  25*winFactor;
    var x_width = 110*winFactor;
    var x2_width = 20*winFactor;
    var bar_max_height = (parseFloat($('#'+id).css('height')) - bar_y_top_height - bar_y_bottom_height);
    // 图表实例化------------------
    // srcipt标签式引入
    var myChart = echartsInstance.init(document.getElementById(id));

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...' //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();

    // 图表使用-------------------
    var option = {
        calculable: true,
        animationDurationUpdate: bar_animte_time,
        grid: {y: bar_y_top_height, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
/*
        grid: {
            x:140*factor,
            y2:100*factor,
            borderWidth: 0
        },
*/
        xAxis: [
            {
                type: 'category',
                show: true,
                data: data[0],
                axisTick: {show:false},
                axisLabel: {
                    show:true,
                    textStyle:{
                        color: bar_x_font_color,
                        fontSize: bar_x_font_2_size
                    },
                    margin:bar_x_margin
                },
                axisLine:{
                    lineStyle:{
                        width:1,
                        color: '#393d46'
                    }
                },
                itemStyle: {normal: {color:'#fff'}},
                splitLine: {
                    lineStyle: {
                        color: ['#ccc'],
                        width: 0,
                        type: 'solid'
                    }
                }
            },
            {
                type: 'category',
                data: ['3C连锁','全国商超','TOP门店','旗舰店','渠道门店','电商ECM'],
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine:{
                    show:false
                },
                splitLine:{
                    lineStyle:{
                        color: ['#2e3444'],
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:bar_y_font_color,
                        fontSize:bar_y_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_y_margin
                },
                splitArea:{
                    show:true,
                    areaStyle:{
                        color: [
                            bar_splitarea_color1,
                            bar_splitarea_color2
                        ]
                    }
                }

            }
        ],

        series: [
            {
                name:'内销',
                type:'bar',
                barWidth:barWidth,
                barCategoryGap:barGap1,
                itemStyle: {normal: {color:(function() {
                    var zrColor = require('zrender/tool/color');
                    return zrColor.getLinearGradient(
                        0, bar_max_height, 0,0,
                        [[0, '#fa560e'],[1, '#fd9549']]
                    );
                })(),
                    label : {show: true, position: 'top',textStyle:{fontSize:bar_label_font_size,color:bar_label_font_color, fontFamily:chart_ff}}}},
                data:data[1]
            },
            {
                name:'外销',
                type:'bar',
                barWidth:barWidth,
                barCategoryGap:barGap1,
                itemStyle: {normal: {color:(function() {
                    var zrColor = require('zrender/tool/color');
                    return zrColor.getLinearGradient(
                        0, bar_max_height, 0,0,
                        [[0, '#fa8d0c'],[1, '#fdc74b']]
                    );
                })(),label : {show: true, position: 'top',textStyle:{fontSize:bar_label_font_2_size,color:bar_label_font_color, fontFamily:chart_ff}}}},
                data:data[2]
            }
        ]
    };
    myChart.setOption(option);
    var maxValue = myChart.component.yAxis._axisList[0].getExtremum().max;
    var dataValue1 = data[1];
    var dataValue2 = data[2];

    option.series[0].data = [];
    for(var i=0; i<dataValue1.length; i++) {
        var data = {};
        var nLength = dataValue1[i] * bar_max_height / maxValue;
        data.value = dataValue1[i] ;
        data.itemStyle = {};
        data.itemStyle.normal = {};
        data.itemStyle.normal.color = (function () {
            var zrColor = require('zrender/tool/color');
            return zrColor.getLinearGradient(
                0, bar_y_top_height + bar_max_height, 0, bar_y_top_height + bar_max_height - nLength,
                [[0, '#fa560e'],[1, '#fd9549']]
            );
        })();
        option.series[0].data.push(data);
    }

    option.series[1].data = [];
    for(var i=0; i<dataValue2.length; i++) {
        var data = {};
        var nLength = dataValue2[i] * bar_max_height / maxValue;
        data.value = dataValue2[i] ;
        data.itemStyle = {};
        data.itemStyle.normal = {};
        data.itemStyle.normal.color = (function () {
            var zrColor = require('zrender/tool/color');
            return zrColor.getLinearGradient(
                0, bar_y_top_height + bar_max_height, 0, bar_y_top_height + bar_max_height - nLength,
                [[0, '#fa8d0c'],[1, '#fdc74b']]
            );
        })();
        option.series[1].data.push(data);
    }

    myChart.setOption(option);
    return myChart;

}
function getHuangBar(id,data) {

    var barWidth = 57*winFactor;
    var x_width = 300*winFactor;
    var x2_width = 75*winFactor;

    var bar_max_height = (1675 * winFactor - x_width - bar_y_bottom_height);
    // 图表实例化------------------
    // srcipt标签式引入
    var myChart = echartsInstance.init(document.getElementById(id));

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...' //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();
    var toolTipBgColor = '#282e3d';
    // 图表使用-------------------
    var option = {
        calculable : true,
        animationDurationUpdate: bar_animte_time,
       /* grid:{
            borderWidth: 0,
            x:330*factor,
            y2:100*factor
        },*/
        grid: {y: bar_y_top_height, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
        tooltip : {
            show: true,
            trigger: 'item',
            showDelay: 0,
            formatter: function (params) {
                var str = params.name;
                if (str.indexOf('电商ECM') >= 0) {
                    return 'ECM是集团电商系统：<br/>包含集团电商及各事业部在京东、天猫、国美、苏宁等各大电商数据';
                }
                return str;
            },
            backgroundColor: toolTipBgColor,
            textStyle:{fontSize:bar_x_font_size,color:bar_x_font_color},
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 0
                }
            }
        },
        xAxis : [
            {
                type : 'value',
                boundaryGap : [0, 0.01],
                axisLine:{
                    show:false
                },
                splitLine:{
                    lineStyle:{
                        color: ['#2e3444'],
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color: '#8393aa',
                        fontSize: bar_x_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_x_margin
                },
                splitArea:{
                    show:true,
                    areaStyle:{
                        color: [
                            bar_splitarea_color1,
                            bar_splitarea_color2
                        ]
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'category',
                axisLine:{show:false},
                axisTick: {show:false},
                splitLine:{
                    lineStyle:{
                        color: ['#2e3444'],
                        width: 0,
                        type: 'solid'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color: '#fff',
                        fontSize: bar_x_font_size
                    },
                    margin:bar_y_margin
                },
                data:data[0]
            }
        ],
        series : [
            {
                name:'2011年',
                type:'bar',
                barWidth:barWidth,
                barCategoryGap:0,
                itemStyle: {normal: {
                    color:(function() {
                        var zrColor = require('zrender/tool/color');
                        return zrColor.getLinearGradient(
                            0, 0, bar_max_height,0,
                            [[0, '#072fdc'],[1, '#1ba6f6']]
                        );
                    })(),
                    label : {show: true, position: 'right',textStyle:{color:'#fff',fontSize:bar_x_font_size, fontFamily:chart_ff}}}},
                data:data[1]
            }
        ]
    };
    myChart.setOption(option);
    var maxValue = myChart.component.xAxis._axisList[0].getExtremum().max;
    var dataValue1 = data[1];

    option.series[0].data = [];
    for(var i=0; i<dataValue1.length; i++) {
        var data = {};
        var nLength = dataValue1[i] * 1600*winFactor / maxValue;
        data.value = dataValue1[i] ;
        data.itemStyle = {};
        data.itemStyle.normal = {};
        data.itemStyle.normal.color = (function () {
            var zrColor = require('zrender/tool/color');
            return zrColor.getLinearGradient(
                300*winFactor,0, 300*winFactor + nLength, 0,
                [[0, '#072fdc'],[1, '#1ba6f6']]
            );
        })();
        option.series[0].data.push(data);
    }

    myChart.setOption(option);
    return myChart;
}
function getPie(id,data) {
    var pie_height = 360*winFactor*0.9;
    // 图表实例化------------------
    // srcipt标签式引入
    var myChart = echartsInstance.init(document.getElementById(id));

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();
    if(!data){
        data = [20,80];
    }

    // 图表使用-------------------
    var option = {
        calculable: false,
        animationDurationUpdate: pie_animte_time,
        series: [
            {
                name: '数据统计',
                type: 'pie',
                radius: ['70%', '90%'],

                // for funnel
                x: '5%',
                width: '80%',
                funnelAlign: 'center',
                itemStyle: {
                    normal: {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    }
                },
                data: [
                    {
                        value:data[0]*0.01,
                        name:'one',
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            }
                        }
                    },
                    {
                        value:data[1],
                        name:'one',
                        itemStyle:{
                            normal:{
                                color:(function() {
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, pie_height, 0, 0,
                                        [[0, out_color_2],[1, out_color_1]]
                                    );
                                })()
                            }
                        }
                    },
                    {
                        value:data[0]*0.01,
                        name:'one',
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            }
                        }
                    },
                    {
                        value:data[0],
                        name:'two',
                        itemStyle:{
                            normal:{
                                color:(function() {
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, pie_height, 0, 0,
                                        [[0, in_color_2],[1, in_color_1]]
                                    );
                                })(),
                            }
                        }
                    }
                ]
            }
        ]
    };
    myChart.setOption(option);
    return myChart;
}


var page1_pie1 = null;
var page1_pie2 = null;
var page1_pie3 = null;
var page1_bar4 = null;
var page1_huangbar1 = null;
var pieJiluData = null;

function Page1_initChart(data,data2,data3){
    if(!data){
        data = [];
    }
    if(!data2){
        data2 = [];
    }
    page1_pie1 = getPie('pie',data[0]);
    page1_pie2 = getPie('pie2',data[1]);
    page1_pie3 = getPie('pie3',data[2]);
    page1_bar4 = getBar('bar4',data2);
    page1_huangbar1 = getHuangBar('bar1',data3);

}

function Page1_initChartPie(data){
    if(!data){
        data = [];
    }
    page1_pie1 = getPie('pie',data[0]);
    page1_pie2 = getPie('pie2',data[1]);
    page1_pie3 = getPie('pie3',data[2]);

}

function page1_entry(dataInit) {
   // setTimeout("initChart()",500);
    if (dataInit) {
        intData();
    } else {
        Page1_initChartPie(pieJiluData);
        if (page1_pie1 != null) {
            page1_pie1.restore();
        }
        if (page1_pie2 != null) {
            page1_pie2.restore();
        }
        if (page1_pie3 != null) {
            page1_pie3.restore();
        }
        if (page1_bar4 != null) {
            page1_bar4.restore();
        }
        if (page1_huangbar1 != null) {
            page1_huangbar1.restore();
        }

        refreshLastUpdateTime();
    }
    startRealtime();
}

function page1_exit() {
    if (page1_pie1 != null) {
        page1_pie1.clearZr();
    }
    if (page1_pie2 != null) {
        page1_pie2.clearZr();
    }
    if (page1_pie3 != null) {
        page1_pie3.clearZr();
    }
    if (page1_bar4 != null) {
        page1_bar4.clearZr();
    }
    if (page1_huangbar1 != null) {
        page1_huangbar1.clearZr();
    }
    stopRealtime();
}

function markItem(className, bMark) {
    if (bMark)
        $(className).addClass('fc-red');
    else
        $(className).removeClass('fc-red');
}

function intData(){
    if(service_collection[SI_EPDData].data == null || service_collection[SI_DepartmentSaleStock].data == null ||  service_collection[SI_ReChanData].data == null){
        setTimeout(function () {
            intData();
        }, 500);
    } else {
        if (service_collection[SI_EPDData].data.length > 1) {
            $('.ab-stock').html(dealHmillion(dealPlus(service_collection[SI_EPDData].data[1].amt) || 0, true));
        }
        $('.ab-distribution').html(dealHmillion(dealPlus(service_collection[SI_EPDData].data[0].amt)|| 0, true));

       // console.log(service_collection[SI_EPDData].data);


        var saleData = service_collection[SI_DepartmentSaleStock].data[0];
        var backData = service_collection[SI_DepartmentBack].data;
        var stockData = service_collection[SI_DepartmentSaleStock].data[1];
      //  console.log(stockData);

        /********** 图1 ***********/

        /*******pie图中的数据*********/
        $('#oneSaleHole').html(dealTThousand(saleData[0].ytd_amt));
        $('#oneBackHole').html(dealTThousand(backData[0].ytd_amt));
        $('#oneStockHole').html(dealTThousand(stockData[stockData.length - 4].inv_amt));


        /*******左边的数据*********/
        $('#oneSaleIn').html(dealTThousand(saleData[1].ytd_amt));
        $('.ab-goods').html(dealTThousand(saleData[1].ytd_amt, true) || 0);
        $('#oneSaleInPlan').html(Math.round(saleData[1].ytd_amt_roc));
        var value = Math.round(saleData[1].ytd_amt_yoy);
        $('#oneSaleInYoy').html(value);
        markItem('#oneSaleInYoy', (value<0));

        $('#oneSaleOut').html(dealTThousand(saleData[2].ytd_amt));
        $('#oneSaleOutPlan').html(Math.round(saleData[2].ytd_amt_roc));
        value = Math.round(saleData[2].ytd_amt_yoy);
        $('#oneSaleOutYoy').html(value);
        markItem('#oneSaleOutYoy', (value<0));

        /*******中间的数据*********/
        $('#oneBackIn').html(dealTThousand(backData[1].ytd_amt));
        $('#oneBackInPlan').html(Math.round(backData[1].ytd_amt_roc));
        value = Math.round(backData[1].ytd_amt_yoy);
        $('#oneBackInYoy').html(Math.round(backData[1].ytd_amt_yoy));
        markItem('#oneBackInYoy', (value<0));

        $('#oneBackOut').html(dealTThousand(backData[2].ytd_amt));
        $('#oneBackOutPlan').html(Math.round(backData[2].ytd_amt_roc));
        value = Math.round(backData[2].ytd_amt_yoy);
        $('#oneBackOutYoy').html(value);
        markItem('#oneBackOutYoy', (value<0));

        /*******右边的数据*********/
        $('#oneStockIn').html(dealTThousand(stockData[stockData.length - 6].inv_amt));
        value = Math.round(stockData[stockData.length - 6].inv_amt_yoy);
        $('#oneStockInYoy').html(value);
        markItem('#oneStockInYoy', (value>=0));

        $('#oneStockOut').html(dealTThousand(stockData[stockData.length - 5].inv_amt));
        value = Math.round(stockData[stockData.length - 5].inv_amt_yoy);
        $('#oneStockOutYoy').html(value);
        markItem('#oneStockOutYoy', (value>=0));



        /********** 图1 end ***********/

        /********** 图2 ***********/
        var saleName = [],
            salePlan = [],
            saleSum = [],
            leimu = ['家用','厨电','洗衣机','冰箱','生活','热水器','国际','环电','中央','部品','安得','采购'/*,'电商'*/];


        for(var j = 0;j<saleData.length;j++) {
            if(saleData[j].shipment_type == '0'){
                for(var i = 0;i<leimu.length;i++) {
                    if(saleData[j].bd_name.indexOf(leimu[i]) >= 0) {
                        saleName.push(leimu[i]);
                        salePlan.push(dealTThousand(saleData[j].ytd_amt_p));
                        saleSum.push(dealTThousand(saleData[j].ytd_amt));
                    }
                }
            }
        }

    //    console.log(saleName,salePlan,saleSum);


        /********** 图2 end ***********/

        /********** 图4 ***********/
    //    console.log(service_collection[SI_ReChanData].data);

        var channelData = service_collection[SI_ReChanData].data,
            channelBar = [],
            channelName = [],
            channelSum = [],
            leimu2 = ['电商ECM','其他渠道门店','旗舰店','TOP门店','全国商超','3C连锁'];


        for(var i = 0;i<leimu2.length;i++) {
            for(var j = 0;j<channelData.length;j++) {
                if (leimu2[i].indexOf(channelData[j].type_lv1_name) >= 0 ) {
                    /*channelName.push(channelData[j].type_lv1_name);*/
                    channelName.push(leimu2[i]);
                    channelSum.push(dealHmillion(channelData[j].ytd_cny_amt));
                }
            }
        }

        channelBar = [
            channelName,channelSum
        ];


        /********** 图4 end ***********/


        var pieData = [
            [saleData[1].ytd_amt_y, saleData[2].ytd_amt_y],
            [backData[1].ytd_amt_y,backData[2].ytd_amt_y],
            [stockData[stockData.length - 6].inv_amt,stockData[stockData.length - 5].inv_amt]
        ];
        var barData1 = [
            saleName,salePlan,saleSum
        ];

        pieJiluData = pieData;

        setTimeout(function() {
            Page1_initChart(pieData, barData1, channelBar)
        },200);

        refreshLastUpdateTime();
    }
}

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==33 || e.keyCode ==34 || e.keyCode ==35 || e.keyCode ==36 || e.keyCode ==37 || e.keyCode ==38 || e.keyCode ==39 || e.keyCode ==40) {
        window.location.href = window.SYSTEMCONFIG.gohome;
    }
}

// 获取实时数据
function getRealtimeDatum() {
    // 分销数据
    $('#real_fen').html(Math.floor(getRealtimeValue(RSI_Round)));

    // 零售数据
    $('#real_leng').html(Math.floor(getRealtimeValue(RSI_Sales)));

}

var timerRealtime = null;

// 开始获取实时数据
function startRealtime() {
    getRealtimeDatum();

    stopRealtime();
    timerRealtime = setInterval(function () {
        getRealtimeDatum();
    }, 5000);
}

// 停止获取实时数据
function stopRealtime() {
    if (timerRealtime != null) {
        clearInterval(timerRealtime);
        timerRealtime = null;
    }
}

function IndexJsReady() {

    function IsPC()
    {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }

    if(!IsPC()){
        $('.left-go').css('left','0');
        $('.right-go').css('right','0');
    }

    $('.left-place').hover(function(){
        if( IsPC()){
            $(".left-go").animate({left:'0'});
        }
    },function(){
        if( IsPC()){
            $(".left-go").animate({left:'-1rem'});
        }
    });

    $('.right-place').hover(function(){
        if( IsPC()){
            $(".right-go").animate({right:'0'});
        }
    },function(){
        if( IsPC()){
            $(".right-go").animate({right:'-1rem'});
        }
    });

    function show_num2(n){
        var it = $(".real_leng i");
        var len = String(n).length;
        for(var i=0;i<len;i++){
            if(it.length<=i){
                $(".real_leng").append("<i></i>");
            }
            var num=String(n).charAt(i);
            var y = -parseInt(num)*30; //y轴位置
            var obj = $(".real_leng i").eq(i);
            obj.animate({ //滚动动画
                    backgroundPosition :'(0 '+String(y)+'px)'
                }, 'slow','swing',function(){}
            );
        }
    }

    function show_num(n){
        var it = $(".real_fen i");
        var len = String(n).length;
        for(var i=0;i<len;i++){
            if(it.length<=i){
                $(".real_fen").append("<i></i>");
            }
            var num=String(n).charAt(i);
            var y = -parseInt(num)*30; //y轴位置
            var obj = $(".real_fen i").eq(i);
            obj.animate({ //滚动动画
                    backgroundPosition :'(0 '+String(y)+'px)'
                }, 'slow','swing',function(){}
            );
        }
    }

}


//intData();

//
//$(document).ready(function() {
//    var windowH = $(window).height(),
//        windowW = $(window).width(),
//        $html = $('html'),
//        initSize = parseInt($html.css('font-size'))/100,
//        indexCommonH = windowH/2 - 80*initSize,
//        indexCommonW = windowW/2 - 80*initSize;
//
//    console.log(indexCommonH,indexCommonW);
//    $('.index-box0').css({'width':indexCommonW,'height':indexCommonH});
//    $('.index-box1').css({'width':indexCommonW,'height':indexCommonH});
//    $('.index-box2').css({'width':indexCommonW,'height':indexCommonH});
//    $('.index-box3').css({'width':indexCommonW,'height':indexCommonH});
//});

