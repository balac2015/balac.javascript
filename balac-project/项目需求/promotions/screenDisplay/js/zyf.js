/**
 * Created by Administrator on 2015-9-21.
 */
(function(){

    // 股价走势模块
    //var oneBarOne = {
    //    xAxis: [
    //        {
    //            type: 'category',
    //            boundaryGap: [0.01, 0.01],
    //            data: ['2014.09', '2014.10', '2014.11', '2014.12', '2015.01', '2015.02','2015.03','2015.04','2015.05','2015.06','2015.07','2015.08','2015.09'],
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                show: false,
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            },
    //            axisLabel: {
    //                textStyle: {
    //                    //fontSize: '0.14rem',
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            boundaryGap: false,
    //            min: 17.25,
    //            max: 42.68,
    //            splitNumber: 4,
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#252b32'],
    //                    width: 1,
    //                    type: 'dashed'
    //                }
    //            },
    //            axisLabel: {
    //                formatter: function(value) {
    //                    return value.toFixed(2);
    //                },
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    series: [
    //        {
    //            name: '美的集团',
    //            type: 'line',
    //            itemStyle: {
    //                normal: {
    //                    color: '#4399fe',
    //                    lineStyle: {
    //                        color: '#e00404',
    //                        width: 2,
    //                        type: 'solid'
    //                    }
    //                }
    //            },
    //            data: [24.88, 25, 24.99, 26, 26.55, 27, 40,30,33.4,33.2,33.8,24.56,35.8,23.55,35.78],
    //            boundaryGap: false,
    //            symbol:'none'
    //        }
    //    ]
    //};
    //var oneBarTwo = {
    //    xAxis: [
    //        {
    //            type: 'category',
    //            boundaryGap: [0.01, 0.01],
    //            data: ['2014.09', '2014.10', '2014.11', '2014.12', '2015.01', '2015.02','2015.03','2015.04','2015.05','2015.06','2015.07','2015.08','2015.09'],
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                show: false,
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            },
    //            axisLabel: {
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            boundaryGap: false,
    //            min: 17.25,
    //            max: 42.68,
    //            splitNumber: 4,
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#252b32'],
    //                    width: 1,
    //                    type: 'dashed'
    //                }
    //            },
    //            axisLabel: {
    //                formatter: function(value) {
    //                    return value.toFixed(2);
    //                },
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    series: [
    //        {
    //            name: '小天鹅A',
    //            type: 'line',
    //            itemStyle: {
    //                normal: {
    //                    color: '#4399fe',
    //                    lineStyle: {
    //                        color: '#e00404',
    //                        width: 2,
    //                        type: 'solid'
    //                    }
    //                }
    //            },
    //            data: [24.88, 25, 24.99, 26, 26.55, 27, 40,30,33.4,33.2,33.8,24.56,35.8,23.55,35.78],
    //            boundaryGap: false,
    //            symbol:'none'
    //        }
    //    ]
    //};
    //var oneBarThree = {
    //    xAxis: [
    //        {
    //            type: 'category',
    //            boundaryGap: [0.01, 0.01],
    //            data: ['2014.09', '2014.10', '2014.11', '2014.12', '2015.01', '2015.02','2015.03','2015.04','2015.05','2015.06','2015.07','2015.08','2015.09'],
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                show: false,
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            },
    //            axisLabel: {
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            boundaryGap: false,
    //            min: 17.25,
    //            max: 42.68,
    //            splitNumber: 4,
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#252b32'],
    //                    width: 1,
    //                    type: 'dashed'
    //                }
    //            },
    //            axisLabel: {
    //                formatter: function(value) {
    //                    return value.toFixed(2);
    //                },
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    series: [
    //        {
    //            name: '威灵控股',
    //            type: 'line',
    //            itemStyle: {
    //                normal: {
    //                    color: '#4399fe',
    //                    lineStyle: {
    //                        color: '#e00404',
    //                        width: 2,
    //                        type: 'solid'
    //                    }
    //                }
    //            },
    //            data: [24.88, 25, 24.99, 26, 26.55, 27, 40,30,33.4,33.2,33.8,24.56,35.8,23.55,35.78],
    //            boundaryGap: false,
    //            symbol:'none'
    //        }
    //    ]
    //};
    //var oneBarFour = {
    //    xAxis: [
    //        {
    //            type: 'category',
    //            boundaryGap: [0.01, 0.01],
    //            data: ['2014.09', '2014.10', '2014.11', '2014.12', '2015.01', '2015.02','2015.03','2015.04','2015.05','2015.06','2015.07','2015.08','2015.09'],
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                show: false,
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            },
    //            axisLabel: {
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            boundaryGap: false,
    //            min: 17.25,
    //            max: 42.68,
    //            splitNumber: 4,
    //            axisLine: {
    //                lineStyle: {
    //                    color: '#252b32',
    //                    width: 1,
    //                    type: 'solid'
    //                }
    //            },
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#252b32'],
    //                    width: 1,
    //                    type: 'dashed'
    //                }
    //            },
    //            axisLabel: {
    //                formatter: function(value) {
    //                    return value.toFixed(2);
    //                },
    //                textStyle: {
    //                    color: '#67717a'
    //                }
    //            },
    //            axisTick: {
    //                show: false
    //            }
    //        }
    //    ],
    //    series: [
    //        {
    //            name: '小天鹅B',
    //            type: 'line',
    //            itemStyle: {
    //                normal: {
    //                    color: '#4399fe',
    //                    lineStyle: {
    //                        color: '#e00404',
    //                        width: 2,
    //                        type: 'solid'
    //                    }
    //                }
    //            },
    //            data: [24.88, 25, 24.99, 26, 26.55, 27, 40,30,33.4,33.2,33.8,24.56,35.8,23.55,35.78],
    //            boundaryGap: false,
    //            symbol:'none'
    //        }
    //    ]
    //};

    //财务分析概况
    //var twoPieOne = {
    //    calculable: false,
    //    series: [
    //        {
    //            name: '数据统计',
    //            type: 'pie',
    //            radius: [40, 50],
    //
    //            // for funnel
    //            x: '5%',
    //            width: '80%',
    //            funnelAlign: 'center',
    //            itemStyle: {
    //                normal: {
    //                    label : {
    //                        show : false
    //                    },
    //                    labelLine : {
    //                        show : false
    //                    }
    //                }
    //            },
    //            data: [
    //                {
    //                    value:20,
    //                    name:'one',
    //                    itemStyle:{
    //                        normal:{
    //                            color:'#49c7fa'
    //                        }
    //                    }
    //                },
    //                {
    //                    value:80,
    //                    name:'two',
    //                    itemStyle:{
    //                        normal:{
    //                            color:'#007463'
    //                        }
    //                    }
    //                }
    //            ]
    //        }
    //    ]
    //};
    //var twoPieTwo = {
    //    calculable: false,
    //    series: [
    //        {
    //            name: '数据统计',
    //            type: 'pie',
    //            radius: [40, 50],
    //
    //            // for funnel
    //            x: '5%',
    //            width: '80%',
    //            funnelAlign: 'center',
    //            itemStyle: {
    //                normal: {
    //                    label : {
    //                        show : false
    //                    },
    //                    labelLine : {
    //                        show : false
    //                    }
    //                }
    //            },
    //            data: [
    //                {
    //                    value:20,
    //                    name:'one',
    //                    itemStyle:{
    //                        normal:{
    //                            color:'#49c7fa'
    //                        }
    //                    }
    //                },
    //                {
    //                    value:80,
    //                    name:'two',
    //                    itemStyle:{
    //                        normal:{
    //                            color:'#007463'
    //                        }
    //                    }
    //                }
    //            ]
    //        }
    //    ]
    //};
    //var twoPieThree = {
    //    calculable: false,
    //    series: [
    //        {
    //            name: '数据统计',
    //            type: 'pie',
    //            radius: [40, 50],
    //
    //            // for funnel
    //            x: '5%',
    //            width: '80%',
    //            funnelAlign: 'center',
    //            itemStyle: {
    //                normal: {
    //                    label : {
    //                        show : false
    //                    },
    //                    labelLine : {
    //                        show : false
    //                    }
    //                }
    //            },
    //            data: [
    //                {
    //                    value:20,
    //                    name:'one',
    //                    itemStyle:{
    //                        normal:{
    //                            color:'#49c7fa'
    //                        }
    //                    }
    //                },
    //                {
    //                    value:80,
    //                    name:'two',
    //                    itemStyle:{
    //                        normal:{
    //                            color:'#007463'
    //                        }
    //                    }
    //                }
    //            ]
    //        }
    //    ]
    //};
    //var twoBarOne = {
    //    calculable: true,
    //    grid: {
    //        borderWidth: 0
    //    },
    //    xAxis: [
    //        {
    //            type: 'category',
    //            show: true,
    //            data: [{
    //                value:'上月合计',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'本月合计',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            }],
    //            axisLine:{
    //                lineStyle:{
    //                    width:1,
    //                    color: '#393d46'
    //                }
    //            },
    //            itemStyle: {normal: {color:'#fff'}},
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            }
    //        },
    //        {
    //            type: 'category',
    //            data: ['上月合计','本月合计'],
    //            axisLine: {show:false},
    //            axisTick: {show:false},
    //            axisLabel: {show:false},
    //            splitArea: {show:false},
    //            splitLine: {show:false}
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            show: false
    //        }
    //    ],
    //
    //    series: [
    //        {
    //            name: '上月合计',
    //            type: 'bar',
    //            itemStyle: {normal: {color:'rgba(0,106,94,0.5)'}},
    //            data: [150,100],
    //            barWidth:30,
    //            barGap:30,
    //            boundaryGap: false
    //        },
    //        {
    //            name: '本月合计',
    //            type: 'bar',
    //            itemStyle: {normal: {color:'rgba(73,199,250,0.9)'}},
    //            data: [50,50],
    //            xAxisIndex:1,
    //            barWidth:30,
    //            barGap:30,
    //            boundaryGap: false
    //        }
    //    ]
    //};
    //var twoBarTwo = {
    //    calculable: true,
    //    grid: {
    //        borderWidth: 0
    //    },
    //    xAxis: [
    //        {
    //            type: 'category',
    //            show: true,
    //            data: [{
    //                value:'上月合计',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'本月合计',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            }],
    //            axisLine:{
    //                lineStyle:{
    //                    width:1,
    //                    color: '#393d46'
    //                }
    //            },
    //            itemStyle: {normal: {color:'#fff'}},
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            }
    //        },
    //        {
    //            type: 'category',
    //            data: ['上月合计','本月合计'],
    //            axisLine: {show:false},
    //            axisTick: {show:false},
    //            axisLabel: {show:false},
    //            splitArea: {show:false},
    //            splitLine: {show:false}
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            show: false
    //        }
    //    ],
    //
    //    series: [
    //        {
    //            name: '上月合计',
    //            type: 'bar',
    //            itemStyle: {normal: {color:'rgba(0,106,94,0.5)'}},
    //            data: [150,100],
    //            barWidth:30,
    //            barGap:30,
    //            boundaryGap: false
    //        },
    //        {
    //            name: '本月合计',
    //            type: 'bar',
    //            itemStyle: {normal: {color:'rgba(73,199,250,0.9)'}},
    //            data: [50,50],
    //            xAxisIndex:1,
    //            barWidth:30,
    //            barGap:30,
    //            boundaryGap: false
    //        }
    //    ]
    //};
    //var twoBarThree = {
    //    calculable: true,
    //    grid: {
    //        borderWidth: 0
    //    },
    //    xAxis: [
    //        {
    //            type: 'category',
    //            show: true,
    //            data: [{
    //                value:'上月合计',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'本月合计',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            }],
    //            axisLine:{
    //                lineStyle:{
    //                    width:1,
    //                    color: '#393d46'
    //                }
    //            },
    //            itemStyle: {normal: {color:'#fff'}},
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            }
    //        },
    //        {
    //            type: 'category',
    //            data: ['上月合计','本月合计'],
    //            axisLine: {show:false},
    //            axisTick: {show:false},
    //            axisLabel: {show:false},
    //            splitArea: {show:false},
    //            splitLine: {show:false}
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            show: false
    //        }
    //    ],
    //
    //    series: [
    //        {
    //            name: '上月合计',
    //            type: 'bar',
    //            itemStyle: {normal: {color:'rgba(0,106,94,0.5)'}},
    //            data: [150,100],
    //            barWidth:30,
    //            barGap:30,
    //            boundaryGap: false
    //        },
    //        {
    //            name: '本月合计',
    //            type: 'bar',
    //            itemStyle: {normal: {color:'rgba(73,199,250,0.9)'}},
    //            data: [50,50],
    //            xAxisIndex:1,
    //            barWidth:30,
    //            barGap:30,
    //            boundaryGap: false
    //        }
    //    ]
    //};

    //零售、渠道概况模块
    //var fourBarOne = {
    //    calculable: true,
    //    grid: {
    //        borderWidth: 0
    //    },
    //    xAxis: [
    //        {
    //            type: 'category',
    //            show: true,
    //            data: [{
    //                value:'3C连锁',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'全国商超',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'TOP门店',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'旗舰店',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'渠道门店',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            },{
    //                value:'电商',
    //                textStyle:{
    //                    color:'#fff'
    //                }
    //            }],
    //            axisLine:{
    //                lineStyle:{
    //                    width:1,
    //                    color: '#393d46'
    //                }
    //            },
    //            itemStyle: {normal: {color:'#fff'}},
    //            splitLine: {
    //                lineStyle: {
    //                    color: ['#ccc'],
    //                    width: 0,
    //                    type: 'solid'
    //                }
    //            }
    //        },
    //        {
    //            type: 'category',
    //            data: ['3C连锁','全国商超','TOP门店','旗舰店','渠道门店','电商'],
    //            axisLine: {show:false},
    //            axisTick: {show:false},
    //            axisLabel: {show:false},
    //            splitArea: {show:false},
    //            splitLine: {show:false}
    //        }
    //    ],
    //    yAxis: [
    //        {
    //            type: 'value',
    //            show: false
    //        }
    //    ],
    //
    //    series: [
    //        {
    //            name:'内销',
    //            type:'bar',
    //            barWidth:18,
    //            barCategoryGap:120,
    //            itemStyle: {normal: {color:'#49c7fa'}},
    //            data:[20,50,70,80,50,60]
    //        },
    //        {
    //            name:'外销',
    //            type:'bar',
    //            barWidth:18,
    //            barCategoryGap:120,
    //            itemStyle: {normal: {color:'#007463'}},
    //            data:[100,120,80,90,130,140]
    //        }
    //    ]
    //};

    //function resetPart(){
    //
    //        resetWH('main');
    //        resetWH('main2');
    //        resetWH('main3');
    //        resetWH('main4');
    //
    //        //var myChartO = echarts.init(document.getElementById('main'));
    //        //myChartO.setOption(oneBarOne,true);
    //        //
    //        //var myChartO2 = echarts.init(document.getElementById('main2'));
    //        //myChartO2.setOption(oneBarTwo,true);
    //        //
    //        //var myChartO3 = echarts.init(document.getElementById('main3'));
    //        //myChartO3.setOption(oneBarThree,true);
    //        //
    //        //var myChartO4 = echarts.init(document.getElementById('main4'));
    //        //myChartO4.setOption(oneBarFour,true);
    //
    //        resetWH('pie');
    //        resetWH('pie2');
    //        resetWH('pie3');
    //        resetWH('bar');
    //        resetWH('bar2');
    //        resetWH('bar3');
    //
    //        //var myChart = echarts.init(document.getElementById('pie'));
    //        //myChart.setOption(twoPieOne,true);
    //        //
    //        //var myChart2 = echarts.init(document.getElementById('pie2'));
    //        //myChart2.setOption(twoPieTwo,true);
    //        //
    //        //var myChart3 = echarts.init(document.getElementById('pie3'));
    //        //myChart3.setOption(twoPieThree,true);
    //        //
    //        //var myChart4 = echarts.init(document.getElementById('bar'));
    //        //myChart4.setOption(twoBarOne,true);
    //        //
    //        //var myChart5 = echarts.init(document.getElementById('bar2'));
    //        //myChart5.setOption(twoBarTwo,true);
    //        //
    //        //var myChart6 = echarts.init(document.getElementById('bar3'));
    //        //myChart6.setOption(twoBarThree,true);
    //
    //        resetWH('bar4');
    //        //var myChartT = echarts.init(document.getElementById('bar4'));
    //        //myChartT.setOption(fourBarOne,true);
    //}

    function resetWH(id){
        var target = $('#'+id);
        target.css('width',$('#'+id).width());
        target.css('height',$('#'+id).height());
    }

    //function showPart(){
    //    resetPart();
    //}
    //window.showPart = showPart;
    window.resetWH = resetWH;
})();

