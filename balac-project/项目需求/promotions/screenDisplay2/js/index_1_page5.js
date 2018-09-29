var page5_testData = false;     // 是否使用测试数据

// 图表菜单数据
var page5_menus = [
    {menu_object: null, name: 'page5_menus', chart: null, chart_id: 'page5-bar-1', menu_id: 'page5-menu-1', index: 0, count: 3, interval_id: null, data: ['3C连锁','全国商超','TOP门店','旗舰店','渠道门店','电商ECM'] },
    {menu_object: null, name: 'page5_menus', chart: null, chart_id: 'page5-bar-2', menu_id: 'page5-menu-2', index: 0, count: 3, interval_id: null, data: ['家用','厨电','洗衣机','冰箱','生活','热水器','环电','中央']},
    {menu_object: null, name: 'page5_menus', chart: null, chart_id: 'page5-bar-3', menu_id: 'page5-menu-3', index: 0, count: 6, interval_id: null, data: [] },
    {menu_object: null, name: 'page5_menus', chart: null, chart_id: 'page5-pie-1', menu_id: 'page5-menu-4', index: 0, count: 6, interval_id: null, data: ['厨电','生活','热水器','中央','冰箱','洗衣机','环电','家用']},
];
var page5_menu_0 = 0;
var page5_menu_1 = 1;
var page5_menu_2 = 2;
var page5_menu_3 = 3;

// 渠道代号
var page5_channel_code = [
    '1',         // 3C连锁
    '2',         // 全国商超
    '3',         // TOP门店
    '4',         // 旗舰店
    '5',         // 渠道门店
    '901',         // 电商
];
var page5_channel_count = 6;

// 事业部代号
var page5_department_code = [
        'M103',         // 家用
        'M108',         // 厨电
        'M105',         // 洗衣机
        'M104',         // 冰箱
        'M107',         // 生活
        'M111',         // 热水器
        'M109',         // 环电
        'M106',         // 中央
];
var page5_department_code_2 = [
    'M108',         // 厨电
    'M107',         // 生活
    'M111',         // 热水器
    'M106',         // 中央
    'M104',         // 冰箱
    'M105',         // 洗衣机
    'M109',         // 环电
    'M103',         // 家用
];

