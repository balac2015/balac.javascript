var page2_testData = false;     // 是否使用测试数据

var page2_bars = [null, null, null];
var page2_pies = [null, null, null];

function page2_id2index(id) {
    var index = 0;
    if(id.toString().indexOf('-1') > 0){    // 销售
        index = 0;
    } else if(id.toString().indexOf('-2') > 0) {    // 回款
        index = 1;
    } else if(id.toString().indexOf('-3') > 0) {    // 成品库存
        index = 2;
    }

    return index;
}

// 初始化柱状图表
function page2_getBar(id) {
    // 图表实例化------------------
    // srcipt标签式引入
//        var myChart = echarts.init(document.getElementById(id));
    var myChart = echartsInstance.init(document.getElementById(id));
    var index = page2_id2index(id);
    page2_bars[index] = myChart;

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();

    var factor = winFactor;
    // var factor =  document.documentElement.clientWidth / 1920;
    var bar_width =  120*factor;
    var bar_gap =  475*factor;

    var left_color_1 = '#7210fb';
    var left_color_2 = '#cc5dfc';
    var right_color_1 = '#fb126d';
    var right_color_2 = '#fe85b6';
    
    var bar_total_height = parseFloat($('#'+id).css('height'));
    var bar_max_height = (bar_total_height - bar_y_top_height - bar_y_bottom_height);

    var date=new Date;
    var year=date.getFullYear();
    var current_year = year.toString() + '年';
    var last_year = (year-1).toString() + '年';

    // 图表使用-------------------
    var option = {
        calculable : false,
        animationDurationUpdate: bar_animte_time,
        grid: {y:bar_y_top_height, y2:bar_y_bottom_height, x:160*factor, x2:100*factor, borderWidth:0},
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
                data : [last_year,current_year]
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : [last_year,current_year]
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: {show:false},
                axisLabel:{formatter:'{value}',
                    textStyle:{
                        color: bar_y_font_color,
                        fontSize: bar_y_font_size,
                        fontFamily:chart_ff
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
            }
        ],
        series : [
            {
                name:'year2014',
                type:'bar',
                barWidth: bar_width,
                barCategoryGap: bar_gap,
                itemStyle: {
                    normal: {
                        color:(function() {
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, bar_max_height, 0, 0,
                                [[0, left_color_1],[1, left_color_2]]
                            );
                        })(),
                        label:{show:true,textStyle:{fontSize:bar_label_font_size, color:bar_label_font_color, fontFamily:chart_ff}}
                    }
                },
                data:[400,500]
            },
            {
                name:'Year2015',
                type:'bar',
                barWidth: bar_width,
                itemStyle: {
                    normal: {
                        color:(function() {
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, bar_max_height, 0, 0,
                                [[0, right_color_1],[1, right_color_2]]
                            );
                        })(),
                        label:{show:true,textStyle:{fontSize:bar_label_font_size, color:bar_label_font_color, fontFamily:chart_ff}}}},
                data:[478,600]
            },
        ]
    };

    var barDataList = [[], []];

    if (page2_testData) {
        if(id.toString().indexOf('-1') > 0){    // 销售
            barDataList[0].push(600);
            barDataList[0].push(750);
            barDataList[1].push(715);
            barDataList[1].push(834);
        } else if(id.toString().indexOf('-2') > 0) {    // 回款
            barDataList[0].push(400);
            barDataList[0].push(500);
            barDataList[1].push(478);
            barDataList[1].push(600);
        } else if(id.toString().indexOf('-3') > 0) {    // 成品库存
            barDataList[0].push(100);
            barDataList[0].push(110);
            barDataList[1].push(64);
            barDataList[1].push(80);
        }
    }
    else {
        if(id.toString().indexOf('-1') > 0 && service_collection[SI_DepartmentSaleStock].data != null){    // 销售
            barDataList = page2_getTotalAmt(service_collection[SI_DepartmentSaleStock].data[0], 0);

            // 上年的年度目标
            var datum = service_collection[SI_PlanData].data;
            for (var i = 0; i < datum.length; i++) {
                if (datum[i].type == '销售') {
                    barDataList[0][0] = dealHmillion2(parseInt(datum[i].amt));
                    break;
                }
            }
        } else if(id.toString().indexOf('-2') > 0 && service_collection[SI_DepartmentBack].data != null) {    // 回款
            barDataList = page2_getTotalAmt(service_collection[SI_DepartmentBack].data, 0);

            // 上年的年度目标
            var datum = service_collection[SI_PlanData].data;
            for (var i = 0; i < datum.length; i++) {
                if (datum[i].type == '回款') {
                    barDataList[0][0] = dealHmillion2(parseInt(datum[i].amt));
                    break;
                }
            }
        } else if(id.toString().indexOf('-3') > 0 && service_collection[SI_DepartmentSaleStock].data != null) {    // 成品库存
            barDataList = page2_getTotalAmt(service_collection[SI_DepartmentSaleStock].data[1], 1);
        }
    }

    if (barDataList[0].length > 0) {
        option.series[0].data = barDataList[0];
        if (barDataList[1].length > 0) {
            option.series[1].data = barDataList[1];
        }
        else {
            option.series.pop(); //移除最后一个
        }

        myChart.setOption(option);

        // 重新设置填充颜色
        var maxValue = myChart.component.yAxis._axisList[0].getExtremum().max;
        option.series[0].data = [];
        var color1 = left_color_1;
        var color2 = left_color_2;
        if (barDataList[1].length == 0) {
            color1 = right_color_1;
            color2 = right_color_2;
        }
        for (var j = 0; j < barDataList[0].length; j++) {
            var data = {};
            var nLength = barDataList[0][j] * bar_max_height / maxValue;
            data.value = barDataList[0][j];
            data.itemStyle = {};
            data.itemStyle.normal = {};
            setGradientColor(data.itemStyle.normal, 0, bar_total_height-bar_y_bottom_height, 0, bar_total_height - bar_y_bottom_height - nLength, color1, color2);
            option.series[0].data.push(data);
        }
        if (barDataList[1].length > 0) {
            option.series[1].data = [];
            color1 = right_color_1;
            color2 = right_color_2;
            for (var j = 0; j < barDataList[1].length; j++) {
                var data = {};
                var nLength = barDataList[1][j] * bar_max_height / maxValue;
                data.value = barDataList[1][j];
                data.itemStyle = {};
                data.itemStyle.normal = {};
                setGradientColor(data.itemStyle.normal, 0, bar_total_height - bar_y_bottom_height, 0, bar_total_height - bar_y_bottom_height - nLength, color1, color2);
                option.series[1].data.push(data);
            }
        }

        myChart.setOption(option);
    }
}

