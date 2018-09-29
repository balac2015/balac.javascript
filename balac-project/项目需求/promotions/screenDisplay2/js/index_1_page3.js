var page3_showLabel1 = ['家用','厨电','洗衣机','冰箱','生活','热水器','环电','中央','部品','安得','采购'/*,'电商'*/];
var page3_showLabel2 = ['家用','厨电','洗衣机','冰箱','生活','热水器','环电','中央','部品','国际'];
/*var page3_showLabel = ['家用','厨电','洗衣机','冰箱','生活','热水器','环电','中央','部品','安得'];*/

function Page3_getScatter(id,chartIndex) {
    var page3_showLabel = [];
    if (chartIndex  == 0) {
        page3_showLabel = page3_showLabel1;
    } else {
        page3_showLabel = page3_showLabel2;
    }
    //记录最小最大同比值  为百分值
   /* var minYoyData = 100;
    var maxYoyData = -100;*/
    var dataValue = [];
    if (service_collection[SI_DepartmentSaleStock].data != null && service_collection[SI_DepartmentSaleStock].data[0].length > 0) {
        var listData = service_collection[SI_DepartmentSaleStock].data[0];
        if (listData != null) {
            for(var j=0; j<page3_showLabel.length; j++) {
                        for(var i=0; i<listData.length;i++) {
                            if (listData[i].shipment_type == chartIndex+1) {
                             if (listData[i].bd_name.indexOf(page3_showLabel[j])>= 0) {
                                 var temp = [];
                                 temp[0] = parseFloat(listData[i].ytd_amt_roc);
                                 temp[1] = parseFloat(listData[i].ytd_amt_yoy);
                                 /*   minYoyData = Math.min(temp[1],minYoyData);
                                  maxYoyData = Math.max(temp[1],maxYoyData);*/
                                 dataValue.push(temp);
                                 break;
                             }
                    }
                }
            }
        }
    }
    var x_width =110*winFactor;
    var x2_width = chartIndex == 0 ? 180*winFactor : 180*winFactor;
    var lineClrList = ['#fa5a11','#fd9347','#fa560d','#fc9649'];
    var textClrList = ['#fa5a11','#fd9347','#fa590f','#fd9246'];
    var axisName = ['进度(%)','同比(%)'];
    var toolTipFormat = '同比 ：{0}% <br/> 进度：{1}% ';
    return commonGetScatter(id,page3_showLabel,dataValue,x_width,x2_width,lineClrList,textClrList,axisName,toolTipFormat,46*winFactor);
}

function Page3_getVerticalBar(id,chartIndex) {
    //自定义缩放
    var page3_showLabel = [];
    var barWidth = 40*winFactor;
    var barGap1 =  35*winFactor;
    if (chartIndex == 0) {
        page3_showLabel = page3_showLabel1;
    } else {
        page3_showLabel = page3_showLabel2;
        barGap1 =  55*winFactor;
    }
    //  var factor =  document.documentElement.clientWidth/ 1920;
    //var barGap2 = 40*winFactor;
    var barGap2 = 0;
   // var data1 =  new Array();//[100,120,80,90,130,150,100,90,95,94];
   // var data2 = new Array();//[100,200,80,90,130,150,100,90,95,94];
    var data1 = [0,0,0,0,0,0,0,0,0,0];
    var data2 = [0,0,0,0,0,0,0,0,0,0];

    if (service_collection[SI_DepartmentSaleStock].data != null && service_collection[SI_DepartmentSaleStock].data[0].length > 0) {
        var listData = service_collection[SI_DepartmentSaleStock].data[0];
        if (listData != null) {
            for(var j=0; j<page3_showLabel.length; j++) {
                for(var i=0; i<listData.length;i++) {
                    if (listData[i].shipment_type == chartIndex+1) {
                            if (listData[i].bd_name.indexOf(page3_showLabel[j]) >= 0) {
                                data1[j] = dealHmillion2(listData[i].ytd_amt_p);
                                data2[j] = dealHmillion2(listData[i].ytd_amt);
                                break;
                            }
                        }
                    }
                }
            }
    }
    var dataValue1 = [];
    var dataValue2 = [];
    if (chartIndex == 0) {
        dataValue1 = data1;
        dataValue2 = data2;
    } else {
        dataValue1 = data1;
        dataValue2 = data2;
    }
    // 图表实例化------------------
    // srcipt标签式引入
    var myChart = echartsInstance.init(document.getElementById(id));
    window.onresize = myChart.resize;
    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...' //loading话术
    });
    // ajax getting data...............
    // ajax callback
    myChart.hideLoading();
    var x_width =110*winFactor;
    var x2_width = 20*winFactor;
    var bar_max_height = (parseFloat($('#'+id).css('height')) - bar_y_top_height - bar_y_bottom_height);
    var left_color_1 = '#fa560d';
    var left_color_2 = '#fd9649';
  /*  var left_color_1 = '#f00';
    var left_color_2 = '#00f';*/
    var right_color_1 = '#fa8d0c';
    var right_color_2 = '#fdc74b';
    // 图表使用-------------------
    var option = {
        calculable: true,
        animationDurationUpdate: bar_animte_time,
        grid: {y: bar_y_top_height, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
        xAxis: [
            {
                type: 'category',
                show: true,
                data: page3_showLabel,
                axisLine:{
                    lineStyle:{
                        width:1,
                        color: '#2b3140'
                    }
                },
                axisLabel: {
                    show:true,
                    textStyle:{
                        color: bar_x_font_color,
                        fontSize: bar_x_font_size,
                    },
                    margin:bar_x_margin,
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
                        color: bar_splitline_color,
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    show:true,
                    textStyle:{
                        color: bar_y_font_color,
                        fontSize: bar_y_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_y_margin,
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
                            0, bar_max_height, 0, 0,
                            [[0, left_color_1],[1, left_color_2]]
                        )
                    })(),
                    /*color:'#fa8d0d',*/
                    label : {show: true, position: 'top',
                        textStyle:{fontSize:bar_label_font_size,color:bar_label_font_color,fontFamily:chart_ff}}}},
                data:dataValue1
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
                            0, bar_max_height, 0, 0,
                            [[0, right_color_1],[1, right_color_2]]
                        )
                    })(),
                    label : {show: true, position: 'top',
                        textStyle:{fontSize:bar_label_font_size,color:bar_label_font_color,fontFamily:chart_ff}}}},
                data:dataValue2
            }
        ]
    };
    myChart.setOption(option);
    var maxValue = myChart.component.yAxis._axisList[0].getExtremum().max;
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
                [[0, left_color_1], [1, left_color_2]]
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
                [[0, right_color_1],[0.5,'#fcad2e'],[1, right_color_2]]
            );
        })();
        option.series[1].data.push(data);
    }

    myChart.setOption(option);
    return myChart;
}

