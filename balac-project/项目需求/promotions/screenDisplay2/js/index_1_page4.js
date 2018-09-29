
// 图表菜单数据
var page4_menus = [
    {menu_object: null, name: 'page4_menus', chart: null, chart_id: 'page4-bar-1', menu_id: 'page4-menu-1', index: 0, count: 3, interval_id: null, data: ['3C连锁','全国商超','TOP门店','旗舰店','渠道门店','电商ECM'] },
];

var factor = winFactor;
var labelFS = 28*factor;
var valFS = 18*factor;
var hasData = false;
var hasClick = false;
var lastTime = '';

function getBarPage4(id,data3,barIndex,line) {

    var colors = ['#062edc', '#1ba6f6'];
    var x_width = 160*winFactor;
    var x2_width = 60*winFactor;
    if (barIndex == 0) {
        x_width=  260*winFactor;
        x2_width = 140*winFactor;
    } else {
        x2_width = 220*winFactor;
        x_width = 260*winFactor;
    }

    var barDataList = [];
    // bar
    var dataList = [];
    for (var d = 0; d < data3[1].length; d++) {
        var item = {};
        if (d == 0) {
            item.labels = data3[0];
        }
        item.values = data3[1][d];
        dataList.push(item);
    }
    barDataList.push(dataList);
    // line
    dataList = [];
    for (var l = 0; l < line.length; l++) {
        var item = {};
        item.values = line[l];
        dataList.push(item);
    }
    if (dataList.length > 0) {
        barDataList.push(dataList);
    }

    // 菜单
    var chart = commonGetBar(id, colors, null, x_width, x2_width, barDataList);
    if (barIndex < page4_menus.length) {
        var menu_index = barIndex;
        page4_menus[menu_index].count = barDataList[0].length;
        page4_menus[menu_index].chart = chart;

        // 有效数据
        if (barDataList.length > 0) {
            // 初始化菜单
            page4_menus[menu_index].menu_object.init();
            page4_menus[menu_index].menu_object.selectMenuIndex(0);
        }
    }
}

