function Page3_getVerticalBar(id,chartIndex) {
    //自定义缩放
    var factor =  document.documentElement.clientWidth/ 1920;
    var barWidth = 40*factor;
    var bottomLabelSize = 38*factor;
    var leftLabelSize= 30*factor;
    var barGap1 =  55*factor;
    var barGap2 = 40*factor;
    var valueSize = 25*factor;

    var data1 = [100,120,80,90,130,150,100,90,95,94];
    var data2 = [100,200,80,90,130,150,100,90,95,94];
    var dataValue = [];

    if (chartIndex == 0) {
        dataValue = data1;
    } else {
        dataValue = data2;
    }

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
        grid: {
            borderWidth: 0
        },
        xAxis: [
            {
                type: 'category',
                show: true,
                data: [{
                    value:'家电',
                    /*textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'厨电',
                    /*textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'洗衣机',
                    /*textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'冰箱',
                   /* textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'生活',
                    /*textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'热水器',
                   /* textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'环电',
                   /* textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'中央',
                  /*  textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'部品',
                   /* textStyle:{
                        color:'#fff'
                    }*/
                },{
                    value:'安得',
                    /*textStyle:{
                        color:'#fff'
                    }*/
                }],
                axisLine:{
                    lineStyle:{
                        width:1,
                        color: '#2b3140'
                    }
                },

                axisLabel: {
                    show:true,
                    textStyle:{
                        color: '#ffffff',
                        fontSize: bottomLabelSize,
                    },
                    /*margin:30,*/
                },
                axisTick: {show:false},
                itemStyle: {normal: {color:'#fff'}},
                splitLine: {
                    lineStyle: {
                        color: ['#ccc'],
                        width: 0,
                        type: 'solid'
                    },
                    show: false
                }
            }/*,
            {
                type: 'category',
                data: ['','','','','',''],
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false}
            }*/
        ],
        yAxis: [
            {
                type: 'value',
                axisLine:{
                    show:false
                },
                splitLine:{
                    lineStyle:{
                        color: ['#2d3344'],
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    show:true,
                    textStyle:{
                        color: '#8393aa',
                        fontSize: leftLabelSize,
                    },
                    /*margin:30,*/
                },
                splitArea:{
                    show:true,
                    areaStyle:{
                        color: [
                            'rgba(0,0,0,0)',
                            'rgba(12,15,22,255)'
                        ]
                    }
                }
            },
        ],

        series: [
            {
                name:'内销',
                type:'bar',
                barWidth:barWidth,
                barCategoryGap:barGap1,
/*
                barCategoryGap:'50%',
*/
                itemStyle: {normal: {
                   color : (function (){
                        var zrColor = require('zrender/tool/color');
                        return zrColor.getLinearGradient(
                            0, 400, 0, 300,
                            [[0, '#fa560d'],[1, '#fd964a']]
                        )
                    })(),
                    /*color:'#fa8d0d',*/
                    label : {show: true, position: 'top',textStyle:{fontSize:valueSize,color:'#fff'}}}},
                data:dataValue
            },
            {
                name:'外销',
                type:'bar',
                barWidth:barWidth,
                /*barGap: barGap2,*/
                barCategoryGap:0,
                itemStyle: {normal: {
                    color:(function (){
                        var zrColor = require('zrender/tool/color');
                        return zrColor.getLinearGradient(
                            0, 400, 0, 300,
                            [[0, '#fa8d0c'],[1, '#fdc74a']]
                        )
                    })(),
                    label : {show: true, position: 'top',textStyle:{fontSize:valueSize,color:'#fff'}}}},
                data:[20,50,70,80,50,60,45,55,50,55]
            }

        ]
    };
    myChart.setOption(option);
}

function Page3_initEchart() {
    setTimeout(function() {
        if (echartsInit) {
            Page3_getVerticalBar('salesBarId1',0);
            Page3_getVerticalBar('salesBarId2',1);
        } else {
            Page3_initEchart();
        }
    },100);
}
(function (doc, win) {
    'use strict';
    Page3_initEchart();
  //  setTimeout("initChart()",100);
/*    setInterval('initChart()',300000);*/
})(document, window);