var dataNow = new Date();

function formatDate(date){
    if (date instanceof Date) {

        return date.getFullYear() + formatMin(parseInt(date.getMonth() + 1)) + formatMin(date.getDate());
    }

}

function formatMin(date) {
    if (date < 10) {
        date = '0' + date;
    }

    return date;
}

function addPiont(n){
    if(typeof (n) == 'undefined' || n == null || isNaN(n) || n === 'NaN'){
        return '-';
    }


    var re=/\d{1,3}(?=(\d{3})+$)/g;
	n = Math.round(n);
	n = n.toString();
    var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});

    return n1;
}

function dealNum(num){
    if(num.indexOf('.') > 0){
        if(num.length > 11){
            num = num / 100000000;
            num =dealFloat(num);
            num = num + '亿';
        } else if(num.length > 7){
            num = num / 10000;
            num = dealFloat(num);
            num = num + '万';
        } else{
            num = num + '元';
        }
    } else {
        if(num.length > 8){
            num = num / 100000000;
            num = dealFloat(num);
            num = num + '亿';
        } else if(num.length > 4){
            num = num / 10000;
            num = dealFloat(num);
            num = num + '万';
        } else{
            num = num + '元';
        }
    }
    return num;
}

function dealNumF(num){
    if(num.indexOf('.') > 0){
        if(num.length > 12){
            num = num / 100000000;
            num = dealFloat(num);
            num = num + '亿';
        } else if(num.length > 7){
            num = num / 10000;
            num = dealFloat(num);
            num = num + '万';
        } else{
            num = num + '元';
        }
    } else {
        if(num.length > 9){
            num = num / 100000000;
            num = dealFloat(num);
            num = num + '亿';
        } else if(num.length > 4){
            num = num / 10000;
            num = dealFloat(num);
            num = num + '万';
        } else{
            num = num + '元';
        }
    }
    return num;
}