function Page4_getScatter(id) {
    var page4_showLabel = ['中央','冰箱','环电','家用','洗衣机','生活','厨电','热水器'];
    //记录最小最大同比值  为百分值
    /* var minYoyData = 100;
     var maxYoyData = -100;*/
    var dataValue = [];

    if (service_collection[SI_DepartmentSaleStock].data != null && service_collection[SI_DepartmentSaleStock].data[0].length > 0) {
        var listData = service_collection[SI_DepartmentSaleStock].data[0];
        if (listData != null) {
            for(var j=0; j<page4_showLabel.length; j++) {
                for(var i=0; i<listData.length;i++) {
                    if (listData[i].shipment_type == '0') {
                        if (listData[i].bd_name == page4_showLabel[j]) {
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
    var x2_width = 180*winFactor;
    var lineClrList = ['#1272eb','#0e5be6','#0732dd','#1ba2f6'];
    var textClrList = ['#0838de','#1a9bf4','#0838de','#1a9bf4'];
    var axisName = ['进度(%)','同比(%)'];
    var toolTipFormat = '同比 ：{0}% <br/> 进度：{1}% ';
    var myChart = commonGetScatter(id,page4_showLabel,dataValue,x_width,x2_width,lineClrList,textClrList,axisName,toolTipFormat,46*winFactor, 3);

    return myChart;
}

function Page4_initChart(data3,data4,dataLine,dataLine2){
    getBarPage4('page4-bar-1',data3,0,dataLine);
    getBarPage4('page4-bar-2',data4,1,dataLine2)
    Page4_getScatter('ScatterPage4');
}

function page4_channel(data,dataLine){
    getBarPage4('page4-bar-1',data,0,dataLine);
}

function page4_entry(dataInit) {

    // setTimeout("initChart()",500);
    if (dataInit) {
        page4_stop_animate();
        page4_initData();
    } else {
        // 从头开始播放
        for (var i = 0; i < page4_menus.length; i++) {
            if (page4_menus[i].menu_object != null) {
                page4_menus[i].menu_object.selectMenuIndex(0);
            }
        }
        refreshLastUpdateTime();
    }
}

function page4_initData(){
    if(!page4_isDataReady()){
        setTimeout(function () {
            page4_initData();
        }, 500);
    } else {
        for (var i = 0; i < page4_menus.length; i++) {
            if (page4_menus[i].menu_object == null)
                page4_menus[i].menu_object = new newScrollMenu(page4_menus[i], i);
        }

        if (service_collection[SI_EPDData].data.length > 1) {
            $('.ab-stock').html(dealHmillion(dealPlus(service_collection[SI_EPDData].data[1].amt) || 0, true));
        }
        $('.ab-distribution').html(dealHmillion(dealPlus(service_collection[SI_EPDData].data[0].amt)|| 0, true));

        // console.log(service_collection[SI_DepartmentSaleStock].data[0], service_collection[SI_DistrData].data);
        hasData = true;
        var saleName = [],
            saleHas = [],
            saleYoy = [],
            saleData = service_collection[SI_DepartmentSaleStock].data[0],
//            stockData = service_collection[SI_DepartmentSaleStock].data[1],
            stockData = service_collection[SI_InvProData].data,
            DistrData = service_collection[SI_DistrData].data;
            saleAll = []
            saleInData = [];

        $('.ab-goods').html(dealTThousand(saleData[1].ytd_amt, true) || 0);

        for(var j = 0;j<saleData.length;j++) {
            if(saleData[j].shipment_type === '1'){
                saleInData.push(saleData[j]);
            }
        }

        saleInData = saleInData.slice(1,9);

        for(var j = 0;j<saleData.length;j++) {
            if(saleData[j].shipment_type === '0'){
                saleYoy.push((saleData[j].ytd_amt_yoy));
                saleHas.push((saleData[j].ytd_amt_roc));
            }
            else if(saleData[j].shipment_type === '1'){
                saleAll.push((saleData[j]))
            }
        }

        saleAll = saleAll.slice(1,11);

   //     console.log(stockData,saleAll);
        var stockPage4 = [],
            stockPage4Name = [],
            stockPage4Val = [];

        for(var i = 0; i <stockData.length; i++ ){
            if(stockData[i].bd_code != undefined) {
                stockPage4.push(stockData[i]);
            }
        }

     //   console.log(stockPage4);

        // 库存比 (公式: 库存/内销年度目标)
        var page4Line2 = [];
        for(var i = 0; i <stockPage4.length; i++ ){
            stockPage4Name.push(stockPage4[i].bd_name);
            if (stockPage4[i].amt > -10000) {
                page4Line2.push(stockPage4[i].amt / (parseInt(saleAll[i].ytd_amt_p) * 10000));
                stockPage4Val.push(Math.floor(stockPage4[i].amt / 10000));
            }
            else { // 数据非法
                page4Line2.push(0);
                stockPage4Val.push(0);
            }
        }

        stockPage4 = [
            stockPage4Name,[stockPage4Val]
        ];

        // 分销提货比 (公式: 分销数/内销累计)
        var page4Line = [[], []];
        var page4threeVal = [[], []];
        var page4threeName = [];
            for(var k = 0; k <DistrData.length; k++ ){
            page4threeName.push(DistrData[k].bd_name);
            var value = 0;
            var value2 = 0;
            for (var j = 0; j < saleInData.length; j++) {
                if (DistrData[k].bd_code == saleInData[j].bd_code) {
                    value = parseInt(DistrData[k].ytd_cny_amt) / (parseInt(saleInData[j].ytd_amt) * 10000);
                    value2 = parseInt(DistrData[k].mtd_cny_amt) / (parseInt(saleInData[j].mtd_amt) * 10000);
                    break;
                }
            }
            page4Line[0].push(value);
            page4Line[1].push(value2);
            page4threeVal[0].push(dealTThousand(DistrData[k].ytd_cny_amt));
            page4threeVal[1].push(dealTThousand(DistrData[k].mtd_cny_amt));
        }

   //     console.log(page4Line);

        page4three = [
            page4threeName,page4threeVal
        ];

   //     console.log(sanData);

        Page4_initChart(page4three,stockPage4,page4Line,[page4Line2]);

        refreshLastUpdateTime();
    }
}

function page4_stop_animate() {
    for (var i = 0; i < page4_menus.length; i++) {
        clearInterval(page4_menus[i].interval_id);
        page4_menus[i].interval_id = null;
    }
}
// 关闭页面
function page4_exit() {
    page4_stop_animate();
}

$(document).ready(function() {

    $('.page4-menu').bind('click', function (e) {
        e = e||event;
        stopFunc(e);
    });

    $('.page4-menu li').bind('click', function (e) {
        if(page4_isDataReady()) {

            for (var i = 0; i < page4_menus.length; i++) {
                if ($(this).parent()[0].id == $('#' + page4_menus[i].menu_id)[0].id) {
                    page4_menus[i].menu_object.selectMenuIndex($(this).index());
                    break;
                }
            }
        }
        e = e||event;
        stopFunc(e);
    });

});

// 判断当前页面的数据是否就绪
function page4_isDataReady() {
    return (service_collection[SI_DepartmentSaleStock].data != null && service_collection[SI_DistrData].data != null && service_collection[SI_InvProData].data != null);
}

