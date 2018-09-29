var page5_play_interval = 4000;   // 播放的间隔时长
var page5_first_play_interval = 2000; // 第一次播放的间隔时长 (echart第一次动画的间隔时间好像总是2秒)

// 柱状图数据
var page5_bar_menus = [
    {   menu_id: 'page5-menu-1', index: 0, count: 3, first_show: true, data: ['3C连锁','全国商超','TOP门店','旗舰店','渠道门店','电商'] },
    {   menu_id: 'page5-menu-2', index: 0, count: 3, first_show: true, data: ['家用','厨电','洗衣机','冰箱','生活','热水器','环电','中央']},
    {   menu_id: 'page5-menu-3', index: 0, count: 6, first_show: true, data: [] }
];
for (var month = 1; month <=12; month++) {
    page5_bar_menus[2].data.push(month + '月');
}

// 饼状图数据
var page5_pie_menus = [
    {   menu_id: 'page5-menu-4', index: 0, count: 6, first_show: true, data: ['厨电','生活','热水器','中央','冰箱','洗衣机','环电','家用']},
];

function page5_getBar(id) {
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
        //时间轴设置
        timeline : {
            //时间轴时间列表
            show: false,
            autoPlay: true,
            playInterval: page5_play_interval,
        },
        //时间点设置
        options : [
            //第一个时间点
            {
                grid: {y: 40, y2:70, x:160, x2:50, borderWidth:0},
                //设置坐标轴
                xAxis : [
                    {
                        type : 'category',
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {
                            show:true,
                            textStyle:{
                                color: '#fff',
                                fontSize: 25,
                            },
                            margin:30,
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
                        type:'bar',
                        barWidth: 60,
                        itemStyle: {normal: {
                            color:(function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, 400, 0, 0,
                                    [[0, '#7210fb'],[1, '#1ba5f6']]
                                );
                            })(),
                            label:{show:true,textStyle:{fontSize:25, color:'#fff'}}}},
                        data:[],
                    }
                ]
            }
        ]
    };

    var barList = [], barList2 = [], barList3 = [], barList4 = [], barList5 = [], barList6 = [];
    var menu_index = 0;
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
        var values = [399, 569, 346, 255, 298, 412];
        for (var n = 0; n < values.length; n++ ){
            barList.push(values[n]);
            barList2.push(parseInt(values[n]/8));
            barList3.push(parseInt(values[n]/20));
        }

        menu_index = 0;
    } else if(id.toString().indexOf('-2') > 0) {
        var values = [564, 218, 436, 338, 182, 76, 188, 275];
        for (var n = 0; n < values.length; n++ ){
            barList.push(values[n]);
            barList2.push(parseInt(values[n]/8));
            barList3.push(parseInt(values[n]/20));
        }

        menu_index = 1;
    } else if(id.toString().indexOf('-3') > 0) {
        var values = [276, 456, 297, 316, 785, 628, 1038, 718, 527, 324, 1106, 682];
        for (var n = 0; n < values.length; n++ ){
            barList.push(values[n]);
            barList2.push(parseInt(values[n]*8/10));
            barList3.push(parseInt(values[n]*7/10));
            barList4.push(parseInt(values[n]*6/10));
            barList5.push(parseInt(values[n]*5/10));
            barList6.push(parseInt(values[n]*4/10));
        }

        menu_index = 2;
    }

    // 时间轴
    option.timeline.data = [];
    for (var i = 0; i < page5_bar_menus[menu_index].count; i++) {
        option.timeline.data.push(i+1);
    }

    // 数据
    option.options[0].xAxis[0].data = page5_bar_menus[menu_index].data;
    for (var n = 1; n < page5_bar_menus[menu_index].count; n++) {
        var series = [];
        var serie = {};
        serie.type = 'bar';
        serie.itemStyle = {normal: {color:'#7210fb', label:{show:true,textStyle:{fontSize:25, color:'#fff'}}}};
        series.push(serie);
        var optionTemp = {};
        optionTemp.series = series;
        option.options.push(optionTemp);
    }
    option.options[0].series[0].data = barList;
    option.options[1].series[0].data = barList2;
    option.options[2].series[0].data = barList3;
    if (menu_index == 2) {
        option.options[3].series[0].data = barList4;
        option.options[4].series[0].data = barList5;
        option.options[5].series[0].data = barList6;
    }

    myChart.setOption(option);

    page5_bar_menus[menu_index].index = 0;
    setTimeout('page5_changeMenuIndex(page5_bar_menus, '+menu_index+')', page5_first_play_interval+1)
}