function dealNumO(num){
    if(typeof (num) != 'undefined' && num != '-' ){
        if(num.indexOf('.') > 0){
            num = num / 10000;
            num = dealFloat(num)
        } else {
            num = num / 10000;
            num = dealFloat(num);
        }
    }
    return num;
}

function dealFloat(num){
    return Math.floor(num*100)/100
}

function notNull(obj){
    if(typeof (obj) == 'undefined' || obj == null || isNaN(obj) || obj === 'NaN'){
        obj = '-';
        return obj;
    }
    return Math.round(obj);
}

function formatNull(obj){
    return obj === '-%' ? '-' : obj;
}

setInterval('initData()',5000000);

function getArrayMax(array){
    var max = parseFloat(array[0]) + 0.1;
    for(var i = 0;i<array.length;i++){
        if(max < parseFloat(array[i])){
            max = parseFloat(array[i]) + 0.1;
    }
    }
    return max;
}

function getArrayMin(array){
    var min = parseFloat(array[0]) - 0.1;
    for(var i = 0;i<array.length;i++){
        if(min > parseFloat(array[i])){
            min = parseFloat(array[i]) - 0.1;
        }
    }
    return min;
}

function getNumTF(num){
    var a;
    if(Number(num) >= 0 ){
         a = true;
    } else {
        a = false;
    }

    return a;
}

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==33 || e.keyCode ==34 || e.keyCode ==35 || e.keyCode ==36 || e.keyCode ==37 || e.keyCode ==38 || e.keyCode ==39 || e.keyCode ==40) {
        window.location.href = "http://10.16.26.166:8080/pentaho/kdisplay/No3.html";
    }
}

