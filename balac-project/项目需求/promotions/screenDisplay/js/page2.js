function page2_getBar(id) {
    // 图表实例化------------------
    // srcipt标签式引入
//        var myChart = echarts.init(document.getElementById(id));
    var myChart = echartsInstance.init(document.getElementById(id));

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();

    // 图表使用-------------------
    var option = {
        calculable : true,
        grid: {y: 40, y2:70, x:160, x2:100, borderWidth:0},
        xAxis : [
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {
                    show:true,
                    textStyle:{
                        color: '#ffffff',
                        fontSize: 35,
                    },
                    margin:30,
                },
                splitLine: {show:false},
                data : ['2014年','2015年']
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : ['2014年','2015年']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: {show:false},
                axisLabel:{formatter:'{value}',
                    textStyle:{
                        color: '#8393aa',
                        fontSize: 25,
                    },
                    margin:35,
                },
                splitArea: {
                    show:true,
                    areaStyle: {
                        color: [
                            '#121622',
                            'rgba(255,255,255,0)'
                        ]
                    }
                },
                splitLine: {lineStyle:{color:'#2c3343'}},
            }
        ],
        series : [
            {
                name:'year2014',
                type:'bar',
                barWidth: 120,
                barCategoryGap: 230,
                itemStyle: {
                    normal: {
                        color:(function() {
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 400, 0, 0,
                                [[0, '#7210fb'],[1, '#cc5dfc']]
                            );
                        })(),
                        label:{show:true,textStyle:{fontSize:25, color:'#FFFFFF'}}
                    }
                },
                data:[400,500]
            },
            {
                name:'Year2015',
                type:'bar',
                barWidth: 120,
                itemStyle: {
                    normal: {
                        color:(function() {
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 400, 0, 0,
                                [[0, '#fb126d'],[1, '#fe85b6']]
                            );
                        })(),
                        label:{show:true,textStyle:{fontSize:25, color:'#FFFFFF'}}}},
                data:[478,600]
            },
        ]
    };

    var barList = [],barList2 = [];

    if(id.toString().indexOf('-1') > 0){

        /*
         stockService.getSaleAll(formatDate(dataNow)).done(function(data,data2){
         console.log(data,data2);
         data = data[0];
         data2 = data2[0];
         $('#sumBarAR').html(addPiont(data[0].mtd_amt));
         if(!getNumTF(data[0].mtd_amt_yoy)){
         $('#sumBarAVovR').addClass('fc-red');
         }
         $('#sumBarAVovR').html(formatNull(notNull(data[0].mtd_amt_yoy) + '%'));


         $('#AinHuanTs').html(addPiont(data[1].mtd_amt));
         if(!getNumTF(data[1].mtd_amt_yoy)){
         $('#AinTongTs').removeClass('fc-darkblue');
         $('#AinTongTs').addClass('fc-red');
         }
         $('#AinTongTs').html(formatNull(notNull(data[1].mtd_amt_yoy) + '%'));


         $('#AinHuanBs').html(addPiont(data[2].mtd_amt));
         if(!getNumTF(data[2].mtd_amt_yoy)){
         $('#AinTongBs').removeClass('fc-darkblue');
         $('#AinTongBs').addClass('fc-red');
         }
         $('#AinTongBs').html(formatNull(notNull(data[2].mtd_amt_yoy) + '%'));
         var thisIn = parseInt(data[1].mtd_amt);
         var thisOut =  parseInt(data[2].mtd_amt);
         var lastIn = parseInt(data2[1].lasm_total);
         var lastOut =  parseInt(data2[2].lasm_total);
         barList.push(lastIn);
         barList.push(thisIn);
         barLsitOne.push(lastOut);
         barLsitOne.push(thisOut);
         option.series[0].data = barLsitOne;
         option.series[1].data = barList;
         console.log(option);
         resetWH('bar');
         myChart.setOption(option,true);
         });
         */
        barList.push(600);
        barList.push(750);
        barList2.push(715);
        barList2.push(834);
    } else if(id.toString().indexOf('-2') > 0) {
        barList.push(400);
        barList.push(500);
        barList2.push(478);
        barList2.push(600);
    } else if(id.toString().indexOf('-3') > 0) {
        barList.push(100);
        barList.push(110);
        barList2.push(64);
        barList2.push(80);
    }
    option.series[0].data = barList;
    option.series[1].data = barList2;

    myChart.setOption(option);
}

