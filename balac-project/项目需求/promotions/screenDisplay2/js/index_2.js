
// 菜单中可见项的个数
var index2_showLines = 6;

// 菜单数据
var index2_menus = [
    {menu_object: null, name: 'index2_menus', chart: null, chart_id: 'index2-bar-1', menu_id: 'index2-menu-1', index: 0, count: 12, interval_id: null, options: {showLines:index2_showLines,scrollNum:2,showIndex: 0}, data: []},
    {menu_object: null, name: 'index2_menus', chart: null, chart_id: 'index2-bar-2', menu_id: 'index2-menu-2', index: 0, count: 19, interval_id: null, options: {showLines:index2_showLines,scrollNum:2,showIndex: 0}, data: []},
    {menu_object: null, name: 'index2_menus', chart: null, chart_id: 'index2-pie-1', menu_id: 'index2-menu-3', index: 0, count: 19, interval_id: null, options: {showLines:index2_showLines,scrollNum:2,showIndex: 0}, data: []},
];
var index2_menu_0 = 0;
var index2_menu_1 = 1;
var index2_menu_2 = 2;

var index2_scatter_chart = null;

// 初始化柱状图表
function index2_getBar(id) {

    var factor = winFactor;
    // var factor =  document.documentElement.clientWidth / 1920;

    var x_width = 160*factor;
    var x2_width = 50*factor;

    var colors = ['#062edc', '#1ba6f6'];
    var colors2 = null;

    var barDataList = [];
    var menu_index = 0;
    if (id.toString().indexOf('-1') > 0) { // 外销月度趋势
        menu_index = index2_menu_0;
        colors = ['#fb0e6b', '#fe85b7'];
        colors2 = ['#6d0ffb', '#ce5dfd'];

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        index2_menus[menu_index].data = [];
        barDataList.push([]);
        for (var channel = 0; channel < service_collection[SI_ExpMthsTrendData].data.length; channel++) {
            var datum = service_collection[SI_ExpMthsTrendData].data[channel];
            var dataList = {};
            dataList.name = '';
            dataList.labels = [];
            dataList.values = [];
            barDataList[0].push(dataList);

            if (false) {
                for (var n = 1; n <= 12; n++) {
                    var month = '';
                    if (n < 10)
                        month = '0';
                    month += n.toString();
                    for (var i = 0; i < datum.length; i++) {
                        var yearmonth = datum[i].yearmonth;
                        if (yearmonth.length == 6 && yearmonth.substr(4, 2) == month) {
                            barDataList[0][channel].values.push(dealHmillion(parseInt(datum[i].ytd_amt_usd)));
                            if (channel == 0) {
                                barDataList[0][channel].labels.push(n.toString() + '月');
                            }
                            break;
                        }
                    }
                }
            }
            else { // 确保显示12个月
                // 去年
                for (var n = 1; n <=12; n++) {
                    var ym = getYearMonthString(year-1, n);
                    for (var i = 0; i < datum.length; i++) {
                        if (datum[i].period_wid == ym) {
                            barDataList[0][channel].values.push(dealHmillion(parseFloat(datum[i].m_amt_usd)));
                            if (channel == 0) {
                                barDataList[0][channel].labels.push(n.toString() + '月');
                            }
                            break;
                        }
                    }
                }
                // 今年
                for (var n = 1; n <=month; n++) {
                    var ym = getYearMonthString(year, n);
                    for (var i = 0; i < datum.length; i++) {
                        if (datum[i].period_wid == ym) {
                            barDataList[0][channel].values.push(dealHmillion(parseFloat(datum[i].m_amt_usd)));
                            if (channel == 0) {
                                barDataList[0][channel].labels.push(n.toString() + '月');
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    else {
        x2_width = 130*factor;
        menu_index = index2_menu_1;
        colors = ['#062edc', '#1ba6f6'];

        barDataList.push([], []);
        for (var channel = 0; channel < service_collection[SI_ExpShareData].data.length; channel++) {
            var datum = service_collection[SI_ExpShareData].data[channel];
            if (datum.length == 0)
                continue;

            var dataList = {};
            dataList.name = '';
            dataList.labels = [];
            dataList.values = [];
            barDataList[0].push(dataList);
            var dataList2 = {};
            dataList2.values = [];
            barDataList[1].push(dataList2);

            for (var i = 0; i < datum.length; i++) {
                dataList.name = limitString(datum[i].prod_category, show_name_length);
                dataList.labels.push(limitString(datum[i].prod_factory, show_name_length));
                var now = parseFloat(datum[i].ytd_amt_usd);
                dataList.values.push(dealHmillion(now));
                var old = parseFloat(datum[i].ago_ytd_amt_usd);
                var ratio = (now-old)/old;
                dataList2.values.push(ratio);
            }
        }
    }
    index2_menus[menu_index].count = barDataList[0].length;
    index2_menus[menu_index].chart = commonGetBar(id, colors, colors2, x_width, x2_width, barDataList);


    // 有效数据
    if (barDataList.length > 0) {
        // 创建菜单
        if (menu_index == index2_menu_1) {
            var menu = $('#' + index2_menus[menu_index].menu_id);
            var oldlen = $("li", menu).length;
            if ($("li:eq(0)",menu).html().length == 0) {
                for (var i = 0; i < oldlen; i++) {
                    $("li:eq(" + i + ")", menu).each(function () {
                        $(this).html(barDataList[0][i].name);
                    })
                }
                /*
                 for (var i = oldlen; i < barDataList2.length; i++) {
                 var li = '<li>' + barDataList2[i].name + '</li';
                 menu.append(li);
                 }
                 */
            }
        }

        // 初始化菜单
        index2_menus[menu_index].menu_object.init();
        index2_menus[menu_index].menu_object.selectMenuIndex(0);
    }
}

function index2_getPie(id) {

    var colors = ['#fa560e', '#fa8d0c'];
    var colors2 = ['#fd9549', '#fdc74b'];
    var pieDataValues = [];
    var menu_index = 0;

    var categories = [];
    if (id.toString().indexOf('-1') > 0) {
        var count = 0;

        var dataList = service_collection[SI_ExpMarketShareData].data;
        for (var channel = 0; channel < dataList.length; channel++) {
            // 分类名
            categories[channel] = limitString(dataList[channel][0].prod_category, show_name_length);

            // 单元项
            var channelData = [];
            pieDataValues.push(channelData);
            for (var n = 0; n < dataList[channel].length; n++) {
                var data = {};
                data.name = limitString(dataList[channel][n].prod_factory, show_name_length);
                data.value = dealHmillion(parseFloat(dataList[channel][n].ytd_amt_usd));
                if (data.value == 0)
                    data.value = dealHmillion(parseFloat(dataList[channel][n].ytd_amt_usd), false, 3);
                channelData.push(data);
            }
        }

        menu_index = index2_menu_2;
        index2_menus[menu_index].count = service_collection[SI_ExpMarketShareData].data.length;
    }

    if (pieDataValues.length > 0) {
        index2_menus[menu_index].chart = commonGetPie(id, colors, colors2, pieDataValues, true);
    }

    // 有效数据
    if (index2_menus[menu_index].chart != null) {
        // 创建菜单
        if (menu_index == index2_menu_2) {
            var menu = $('#' + index2_menus[menu_index].menu_id);
            var oldlen = $("li", menu).length;
            if ($("li:eq(0)",menu).html().length == 0) {
                for (var i = 0; i < oldlen; i++) {
                    $("li:eq(" + i + ")", menu).each(function () {
                        $(this).html(categories[i]);
                    })
                }
                /*
                 for (var i = oldlen; i < barDataList2.length; i++) {
                 var li = '<li>' + barDataList2[i].name + '</li';
                 menu.append(li);
                 }
                 */
            }
        }

        index2_menus[menu_index].menu_object.init();
        index2_menus[menu_index].menu_object.selectMenuIndex(0);
    }
}

function index2_getScatter(id) {
    var showLabel = [];
    var dataValue = [];
    if (service_collection[SI_ExpSaleRateData].data != null) {
        var listData = service_collection[SI_ExpSaleRateData].data;
        if (listData != null) {
            for(var i=0; i<listData.length;i++) {
                var temp = [];
                temp[0] = Math.round(parseFloat(listData[i].rate)*100);
                var ratio = (parseFloat(listData[i].midea_ytd_amt_usd)-parseFloat(listData[i].ago_ytd_amt_usd)) / parseFloat(listData[i].ago_ytd_amt_usd);
                temp[1] = Math.round(ratio*100);
                temp[2] = listData[i].prod_category_wid;
                dataValue.push(temp);

                showLabel.push(listData[i].prod_category);
            }
        }
    }

    var x_width =110*winFactor;
    var x2_width = 220*winFactor;
    var lineClrList = ['#1272eb','#0e5be6','#0732dd','#1ba2f6'];
    var textClrList = ['#0838de','#1a9bf4','#0838de','#1a9bf4'];
    var axisName = ['出口占比(%)','出口同比(%)'];
    var toolTipFormat = ' 出口同比：{0}% <br/> 出口占比：{1}% ';
    /*
     prod_category:冰箱,prod_category_wid:58423
     prod_category:空调,prod_category_wid:58513
     prod_category:空调压缩机,prod_category_wid:58519
     prod_category:洗衣机,prod_category_wid:58471
     prod_category:多联机,prod_category_wid:58453
     prod_category:节能灯,prod_category_wid:58525

     prod_category:净水机,prod_category_wid:58429
     prod_category:饮水机,prod_category_wid:58531
     prod_category:热水器,prod_category_wid:58477
     prod_category:电热水器,prod_category_wid:58495
     prod_category:电风扇,prod_category_wid:58501
     prod_category:电暖器,prod_category_wid:58483
     prod_category:吸尘器,prod_category_wid:58441

     prod_category:微波炉,prod_category_wid:58459
     prod_category:洗碗机,prod_category_wid:58465
     prod_category:电饭锅,prod_category_wid:58507
     prod_category:电水壶,prod_category_wid:58489
     prod_category:单头炉,prod_category_wid:58435
     prod_category:多头炉,prod_category_wid:58447
     */
    var step_values = [[58423, 58513, 58519, 58471, 58453, 58525]
                ,[58429, 58531, 58477, 58495, 58501, 58483, 58441]
                ,[58459, 58465, 58507, 58489, 58435, 58447]
    ];
    index2_scatter_chart = commonGetScatter3(id,showLabel,dataValue,x_width,x2_width,lineClrList,textClrList,axisName,toolTipFormat,30*winFactor, 3, step_values);

    setTimeout(index2_scatter_chart.chart.scatter.component.timeline.play(), menu_play_interval);
//    index2_scatter_chart.chart.scatter.component.timeline.next();
//    index2_scatter_chart.chart.scatter.component.timeline.next();

    return index2_scatter_chart;
}

// 获取扇形的Y轴方向的两个位置
function getYPositions(angleStart, angleEnd, centerY, radius){
    var angle1 = (360+90-angleStart) % 360;
    var angle2 = (360+90-angleEnd) % 360;

    var y1 = centerY-parseInt(radius *   Math.sin(angle1*3.1415/180));
    var y2 = centerY-parseInt(radius *   Math.sin(angle2*3.1415/180));

    var yPos = [0,0];
    yPos[0] = Math.min(centerY, y1, y2);
    yPos[1] = Math.max(centerY, y1, y2);

    return yPos;
}

// setInterval('initChart()',300000);
function index2_initChart(){

    for (var i = 1; i <= index2_menus.length; i++) {
        /* if (index2_menus[i-1].chart != null)
         index2_menus[i-1].chart.dispose();*/

        if (index2_menus[i-1].chart_id.indexOf('bar') > 0)
            index2_getBar(index2_menus[i-1].chart_id);
        else if (index2_menus[i-1].chart_id.indexOf('pie') > 0)
            index2_getPie(index2_menus[i-1].chart_id);
    }

    index2_getScatter('index2-scatter');

}

// 打开页面
function index2_entry(dataInit) {
    if (dataInit) {
        index2_stop_animate();
        index2_initData();
    }
    else {
        // 从头开始播放
        for (var i = 0; i < index2_menus.length; i++) {
            if (index2_menus[i].menu_object != null) {
                index2_menus[i].menu_object.selectMenuIndex(0);
            }
        }
        refreshLastUpdateTime();
    }
}

function index2_stop_animate() {
    for (var i = 0; i < index2_menus.length; i++) {
        clearInterval(index2_menus[i].interval_id);
        index2_menus[i].interval_id = null;
    }
}
// 关闭页面
function index2_exit() {
    index2_stop_animate();
}

$(document).ready(function() {
    'use strict';

    $('.index2-menu').bind('click', function (e) {
        e = e||event;
        stopFunc(e);
    });
    $('.index2-menu').mousewheel(function (event, delta, deltaX, deltaY) {
        for (var i = 0; i < index2_menus.length; i++) {
            if ($(this)[0].id == $('#' + index2_menus[i].menu_id)[0].id) {
                index2_menus[i].menu_object.onMouseWheel(deltaY);
                break;
            }
        }
    });

    $('.index2-menu li').bind('click', function (e) {
        if(index2_isDataReady()) {

            for (var i = 0; i < index2_menus.length; i++) {
                if ($(this).parent()[0].id == $('#' + index2_menus[i].menu_id)[0].id) {
                    index2_menus[i].menu_object.selectMenuIndex($(this).index());
                    break;
                }
            }
        }
        e = e||event;
        stopFunc(e);
    });
});

function onIndexChanged(menu_index) {
//    alert(menu_index);
}
function index2_initData(){
    if(!index2_isDataReady()){
        setTimeout(function () {
            index2_initData();
        }, 500);
    } else {
        for (var i = 0; i < index2_menus.length; i++) {
            if (index2_menus[i].menu_object == null)
                index2_menus[i].menu_object = new newScrollMenu(index2_menus[i], i, onIndexChanged);
        }

        setTimeout("index2_initChart()",100);
        refreshLastUpdateTime();
    }
}

// 判断当前页面的数据是否就绪
function index2_isDataReady() {
    return (service_collection[SI_ExpMthsTrendData].data != null && service_collection[SI_ExpShareData].data != null && service_collection[SI_ExpSaleRateData].data != null && service_collection[SI_ExpMarketShareData].data != null);
}



