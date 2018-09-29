/**
 * @file        柱状图 (包括叠加其他图表)
 * @author      ex_hujie
 * @version     1.0.1 - 2015-11-24
 */

/**
 * 柱状图
 *
 * @param id                控件id
 * @param colors            渐变色1 (colors[0]: 底部颜色, colors[2]: 顶部颜色)
 * @param colors2           渐变色2 (colors2[0]: 底部颜色, colors2[2]: 顶部颜色)
 * @param barDataList       数据
 *                          barDataList[0][]: 柱状数据 (bar)
 *                              name: 名称 (对应菜单中的名称, 如果没有菜单的话,就为空)
 *                              lables[]: 底部每根柱子标签的名称
 *                              values[]: 每根柱子的数据
 *                          barDataList[1][]: 线条数据 (line)
 *                              values[]: 每个点的数据
 *                          varDataList[][]: 当然还可以叠加其他图表
 *
 * @returns {*|FooTable.Table}
 */
function commonGetBar(id, colors,colors2,x_width, x2_width, barDataList) {
    // 图表实例化------------------
    // srcipt标签式引入
//        var myChart = echarts.init(document.getElementById(id));
    var myChart = echartsInstance.init(document.getElementById(id));

    var factor = winFactor;
    // var factor =  document.documentElement.clientWidth / 1920;
    var bar_width =  60*factor;

    var bar_total_height =  parseFloat($('#'+id).css('height'));
    var bar_max_height = (bar_total_height - bar_y_top_height - bar_y_bottom_height);

    // 图表使用-------------------
    var option = {
        //时间轴设置
        timeline : {
            //时间轴时间列表
            show: false,
            autoPlay: false,
            playInterval: menu_play_interval,
        },
        //时间点设置
        options : [
            //第一个时间点
            {
                animationDurationUpdate: bar_animte_2_time,
                grid: {y: bar_y_top_height, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
                //设置坐标轴
                xAxis : [
                    {
                        type : 'category',
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:true,
                            textStyle:{
                                color: bar_x_font_color,
                                fontSize: bar_x_font_size,
                            },
                            margin:bar_x_margin,
                        },
                        splitLine: {show:false},
                    },
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine: {show:false},
                        axisLabel:{formatter:'{value}',
                            textStyle:{
                                color: bar_y_font_color,
                                fontSize: bar_y_font_size,
                                fontFamily:chart_ff,
                            },
                            margin:bar_y_margin,
                        },
                        splitArea: {
                            show:true,
                            areaStyle: {
                                color: [
                                    bar_splitarea_color1,
                                    bar_splitarea_color2
                                ]
                            }
                        },
                        splitLine: {lineStyle:{color:bar_splitline_color}},
                    },

                    {
                        type : 'value',
                        axisLabel : {
                            textStyle: {
                                color: '#8393aa',
                                fontSize:bar_x_font_size
                            },
                            formatter:function(params){
                                return (params*100).toString() + '%';
                            }
                        },
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        barWidth: bar_width,
                        itemStyle: {normal: {
                            color:(function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, bar_max_height, 0, 0,
                                    [[0, colors[0]],[1, colors[1]]]
                                );
                            })(),
                            label:{show:true,textStyle:{fontSize:bar_label_font_size, color:bar_label_font_color, fontFamily:chart_ff}}}},
                        data:[],
                    },
                    {
                        z:10,
                        type:'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: (function () {
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, 100, 0, 0,
                                        [[0, '#fe676d'], [1, '#fa3332']]
                                    );
                                })(),
                                lineStyle: {
                                    color: '#fb9c1c',
                                    width: 4
                                }
                            }
                        },
                        data:[],
                    }
                ]
            }
        ]
    };

    // 有效数据
    if (barDataList.length > 0) {
        // 时间轴
        if (barDataList[0].length > 0) {
            option.timeline.data = [];
            for (var i = 0; i < barDataList[0].length; i++) {
                option.timeline.data.push(i + 1);
            }
        }

        // 设置数据
        for (var i = 0; i < barDataList[0].length; i++) {
            var serie = {};
            var serie2 = {};
            if (i > 0) {
                var optionTemp = {};
                var series = [];
                series.push(serie);
                if (barDataList.length == 2) {
                    var series2 = [];
                    series.push(serie2);

                    optionTemp.xAxis =[];
                    var temp = {
                        type : 'category',
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:true,
                            textStyle:{
                                color: bar_x_font_color,
                                fontSize: bar_x_font_size,
                            },
                            margin:bar_x_margin,
                        },
                        splitLine: {show:false},
                    };
                    optionTemp.xAxis.push(temp);
                }
                optionTemp.series = series;
                option.options.push(optionTemp);
            }
            else {
                serie = option.options[i].series[0];
                if (barDataList.length == 2) {
                    serie2 = option.options[i].series[1];
                }
            }

            if (barDataList[0][i].labels != undefined && barDataList[0][i].labels.length > 0)
                option.options[i].xAxis[0].data = barDataList[0][i].labels;
            serie.data = barDataList[0][i].values;
            if (barDataList.length == 2) {
                serie2.data = barDataList[1][i].values;
            }
        }
        myChart.setOption(option);

        // 重新设置填充颜色
        var maxValue = myChart.component.yAxis._axisList[0].getExtremum().max;
        for (var i = 0; i < barDataList[0].length; i++) {
            option.options[i].series[0].data = [];
            var max = parseFloat(barDataList[0][i].values[0]);
            for (var j = 1; j < barDataList[0][i].values.length; j++) {
                if (max < parseFloat(barDataList[0][i].values[j]))
                    max = parseFloat(barDataList[0][i].values[j]);
            }

            for (var j = 0; j < barDataList[0][i].values.length; j++) {
                var data = {};
                var nLength = barDataList[0][i].values[j] * bar_max_height / maxValue;
                if (i > 0) {
                    // 由于无法获取到maxValue, 就暂时用这种方法
                    nLength = barDataList[0][i].values[j] * 0.9 * bar_max_height / max;
                }
                data.value = barDataList[0][i].values[j];
                data.itemStyle = {};
                data.itemStyle.normal = {};
                if (colors2 != null) {
                    // 每月间隔
                    if (j % 2 == 0)
                        setGradientColor(data.itemStyle.normal, 0, bar_total_height - bar_y_bottom_height, 0, bar_total_height - bar_y_bottom_height - nLength, colors[0], colors[1]);
                    else
                        setGradientColor(data.itemStyle.normal, 0, bar_total_height - bar_y_bottom_height, 0, bar_total_height - bar_y_bottom_height - nLength, colors2[0], colors2[1]);
                }
                else {
                    setGradientColor(data.itemStyle.normal, 0, bar_total_height - bar_y_bottom_height, 0, bar_total_height - bar_y_bottom_height - nLength, colors[0], colors[1]);
                }
                option.options[i].series[0].data.push(data);
            }
        }

        myChart.setOption(option);

    }

    return myChart;
}