function page2_getPie(id) {
    // 图表实例化------------------
    // srcipt标签式引入
//        var myChart = echarts.init(document.getElementById(id));
    var myChart = echartsInstance.init(document.getElementById(id));

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();

    // 图表使用-------------------
    var option = {
        calculable: false,
        series: [
            {
                name: '数据统计',
                type: 'pie',
                radius: [70, 90],

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
                        value:1,
                        name:'one',
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            }
                        }
                    },
                    {
                        value:20,
                        name:'one',
                        itemStyle:{
                            normal:{
                                color:'#fc3584'
                            }
                        }
                    },
                    {
                        value:1,
                        name:'one',
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            }
                        }
                    },
                    {
                        value:80,
                        name:'two',
                        itemStyle:{
                            normal:{
                                color:'#a238fb'
                            }
                        }
                    }
                ]
            }
        ]
    };

    var inSale, outSale;
    var index = 0;
    if(id.toString().indexOf('-1') > 0){
        /*
         stockService.getBiDetail(formatDate(dataNow)).done(function(data){
         console.log(data);
         var inSale = parseInt(data[1].ytd_amt);
         var outSale =  parseInt(data[2].ytd_amt);
         option.series[0].data =  [
         {
         value:inSale,
         name:'one',
         itemStyle:{
         normal:{
         color:'#49c7fa',
         fontSize:24
         }
         }
         },
         {
         value:outSale,
         name:'two',
         itemStyle:{
         normal:{
         color:'#007463',
         fontSize:24
         }
         }
         }
         ];
         console.log(option);
         myChart.setOption(option,true);
         });
         */
        inSale = 65;
        outSale = 15;
        index = 1;
        $('#page2-pie-total-1').html(inSale+outSale);
        $('#page2-pie-insale-1').html(inSale);
        $('#page2-pie-outsale-1').html(outSale);
    } else if(id.toString().indexOf('-2') > 0) {
        inSale = 40;
        outSale = 18;
        index = 2;
        $('#page2-pie-total2').html(inSale+outSale);
        $('#page2-pie-insale2').html(inSale);
        $('#page2-pie-outsale2').html(outSale);
    } else if(id.toString().indexOf('-3') > 0) {
        inSale = 30;
        outSale = 8;
        index = 3;
    }
    option.series[0].data[0].value = (inSale+outSale)/150;
    if (option.series[0].data[0].value == 0)
        option.series[0].data[0].value = 1;
    option.series[0].data[1].value = outSale;
    option.series[0].data[2].value = option.series[0].data[0].value;
    option.series[0].data[3].value = inSale;
    if (index > 0) {
        $('#page2-pie-total-' + index).html(inSale + outSale);
        $('#page2-pie-insale-' + index).html(inSale);
        $('#page2-pie-outsale-' + index).html(outSale);
    }

    myChart.setOption(option);
}

//    setInterval('initChart()',300000);

function page2_initChart(){
    for (var i = 1; i <= 3; i++) {
        page2_getPie('page2-pie-' + i);
    }

    for (var i = 1; i <= 3; i++) {
        page2_getBar('page2-bar-' + i);
    }
}

/*
 window.onresize=function() {
 window.location.href = window.location.href;
 }
 */

/*
(function (doc, win) {
    'use strict';
    page2_initChart();
})(document, window);
*/

setTimeout("page2_initChart()",100);

