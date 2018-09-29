// 菜单中可见项的个数
var index3_showLines = 6;
// 菜单数据
var index3_menus = [
    {menu_object: null, name: 'index3_menus', chart: null, chart_id: 'index3-radar-1', menu_id: 'index3-menu-1', index: 0, count: 12, interval_id: null, options: {showLines:index3_showLines,scrollNum:2,showIndex: 0}, data: []},
    {menu_object: null, name: 'index3_menus', chart: null, chart_id: 'index3-scatter-1', menu_id: 'index3-menu-2', index: 0, count: 12, interval_id: null, options: {showLines:index3_showLines,scrollNum:2,showIndex: 0}, data: []},
    {menu_object: null, name: 'index3_menus', chart: null, chart_id: 'index3-pie-1', menu_id: 'index3-menu-3', index: 0, count: 6, interval_id: null, options: {showLines:index3_showLines,scrollNum:2,showIndex: 0}, data: []},
];
var index3_menu_0 = 0;
var index3_menu_1 = 1;
var index3_menu_2 = 2;

var radarCommpany = [];
var scatterCommpany = [];


function createMenu(menuList,menu_index) {
    //菜单项创建
    var menu = $('#' + index3_menus[menu_index].menu_id);
    var oldlen = $("li", menu).length;
    if ($("li:eq(0)",menu).html().length == 0) {
        for (var i = 0; i < menuList.length; i++) {
            $("li:eq(" + i + ")", menu).each(function () {
                $(this).html(menuList[i]);
            })
        }
        /*
         for (var i = oldlen; i < barDataList2.length; i++) {
         var li = '<li>' + barDataList2[i].name + '</li';
         menu.append(li);
         }
         */
        index3_menus[menu_index].count = menuList.length;
    }

}


