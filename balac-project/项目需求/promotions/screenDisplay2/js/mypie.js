/**
 * @file 饼状图
 * @author ex_hujie
 * @version 1.0.1 - 2015-11-19
 */

/**
 * 饼状图
 *
 * @param id                控件id
 * @param colors            渐变色1
 * @param colors2           渐变色2
 * @param pieDataValues     数据
 * @param hasGap            是否有缝隙
 *
 * @returns {*|FooTable.Table}
 */
function commonGetPie(id, colors,colors2,pieDataValues,hasGap, formatter) {
    // 图表实例化------------------
    // srcipt标签式引入
//        var myChart = echarts.init(document.getElementById(id));
    var myChart = echartsInstance.init(document.getElementById(id));

    var pie_total_height =  parseInt($('#'+id).css('height'));
    var factor = winFactor;
    var center_x = 1460 * factor / 2;
    var center_y = pie_total_height / 2;
    var radius = center_y * 0.65;

    if (formatter == undefined) {
        formatter = '{b} {c} ({d}%)';
    }
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
                series : [
                    {
                        type:'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        itemStyle:{
                            normal:{
                                label:{show:true,position:'outer',formatter: formatter,textStyle:{fontSize:pie_label_font_size,color: pie_label_font_color}},
                                labelLine:{show:true,lineStyle:{color:'#404040'}},
                            },
                        },
                        data:[]
                    }
                ]
            }
        ]
    };

    var pieDataLists = [];
    var colorIndex = 0;
    var count = 0;
    for (var channel = 0; channel < pieDataValues.length; channel++) {
        var datum = pieDataValues[channel];
        if (datum.length == 0)
            continue;

        var total = 0;
        if (hasGap) {
            for (var t = 0; t < datum.length; t++) {
                total += parseFloat(datum[t].value);
            }
        }

        if (datum.length < pieDataValues[0].length) {
            for (var n = datum.length; n < pieDataValues[0].length; n++) {
                var item = {};
                item.name = '';
                item.value = 0;
                datum.push(item);
            }
        }
        var dataList = [];
        pieDataLists.push(dataList);
        count++;

        // 设置pie中的属性
        var angleStart = 0;
        for (var i = 0; i < datum.length; i++) {
            var data1 = {};
            data1.value = datum[i].value;

            if (data1.value == 0) {
//                data1.value = total * 0.0005;
            }
            if (data1.value >= 0) {
                data1.itemStyle = {};
                data1.itemStyle.normal = {};
                if (false) {
                    // 中心辐射渐变
                    data1.itemStyle.normal.color = (function () {
                        var zrColor = require('zrender/tool/color');
                        return zrColor.getRadialGradient(
                            center_x, center_y, 0, center_x, center_y, radius,
                            [[0, colors[colorIndex]], [1, colors2[colorIndex]]]
                        );
                    })();
                }
                else {
                    // 由下往上渐变
                    setGradientColor(data1.itemStyle.normal, 0, center_y+radius, 0, center_y-radius, colors[colorIndex], colors2[colorIndex]);
                }
                if (datum[i].name == null || datum[i].name.length == 0) {
                    data1.itemStyle.normal.label = {show: false};
                    data1.itemStyle.normal.labelLine = {show: false};
                }
                else {
                    data1.itemStyle.normal.label = {show: true};
                    data1.itemStyle.normal.labelLine = {show: true};
                }
                if (hasGap) {
                    data1.itemStyle.normal.label.formatter = '{b}';
                    if (formatter == '{b} {c} ({d}%)') {
                        data1.name = datum[i].name + " " + data1.value + " (" + (parseFloat(data1.value)*100/total).toFixed(2) + "%" + ")";
                    }
                    else {
                        data1.name = datum[i].name + " " + (parseFloat(data1.value)*100/total).toFixed(2) + "%";
                    }
                }
                else {
                    data1.name = datum[i].name;
                }

                dataList.push(data1);

                // 颜色循环
                colorIndex++;
                if (colorIndex >= colors.length) {
                    colorIndex = 0;
                }
            }
        }
    }


    // 有效数据
    if (pieDataLists[0].length > 0) {
        // 时间轴
        option.timeline.data = [];
        for (var i = 0; i < pieDataValues.length; i++) {
            option.timeline.data.push(i + 1);
        }

        // 数据
        for (var n = 1; n < pieDataValues.length; n++) {
            var series = [];
            var serie = {};
            series.data = [];
            series.push(serie);
            var optionTemp = {};
            optionTemp.series = series;
            option.options.push(optionTemp);
        }

        // 设置数据
        for (var p = 0; p < pieDataValues.length; p++) {
            if (hasGap) {
                var total = 0;
                for (var n = 0; n < pieDataLists[p].length; n++) {
                    total += parseFloat(pieDataLists[p][n].value);
                }
                // 计算缝隙 (0.5%)
                var fengxi = total * 0.005;

                option.options[p].series[0].data = [];
                for (var n = 0; n < pieDataLists[p].length; n++) {
                    // 有效数据
                    var data = pieDataLists[p][n];
                    var name = data.value;
                    var value = data.value;
                    option.options[p].series[0].data.push(data);

                    // 缝隙数据
                    data = {};
                    if (value == 0)
                        data.value = 0;
                    else
                        data.value = fengxi;
                    data.itemStyle = {normal: {color: 'rgba(0,0,0,0)', label: {show: false}, labelLine: {show: false}}};
                    option.options[p].series[0].data.push(data);
                }
            }
            else {
                option.options[p].series[0].data = pieDataLists[p];
            }
        }

        myChart.setOption(option);
    }

    return myChart;
}