function initData() {
    var qtySumByInv=[],qtySumByInvPer =[];
    stockService.getAllBi(formatDate(dataNow)).done(function(data,data2){
        console.log('getBiDetail',data,data2);
        var sum = [],saleIn = [],saleOut = [],flagone = 0,flagtwo = 0,flagthree = 0,dataOne = [],dataTwo =[],sumB = [], saleInB = [], saleOutB = [], sumBInt = [],saleOutBInt  =[],saleInBInt = [];
        dataOne = data[0];
        dataTwo = data2[0];

        for(var j = 0;j<dataTwo.length;j++) {
            if(dataTwo[j].direct_code == '合计'){
                sumB.push(dataTwo[j]);
                sumBInt.push(dataTwo[j]);
            } else if(dataTwo[j].direct_code == '出口'){
                saleOutB.push(dataTwo[j]);
                saleOutBInt.push(dataTwo[j]);
            } else if(dataTwo[j].direct_code == '内销'){
                saleInB.push(dataTwo[j]);
                saleInBInt.push(dataTwo[j]);
            }
        }
        console.log(sumBInt,saleOutBInt,saleInBInt);

        $('#sumBarCL').html(addPiont(sumBInt[sumBInt.length - 1].inv_amt));
        if(getNumTF(sumBInt[sumBInt.length -1].inv_amt_yoy)){
            $('#sumBarCVovL').addClass('fc-red');
        }
        $('#sumBarCVovL').html(formatNull(notNull(sumBInt[sumBInt.length -1].inv_amt_yoy) + '%'));
        $('#sumBarCR').html(addPiont(sumBInt[sumBInt.length - 2].inv_amt));
        if(getNumTF(sumBInt[sumBInt.length - 2].inv_amt_yoy)){
            $('#sumBarCVovR').addClass('fc-red');
        }
        $('#sumBarCVovR').html(formatNull(notNull(sumBInt[sumBInt.length - 2].inv_amt_yoy) + '%'));


        $('#CinSumT').html(addPiont(saleInB[saleInB.length - 1].inv_amt));
        $('#CinHuanT').html(formatNull(notNull(saleInB[saleInB.length-1].inv_amt_mom) + '%'));
        if(getNumTF(saleInB[saleInB.length- 1].inv_amt_yoy)){
            $('#CinTongT').removeClass('fc-darkblue');
            $('#CinTongT').addClass('fc-red');
        }
        $('#CinTongT').html(formatNull(notNull(saleInB[saleInB.length- 1].inv_amt_yoy) + '%'));
        $('#CinHuanTs').html(addPiont(saleInB[saleInB.length -2].inv_amt));
        if(getNumTF(saleInB[saleInB.length -2].inv_amt_yoy)){
            $('#CinTongTs').removeClass('fc-darkblue');
            $('#CinTongTs').addClass('fc-red');
        }
        $('#CinTongTs').html(formatNull(notNull(saleInB[saleInB.length -2].inv_amt_yoy) + '%'));

        $('#CinSumB').html(addPiont(saleOutB[saleOutB.length - 1].inv_amt));
        $('#CinHuanB').html(formatNull(notNull(saleOutB[saleOutB.length - 1].inv_amt_mom) + '%'));
        if(getNumTF(saleOutB[saleOutB.length- 1].inv_amt_yoy)){
            $('#CinTongB').removeClass('fc-darkblue');
            $('#CinTongB').addClass('fc-red');
        }
        $('#CinTongB').html(formatNull(notNull(saleOutB[saleOutB.length - 1].inv_amt_yoy) + '%'));
        $('#CinHuanBs').html(addPiont(saleOutB[saleOutB.length - 2].inv_amt));
        if(getNumTF(saleOutB[saleOutB.length -2].inv_amt_yoy)){
            $('#CinTongBs').removeClass('fc-darkblue');
            $('#CinTongBs').addClass('fc-red');
        }
        $('#CinTongBs').html(formatNull(notNull(saleOutB[saleOutB.length - 2].inv_amt_yoy) + '%'));

        sumB.pop();
        sumB.unshift(sumB[sumB.length- 1]);
        sumB.pop();
        sumB.push({inv_amt_yoy:'-',inv_amt:'-'});
        sumB.push({inv_amt_yoy:'-',inv_amt:'-'});
        sumB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleInB.push({inv_amt_yoy:'-',inv_amt:'-'});
        console.log(sumB);

        saleInB.pop();
        saleInB.unshift(saleInB[saleInB.length- 1]);
        saleInB.pop();
        saleInB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleInB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleInB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleInB.push({inv_amt_yoy:'-',inv_amt:'-'});

        console.log(saleInB);

        saleOutB.pop();
        saleOutB.unshift(saleOutB[saleOutB.length- 1]);
        saleOutB.pop();
        saleOutB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleOutB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleOutB.push({inv_amt_yoy:'-',inv_amt:'-'});
        saleInB.push({inv_amt_yoy:'-',inv_amt:'-'});
        console.log(saleOutB);
    //    function checkQty(index,array){
    //        var arrayList = [];
    //        if(index == 1){
    //           for(var i = 0;i<array.length;i++){
    //               if(array[i].bd_name == '总部'){
    //                   arrayList.push(array[i].dtd_qty);
    //                   arrayList.push(array[i].dtd_qty_yoy);
    //               }
    //           }
    //        }else if(index == 2){
    //            for(var i = 0;i<array.length;i++){
    //                if(array[i].bd_name == '家用空调事业部'){
    //                    arrayList.push(array[i].dtd_qty);
    //                    arrayList.push(array[i].dtd_qty_yoy);
    //                }
    //            }
    //        } else if(index == 3){
    //            for(var i = 0;i<array.length;i++){
    //                if(array[i].bd_name == '厨房电器事业部'){
    //                    arrayList.push(array[i].dtd_qty);
    //                    arrayList.push(array[i].dtd_qty_yoy);
    //                }
    //            }
    //        } else if(index == 4){
    //            for(var i = 0;i<array.length;i++){
    //                if(array[i].bd_name == '生活电器事业部'){
    //                    arrayList.push(array[i].dtd_qty);
    //                    arrayList.push(array[i].dtd_qty_yoy);
    //                }
    //            }
    //        } else if(index == 5){
    //            for(var i = 0;i<array.length;i++){
    //                if(array[i].bd_name == '洗衣机事业部'){
    //                    arrayList.push(array[i].dtd_qty);
    //                    arrayList.push(array[i].dtd_qty_yoy);
    //                }
    //            }
    //        } else if(index == 5){
    //            for(var i = 0;i<array.length;i++){
    //                if(array[i].bd_name == '冰箱事业部'){
    //                    arrayList.push(array[i].dtd_qty);
    //                    arrayList.push(array[i].dtd_qty_yoy);
    //                }
    //            }
    //        } else if(index == 5){
    //            for(var i = 0;i<array.length;i++){
    //                if(array[i].bd_name == '冰箱事业部'){
    //                    arrayList.push(array[i].dtd_qty);
    //                    arrayList.push(array[i].dtd_qty_yoy);
    //                }
    //            }
    //        } else if(data[i].bd_name == '冰箱事业部'){
    //            $('#tdQty6').html(data[i].dtd_qty);
    //            $('#tdQPer6').html(data[i].dtd_qty_yoy);
    //        }  else if(data[i].bd_name == '中央空调事业部'){
    //            $('#tdQty7').html(data[i].dtd_qty);
    //            $('#tdQPer7').html(data[i].dtd_qty_yoy);
    //        }  else if(data[i].bd_name == '国际事业部'){
    //            $('#tdQty8').html(data[i].dtd_qty);
    //            $('#tdQPer8').html(data[i].dtd_qty_yoy);
    //        } else if(data[i].bd_name == '环境电器事业部'){
    //            $('#tdQty9').html(data[i].dtd_qty);
    //            $('#tdQPer9').html(data[i].dtd_qty_yoy);
    //        } else if(data[i].bd_name == '洗涤电器事业部'){
    //            $('#tdQty10').html(data[i].dtd_qty);
    //            $('#tdQPer10').html(data[i].dtd_qty_yoy);
    //        }  else if(data[i].bd_name == '热水器事业部'){
    //            $('#tdQty11').html(data[i].dtd_qty);
    //            $('#tdQPer11').html(data[i].dtd_qty_yoy);
    //        }  else if(data[i].bd_name == '压缩机事业部"'){
    //            $('#tdQty12').html(data[i].dtd_qty);
    //            $('#tdQPer12').html(data[i].dtd_qty_yoy);
    //        } else if(data[i].bd_name == '电机事业部"'){
    //            $('#tdQty13').html(data[i].dtd_qty);
    //            $('#tdQPer13').html(data[i].dtd_qty_yoy);
    //        }  else if(data[i].bd_name == '电机事业部"'){
    //            $('#tdQty14').html(data[i].dtd_qty);
    //            $('#tdQPer14').html(data[i].dtd_qty_yoy);
    //        }
    //        return  arrayList
    //}

        for(var i = 0;i<dataOne.length;i++){
            if(dataOne[i].shipment_name == '合计'){
                flagone = flagone + 1;
                sum.push(dataOne[i]);

                var txt3=document.createElement("tr");
                txt3 = $(txt3);
                var tdName =document.createElement("td");
                tdName = $(tdName);
                tdName.addClass('c-white');
                tdName.html(sum[sum.length-1].bd_name);
                txt3.append(tdName);

                var tdPlan =document.createElement("td");
                tdPlan = $(tdPlan);
                tdPlan.addClass('fc-blue');
                tdPlan.addClass('num-right');
                tdPlan.html(addPiont(sum[sum.length-1].ytd_amt_p));
                txt3.append(tdPlan);

                var tdSum =document.createElement("td");
                tdSum = $(tdSum);
                tdSum.addClass('fc-darkgreen');
                tdSum.addClass('num-right');
                tdSum.html(addPiont(sum[sum.length-1].ytd_amt));
                txt3.append(tdSum);

                var tdHas =document.createElement("td");
                tdHas = $(tdHas);
                tdHas.addClass('fc-darkblue');
                tdHas.html(formatNull(notNull(sum[sum.length-1].ytd_amt_roc) + '%'));
                txt3.append(tdHas);

                var tdMPer =document.createElement("td");
                tdMPer = $(tdMPer);
                if(getNumTF(sum[sum.length-1].ytd_amt_yoy)){
                    tdMPer.addClass('fc-darkblue');
                } else {
                    tdMPer.addClass('fc-red');
                }
                tdMPer.html(formatNull(notNull(sum[sum.length-1].ytd_amt_yoy) + '%'));
                txt3.append(tdMPer);

                var tdQuantity =document.createElement("td");
                tdQuantity = $(tdQuantity);
                tdQuantity.addClass('fc-darkblue');
                tdQuantity.addClass('num-right');
                tdQuantity.html(addPiont(sumB[flagone - 1].inv_amt));
                txt3.append(tdQuantity);

                var tdQPer =document.createElement("td");
                tdQPer = $(tdQPer);
                if(getNumTF(sumB[flagone - 1].inv_amt_yoy)){
                    tdQPer.addClass('fc-red');
                } else {
                    tdQPer.addClass('fc-darkblue');
                }
                tdQPer.html(formatNull(notNull(sumB[flagone - 1].inv_amt_yoy) + '%'));
                txt3.append(tdQPer);
                $('#sumTable').append(txt3);
            } else if(dataOne[i].shipment_name == '内销'){
                flagtwo = flagtwo + 1;
                saleIn.push(dataOne[i]);
                var txt2=document.createElement("tr");
                txt2 = $(txt2);
                var tdName =document.createElement("td");
                tdName = $(tdName);
                tdName.addClass('c-white');
                tdName.html(saleIn[saleIn.length-1].bd_name);
                txt2.append(tdName);

                var tdPlan =document.createElement("td");
                tdPlan = $(tdPlan);
                tdPlan.addClass('fc-blue');
                tdPlan.addClass('num-right');
                tdPlan.html(addPiont(saleIn[saleIn.length-1].ytd_amt_p));
                txt2.append(tdPlan);

                var tdSum =document.createElement("td");
                tdSum = $(tdSum);
                tdSum.addClass('fc-darkgreen');
                tdSum.addClass('num-right');
                tdSum.html(addPiont(saleIn[saleIn.length-1].ytd_amt));
                txt2.append(tdSum);

                var tdHas =document.createElement("td");
                tdHas = $(tdHas);
                tdHas.addClass('fc-darkblue');
                tdHas.html(formatNull(notNull(saleIn[saleIn.length-1].ytd_amt_roc) + '%'));
                txt2.append(tdHas);

                var tdMPer =document.createElement("td");
                tdMPer = $(tdMPer);
                if(getNumTF(saleIn[saleIn.length-1].ytd_amt_yoy)){
                    tdMPer.addClass('fc-darkblue');
                } else {
                    tdMPer.addClass('fc-red');
                }
                tdMPer.html(formatNull(notNull(saleIn[saleIn.length-1].ytd_amt_yoy) + '%'));
                txt2.append(tdMPer);

                var tdQuantity =document.createElement("td");
                tdQuantity = $(tdQuantity);
                tdQuantity.addClass('fc-darkblue');
                tdQuantity.addClass('num-right');
                tdQuantity.html(addPiont(saleInB[flagtwo -1].inv_amt));
                txt2.append(tdQuantity);

                var tdQPer =document.createElement("td");
                tdQPer = $(tdQPer);
                if(getNumTF(notNull(saleInB[flagone - 1].inv_amt_yoy))){
                    tdQPer.addClass('fc-red');
                } else {
                    tdQPer.addClass('fc-darkblue');
                }
                tdQPer.html(formatNull(notNull(saleInB[flagtwo -1].inv_amt_yoy) + '%'));
                txt2.append(tdQPer);
                $('#inTable').append(txt2);
            } else if(dataOne[i].shipment_name == '出口'){
                flagthree = flagthree + 1;
                saleOut.push(dataOne[i]);

                var txt2=document.createElement("tr");
                txt2 = $(txt2);
                var tdName =document.createElement("td");
                tdName = $(tdName);
                tdName.addClass('c-white');
                tdName.html(saleOut[saleOut.length-1].bd_name);
                txt2.append(tdName);

                var tdPlan =document.createElement("td");
                tdPlan = $(tdPlan);
                tdPlan.addClass('fc-blue');
                tdPlan.addClass('num-right');
                tdPlan.html(addPiont(saleOut[saleOut.length-1].ytd_amt_p));
                txt2.append(tdPlan);

                var tdSum =document.createElement("td");
                tdSum = $(tdSum);
                tdSum.addClass('fc-darkgreen');
                tdSum.addClass('num-right');
                tdSum.html(addPiont(saleOut[saleOut.length-1].ytd_amt));
                txt2.append(tdSum);

                var tdHas =document.createElement("td");
                tdHas = $(tdHas);
                tdHas.addClass('fc-darkblue');
                tdHas.html(formatNull(notNull(saleOut[saleOut.length-1].ytd_amt_roc) + '%'));
                txt2.append(tdHas);

                var tdMPer =document.createElement("td");
                tdMPer = $(tdMPer);
                if(getNumTF(saleOut[saleIn.length-1].ytd_amt_yoy)){
                    tdMPer.addClass('fc-darkblue');
                } else {
                    tdMPer.addClass('fc-red');
                }
                tdMPer.html(formatNull(notNull(saleOut[saleOut.length-1].ytd_amt_yoy) + '%'));
                txt2.append(tdMPer);

                var tdQuantity =document.createElement("td");
                tdQuantity = $(tdQuantity);
                tdQuantity.addClass('fc-darkblue');
                tdQuantity.addClass('num-right');
                tdQuantity.html(addPiont(saleOutB[flagthree - 1].inv_amt));
                txt2.append(tdQuantity);

                var tdQPer =document.createElement("td");
                tdQPer = $(tdQPer);
                if(getNumTF(saleOutB[flagone - 1].inv_amt_yoy)){
                    tdQPer.addClass('fc-red');
                } else {
                    tdQPer.addClass('fc-darkblue');
                }
                tdQPer.html(formatNull(notNull(saleOutB[flagthree - 1].inv_amt_yoy) +'%'));
                txt2.append(tdQPer);
                $('#outTable').append(txt2);
            }
        }

        console.log(sum,saleIn, saleOut);
        $('#biASum').html(addPiont(sum[0].ytd_amt));
        if(!getNumTF(sum[0].ytd_amt_yoy)){
            $('#biASumPer').removeClass('c-0084ff');
            $('#biASumPer').addClass('fc-red');
        }
        $('#biASumPer').html(formatNull(notNull(sum[0].ytd_amt_yoy) + '%'));

        $('#biAIn').html(addPiont(saleIn[0].ytd_amt));
        if(!getNumTF(saleIn[0].ytd_amt_yoy)){
            $('#biAInPer').addClass('fc-red');
        }
        $('#biAInPer').html(formatNull(notNull(saleIn[0].ytd_amt_yoy) + '%'));

        $('#biAOut').html(addPiont(saleOut[0].ytd_amt));
        if(!getNumTF(saleOut[0].ytd_amt_yoy)){
            $('#biAOutPer').addClass('fc-red');
        }
        $('#biAOutPer').html(formatNull(notNull(saleOut[0].ytd_amt_yoy) + '%'));
    });

    //stockService.getInv('20150920').done(function(data){
    //        console.log('getInv',data);
    //        var sum = [],saleIn = [],saleOut = [];
    //        for(var i = 0;i<data.length;i++){
    //            if(data[i].shipment_name == '合计'){
    //                sum.push(data[i]);
    //                if(data[i].bd_name == '总部'){
    //                    qtySumByInv[0] = data[i].dtd_qty;
    //                    qtySumByInvPer[0] = data[i].dtd_qty_yoy;
    //                } else if(data[i].bd_name == '家用空调事业部'){
    //                    qtySumByInv[1] = data[i].dtd_qty;
    //                    qtySumByInvPer[1] = data[i].dtd_qty_yoy;
    //                }else if(data[i].bd_name == '厨房电器事业部'){
    //                    $('#tdQty3').html(data[i].dtd_qty);
    //                    $('#tdQPer3').html(data[i].dtd_qty_yoy);
    //                } else if(data[i].bd_name == '生活电器事业部'){
    //                    $('#tdQty4').html(data[i].dtd_qty);
    //                    $('#tdQPer4').html(data[i].dtd_qty_yoy);
    //                } else if(data[i].bd_name == '洗衣机事业部'){
    //                    $('#tdQty5').html(data[i].dtd_qty);
    //                    $('#tdQPer5').html(data[i].dtd_qty_yoy);
    //                }  else if(data[i].bd_name == '冰箱事业部'){
    //                    $('#tdQty6').html(data[i].dtd_qty);
    //                    $('#tdQPer6').html(data[i].dtd_qty_yoy);
    //                }  else if(data[i].bd_name == '中央空调事业部'){
    //                    $('#tdQty7').html(data[i].dtd_qty);
    //                    $('#tdQPer7').html(data[i].dtd_qty_yoy);
    //                }  else if(data[i].bd_name == '国际事业部'){
    //                    $('#tdQty8').html(data[i].dtd_qty);
    //                    $('#tdQPer8').html(data[i].dtd_qty_yoy);
    //                } else if(data[i].bd_name == '环境电器事业部'){
    //                    $('#tdQty9').html(data[i].dtd_qty);
    //                    $('#tdQPer9').html(data[i].dtd_qty_yoy);
    //                } else if(data[i].bd_name == '洗涤电器事业部'){
    //                    $('#tdQty10').html(data[i].dtd_qty);
    //                    $('#tdQPer10').html(data[i].dtd_qty_yoy);
    //                }  else if(data[i].bd_name == '热水器事业部'){
    //                    $('#tdQty11').html(data[i].dtd_qty);
    //                    $('#tdQPer11').html(data[i].dtd_qty_yoy);
    //                }  else if(data[i].bd_name == '压缩机事业部"'){
    //                    $('#tdQty12').html(data[i].dtd_qty);
    //                    $('#tdQPer12').html(data[i].dtd_qty_yoy);
    //                } else if(data[i].bd_name == '电机事业部"'){
    //                    $('#tdQty13').html(data[i].dtd_qty);
    //                    $('#tdQPer13').html(data[i].dtd_qty_yoy);
    //                }  else if(data[i].bd_name == '电机事业部"'){
    //                    $('#tdQty14').html(data[i].dtd_qty);
    //                    $('#tdQPer14').html(data[i].dtd_qty_yoy);
    //                }
    //
    //            } else if(data[i].shipment_name == '内销'){
    //                saleIn.push(data[i]);
    //            } else if(data[i].shipment_name == '出口'){
    //                saleOut.push(data[i]);
    //            }
    //        }
    //    });
    stockService.getRatioSale().done(function(data){

        console.log('getRatioSale',data);


        $('#sumBarAL').html(addPiont(data[0].lasm_total));
        if(!getNumTF(data[0].lasm_rate)){
            $('#sumBarAVovL').addClass('fc-red');
        }
        $('#sumBarAVovL').html(formatNull(notNull(data[0].lasm_rate) + '%'));

        $('#AinSumT').html(addPiont(data[1].lasm_total));
        $('#AinHuanT').html(formatNull(notNull(data[1].lasm_yoy) + '%'));
        if(!getNumTF(data[1].lasm_rate)){
            $('#AinTongT').removeClass('fc-darkblue');
            $('#AinTongT').addClass('fc-red');
        }
        $('#AinTongT').html(formatNull(notNull(data[1].lasm_rate) + '%'));

        $('#AinSumB').html(addPiont(data[2].lasm_total));
        $('#AinHuanB').html(formatNull(notNull(data[2].lasm_yoy) + '%'));
        if(!getNumTF(data[2].lasm_rate)){
            $('#AinTongB').removeClass('fc-darkblue');
            $('#AinTongB').addClass('fc-red');
        }
        $('#AinTongB').html(formatNull(notNull(data[2].lasm_rate) + '%'));
    });

    stockService.getRatio().done(function(data){

        console.log('getRatio',data);

        $('#sumBarBL').html(addPiont(data[0].lasm_total));
        if(!getNumTF(data[0].lasm_rate)){
            $('#sumBarBVovL').addClass('fc-red');
        }
        $('#sumBarBVovL').html(formatNull(notNull(data[0].lasm_rate) + '%'));

        $('#BinSumT').html(addPiont(data[1].lasm_total));
        $('#BinHuanT').html(formatNull(notNull(data[1].lasm_yoy) + '%'));
        if(!getNumTF(data[1].lasm_rate)){
            $('#BinTongT').removeClass('fc-darkblue');
            $('#BinTongT').addClass('fc-red');
        }
        $('#BinTongT').html(formatNull(notNull(data[1].lasm_rate) + '%'));

        $('#BinSumB').html(addPiont(data[2].lasm_total));
        $('#BinHuanB').html(formatNull(notNull(data[2].lasm_yoy) + '%'));
        if(!getNumTF(data[2].lasm_rate)){
            $('#BinTongB').removeClass('fc-darkblue');
            $('#BinTongB').addClass('fc-red');
        }
        $('#BinTongB').html(formatNull(notNull(data[2].lasm_rate) + '%'));
    });

    stockService.getAllStocks().done(function(data,data2,data3,data4){
        //console.log(data3);
        if(data[1] == 'success'){
            var a = data[0];
            if(parseFloat(a.now_price) > parseFloat(a.yesterday_close)){
                $('#sharesAStatus').addClass('fc-red');
                $('#iconA').addClass('icon-up');
            } else {
                $('#sharesAStatus').addClass('fc-green');
                $('#iconA').addClass('icon-down');
            }
            var contrast = dealFloat(Number(a.now_price) - Number(a.yesterday_close));
            var per = dealFloat(contrast/(a.yesterday_close) * 100) + '%';

            //console.log(dealFloat(Number(a.now_price) - Number(a.yesterday_close)));
            $('#sharesAContrast').html(contrast + ' (' + per + ')');
            $('#sharesANow').html(a.now_price);
            $('#sharesAToday').html(a.today_open);
            $('#sharesAYesterday').html(a.yesterday_close);
            $('#sharesAHigh').html(a.today_high_price);
            $('#sharesALow').html(a.today_low_price);
            $('#sharesANum').html(dealNum(a.deal_num));
            $('#sharesAMoney').html(dealNum(a.deal_money));
        }

        if(data2[1] == 'success'){
            var a = data2[0];
            if(parseFloat(a.now_price) > parseFloat(a.yesterday_close)){
                $('#sharesBStatus').addClass('fc-red');
                $('#iconB').addClass('icon-up');
            } else {
                $('#sharesBStatus').addClass('fc-green');
                $('#iconB').addClass('icon-down');
            }
            var contrast = dealFloat(Number(a.now_price) - Number(a.yesterday_close));
            var per = dealFloat(contrast/(a.yesterday_close) * 100) + '%';

            //console.log(dealFloat(Number(a.now_price) - Number(a.yesterday_close)));
            $('#sharesBContrast').html(contrast + ' (' + per + ')');
            $('#sharesBNow').html(a.now_price);
            $('#sharesBToday').html(a.today_open);
            $('#sharesBYesterday').html(a.yesterday_close);
            $('#sharesBHigh').html(a.today_high_price);
            $('#sharesBLow').html(a.today_low_price);
            $('#sharesBNum').html(dealNum(a.deal_num));
            $('#sharesBMoney').html(dealNum(a.deal_money));
        }

        if(data3[1] == 'success'){
            var a = data3[0];
            if(parseFloat(a.now_price) > parseFloat(a.yesterday_close)){
                $('#sharesCStatus').addClass('fc-red');
                $('#iconC').addClass('icon-up');
            } else {
                $('#sharesCStatus').addClass('fc-green');
                $('#iconC').addClass('icon-down');
            }
            var contrast = dealFloat(Number(a.now_price) - Number(a.yesterday_close));
            var per = dealFloat(contrast/(a.yesterday_close) * 100) + '%';

            //console.log(dealFloat(Number(a.now_price) - Number(a.yesterday_close)));
            $('#sharesCContrast').html(contrast + ' (' + per + ')');
            $('#sharesCNow').html(a.now_price);
            $('#sharesCToday').html(a.today_open);
            $('#sharesCYesterday').html(a.yesterday_close);
            $('#sharesCHigh').html(a.today_high_price);
            $('#sharesCLow').html(a.today_low_price);
            $('#sharesCNum').html(dealNumF(a.deal_num));
            $('#sharesCMoney').html(dealNumF(a.deal_money));
        }

        if(data4[1] == 'success'){
            var a = data4[0];
            if(parseFloat(a.now_price) > parseFloat(a.yesterday_close)){
                $('#sharesDStatus').addClass('fc-red');
                $('#iconD').addClass('icon-up');
            } else {
                $('#sharesDStatus').addClass('fc-green');
                $('#iconD').addClass('icon-down');
            }
            var contrast = dealFloat(Number(a.now_price) - Number(a.yesterday_close));
            var per = dealFloat(contrast/(a.yesterday_close) * 100) + '%';

            //console.log(dealFloat(Number(a.now_price) - Number(a.yesterday_close)));
            $('#sharesDContrast').html(contrast + ' (' + per + ')');
            $('#sharesDNow').html(a.now_price);
            $('#sharesDToday').html(a.today_open);
            $('#sharesDYesterday').html(a.yesterday_close);
            $('#sharesDHigh').html(a.today_high_price);
            $('#sharesDLow').html(a.today_low_price);
            $('#sharesDNum').html(dealNumF(a.deal_num));
            $('#sharesDMoney').html(dealNumF(a.deal_money));
        }
    });

    //var codeA = 'sz000333', // 美的集团
    //    codeB = 'sz000418', // 小天鹅A
    //    codeC = 'hk00382', //HK威灵控股
    //    codeD = 'sz200418'; //小天鹅B

    stockService.getStock('sz000651').done(function(data) {
        console.log(data);
        if(data.now_price > data.yesterday_close){
            $('#otherA').addClass('fc-red');
        } else {
            $('#otherA').addClass('fc-green');
        }
        $('#otherA').html(data.now_price);
    }).fail(function() {
        alert('获取' + code + '的数据出错了');
    });

    stockService.getStock('hk01169').done(function(data) {
        console.log(data);
        if(data.now_price > data.yesterday_close){
            $('#otherB').addClass('fc-red');
        } else {
            $('#otherB').addClass('fc-green');
        }
        $('#otherB').html(data.now_price);
    }).fail(function() {
        alert('获取' + code + '的数据出错了');
    });

    stockService.getStock('sz002242').done(function(data) {
        console.log(data);
        if(data.now_price > data.yesterday_close){
            $('#otherC').addClass('fc-red');
        } else {
            $('#otherC').addClass('fc-green');
        }
        $('#otherC').html(data.now_price);
    }).fail(function() {
        alert('获取' + code + '的数据出错了');
    });

    stockService.getStock('sz002508').done(function(data) {
        console.log(data);
        if(data.now_price > data.yesterday_close){
            $('#otherD').addClass('fc-red');
        } else {
            $('#otherD').addClass('fc-green');
        }
        $('#otherD').html(data.now_price);
    }).fail(function() {
        alert('获取' + code + '的数据出错了');
    });
    //
    //stockService.getStock(codeB).done(function(data) {
    //    console.log(data);
    //    var a = data;
    //    $('#sharesBToday').html(a.today_open);
    //    $('#sharesBYesterday').html(a.yesterday_close);
    //    $('#sharesBHigh').html(a.today_high_price);
    //    $('#sharesBLow').html(a.today_low_price);
    //    $('#sharesBNum').html(dealNum(a.deal_num));
    //    $('#sharesBMoney').html(dealNum(a.deal_money));
    //}).fail(function() {
    //    alert('获取' + code + '的数据出错了');
    //});
    //
    //stockService.getStock(codeC).done(function(data) {
    //    console.log(data);
    //    var a = data;
    //    $('#sharesCToday').html(a.today_open);
    //    $('#sharesCYesterday').html(a.yesterday_close);
    //    $('#sharesCHigh').html(a.today_high_price);
    //    $('#sharesCLow').html(a.today_low_price);
    //    $('#sharesCNum').html(dealNum(a.deal_num));
    //    $('#sharesCMoney').html(dealNum(a.deal_money));
    //}).fail(function() {
    //    alert('获取' + code + '的数据出错了');
    //});
    //
    //stockService.getStock(codeD).done(function(data) {
    //    console.log(data);
    //    var a = data;
    //    $('#sharesDToday').html(a.today_open);
    //    $('#sharesDYesterday').html(a.yesterday_close);
    //    $('#sharesDHigh').html(a.today_high_price);
    //    $('#sharesDLow').html(a.today_low_price);
    //    $('#sharesDNum').html(dealNumF(a.deal_num));
    //    $('#sharesDMoney').html(dealNumF(a.deal_money));
    //}).fail(function() {
    //    alert('获取' + code + '的数据出错了');
    //});
}

