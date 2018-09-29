/*散点图样例1*/
/*
 @param lineclr x坐标轴（左-》右），y坐标轴（下-》上） ['#fff','#fff','#fff','#fff']
 @textclr  x轴文字（下-》上），y轴文字 （下-》上）['#fff','#fff','#fff','#fff']
 @axisName x坐标轴, y坐标轴['x','y']
 */
function commonGetScatter(id,showLabel,dataValue,x_width,x2_width,lineclr,textclr,axisName,toolTipFormat,nameTextSize) {
    var top_color = '#fdc54a';
    var bottom_color = '#f68b0d';
    var toolTipBgColor = '#282e3d';
    /*
     var x_Axislineclr1 = '#fa5a11';
     var x_Axislineclr2 = '#fd9347';
     var y_Axislineclr1 = '#fa560d';
     var y_Axislineclr2 = '#fc9649';
     */
    var frameWidth =  $('#'+ id).css('width');
    frameWidth = parseFloat(frameWidth);
    var frameHeight = $('#'+ id).css('height');
    frameHeight = parseFloat(frameHeight);
    var circle_size = 12*winFactor;
    var axisLineWidth = 6*winFactor;
    var yTopHeight = bar_y_top_height + 10*winFactor;
    //横坐标y方向位置
    var xAxisLinePos = 0;
    //计算横坐标位置值,用于计算字体渐变
    var myChart = echartsInstance.init(document.getElementById(id));
    window.onresize = myChart.resize;
    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...' //loading话术
    });
    // ajax getting data...............
    // ajax callback
    myChart.hideLoading();
    var option = {
        animationDurationUpdate: bar_animte_time,
        animation: true,
        grid: {y: yTopHeight, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
        title : {
            show:  false,
            text: '',
            subtext: ''
        },
        tooltip : {
            show:true,
            trigger: 'item',
            showDelay : 0,
            formatter : function (params) {
                var toolTip = '';
                if (toolTipFormat) {
                    toolTip = toolTipFormat.format(params.value[1],params.value[0]);
                }
                return toolTip;
                /*
                 return '同比：' + params.value[1] + '%' + '<br/>'
                 + '进度：' + params.value[0] + '%';*/
            },
            backgroundColor: toolTipBgColor,
            textStyle:{fontSize:bar_x_font_size,color:bar_x_font_color},
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 0
                }
            }
        },
        legend: {
            show:false,
            data:['']
        },
        toolbox: {
            show : false,
        },
        xAxis : [
            {
                type : 'value',
                scale:true,
                name: axisName[0],
                axisLabel : {
                    formatter: '{value}',
                    textStyle:{
                        color: bar_y_font_color,
                        fontSize: bar_y_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_x_margin,
                },
                nameTextStyle: {
                    fontSize: nameTextSize,
                },
                axisLine:{
                    lineStyle:{
                        width:axisLineWidth,
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                x_width, 0, frameWidth-x2_width, 0,
                                [[0, lineclr[0]],[1, lineclr[1]]]
                            )
                        })(),
                    }
                },
                splitLine:{
                    lineStyle:{
                        color: bar_splitline_color,
                        width: 1,
                        type: 'solid'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                name: axisName[1],
                axisLabel : {
                    formatter: '{value}',
                    textStyle:{
                        color: bar_y_font_color,
                        fontSize: bar_y_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_y_margin,
                },
                nameTextStyle: {
                    color : (function (){
                        var zrColor = require('zrender/tool/color');
                        return zrColor.getLinearGradient(
                            0,nameTextSize, 0, 0,
                            [[0, textclr[2]],[1, textclr[3]]]
                            /*
                             [[0, '#fa590f'],[1, '#fd9246']]
                             */
                        )
                    })(),
                    fontSize: nameTextSize,
                },
                axisLine:{
                    lineStyle:{
                        width:axisLineWidth,
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, frameHeight- bar_y_bottom_height, 0, yTopHeight,
                                [[0, lineclr[2]],[1, lineclr[3]]]
                            )
                        })(),
                    }
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
                }
            }
        ],
        series : [
            {
                z: 5,
                name:'',
                type:'scatter',
                symbolSize: function (value){
                    return circle_size;
                },
                itemStyle: {
                    normal : {
                        label : {show: true,
                            position: 'right',
                            textStyle:{fontSize:bar_x_font_size,color:bar_x_font_color},
                            formatter : function (params) {
                                for(var i=0; i<dataValue.length; i++) {
                                    if (params.data[0] ==  dataValue[i][0] &&
                                        params.data[1] ==  dataValue[i][1] ) {
                                        return  showLabel[i];
                                    }
                                }
                                return '';
                            },
                        },
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, circle_size, 0, 0,
                                [[0, top_color],[1, bottom_color]]
                            )
                        })(),
                    }
                },
                data: dataValue,
            }
        ]
    };
    myChart.setOption(option);
    //计算每个点的位置，重设渐变色
    var maxValue = myChart.component.yAxis._axisList[0].getExtremum().max;
    var minValue = myChart.component.yAxis._axisList[0].getExtremum().min;
    if (maxValue <= 0) {
        xAxisLinePos= yTopHeight;
    } else if (minValue >=0) {
        xAxisLinePos= frameHeight- bar_y_bottom_height;
    } else {
        xAxisLinePos = yTopHeight + (frameHeight - yTopHeight - bar_y_bottom_height)*maxValue/(maxValue- minValue);
    }
    /*var clr= myChart.component.xAxis.option.xAxis[0].nameTextStyle.color*/
    //更换横坐标字体渐变色
    option.xAxis[0].nameTextStyle.color =  (function (){
        var zrColor = require('zrender/tool/color');
        return zrColor.getLinearGradient(
            0,nameTextSize/2+xAxisLinePos, 0, xAxisLinePos-nameTextSize/2,
            [[0, textclr[0]],[1, textclr[1]]]
        )
    })();
    //更换散点渐变色
    option.series[0].data = [];
    for(var i=0; i<dataValue.length; i++) {
        var data = {};
        //距离最小值的距离
        var nLength = (frameHeight - yTopHeight - bar_y_bottom_height)*(dataValue[i][1]-minValue) / (maxValue-minValue);
        //圆心y轴坐标
        var dataCenterPosY = frameHeight -  bar_y_bottom_height - nLength;
        data.value = dataValue[i] ;
        data.itemStyle = {};
        data.itemStyle.normal = {};
        data.itemStyle.normal.color = (function () {
            var zrColor = require('zrender/tool/color');
            return zrColor.getLinearGradient(
                0, dataCenterPosY + circle_size/2, 0, dataCenterPosY - circle_size/2,
                [[0, '#f68c0d'], [1, '#f6c249']]
            );
        })();
        option.series[0].data.push(data);
    }
    myChart.setOption(option);
    return myChart;
}