var page3_chart1 = null;
var page3_chart2 = null;

function Page3_refreshData(uiIndex) {

  //  ['家用','厨电','洗衣机','冰箱','生活','热水器','环电','中央','部品','安得'];
    //销售进度与同比
    var idYoyList = ['houseHoldYoy','kitchenYoy','washYoy','fridgeYoy','lifeYoy','heaterYoy','ringYoy','centerYoy'];
    var idRocList = ['houseHoldRoc','kitchenRoc','washRoc','fridgeRoc','lifeRoc','heaterRoc','ringRoc','centerRoc'];
    var idUIList = ['page3_houseHold','page3_kitchen','page3_wash','page3_fridge','page3_life','page3_heater',
                    'page3_ring','page3_center'];

   //同比数据
    var data1 = [0,0,0,0,0,0,0,0,0,0];
    //进度数据
    var data2 = [0,0,0,0,0,0,0,0,0,0];

    /*根据比例计算位置*/
    var frameWidth = 15.48; //rem
    var frameHeight = 2.64;
    var centerPos_x = 0.1;
    var centerPos_y = 3.22;
    if (service_collection[SI_DepartmentSaleStock].data != null && service_collection[SI_DepartmentSaleStock].data[0].length > 0) {
        var listData = service_collection[SI_DepartmentSaleStock].data[0];
        if (listData != null) {
            for(var i=0; i<listData.length;i++) {
                if (listData[i].shipment_type == uiIndex+1) {
                    for(var j=0; j<page3_showLabel2.length && j<idYoyList.length; j++) {
                        if (listData[i].bd_name == page3_showLabel2[j]) {
                           var idYoy =  '#' + idYoyList[j] + uiIndex.toString();
                            var idRoc =  '#' + idRocList[j] + uiIndex.toString();
                            var idUI = '#' + idUIList[j] + uiIndex.toString();
                            var d1 = document.getElementById('page3_houseHold0');
                            //按照比例计算坐标位置
                            var yoy = Math.round(listData[i].ytd_amt_yoy);
                            var roc = Math.round(listData[i].ytd_amt_roc);
                            var yoyPos = centerPos_y - yoy*frameHeight/100;
                            var rocPos = centerPos_x + roc*frameWidth/100;
                          /*  $(idUI).css('left',rocPos.toString()+'rem');
                            $(idUI).css('top',yoyPos.toString()+'rem');*/
                            $(idYoy).text(yoy.toString() + '%');
                            $(idRoc).text(roc.toString() + '%');
                            break;
                        }
                    }
                }
            }
        }
    }
}



function page3_initData(){
    if(service_collection[SI_DepartmentSaleStock].data == null){
        setTimeout(function () {
            page3_initData();
        }, 500);
    } else {
        page3_chart1 = Page3_getVerticalBar('salesBarId1',0);
        page3_chart2 = Page3_getVerticalBar('salesBarId2',1);
       /* Page3_refreshData(0);
        Page3_refreshData(1);*/
        Page3_getScatter('salesScatterId1',0);
        Page3_getScatter('salesScatterId2',1);

        refreshLastUpdateTime();
    }
}


function page3_entry(dataInit) {
    if (dataInit) {
        /*if (page3_chart1 != null) {
            page3_chart1.dispose();
        }
        if (page3_chart2 != null) {
            page3_chart2.dispose();
        }*/
        page3_initData();
    } else {
        if (page3_chart1 != null) {
            page3_chart1.restore();
        }
        if (page3_chart2 != null) {
            page3_chart2.restore();
        }
        refreshLastUpdateTime();
    }
}
function page3_exit() {
    if (page3_chart1 != null) {
        page3_chart1.clearZr();
    }
    if (page3_chart2 != null) {
        page3_chart2.clearZr();
    }
}
