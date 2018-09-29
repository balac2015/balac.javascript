/*雷达图样例1*/
function commonGetRadar(id,showLabel,maxValue,dataValue,x_width,x2_width,menuList) {
    var nameTextSize = 46*winFactor;
    var frameWidth =  $('#'+ id).css('width');
    frameWidth = parseFloat(frameWidth);
    var frameHeight = $('#'+ id).css('height');
    frameHeight = parseFloat(frameHeight);
    var yTopHeight = bar_y_top_height + 10*winFactor;
    var radarSize = 230*winFactor + seperateHeight/2;
    //计算横坐标位置值,用于计算字体渐变
    var myChart = echartsInstance.init(document.getElementById(id));
    window.onresize = myChart.resize;
    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...' //loading话术
    });
    var indicatorList = [];
    for(var i=0; i<showLabel.length; i++) {
        var indicatorListTemp = [];
        for(var j=0;j<showLabel[i].length; j++) {
            var indicatorTemp = {};
            indicatorTemp.text = showLabel[i][j];
            indicatorTemp.max = maxValue;
            indicatorListTemp.push(indicatorTemp);
        }
        indicatorList.push(indicatorListTemp);
    }
    // ajax getting data...............
    // ajax callback
    myChart.hideLoading();
    var option = {
        animation: true,
        title : {
            show:false,
            text: '',
            subtext: ''
        },
        tooltip : {
            show: false,
            trigger: 'axis'
        },
        legend: {
            show:false,
            x : 'center',
            data:['']
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        //时间轴设置
        timeline : {
            //时间轴时间列表
            show: false,
            autoPlay:false,
            playInterval: menu_play_interval,
            /*playInterval:1000,*/
            data:['1'],
        },
        options: [
            //第一个时间点
            {
                animationDurationUpdate: bar_animte_time,
                grid: {y: yTopHeight, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
                calculable : true,
                xAxis :[],
                yAxis:[],
                polar : [
                ],
                series : [
                ]
            }
        ]
    };
    myChart.setOption(option);
    option.timeline.data = menuList;
    option.options = [];
    //时间点各个option 设置
    for(var i=0; i<dataValue.length; i++) {
        var optionTemp = {};
        optionTemp.series = [];
        optionTemp.polar = [];
        var series = {
            name: '',
            type: 'radar',
            symbolSize:0,
            //默认itemstyle
            itemStyle: {
                normal: {
/*
                    areaStyle: {
                        type: 'default',
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, frameHeight- bar_y_bottom_height, 0, yTopHeight,
                                [[0, 'rgba(6,46,220,0.7)'],[1, 'rgba(27,166,246,0.7)']]

                            )
                        })(),
                    },
*/
                    lineStyle: {
                        width:3
                    },
                }
            },
            data : []
        };
        var polar = {
            indicator : indicatorList[i],
            radius : radarSize,
            name: {
                show: true,
                formatter: null,
                textStyle:{fontSize:bar_x_font_size,color:bar_x_font_color},
            },
            splitLine:{
                lineStyle:{
                    color: bar_splitline_color,
                    width: 1,
                    type: 'solid'
                }
            },
            splitArea:{
                show:true,
                areaStyle:{
                    color: [
                        bar_splitarea_color1,
                        bar_splitarea_color2
                    ]
                }
            },
            axisLine:{
                lineStyle:{
                    color: bar_splitline_color,
                    width: 1,
                    type: 'solid'
                }
            },
        };
       for(var dataIndex=0; dataIndex<dataValue[i].length; dataIndex++) {
            var dataTemp = {};
            dataTemp.value = dataValue[i][dataIndex];
           /*颜色设置*/
           if (dataIndex%2 == 0) {
           } else {
               dataTemp.itemStyle =  {
                   normal: {
/*
                       areaStyle: {
                           type: 'default',
                               color : (function (){
                               var zrColor = require('zrender/tool/color');
                               return zrColor.getLinearGradient(
                                   0, frameHeight- bar_y_bottom_height, 0, yTopHeight,
                                   [[0, 'rgba(255,53,51,0.7)'],[1, 'rgba(254,103,109,0.7)']]
                               )
                           })(),
                       },
*/
                       lineStyle: {
                           width:3                       },
                   }
               }
           }
            series.data .push(dataTemp);
        }
        optionTemp.series.push(series);
        optionTemp.polar.push(polar);
        option.options.push(optionTemp);
    }
    myChart.setOption(option);
   /* myChart.component.timeline.play(0, false);*/
    /*myChart.component.timeline.autoPlay = true;*/
    return myChart;
}