/*散点图样例2***********************/
function getCommonScatter2DefaultOption(menuList) {
    var option = {
        animation: true,
        title : {
            show:  false,
            text: '',
            subtext: ''
        },
        tooltip : {
            show:false,
        },
        legend: {
            show:false,
            data:['']
        },
        //时间轴设置
        timeline : {
            //时间轴时间列表
            show: false,
            autoPlay:false,
            playInterval: menu_play_interval,
            data:menuList,
        },
        toolbox: {
            show : false,
        },
        options: [
        ],
    };
    return option;
}
function precCommonGetScatter2(id,dataMaxValue,x_width,x2_width,menuList,y_maxValue,y_minValue,x_maxValue,x_minValue) {

    var frameWidth =  $('#'+ id).css('width');
    frameWidth = parseFloat(frameWidth);
    var frameHeight = $('#'+ id).css('height');
    frameHeight = parseFloat(frameHeight);

    //计算横坐标位置值,用于计算字体渐变
    var myChart = echartsInstance.init(document.getElementById(id));
    window.onresize = myChart.resize;
    var option = getCommonScatter2DefaultOption(menuList);
    option = scatter2SetData(option,dataMaxValue,x_width,x2_width,frameWidth,frameHeight,false);
    myChart.setOption(option);
    /*var y_maxValue = [];
     var y_minValue = [];
     var x_maxValue = [];
     var x_minValue = [];*/

    for(var i=0; i<dataMaxValue.length; i++) {
        myChart.component.timeline.play(i,false);
        y_maxValue.push(myChart.component.yAxis._axisList[0].getExtremum().max);
        y_minValue.push(myChart.component.yAxis._axisList[0].getExtremum().min);
        x_maxValue.push(myChart.component.xAxis._axisList[0].getExtremum().max);
        x_minValue.push(myChart.component.xAxis._axisList[0].getExtremum().min);
    }
    myChart.dispose();
}