// 初始化柱状图表
function page5_getBar(id) {
    var factor = winFactor;

    var x_width = 160*factor;
    var x2_width = 50*factor;
    var colors = ['#062edc', '#1ba6f6'];
    var menu_index = 0;
    var barDataList = [];
    barDataList.push([]);
    if (id.toString().indexOf('-1') > 0) { // 渠道零售额
        var values = page5_getTotalAmt(service_collection[SI_ReChanData].data, page5_channel_code, 0);
        for (var v = 0; v < values.length; v++) {
            var dataList = {};
            if (v == 0) {
                dataList.labels = page5_menus[0].data;
            }
            dataList.values = values[v];
            barDataList[0].push(dataList);
        }

        menu_index = 0;
    } else if (id.toString().indexOf('-2') > 0 && service_collection[SI_CompChanData].data != null) { // 事业部零售额
        var values = page5_getTotalAmt(service_collection[SI_CompChanData].data, page5_department_code, 1);
        for (var v = 0; v < values.length; v++) {
            var dataList = {};
            if (v == 0) {
                dataList.labels = page5_menus[1].data;
            }
            dataList.values = values[v];
            barDataList[0].push(dataList);
        }

        menu_index = 1;
    } else if (id.toString().indexOf('-3') > 0) { // 各渠道零售月度趋势
        menu_index = 2;

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        page5_menus[menu_index].data = [];
        for (var channel = 0; channel < page5_channel_count; channel++) {
            var datum = service_collection[SI_MonthRetailData].data[channel];
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
                            barDataList[0][channel].values.push(dealHmillion(parseInt(datum[i].ytd_cny_amt)));
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
                        if (datum[i].yearmonth == ym) {
                            barDataList[0][channel].values.push(dealHmillion(parseInt(datum[i].ytd_cny_amt)));
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
                        if (datum[i].yearmonth == ym) {
                            barDataList[0][channel].values.push(dealHmillion(parseInt(datum[i].ytd_cny_amt)));
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
    page5_menus[menu_index].count = barDataList[0].length;
    page5_menus[menu_index].chart = commonGetBar(id, colors, null, x_width, x2_width, barDataList);

    if (page5_menus[menu_index].chart != null) {
        page5_menus[menu_index].menu_object.init();
        page5_menus[menu_index].menu_object.selectMenuIndex(0);
    }
}

// 获取总部合计数据
function page5_getTotalAmt(datum, codes, mode) {
    var barDataList = [[], [], []];
    for (var n = 0; n < codes.length; n++) {
        for (var i = 0; i < datum.length; i++) {
            if ((mode == 1 && datum[i].bd_code == codes[n]) || (mode == 0 && datum[i].type_lv1_code == codes[n])) {
                var value = dealHmillion(parseInt(datum[i].ytd_cny_amt));  // 年度累计
                barDataList[0].push(value);
                value = dealHmillion(parseInt(datum[i].mtd_cny_amt));       // 月度累计
                barDataList[1].push(value);
                value = dealHmillion(parseInt(datum[i].lst_ptd_cny_amt));  // 昨日销售
                barDataList[2].push(value);
                break;
            }
        }
    }

    return barDataList;
}

function page5_getPie(id) {
    var colors = ['#1ba5f6', '#0831de'];
    var colors2 = ['#7fcffe', '#1aa6f6'];
    var pieDataValues = [];
    var menu_index = 0;

    var categories = [];
    if (id.toString().indexOf('-1') > 0) {
        menu_index = page5_menu_3;

        for (var channel = 0; channel < page5_channel_count; channel++) {
            var datum = service_collection[SI_TotalRetData].data[channel];
            if (datum.length == 0)
                continue;

            // 单元项
            var channelData = [];
            pieDataValues.push(channelData);
            for (var n = 0; n < page5_department_code_2.length; n++) {
                for (var i = 0; i < datum.length; i++) {
                    if (datum[i].bd_code == page5_department_code_2[n]) {
                        var data1 = {};
                        data1.value = dealHmillion(parseInt(datum[i].ytd_cny_amt));
                        if (data1.value > 0) {
                            data1.name = page5_menus[menu_index].data[n];

                            channelData.push(data1);
                        }

                        break;
                    }
                }
            }
        }
    }

    if (pieDataValues.length > 0) {
        page5_menus[menu_index].chart = commonGetPie(id, colors, colors2, pieDataValues, false);
    }

    // 有效数据
    if (page5_menus[menu_index].chart != null) {
        page5_menus[menu_index].menu_object.init();
        page5_menus[menu_index].menu_object.selectMenuIndex(0);
    }
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
function page5_initChart(){

    for (var i = 1; i <= page5_menus.length; i++) {
       /* if (page5_menus[i-1].chart != null)
        page5_menus[i-1].chart.dispose();*/

        if (page5_menus[i-1].chart_id.indexOf('bar') > 0)
            page5_getBar(page5_menus[i-1].chart_id);
        else if (page5_menus[i-1].chart_id.indexOf('pie') > 0)
            page5_getPie(page5_menus[i-1].chart_id);
    }
}

// 打开页面
function page5_entry(dataInit) {
    if (dataInit) {
        stop_animate();
        if (page5_testData) {
            setTimeout("page5_initChart();", 100);
        }
        else {
            page5_initData();
        }
    }
    else {
        // 从头开始播放
        for (var i = 0; i < page5_menus.length; i++) {
            if (page5_menus[i].menu_object != null) {
                page5_menus[menu_index].menu_object.selectMenuIndex(0);
            }
        }
        refreshLastUpdateTime();
   }
}

function stop_animate() {
    for (var i = 0; i < page5_menus.length; i++) {
        clearInterval(page5_menus[i].interval_id);
        page5_menus[i].interval_id = null;
    }
}
// 关闭页面
function page5_exit() {
    stop_animate();
}

$(document).ready(function() {
    'use strict';

    $('.page5-menu').bind('click', function (e) {
        e = e||event;
        stopFunc(e);
    });

    $('.page5-menu li').bind('click', function (e) {
        if(page5_isDataReady()) {
            for (var i = 0; i < page5_menus.length; i++) {
                if ($(this).parent()[0].id == $('#' + page5_menus[i].menu_id)[0].id) {
                    page5_menus[i].menu_object.selectMenuIndex($(this).index());
                    break;
                }
            }
        }
        e = e||event;
        stopFunc(e);
    });
});

function page5_initData(){
    if(!page5_isDataReady()){
        setTimeout(function () {
            page5_initData();
        }, 500);
    } else {
        for (var i = 0; i < page5_menus.length; i++) {
            if (page5_menus[i].menu_object == null)
                page5_menus[i].menu_object = new newScrollMenu(page5_menus[i], i);
        }

        setTimeout("page5_initChart()",100);
        refreshLastUpdateTime();
    }
}

// 判断当前页面的数据是否就绪
function page5_isDataReady() {
    return (service_collection[SI_ReChanData].data != null && service_collection[SI_CompChanData].data != null && service_collection[SI_TotalRetData].data != null && service_collection[SI_MonthRetailData].data != null);
}