function page5_getPie(id) {
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
        //时间轴设置
        timeline : {
            //时间轴时间列表
            show: false,
            autoPlay: true,
            playInterval: page5_play_interval,
        },
        //时间点设置
        options : [
            //第一个时间点
            {
                series : [
                    {
                        type:'pie',
                        radius : '70%',
                        center: ['50%', '50%'],
                        itemStyle:{
                            normal:{
                                label:{show:true,position:'outer',formatter: '{b} {d}%',textStyle:{fontSize:22,color: '#fff'}},
                                labelLine:{show:true,lineStyle:{color:'#404040'}},
                            },
                        },
                        data:[]
                    }
                ]
            }
        ]
    };

    var pieLists = [[], [], [], [], [], []];
    var menu_index = 0;
    if(id.toString().indexOf('-1') > 0){
        var values = [564, 218, 436, 338, 182, 176, 188, 275];
        var colors = ['#1896f2', '#adf24e', '#45ecb0', '#fcb335', '#a940fc', '#fc3483', '#d81c1c', '#1c479f'];
        for (var n = 0; n < values.length; n++ ){
            for (var p = 0; p < page5_pie_menus[menu_index].count; p++) {
                var data1 = {};
                data1.value = values[n];
                if (p == 1)
                    data1.value = parseInt(values[n]-20);
                else if (p == 2)
                    data1.value = parseInt(values[n]-40);
                else if (p == 3)
                    data1.value = parseInt(values[n]-60);
                else if (p == 4)
                    data1.value = parseInt(values[n]-80);
                else if (p == 5)
                    data1.value = parseInt(values[n]-100);
                data1.itemStyle={
                    normal:{
                        color:colors[n],
                    }
                };
                data1.name = page5_pie_menus[menu_index].data[n];
                pieLists[p].push(data1);
            }
        }

        menu_index = 0;
    }

    // 时间轴
    option.timeline.data = [];
    for (var i = 0; i < page5_pie_menus[menu_index].count; i++) {
        option.timeline.data.push(i+1);
    }

    // 数据
    for (var n = 1; n < page5_pie_menus[menu_index].count; n++) {
        var series = [];
        var serie = {};
        series.data = [];
        series.push(serie);
        var optionTemp = {};
        optionTemp.series = series;
        option.options.push(optionTemp);
    }

    for (var p = 0; p < page5_pie_menus[menu_index].count; p++) {
        option.options[p].series[0].data = pieLists[p];
    }

    myChart.setOption(option);

    page5_pie_menus[menu_index].index = 0;
    setTimeout('page5_changeMenuIndex(page5_pie_menus, '+menu_index+')', page5_first_play_interval+1);
}

// 改变menu
function page5_changeMenuIndex(menus, index) {
    menus[index].index++;
    if (menus[index].index >= menus[index].count)
        menus[index].index = 0;
    var menuItems = $('#' + menus[index].menu_id + ' li');
    for (var i = 0; i < menus[index].count; i++) {
        var item = menuItems.eq(i);
        if (i == menus[index].index)
            item.addClass('active');
        else
            item.removeClass('active');
    }

    if (menus[index].first_show) {
        var name = 'page5_bar_menus';
        if (menus == page5_pie_menus)
            name = 'page5_pie_menus';
        setInterval('page5_changeMenuIndex(' + name + ', ' + index + ')', page5_play_interval)
        menus[index].first_show = false;
    }
}

// setInterval('initChart()',300000);
function page5_initChart(){

    for (var i = 1; i <= 3; i++) {
        page5_getBar('page5-bar-' + i);
    }

    for (var i = 1; i <= 1; i++) {
        page5_getPie('page5-pie-' + i);
    }

}

/*
 window.onresize=function() {
 window.location.href = window.location.href;
 }
 */

setTimeout("page5_initChart()",100);