function index3_GetScatter(id) {
    var x_width =200*winFactor;
    var x2_width = 110*winFactor;
    var menuList = [];//菜单列表
    var dataValue = [];//所有数据，三维数组
    var dataMaxValue = [];//只记录最大值最小值的数据
    var company = [];//公司列表
    scatterCommpany=[];

    for(var i=0; i<STAR_PRODUCT_CATEGORY_TABLE.length; i++) {
        var product_category = STAR_PRODUCT_CATEGORY_TABLE[i];
        company.push(product_category.brand_online);
    }

    /********点过滤前**********/
    //所有分类的蓝色显示数据
    var data1ListPre = [];
    //所有分类的红色显示数据
    var data2ListPre = [];
    //所有分类的黄色显示数据
    var data3ListPre = [];
    for(var n=0; n<service_collection[SI_StarProductLayout].data.length; n++) {
        if (service_collection[SI_StarProductLayout].data[n] != null && service_collection[SI_StarProductLayout].data[n].data != null) {
            menuList.push(service_collection[SI_StarProductLayout].data[n].category);
            //目前hardcode三间公司 美的为其中一间
            var data1 = [];
            var data2 = [];
            var data3 = [];
            var data1_max = [0,0];//记录x,y轴各自的最大值
            var data2_max = [0,0];
            var data3_max = [0,0];
            var maxCount =100;//限制界面显示个数
            for(var i=0; i<service_collection[SI_StarProductLayout].data[n].data.length; i++) {
                var dataEva = service_collection[SI_StarProductLayout].data[n].data[i];
                for(var j=0; j<company[n].length;j++) {
                    if (dataEva['l'] == company[n][j]) {
                        var v1 = dataEva['v1'];
                        var v2 = dataEva['v2'];
                        switch (j) {
                            case 0:
                                if (data1.length < maxCount) {
                                    data1_max[0] = Math.max(data1_max[0],v1);
                                    data1_max[1] = Math.max(data1_max[1],v2);
                                    data1.push([v1,v2]);
                                }
                                break;
                            case 1:
                                if (data2.length < maxCount) {
                                    data2_max[0] = Math.max(data2_max[0],v1);
                                    data2_max[1] = Math.max(data2_max[1],v2);
                                    data2.push([v1, v2]);
                                }
                                break;
                            case 2:
                                if (data3.length < maxCount) {
                                    data3_max[0] = Math.max(data3_max[0],v1);
                                    data3_max[1] = Math.max(data3_max[1],v2);
                                    data3.push([v1,v2]);
                                }
                                break;
                        }
                        break;
                    }
                }
            }
            //所有蓝色点
            data1ListPre.push(data1);
            //粉红色点
            data2ListPre.push(data2);
            //黄色点
            data3ListPre.push(data3);
            //设置最大值最小值的散点数据
            var oneTimeDataMax = [];
            var data1Max = [];
            data1Max.push([data1_max[0],0]);
            data1Max.push([0,data1_max[1]]);
            var data2Max = [];
            data2Max.push([data2_max[0],0]);
            data2Max.push([0,data2_max[1]]);
            var data3Max = [];
            data3Max.push([data3_max[0],0]);
            data3Max.push([0,data3_max[1]]);
            oneTimeDataMax.push(data1Max);
            oneTimeDataMax.push(data2Max);
            oneTimeDataMax.push(data3Max);
            dataMaxValue.push(oneTimeDataMax);
        }
    }

    scatterCommpany=company;
    createMenu(menuList,index3_menu_1);
    //数组个数全部一样
    var y_maxValue = [];
    var y_minValue = [];
    var x_maxValue = [];
    var x_minValue = [];
    //获取坐标轴的最大值最小值数据
    precCommonGetScatter2(id,dataMaxValue,x_width,x2_width,menuList,y_maxValue,y_minValue,x_maxValue,x_minValue);
    /*******************去除密集点***********/
    //点太多会造成图表切换动画失效
    //所有分类的蓝色显示数据
    var data1List= [];
    //所有分类的红色显示数据
    var data2List = [];
    //所有分类的黄色显示数据
    var data3List = [];
    for(var i=0; i<data1ListPre.length; i++) {
        var data1Temp = [];
        var data2Temp = [];
        var data3Temp = [];
        var dataBreak = [(x_maxValue[i]-x_minValue[i])*0.1 + x_minValue[i],(y_maxValue[i]-y_minValue[i])*0.1 + y_minValue[i]];

        for(var j=0; j<data1ListPre[i].length; j++) {
          /*  if (data1ListPre[i][j][0] < dataBreak[0] || data1ListPre[i][j][1] < dataBreak[1]) {
                if(j%4 != 0) {
                    data1Temp.push(data1ListPre[i][j]);
                }
            } else {
                data1Temp.push(data1ListPre[i][j]);
            }*/
            data1Temp.push(data1ListPre[i][j]);
        }
        for(var j=0; j<data2ListPre[i].length; j++) {
           /* if (data2ListPre[i][j][0] < dataBreak[0] || data2ListPre[i][j][1] < dataBreak[1]) {
                if(j%4 != 0) {
                    data2Temp.push(data2ListPre[i][j]);
                }
            } else {
                data2Temp.push(data2ListPre[i][j]);
            }*/
            data2Temp.push(data2ListPre[i][j]);
        }
        for(var j=0; j<data3ListPre[i].length; j++) {
           /* if (data3ListPre[i][j][0] < dataBreak[0] || data3ListPre[i][j][1] < dataBreak[1]) {
                if(j%4 != 0) {
                    data3Temp.push(data3ListPre[i][j]);
                }
            } else {
                data3Temp.push(data3ListPre[i][j]);
            }*/
            data3Temp.push(data3ListPre[i][j]);
        }
        data1List.push(data1Temp);
        data2List.push(data2Temp);
        data3List.push(data3Temp);
    }
    //同种颜色的点必须在每个option中都一样，不然动画切换时会了现多余点，造成显示错乱
    //点[0,0]不会显示
    var data1ListMaxCount = 0;
    var data2ListMaxCount = 0;
    var data3ListMaxCount = 0;
    for(var i =0; i<data1List.length; i++) {
        data1ListMaxCount = Math.max(data1ListMaxCount,data1List[i].length);
        data2ListMaxCount = Math.max(data2ListMaxCount,data2List[i].length);
        data3ListMaxCount = Math.max(data3ListMaxCount,data3List[i].length);
    }
    //设置显示散点的真正数据
    for(var i =0; i<data1List.length; i++) {
        var tempCount = data1ListMaxCount - data1List[i].length;
        if (tempCount > 0) {
            for(var tempIndex=0; tempIndex<tempCount; tempIndex++) {
                data1List[i].push([0,0]);
            }
        }
        tempCount = data2ListMaxCount - data2List[i].length;
        if (tempCount > 0) {
            for(var tempIndex=0; tempIndex<tempCount; tempIndex++) {
                data2List[i].push([0,0]);
            }
        }
        tempCount = data3ListMaxCount - data3List[i].length;
        if (tempCount > 0) {
            for (var tempIndex = 0; tempIndex < tempCount; tempIndex++) {
                data3List[i].push([0, 0]);
            }
        }
        var oneTimeData = [];
        oneTimeData.push(data1List[i]);
        oneTimeData.push(data2List[i]);
        oneTimeData.push(data3List[i]);
        dataValue.push(oneTimeData);
    }

    return commonGetScatter2(id,dataValue,x_width,x2_width,menuList,y_maxValue,y_minValue,x_maxValue,x_minValue);
}

