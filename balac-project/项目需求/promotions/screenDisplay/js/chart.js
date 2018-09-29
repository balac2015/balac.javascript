
var echartsInstance= {};
var echartsInit = false;

function initEchartsPie() {
    require.config({
        paths: {
            echarts: 'js/echarts'// 这里是你引用的echarts文件的路径
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec) {
            echartsInstance = ec;
            echartsInit = true;
        }
    );
}

(function (doc, win) {
    'use strict';
    initEchartsPie();
    //  setTimeout("initChart()",100);
    /*    setInterval('initChart()',300000);*/
})(document, window);