function commonGetScatter2(id,dataValue,x_width,x2_width,menuList,y_maxValue,y_minValue,x_maxValue,x_minValue) {
    var frameWidth =  $('#'+ id).css('width');
    frameWidth = parseFloat(frameWidth);
    var frameHeight = $('#'+ id).css('height');
    frameHeight = parseFloat(frameHeight);

    var option = getCommonScatter2DefaultOption(menuList);
    //渐变色
    option = scatter2SetData(option,dataValue,x_width,x2_width,frameWidth,frameHeight,true,y_maxValue,y_minValue,x_maxValue,x_minValue);
    //真正使用chart2, 第一个chart用于计算渐变色的option
    var myChart2 = echartsInstance.init(document.getElementById(id));
    window.onresize = myChart2.resize;
    myChart2.setOption(option);
    /*myChart.component.timeline.play(3, false);*/
    /*myChart.component.timeline.autoPlay = true;*/
    return myChart2;
}

function scatter2SetData(option,dataValue,x_width,x2_width,frameWidth,frameHeight,bSetColor,maxValue,minValue,x_maxValue,x_minValue) {
    var circle_size = 12*winFactor;
    var yTopHeight = bar_y_top_height + 10*winFactor;
    //横坐标y方向位置
    var xAxisLinePos = 0;
    var x_Axislineclr1 = '#0735dd';
    var x_Axislineclr2 = '#1ba1f5';
    var nameTextSize = 46*winFactor;
    var axisLineWidth = 6*winFactor;
    /* var top_color = '#fdc54a';
     var bottom_color = '#f68b0d';
     var toolTipBgColor = '#282e3d';*/
    var y_Axislineclr1 = '#0735dd';
    var y_Axislineclr2 = '#1ba1f5';
    option.options = [];
    for(var dataValueIndex=0; dataValueIndex < dataValue.length; dataValueIndex++) {
        var dataValue2 = dataValue[dataValueIndex];
        var timeLineOpt = {};
        if (dataValueIndex == 0) {
            timeLineOpt = {
                animationDurationUpdate: bar_animte_time,
                grid: {y: yTopHeight, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0},
                xAxis : [
                    {
                        type : 'value',
                        scale:true,
                        name: '销售',
                        axisLabel : {
                            formatter: '{value}'+ '件',
                            textStyle:{
                                color: bar_y_font_color,
                                fontSize: bar_y_font_size,
                                fontFamily:chart_ff
                            },
                            margin:bar_x_margin,
                        },
                        nameTextStyle: {
                            fontSize: nameTextSize,
                        },
                        axisLine:{
                            lineStyle:{
                                width:axisLineWidth,
                                color : (function (){
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        x_width, 0, frameWidth-x2_width, 0,
                                        [[0, x_Axislineclr1],[1, x_Axislineclr2]]
                                    )
                                })(),
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                color: bar_splitline_color,
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        scale:true,
                        name: '价格',
                        axisLabel : {
                            formatter: '{value}'+ '元',
                            textStyle:{
                                color: bar_y_font_color,
                                fontSize: bar_y_font_size,
                                fontFamily:chart_ff
                            },
                            margin:bar_y_margin,
                        },
                        nameTextStyle: {
                            color : (function (){
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0,nameTextSize, 0, 0,
                                    [[0, '#0838de'],[1, '#1a9bf4']]
                                )
                            })(),
                            fontSize: nameTextSize,
                        },
                        axisLine:{
                            lineStyle:{
                                width:axisLineWidth,
                                color : (function (){
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, frameHeight- bar_y_bottom_height, 0, yTopHeight,
                                        [[0, y_Axislineclr1],[1, y_Axislineclr2]]
                                    )
                                })(),
                            }
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
                        }
                    }
                ],
                series : [

                ]
            };
        } ;

        if (bSetColor && dataValueIndex == 0) {
            if (maxValue[dataValueIndex] == minValue[dataValueIndex]) {
                xAxisLinePos= frameHeight- bar_y_bottom_height;
            }
            else if (maxValue[dataValueIndex] <= 0) {
                xAxisLinePos= yTopHeight;
            } else if (minValue[dataValueIndex] >=0 ) {
                xAxisLinePos= frameHeight- bar_y_bottom_height;
            } else {
                xAxisLinePos = yTopHeight + (frameHeight - yTopHeight - bar_y_bottom_height)*maxValue[dataValueIndex]
                    /(maxValue[dataValueIndex]- minValue[dataValueIndex]);
            }
            //更换横坐标字体渐变色
            timeLineOpt.xAxis[0].nameTextStyle.color =  (function (){
                var zrColor = require('zrender/tool/color');
                return zrColor.getLinearGradient(
                    0,nameTextSize/2+xAxisLinePos, 0, xAxisLinePos-nameTextSize/2,
                    [[0, x_Axislineclr1],[1, x_Axislineclr2]]
                )
            })();
        }
        timeLineOpt.series = [];
        //动态数据和颜色
        var series =  {};
        if (dataValueIndex == 0) {
            series = {
                name: '',
                type:'scatter',
                symbol:'circle',
                symbolSize: function (value){
                    return circle_size;
                },
                itemStyle: {
                    normal : {
                        label : {
                            show: false,
                        }
                    }
                },
                data: [],
            };
        }

        series.data = [];
        /*for(var j=dataValue2.length-1; j>=0; j--) {*/
        for (var j=0; j<dataValue2.length; j++) {
            var dataTemp = dataValue2[j];
            for(var i=0; i<dataTemp.length ; i++) {
                var data = {};
                if(bSetColor) {
                    //距离最小值的距离
                    var nLength = 0;
                    if (maxValue[dataValueIndex] == minValue[dataValueIndex]) {
                    } else {
                        var temp1 = (frameHeight - yTopHeight - bar_y_bottom_height)*(dataTemp[i][1]-minValue[dataValueIndex]);
                        var temp2 = maxValue[dataValueIndex]-minValue[dataValueIndex];
                        nLength = temp1 / temp2;
                    }
                    data.value = dataTemp[i];
                    //圆心y轴坐标
                    var dataCenterPosY = frameHeight -  bar_y_bottom_height - nLength;
                    data.itemStyle = {};
                    data.itemStyle.normal = {};
                    data.itemStyle.normal.color = (function () {
                        var zrColor = require('zrender/tool/color');
                        var zrBeginClr = 'rgba(19,124,236,0)';
                        var zrEndClr = 'rgba(19,124,236,0)';
                        if (j == 0) {
                            /*
                             zrBeginClr = 'rgba(19,124,236,0)';
                             zrEndClr = zrBeginClr;
                             */
                            zrBeginClr = 'rgba(6,46,220,0.7)';
                            zrEndClr = 'rgba(27,166,246,0.7)';
                        } else if (j == 1) {
                            /*
                             zrBeginClr = 'rgba(19,124,236,0)';
                             zrEndClr = zrBeginClr;
                             */
                            zrBeginClr = 'rgba(246,23,110,0.7)';
                            zrEndClr = 'rgba(247,129,176,0.7)';
                        } else if(j == 2) {
                            /*    zrBeginClr = 'rgba(19,124,236,0)';
                             zrEndClr = zrBeginClr;*/
                            zrBeginClr = 'rgba(251,144,15,0.7)';
                            zrEndClr = 'rgba(241,177,72,0.7)';
                        }
                        if (data.value[0] == 0 || data.value[1] == 0) {
                            zrBeginClr = 'rgba(0,0,0,0)';
                            zrEndClr = zrBeginClr;
                        }
                        return zrColor.getLinearGradient(
                            0, dataCenterPosY + circle_size/2, 0, dataCenterPosY - circle_size/2,
                            [[0, zrBeginClr], [1, zrEndClr]]
                        );
                    })();
                } else {
                    data.value = dataTemp[i];
                }
                series.data.push(data);
            }
            timeLineOpt.series.push(series);
        }
        option.options.push(timeLineOpt);
    }
    return option;
}


