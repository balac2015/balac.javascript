var option = {
    title: {
        text: '趋势图',
        left: 'left'
    },
    tooltip: {
        show: true,
        showContent: true,
        trigger: 'axis',
        enterable: true,
        formatter: '{b0}<br />今日领券-全部U券: {c0}',
        backgroundColor: '#999',
        padding: [12, 8],
        textStyle: {
            color: '#fff',
            fontWeight: 300,
            fontSize: 14
        },
        axisPointer: {
            lineStyle: {
                color: '#00b74e',
                width: 1,
                type: 'dashed',
                opacity: 0.6
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: { // 分割线
            show: false
        },
        data: ['2016-04-04', '2016-04-05', '2016-04-06', '2016-04-07', '2016-04-08', '2016-04-09', '2016-04-10'],
        axisLine: { // 坐标轴线
            show: true,
            onZero: false,
            lineStyle: {
                color: '#ccc',
                width: 2,
                type: 'solid'
            }
        },
        axisTick: { // 坐标刻度
            show: true,
            interval: 'auto',
            inside: false,
            length: 5,
            lineStyle: {
                color: '#00b74e',
                width: 5,
                type: 'solid'
            }
        },
        axisLabel: { // 坐标轴刻度标签
            show: true,
            interval: 'auto',
            inside: false,
            rotate: 0,
            margin: 8,
            textStyle: {
                color: '#999',
                fontSize: 10
            }
        }
    },
    yAxis: [
        {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#eee']
                }
            }
        }
    ],
    grid: {
        left: '3%',
        right: '7%',
        bottom: '10%',
        containLabel: true
    },
    series: [
        {
            name: '',
            type: 'line',
            data: [1, 2, 3, 50, 100, 109, 200],
            // 连线样式
            lineStyle: {
                emphasis: {
                    color: '#479DE6',
                    width: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 5,
                    opacity: 1
                }
            },
            // 折点样式
            itemStyle: {
                normal: {
                    color: '#00b74e',
                    width: 0,
                    type: 'solid'
                }
            }
        }
    ]
};


var graphChar = document.querySelector('#graph-char'),
    myChar = echarts.init(graphChar);

if (option) {
    myChar.setOption(option, true);
}