// 获取总部合计数据
function page2_getTotalAmt(datum, mode) {
    var barDataList = [[], []];
    var value = 0;
    for (var i = 0; i < datum.length; i++) {
        if (mode == 0 && datum[i].bd_code == 'M100' && datum[i].shipment_type == "0") {
            value = 0;  // 上年目标 (暂时没有数据)
            barDataList[0].push(value);
            if (datum[i].yrs_pln_val != undefined)
                value = dealHmillion2(parseInt(datum[i].yrs_pln_val));  // 本年目标
            else
                value = dealHmillion2(parseInt(datum[i].ytd_amt_p));  // 本年目标
            barDataList[0].push(value);

            value = dealHmillion2(parseInt(datum[i].ytd_amt_y));  // 上年累计
            barDataList[1].push(value);
            value = dealHmillion2(parseInt(datum[i].ytd_amt));  // 本年累计
            barDataList[1].push(value);

            break;
        }
        else if (mode == 1 && datum[i].bd_name == '总部' && datum[i].direct_code == "合计") {
            value = dealHmillion2(parseInt(datum[i].inv_last_amt));  // 上年累计
            barDataList[0].push(value);
            value = dealHmillion2(parseInt(datum[i].inv_amt));      // 本年累计
            barDataList[0].push(value);

            break;
        }
    }

    return barDataList;
}