function index3_getPie(id) {
    var colors = ['#7411fb', '#5a0ac2'];
    var colors2 = ['#cb5bfc', '#a123d8'];
    var pieDataValues = [];
    var menu_index = 0;

    var categories = [];
    if (id.toString().indexOf('-1') > 0) {
        var count = 0;

        var dataList = service_collection[SI_StarMarketShare].data;
        for (var channel = 0; channel < dataList.length; channel++) {
            // 分类名
            categories[channel] = limitString(dataList[channel].category, show_name_length);

            // 单元项
            var channelData = [];
            pieDataValues.push(channelData);
            for (var n = 0; n < dataList[channel].data.length; n++) {
                var data = {};
                data.name = limitString(dataList[channel].data[n].brand_show, show_name_length);
                data.value = parseFloat(dataList[channel].data[n].sale_volume);
                channelData.push(data);
            }
        }

        menu_index = index3_menu_2;
        index3_menus[menu_index].count = service_collection[SI_StarMarketShare].data.length;
    }

    var chart = null;
    if (pieDataValues.length > 0) {
        chart = commonGetPie(id, colors, colors2, pieDataValues, true, '{b} {d}%');

        // 创建菜单
        if (menu_index == index3_menu_2) {
            var menu = $('#' + index3_menus[menu_index].menu_id);
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
    }

    return chart;
}


// 格式化日期字符串
function index3_formatDateString(date) {
    return date.getFullYear().toString() + '.' + formatMin(parseInt(date.getMonth() + 1).toString()) + '.' + formatMin(date.getDate()) + '\r\n ' + formatMin(date.getHours()) + ':' + formatMin(date.getMinutes()) + ':' + formatMin(date.getSeconds());
}



function index3_GetTable(id,idHead) {
    var classSplit = '\"table-body-tr-border table-split-bg\"';
    var classNormal = '\"table-body-tr-border\"';
    var template =
'<tr class={6}>\
        <td><div>{0}</div> <div style="color: rgb(168,168,168)">{1}</div></td>\
        <td>{2}</td>\
        <td><div>{3}</div><div>{4}</div></td>\
    <td class="txt-left">{5}</td>\
        </tr>';
    var idStr = '#' + id;
    $(idStr).empty();
    $('#'+idHead).empty();
    var commentCount = service_collection[SI_StarLatestCommentst].data.length;
    var list = [];
    if (commentCount > 0) {
        list = service_collection[SI_StarLatestCommentst].data;
    }
    for(var i=0; i<list.length && i < 100; i++) {
        var dataTemp =   list[i];
        var from = dataTemp.source;
        var shopName = dataTemp.shopname;
        var createDate = new Date(dataTemp.createdAt);
        var time1 = index3_formatDateString(createDate);
        /*var product = dataTemp.category + dataTemp.model;*/
        var text = dataTemp.text;
        var temp;
        if (i % 2 == 0) {
            temp= template.format(from,shopName,time1,dataTemp.category,dataTemp.model,text,classSplit);
        } else {
            temp= template.format(from,shopName,time1,dataTemp.category,dataTemp.model,text,classNormal);
        }
        $(idStr).append(temp);
        $('#'+idHead).append(temp);
    }
    updateTableHead();


}


function index3_GetRadar(id) {
    //show label的值与datavalue的个数相对应
    var showLabel = [];
    var dataValue = [];
    var x_width =110*winFactor;
    var x2_width = 110*winFactor;
    //company 和menulist,showlabel数量相等
    var company = [];
    radarCommpany = company;
    var menuList = [];
    var maxValue = 5;
    for(var n=0; n<service_collection[SI_StarOnlineEvaluation].data.length; n++) {
        var evaluationData = service_collection[SI_StarOnlineEvaluation].data[n];
        if (evaluationData != null) {
            menuList.push(evaluationData.category);
            company.push(evaluationData.brand);//brand为数组
            var oneTimeData = [];
            var onTimeLabel = [];
            for(var i=0; i<evaluationData.brand.length; i++) {
            }
            var dataTemp1 = [];// 目前限定只有两间公司比较，其中一个是美的
            var dataTemp2 = [];
            for(var j=0; j<evaluationData.scores.length; j++) {
                onTimeLabel.push(evaluationData.scores[j].name);
                for(var k=0; k<evaluationData.scores[j].values.length; k++) {
                    if (k==0) {
                        dataTemp1.push(evaluationData.scores[j].values[k]);
                    } else if (k == 1) {
                        dataTemp2.push(evaluationData.scores[j].values[k]);
                    }
                }
            }
            oneTimeData.push(dataTemp1);
            oneTimeData.push(dataTemp2);

            showLabel.push(onTimeLabel);
            dataValue.push(oneTimeData);
        }
    }
    createMenu(menuList,index3_menu_0);
    radarCommpany = company;
    // dataValue 三层数据
     return commonGetRadar(id,showLabel,maxValue,dataValue,x_width,x2_width,menuList);
}

function index3_initData(){
    if(!index3_isDataReady()){
        setTimeout(function () {
            index3_initData();
        }, 500);
    } else {
        index3_menus[index3_menu_0].chart = index3_GetRadar('index3-radar-1');
        index3_menus[index3_menu_1].chart = index3_GetScatter('index3-scatter-1');
        index3_menus[index3_menu_2].chart = index3_getPie('index3-pie-1');
        index3_GetTable('index3-table-1','index3-table-2');

        index3_menus[index3_menu_0].menu_object.init();
        index3_menus[index3_menu_0].menu_object.selectMenuIndex(0);

        index3_menus[index3_menu_1].menu_object.init();
        index3_menus[index3_menu_1].menu_object.selectMenuIndex(0);

        index3_menus[index3_menu_2].menu_object.init();
        index3_menus[index3_menu_2].menu_object.selectMenuIndex(0);
        refreshLastUpdateTime();
    }
}
function index3_entry(dataInit) {
    initScrollMenu();
    if (dataInit) {
        index3_initData();
    } else {
        refreshLastUpdateTime();
        for (var i = 0; i < index3_menus.length; i++) {
            if (index3_menus[i].menu_object != null) {
                index3_menus[i].menu_object.selectMenuIndex(0);
            }
        }
    }
    startmarquee('index3-table-div','index3-table-1',50,500);
}

function menu_index_change(index) {
    if (index == index3_menu_0) {
        var menuIndex = index3_menus[index3_menu_0].index;
        if (radarCommpany.length > 0 && menuIndex < radarCommpany.length) {
            if (radarCommpany[menuIndex].length >1 ) {
                $('#index3_menu0_label0').html(radarCommpany[menuIndex][0]);
                $('#index3_menu0_label1').html(radarCommpany[menuIndex][1]);
            }
        }
    } else if (index == index3_menu_1) {
        var menuIndex = index3_menus[index3_menu_1].index;
        if (scatterCommpany.length > 0 && menuIndex < scatterCommpany.length) {
            if (scatterCommpany[menuIndex].length >1 ) {
                $('#index3_menu1_label0').html(scatterCommpany[menuIndex][0]);
                $('#index3_menu1_label1').html(scatterCommpany[menuIndex][1]);
                $('#index3_menu1_label2').html(scatterCommpany[menuIndex][2]);
            }
        }

    }
}

function initScrollMenu() {
    //初始化scrollMenu
    for (var i = 0; i < index3_menus.length; i++) {
        if (index3_menus[i].menu_object == null) {
            index3_menus[i].menu_object = new newScrollMenu(index3_menus[i],i,menu_index_change);
        }
    }
}

function index3_exit() {
    index3_stop_animate();
    stopmarquee('index3-table-div','index3-table-1');
}
function index3_stop_animate() {
    for (var i = 0; i < index3_menus.length; i++) {
        if (index3_menus[i].interval_id != null) {
            clearInterval(index3_menus[i].interval_id);
            index3_menus[i].interval_id = null;
        }
    }
}

function index3_isDataReady() {
    if (service_collection[SI_StarOnlineEvaluation].data != null &&
        service_collection[SI_StarProductLayout].data != null &&
        service_collection[SI_StarMarketShare].data != null &&
        service_collection[SI_StarLatestCommentst].data != null
    ){
        return true;
    }
    return false
}

$(document).ready(function() {
    'use strict';

    $('.index3-menu').bind('click', function (e) {
        e = e||event;
        stopFunc(e);
    });
    $('.index3-menu').mousewheel(function (event, delta, deltaX, deltaY) {
        for (var i = 0; i < index3_menus.length; i++) {
            if ($(this)[0].id == $('#' + index3_menus[i].menu_id)[0].id) {
                index3_menus[i].menu_object.onMouseWheel(deltaY);
                break;
            }
        }
    });
    $('.index3-menu li').bind('click', function (e) {
        if(index3_isDataReady()) {
            for (var i = 0; i < index3_menus.length; i++) {
                if ($(this).parent()[0].id == $('#' + index3_menus[i].menu_id)[0].id) {
                    index3_menus[i].menu_object.selectMenuIndex($(this).index());
                    break;
                }
            }
        }
        e = e||event;
        stopFunc(e);
    });
});