function commonGetScatter3(id,showLabel,dataValue,x_width,x2_width,lineclr,textclr,axisName,toolTipFormat,nameTextSize, steps, step_values) {
    var top_color = '#fdc54a';
    var bottom_color = '#f68b0d';
    var toolTipBgColor = '#282e3d';
    /*
     var x_Axislineclr1 = '#fa5a11';
     var x_Axislineclr2 = '#fd9347';
     var y_Axislineclr1 = '#fa560d';
     var y_Axislineclr2 = '#fc9649';
     */
    var frameWidth =  $('#'+ id).css('width');
    frameWidth = parseFloat(frameWidth);
    var frameHeight = $('#'+ id).css('height');
    frameHeight = parseFloat(frameHeight);
    var circle_size = 12*winFactor;
    var axisLineWidth = 6*winFactor;
    var yTopHeight = bar_y_top_height + 10*winFactor;
    //横坐标y方向位置
    var xAxisLinePos = 0;
    //计算横坐标位置值,用于计算字体渐变
    var myChart = echartsInstance.init(document.getElementById(id));
    window.onresize = myChart.resize;
    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...' //loading话术
    });
    // ajax getting data...............
    // ajax callback
    myChart.hideLoading();
    var option = {
        animationDurationUpdate: bar_animte_time,
        animation: true,
        title : {
            show:  false,
            text: '',
            subtext: ''
        },
        //时间轴设置
        timeline : {
            //时间轴时间列表
            show: false,
            autoPlay:false,
            playInterval: menu_play_interval,
            data:[],
        },
        legend: {
            show:false,
            data:['']
        },
        toolbox: {
            show : false,
        },
        options:[]
    };
    // myChart.setOption(option);

    for (var i = 0; i < steps; i++) {
        option.timeline.data.push(i + 1);

        var optionTemp = {};
        optionTemp.grid = {y: yTopHeight, y2:bar_y_bottom_height, x:x_width, x2:x2_width, borderWidth:0};
        optionTemp.tooltip = {
            show:true,
            trigger: 'item',
            showDelay : 0,
            formatter : function (params) {
                var toolTip = '';
                if (toolTipFormat) {
                    toolTip = toolTipFormat.format(params.value[1],params.value[0]);
                }
                return toolTip;
                /*
                 return '同比：' + params.value[1] + '%' + '<br/>'
                 + '进度：' + params.value[0] + '%';*/
            },
            backgroundColor: toolTipBgColor,
            textStyle:{fontSize:bar_x_font_size,color:bar_x_font_color},
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 0
                }
            }
        };
        optionTemp.xAxis = [
            {
                type : 'value',
                scale:true,
                name: axisName[0],
                axisLabel : {
                    formatter: '{value}',
                    textStyle:{
                        color: bar_y_font_color,
                        fontSize: bar_y_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_x_margin,
                },
                nameTextStyle: {
                    fontSize: nameTextSize,
                },
                axisLine:{
                    lineStyle:{
                        width:axisLineWidth,
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                x_width, 0, frameWidth-x2_width, 0,
                                [[0, lineclr[0]],[1, lineclr[1]]]
                            )
                        })(),
                    }
                },
                splitLine:{
                    lineStyle:{
                        color: bar_splitline_color,
                        width: 1,
                        type: 'solid'
                    }
                }
            }
        ];
        optionTemp.yAxis = [
            {
                type : 'value',
                scale:true,
                name: axisName[1],
                axisLabel : {
                    formatter: '{value}',
                    textStyle:{
                        color: bar_y_font_color,
                        fontSize: bar_y_font_size,
                        fontFamily:chart_ff
                    },
                    margin:bar_y_margin,
                },
                nameTextStyle: {
                    color : (function (){
                        var zrColor = require('zrender/tool/color');
                        return zrColor.getLinearGradient(
                            0,yTopHeight-5, 0, yTopHeight-nameTextSize-5,
                            [[0, textclr[2]],[1, textclr[3]]]
                            /*
                             [[0, '#fa590f'],[1, '#fd9246']]
                             */
                        )
                    })(),
                    fontSize: nameTextSize,
                },
                axisLine:{
                    lineStyle:{
                        width:axisLineWidth,
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, frameHeight- bar_y_bottom_height, 0, yTopHeight,
                                [[0, lineclr[2]],[1, lineclr[3]]]
                            )
                        })(),
                    }
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
                }
            }
        ];

        optionTemp.series = [
            {
                z: 5,
                name:'',
                type:'scatter',
                symbolSize: function (value){
                    return circle_size;
                },
                itemStyle: {
                    normal : {
                        label : {show: true,
                            position: 'right',
                            textStyle:{fontSize:bar_x_font_size,color:bar_x_font_color},
                            formatter : function (params) {
                                for(var n=0; n<dataValue.length; n++) {
                                    if (params.data[0] ==  dataValue[n][0] &&
                                        params.data[1] ==  dataValue[n][1] ) {
                                        return  showLabel[n];
                                    }
                                }
                                return '';
                            },
                        },
                    }
                },
                data: dataValue,
            }
        ];

        option.options.push(optionTemp);
    }

    myChart.setOption(option);

    //计算每个点的位置，重设渐变色
    var maxValue = myChart.component.yAxis._axisList[0].getExtremum().max;
    var minValue = myChart.component.yAxis._axisList[0].getExtremum().min;
    if (maxValue <= 0) {
        xAxisLinePos= yTopHeight;
    } else if (minValue >=0) {
        xAxisLinePos= frameHeight- bar_y_bottom_height;
    } else {
        xAxisLinePos = yTopHeight + (frameHeight - yTopHeight - bar_y_bottom_height)*maxValue/(maxValue- minValue);
    }
    /*var clr= myChart.component.xAxis.option.xAxis[0].nameTextStyle.color*/

    //更换散点渐变色
    var countOfStep = parseInt(dataValue.length / steps);
    if (countOfStep * steps < dataValue.length)
        countOfStep++;
    for (var step = 0; step < steps; step++) {
        var optionTemp = option.options[step];

        //更换横坐标字体渐变色
        optionTemp.xAxis[0].nameTextStyle.color =  (function (){
            var zrColor = require('zrender/tool/color');
            return zrColor.getLinearGradient(
                0,nameTextSize/2+xAxisLinePos, 0, xAxisLinePos-nameTextSize/2,
                [[0, textclr[0]],[1, textclr[1]]]
            )
        })();

        optionTemp.series[0].data = [];
        for (var i = 0; i < dataValue.length; i++) {
            var data = {};
            //距离最小值的距离
            var nLength = (frameHeight - yTopHeight - bar_y_bottom_height) * (dataValue[i][1] - minValue) / (maxValue - minValue);
            //圆心y轴坐标
            var dataCenterPosY = frameHeight - bar_y_bottom_height - nLength;
            data.value = dataValue[i];
            data.symbolSize = circle_size;
            data.itemStyle = {};
            data.itemStyle.normal = {};
            data.itemStyle.normal.color = (function () {
                var zrColor = require('zrender/tool/color');
                return zrColor.getLinearGradient(
                    0, dataCenterPosY + circle_size / 2, 0, dataCenterPosY - circle_size / 2,
                    [[0, '#f68c0d'], [1, '#f6c249']]
                );
            })();
            data.itemStyle.normal.label = {show: true};

            var hidden = false;
            if (false) {
                if (false) {
                    if (step == steps - 1) {
                        hidden = (i < countOfStep * step);
                    }
                    else {
                        hidden = (i < countOfStep * step || i >= countOfStep * (step + 1))
                    }
                }
                else {
                    if (i % steps != step)
                        hidden = true;
                }
            }
            else {
                hidden = true;
                for (var s = 0; s < step_values[step].length; s++) {
                    if (dataValue[i][2] == step_values[step][s]) {
                        hidden = false;
                        break;
                    }
                }
            }
            if (hidden) {
                data.symbolSize = 0;
                data.itemStyle.normal.label.show = false;
            }
            optionTemp.series[0].data.push(data);
        }
    }

    myChart.setOption(option);
    return myChart;
}