function page2_getPie(id) {
    // 图表实例化------------------
    // srcipt标签式引入
//        var myChart = echarts.init(document.getElementById(id));
    var myChart = echartsInstance.init(document.getElementById(id));
    var index = page2_id2index(id);
    page2_pies[index] = myChart;

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
    });

    // ajax getting data...............

    // ajax callback
    myChart.hideLoading();

    var out_color_1 = '#fe85b7';
    var out_color_2 = '#fb0e6b';
    var in_color_1 = '#ce5dfd';
    var in_color_2 = '#6d0ffb';
    var pie_height = 360*winFactor*0.9;

    // 图表使用-------------------
    var option = {
        animation: pie_animate,
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
                        value:1,
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            }
                        }
                    },
                    {
                        value:20,
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
                    },
                    {
                        value:1,
                        itemStyle:{
                            normal:{
                                color:'rgba(0,0,0,0)'
                            }
                        }
                    },
                    {
                        value:80,
                        itemStyle:{
                            normal:{
                                color:(function() {
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, pie_height, 0, 0,
                                        [[0, out_color_2],[1, out_color_1]]
                                    );
                                })(),
                            }
                        }
                    }
                ]
            }
        ]
    };

    var total, inSale, inSalePlan, inSaleYoy, outSale, outSalePlan, outSaleYoy;
    var index = 0;
    if (page2_testData) {
        if (id.toString().indexOf('-1') > 0) {
            inSale = 65;
            inSalePlan = 60;
            inSaleYoy = 85;
            outSale = 15;
            outSalePlan = 80;
            outSaleYoy = 76;
            index = 1;
        } else if (id.toString().indexOf('-2') > 0) {
            inSale = 40;
            inSalePlan = 60;
            inSaleYoy = 85;
            outSale = 18;
            outSalePlan = 81;
            outSaleYoy = 77;
            index = 2;
        } else if (id.toString().indexOf('-3') > 0) {
            inSale = 30;
            inSalePlan = 60;
            inSaleYoy = 85;
            outSale = 8;
            outSalePlan = 82;
            outSaleYoy = 78;
            index = 3;
        }

        total = inSale + outSale;
    }
    else {
        var saleData = service_collection[SI_DepartmentSaleStock].data[0];
        var backData = service_collection[SI_DepartmentBack].data;
        var stockData = service_collection[SI_DepartmentSaleStock].data[1];

        if (id.toString().indexOf('-1') > 0) {
            total = dealTThousand(saleData[0].ytd_amt);

            inSale = dealTThousand(saleData[1].ytd_amt);
            outSale = dealTThousand(saleData[2].ytd_amt);

            inSalePlan = Math.round(saleData[1].ytd_amt_roc);
            inSaleYoy = Math.round(saleData[1].ytd_amt_yoy);

            outSalePlan = Math.round(saleData[2].ytd_amt_roc);
            outSaleYoy = Math.round(saleData[2].ytd_amt_yoy);

            index = 1;
        } else if (id.toString().indexOf('-2') > 0) {
            total = dealTThousand(backData[0].ytd_amt);

            inSale = dealTThousand(backData[1].ytd_amt);
            outSale = dealTThousand(backData[2].ytd_amt);

            inSalePlan = Math.round(backData[1].ytd_amt_roc);
            inSaleYoy = Math.round(backData[1].ytd_amt_yoy);

            outSalePlan = Math.round(backData[2].ytd_amt_roc);
            outSaleYoy = Math.round(backData[2].ytd_amt_yoy);

            index = 2;
        } else if (id.toString().indexOf('-3') > 0) {
            total = dealTThousand(stockData[stockData.length - 4].inv_amt);

            inSale = dealTThousand(stockData[stockData.length - 6].inv_amt);
            outSale = dealTThousand(stockData[stockData.length - 5].inv_amt);

            inSaleYoy = Math.round(stockData[stockData.length - 6].inv_amt_yoy);

            outSaleYoy = Math.round(stockData[stockData.length - 5].inv_amt_yoy);

            index = 3;
        }
    }

    // 文本数据
    $('#page2-pie-total-' + index).html(total);
    $('#page2-pie-insale-' + index).html(inSale);
    $('#page2-pie-outsale-' + index).html(outSale);
    $('#page2-insale-plan-' + index).html(inSalePlan);
    $('#page2-insale-yoy-' + index).html(inSaleYoy);
    if (index == 3)
        markItem('#page2-insale-yoy-' + index, (inSaleYoy>=0));
    else
        markItem('#page2-insale-yoy-' + index, (inSaleYoy<0));
    $('#page2-outsale-plan-' + index).html(outSalePlan);
    $('#page2-outsale-yoy-' + index).html(outSaleYoy);
    if (index == 3)
        markItem('#page2-outsale-yoy-' + index, (outSaleYoy>=0));
    else
        markItem('#page2-outsale-yoy-' + index, (outSaleYoy<0));

    // pie中的数据
    option.series[0].data[0].value = (inSale+outSale)/150;  // 预留缝隙 (0.5%)
    if (option.series[0].data[0].value == 0)
        option.series[0].data[0].value = 1;
    option.series[0].data[1].value = outSale;
    option.series[0].data[2].value = option.series[0].data[0].value;
    option.series[0].data[3].value = inSale;

    myChart.setOption(option);
}

//    setInterval('initChart()',300000);

function page2_initChart(){
    for (var i = 1; i <= page2_pies.length; i++) {
      /*  if (page2_pies[i-1] != null)
            page2_pies[i-1].dispose();
*/
        page2_getPie('page2-pie-' + i);
    }

    for (var i = 1; i <= page2_bars.length; i++) {
       /* if (page2_bars[i-1] != null)
            page2_bars[i-1].dispose();*/

        page2_getBar('page2-bar-' + i);
    }
}

/*
 window.onresize=function() {
 window.location.href = window.location.href;
 }
 */

// 打开页面
function page2_entry(dataInit) {
    // 初始化图表
    if (dataInit) {
        if (page2_testData) {
            setTimeout("page2_initChart()",100);
        }
        else {
            page2_initData();
        }
    } else {
        for (var i = 1; i <= page2_pies.length; i++) {
            if (page2_pies[i-1] != null) {
                page2_pies[i-1].restore();
            }
        }
        for (var i = 1; i <= page2_bars.length; i++) {
            if (page2_bars[i-1] != null) {
                page2_bars[i-1].restore();
            }
        }

        refreshLastUpdateTime();
    }
}
// 关闭页面
function page2_exit() {
    for (var i = 1; i <= page2_pies.length; i++) {
          if (page2_pies[i-1] != null) {
              page2_pies[i-1].clearZr();
          }
    }
    for (var i = 1; i <= page2_bars.length; i++) {
         if (page2_bars[i-1] != null) {
             page2_bars[i-1].clearZr();
         }
    }
}

function page2_initData(){
    if(service_collection[SI_DepartmentBack].data == null
        || service_collection[SI_DepartmentSaleStock].data == null
        || service_collection[SI_PlanData].data == null
    ){
        setTimeout(function () {
            page2_initData();
        }, 500);
    } else {
        setTimeout("page2_initChart()",100);

        refreshLastUpdateTime();
    }
}


