/**
 * @file 控制所有数据处理
 * @author ex_hujie
 * @version 1.0.1 - 2015-10-22
 */


// 渠道代号
var CHANNEL_TABLE = [
    {id:999, name:'总体'},
    {id:1, name:'3C连锁'},
    {id:2, name:'全国商超'},
    {id:3, name:'TOP门店'},
    {id:4, name:'旗舰店'},
    {id:5, name:'渠道门店'},
    {id:901, name:'电商ECM'},
];

// 外销中的区域分类表
// regionAreaWid: 区域id
// region_area: 区域名
var EXP_REGION_TABLE = [
    {region_area_wid:-999, region_area:'总体'},
    {region_area_wid:3529,region_area:'东亚'},
    {region_area_wid:3530,region_area:'东盟'},
    {region_area_wid:3531,region_area:'南亚'},
    {region_area_wid:3532,region_area:'中亚'},
    {region_area_wid:3533,region_area:'中东'},
    {region_area_wid:3534,region_area:'大洋洲'},
    {region_area_wid:3535,region_area:'西北欧'},
    {region_area_wid:3536,region_area:'东南欧'},
    {region_area_wid:3537,region_area:'非洲'},
    {region_area_wid:3538,region_area:'北美'},
    {region_area_wid:3539,region_area:'拉美'}
];

// 外销中的产品分类表
// prod_category: 产品分类名
// prod_category_wid: 产品分类id
var EXP_PRODUCT_CATEGORY_TABLE = [
    {prod_category:'冰箱',prod_category_wid:58423},
    {prod_category:'净水机',prod_category_wid:58429},
    {prod_category:'单头炉',prod_category_wid:58435},
    {prod_category:'吸尘器',prod_category_wid:58441},
    {prod_category:'多头炉',prod_category_wid:58447},
    {prod_category:'多联机',prod_category_wid:58453},
    {prod_category:'微波炉',prod_category_wid:58459},
    {prod_category:'洗碗机',prod_category_wid:58465},
    {prod_category:'洗衣机',prod_category_wid:58471},
    {prod_category:'热水器',prod_category_wid:58477},
    {prod_category:'电暖器',prod_category_wid:58483},
    {prod_category:'电水壶',prod_category_wid:58489},
    {prod_category:'电热水器',prod_category_wid:58495},
    {prod_category:'电风扇',prod_category_wid:58501},
    {prod_category:'电饭锅',prod_category_wid:58507},
    {prod_category:'空调',prod_category_wid:58513},
    {prod_category:'空调压缩机',prod_category_wid:58519},
    {prod_category:'节能灯',prod_category_wid:58525},
    {prod_category:'饮水机',prod_category_wid:58531},
];

// 观星台中的品牌分类
var STAR_BRAND_TABLE = ['美的', '海尔', '格力'];

// 观星台中的产品分类表
// category: 产品分类名
// category_wid: 产品分类id
// brand_online: 线上评价对应的几个品牌
// criteria: 产品指标  (一个指标: {first:'一级指标', second:['二级指标1', '二级指标2', ...]})
var STAR_PRODUCT_CATEGORY_TABLE = [
    {category:'电热水器',category_wid:1,brand_online:[],criteria:[]},
    {category:'燃热水器',category_wid:2,brand_online:[],criteria:[]},
    {category:'净水机',category_wid:3,brand_online:[],criteria:[]},
    {category:'净饮机',category_wid:4,brand_online:[],criteria:[]},
    {category:'饮水机',category_wid:5,brand_online:[],criteria:[]},
    {category:'电饭煲',category_wid:6,brand_online:[],criteria:[]},
    {category:'抽油烟机',category_wid:7,brand_online:[],criteria:[]},
    {category:'电磁炉',category_wid:8,brand_online:[],criteria:[]},
    {category:'微波炉',category_wid:9,brand_online:[],criteria:[]},
    {category:'燃气灶',category_wid:10,brand_online:[],criteria:[]},
    {category:'果汁机',category_wid:11,brand_online:[],criteria:[]},
    {category:'油汀',category_wid:12,brand_online:[],criteria:[]},
//    {category:'对衡式',category_wid:13,brand_online:[],criteria:[]},
//    {category:'烟灶套装',category_wid:14,brand_online:[],criteria:[]},
//    {category:'电压力锅',category_wid:15,brand_online:[],criteria:[]},
//    {category:'豆浆机',category_wid:16,brand_online:[],criteria:[]},
//    {category:'电水壶',category_wid:17,brand_online:[],criteria:[]},
//    {category:'挂烫机',category_wid:18,brand_online:[],criteria:[]},
//    {category:'煎烤机',category_wid:19,brand_online:[],criteria:[]},
];

// 观星台中的平台分类
var STAR_PLATFORM_TABLE = [
    {platform:'天猫',platform_id:1},
    {platform:'淘宝',platform_id:2},
    {platform:'京东',platform_id:3},
    {platform:'苏宁',platform_id:4},
    {platform:'国美',platform_id:5},
];

// 检查日期是否过期了
function checkDateExpired(date) {
    var expired = false;

    if (false) {
        // 按日期比较
        var current_date = getDateNowString();
        //    var current_date = '20151021';
        if (date == null || current_date > date) {
            expired = true;
        }
    }
    else {
        // 不比较,总是过期
        expired = true;
    }

    return expired;
}

// 本地存储数据
var storage = window.localStorage;

/**
 * 检查数据是否有改变
 *
 * @param service
 * @param newData
 */
function checkDataDirty(oldData, newData) {
    var dirty = false;

    if (newData != null) {
        if (oldData == null) {
            dirty = true;
        }
        else {
            var oldDataString = JSON.stringify(oldData);
            var newDataString = JSON.stringify(newData);
            if (oldDataString != newDataString) {
/*
                if (true) {
                    // 测试使用,判断哪个位置不同
                    var nDiff = 0;
                    for (var n = 0; n < newDataString.length; n++) {
                        if (oldDataString[n] != newDataString[n]) {
                            nDiff = n;
                            break;
                        }
                    }
                }
*/
                dirty = true;
            }
        }
    }

    return dirty;
}

/**
 * 处理观星台数据
 * @param data
 */
function handleStarData(data) {
    var newData = data;

    // 加上产品类别
    if (newData.length == STAR_PRODUCT_CATEGORY_TABLE.length) {
        for (var n = 0; n < STAR_PRODUCT_CATEGORY_TABLE.length; n++) {
            newData[n].category = STAR_PRODUCT_CATEGORY_TABLE[n].category;
        }
    }

    return newData;
}

/**
 * 处理观星台的线上评价数据
 * @param data
 */
function handleStarOnlineEvaluationData(data) {
    var newData = [];

    for (var n = 0; n < data.length; n++) {
        var online = {};

        // 产品分类
        online.category = STAR_PRODUCT_CATEGORY_TABLE[n].category;

        // 品牌
        online.brand = [];
        for (var b = 0; b < STAR_PRODUCT_CATEGORY_TABLE[n].brand_online.length; b++) {
            online.brand.push(STAR_PRODUCT_CATEGORY_TABLE[n].brand_online[b]);
        }

        // 评价得分
        online.scores = [];
        for (var b = 0; b < STAR_PRODUCT_CATEGORY_TABLE[n].brand_online.length; b++) {
            if (data[n].data === undefined || !data[n].data.hasOwnProperty(STAR_PRODUCT_CATEGORY_TABLE[n].brand_online[b]))
                continue;

            var brandData = data[n].data[STAR_PRODUCT_CATEGORY_TABLE[n].brand_online[b]];
            for (var c = 0; c < STAR_PRODUCT_CATEGORY_TABLE[n].criteria.length; c++) {
                var scoreItem = {};
                if (b > 0) {
                    scoreItem = online.scores[c];
                }
                var count = 0;
                var total = 0;
                for (var s = 0; s < STAR_PRODUCT_CATEGORY_TABLE[n].criteria[c].second.length; s++) {
                    var cate = brandData[STAR_PRODUCT_CATEGORY_TABLE[n].criteria[c].second[s]];
                    if (cate !== undefined) {
                        count++;
                        total += cate.score;
                    }
                }
                if (b == 0) {
                    scoreItem.name = STAR_PRODUCT_CATEGORY_TABLE[n].criteria[c].first;
                    scoreItem.values = [];

                    online.scores.push(scoreItem);
                }

                if (scoreItem.values !== undefined) {
                    if (count > 0)
                        scoreItem.values.push(total / count);
                    else
                        scoreItem.values.push(0);
                }
            }
        }

        newData.push(online);
    }

    return newData;
}

/**
 * 处理观星台的最新评论数据
 * @param data
 */
function handleStarLatestCommentstData(data) {
    var newData = [];
    var datum= JSON.parse(data.data);

    for (var d = 0; d < datum.length; d++) {
        // 评论字数长度要大于10
        if (datum[d].text !== undefined && datum[d].text.length > 10) {
            var item = {};
            item.source = datum[d].source;
            item.shopname = datum[d].shopname;
            item.createdAt = datum[d].createdAt;
            item.category = datum[d].category;
            item.model = datum[d].model;
            item.text = datum[d].text;

            newData.push(item);
        }
    }

    return newData;
}

/**
 * 处理观星台的厂家产品排名表数据
 * @param data
 */
function handleStarCompanyProductTableData(data) {
    // 初始化数据
    for (var n = 0; n < STAR_PRODUCT_CATEGORY_TABLE.length; n++) {
        STAR_PRODUCT_CATEGORY_TABLE[n].brand_online = [];
    }

    // 分析数据
    for (var n = 0; n < STAR_PRODUCT_CATEGORY_TABLE.length; n++) {
        for (var d = 0; d < data.data.length; d++) {
            var value = data.data[d][STAR_PRODUCT_CATEGORY_TABLE[n].category];
            if (value !== undefined && value != null && value.length > 0) {
                var values = value.split(',');
                STAR_PRODUCT_CATEGORY_TABLE[n].brand_online.push(STAR_BRAND_TABLE[0]);
                STAR_PRODUCT_CATEGORY_TABLE[n].brand_online.push(values[0]);
                if (value.length > 1)
                    STAR_PRODUCT_CATEGORY_TABLE[n].brand_online.push(values[1]);
                break;
            }
        }
    }

    return data;
}

/**
 * 处理观星台的产品评价表数据
 * @param data
 */
function handleStarProductCriteriaTableData(data) {
    var newData = data;

    // 分析数据
    for (var n = 0; n < STAR_PRODUCT_CATEGORY_TABLE.length; n++) {
        STAR_PRODUCT_CATEGORY_TABLE[n].criteria = [];
        if (n == 0) {
            for (var d = 0; d < data.length; d++) {
                var first = data[d].fst_idc;
                var second = data[d].snd_idc;
                var found = false;
                for (var f = 0; f < STAR_PRODUCT_CATEGORY_TABLE[0].criteria.length; f++) {
                    if (STAR_PRODUCT_CATEGORY_TABLE[0].criteria[f].first === first) {
                        STAR_PRODUCT_CATEGORY_TABLE[0].criteria[f].second.push(second);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    var criteria = {};
                    criteria.first = first;
                    criteria.second = [];
                    criteria.second.push(second);
                    STAR_PRODUCT_CATEGORY_TABLE[0].criteria.push(criteria);
                }
            }
        }
        else {
            for (var f = 0; f < STAR_PRODUCT_CATEGORY_TABLE[0].criteria.length; f++) {
                var criteria = {};
                criteria.first = STAR_PRODUCT_CATEGORY_TABLE[0].criteria[f].first;
                criteria.second = [];
                for (var s = 0; s < STAR_PRODUCT_CATEGORY_TABLE[0].criteria[f].second.length; s++) {
                    criteria.second.push(STAR_PRODUCT_CATEGORY_TABLE[0].criteria[f].second[s]);
                }
                STAR_PRODUCT_CATEGORY_TABLE[n].criteria.push(criteria);
            }

        }
    }

    return newData;
}

/**
 * 处理网络数据
 *
 * @param service
 * @param newData
 */
function handleNewData(service, newData) {
    // 判断是否有改变
    service.dirty = checkDataDirty(service.data, newData);

    // 保存数据
    service.data = newData;
    service.dataReady = true;
    DEBUG(service.data);

    storage.setItem(service.name, JSON.stringify(service.data));

    // 检查是否有其他service依赖当前service的数据,如果有的话,需要调用
    for (var i = 0; i < service_collection.length; i++) {
        var otherService = service_collection[i];
        if (otherService.dependService !== undefined) {
            for (var d = 0; d < otherService.dependService.length; d++) {
                if (otherService.dependService[d] === service.name) {
                    var isOtherServiceReady = true;
                    for (var d2 = 0; d2 < otherService.dependService.length; d2++) {
                        var serviceIndex = getServiceIndex(otherService.dependService[d2]);
                        if (service_collection[serviceIndex].data == null) {
                            isOtherServiceReady = false;
                            break;
                        }
                    }
                    if (isOtherServiceReady && (otherService.data == null || service.dirty)) {
                        otherService.serviceMode(otherService);
                    }

                    break;
                }
            }
        }
    }
}

// 实现服务1
function doServiceMode1(service) {
    service.doService().done(function (data) {
        console.log('ddddddddddddddddddddata from webservice: ' + service.name);

        // 处理获取到的数据
        if (service.handleData != undefined) {
            data = service.handleData(data);
        }

        // 保存数据
        if (data != null) {
            handleNewData(service, data);
        }
    });
}

// 实现服务2
function doServiceMode2(service) {
    service.doService(getDateNowString()).done(function (data) {
        console.log('ddddddddddddddddddddata from webservice: ' + service.name);

        // 处理获取到的数据
        if (service.handleData != undefined) {
            data = service.handleData(data);
        }

        // 保存数据
        handleNewData(service, data);
    });
}

// 实现服务3
function doServiceMode3(service) {
    service.doService(getDateNowString()).done(function (data, data2) {
        console.log('data from webservice: ' + service.name);

        var newData = [];
        newData.push(data[0]);
        newData.push(data2[0]);

        // 处理获取到的数据
        if (service.handleData != undefined) {
            newData = service.handleData(newData);
        }

        // 保存数据
        handleNewData(service, newData);
    });
}

// 实现服务 (6个参数)
function doServiceMode6(service) {
    service.doService().done(function (data, data2, data3, data4, data5, data6) {
        console.log('ddddddddddddddddddddata from webservice: ' + service.name);

        var newData = [];
        newData.push(data[0]);
        newData.push(data2[0]);
        newData.push(data3[0]);
        newData.push(data4[0]);
        newData.push(data5[0]);
        newData.push(data6[0]);

        // 处理获取到的数据
        if (service.handleData != undefined) {
            newData = service.handleData(newData);
        }

        // 保存数据
        handleNewData(service, newData);
    });
}

// 实现服务 (12个参数)
function doServiceMode12(service) {
    service.doService().done(function (data, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12) {
        console.log('ddddddddddddddddddddata from webservice: ' + service.name);

        var newData = [];
        newData.push(data[0]);
        newData.push(data2[0]);
        newData.push(data3[0]);
        newData.push(data4[0]);
        newData.push(data5[0]);
        newData.push(data6[0]);
        newData.push(data7[0]);
        newData.push(data8[0]);
        newData.push(data9[0]);
        newData.push(data10[0]);
        newData.push(data11[0]);
        newData.push(data12[0]);

        // 处理获取到的数据
        if (service.handleData != undefined) {
            newData = service.handleData(newData);
        }

        // 保存数据
        handleNewData(service, newData);
    });
}

// 实现服务 (19个参数)
function doServiceMode19(service) {
    service.doService().done(function (data, data2, data3, data4, data5, data6, data7, data8, data9, data10
        , data11, data12, data13, data14, data15, data16, data17, data18, data19
                            ) {
        console.log('ddddddddddddddddddddata from webservice: ' + service.name);

        // 判断是否有改变
        var newData = [];
        newData.push(data[0]);
        newData.push(data2[0]);
        newData.push(data3[0]);
        newData.push(data4[0]);
        newData.push(data5[0]);
        newData.push(data6[0]);
        newData.push(data7[0]);
        newData.push(data8[0]);
        newData.push(data9[0]);
        newData.push(data10[0]);
        newData.push(data11[0]);
        newData.push(data12[0]);
        newData.push(data13[0]);
        newData.push(data14[0]);
        newData.push(data15[0]);
        newData.push(data16[0]);
        newData.push(data17[0]);
        newData.push(data18[0]);
        newData.push(data19[0]);

        // 处理获取到的数据
        if (service.handleData != undefined) {
            newData = service.handleData(newData);
        }

        // 保存数据
        handleNewData(service, newData);
    });
}

// 定时服务的序号
var SI_DepartmentBack = 0;
var SI_DepartmentSaleStock = 1;
var SI_EPDData = 2;
var SI_DistrData = 3;
var SI_ReChanData = 4;
var SI_CompChanData = 5;
var SI_TotalRetData = 6;
var SI_MonthRetailData = 7;
var SI_PlanData = 8;
var SI_InvProData = 9;
var SI_ExpMthsTrendData = 10;
var SI_ExpSaleRateData = 11;
var SI_ExpShareData = 12;
var SI_ExpMarketShareData = 13;
var SI_StarCompanyProductTable = 14;
var SI_StarProductCriteriaTable = 15;
var SI_StarOnlineEvaluation = 16;
var SI_StarProductLayout = 17;
var SI_StarMarketShare = 18;
var SI_StarLatestCommentst = 19;
/**
 * 定时服务
 *
 * @param name          服务名
 * @param serviceMode   处理服务的方式 (主要是考虑输入和输出参数)
 * @param doService     调用远程服务获取数据
 * @param data          记录获取到的数据
 * @param dependService 依赖某个service的数据 (service序号)
 * @param handleData    获取数据后的处理接口
 * @param dataReady     标识数据是否准备好了
 * @param dirty         标识数据是否变动了
 * @param pagesIndex    数据相关的页面索引 (例如: '#page1,#page2')
  */
var service_collection = [
    // 事业部经营(回款)
    {name: 'HSD_DepartmentBack', serviceMode: doServiceMode2, doService: stockService.getBackDetail, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE2+PAGE_SEP},
    // 事业部经营(销售，库存)
    {name: 'HSD_DepartmentSaleStock', serviceMode: doServiceMode3, doService: stockService.getAllBi, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE2+PAGE_SEP+INDEX_1_PAGE3+PAGE_SEP+INDEX_1_PAGE4+PAGE_SEP},
    // 获取进销存数据
    {name: 'HSD_EPDData', serviceMode: doServiceMode1, doService: stockService.getEPD, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE4+PAGE_SEP},
    // 分销额及分销提货比
    {name: 'HSD_DistrData', serviceMode: doServiceMode1, doService: stockService.getDistr, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE4+PAGE_SEP},
    // 渠道零售额
    {name: 'HSD_ReChanData', serviceMode: doServiceMode1, doService: stockService.getReChan, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE5+PAGE_SEP},
    // 事业部零售额
    {name: 'HSD_CompChanData', serviceMode: doServiceMode1, doService: stockService.getCompChan, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE5+PAGE_SEP},
    // 年度累计零售结构
    {name: 'HSD_TotalRetData', serviceMode: doServiceMode6, doService: stockService.getTotalRet, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1+PAGE_SEP+INDEX_1_PAGE5+PAGE_SEP},
    // 各渠道零售月度趋势
    {name: 'HSD_MonthRetailData', serviceMode: doServiceMode6, doService: stockService.getMonthRetail, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1_PAGE5+PAGE_SEP},
    // 销售和回款的去年年度目标
    {name: 'HSD_PlanData', serviceMode: doServiceMode1, doService: stockService.getPlan, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1_PAGE2+PAGE_SEP},
    // 库存及库存任务比
    {name: 'HSD_InvProData', serviceMode: doServiceMode1, doService: stockService.getInvPro, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_1_PAGE4+PAGE_SEP},

    // 外销月度趋势
    {name: 'HSD_ExpMthsTrendData', serviceMode: doServiceMode12, doService: stockService.getExpMthsTrend, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_2+PAGE_SEP},
    // 外销出口占比
    {name: 'HSD_ExpSaleRateData', serviceMode: doServiceMode1, doService: stockService.getExpSaleRate, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_2+PAGE_SEP},
    // 外销竞品
    {name: 'HSD_ExpShareData', serviceMode: doServiceMode19, doService: stockService.getExpShare, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_2+PAGE_SEP},
    // 外销市场份额
    {name: 'HSD_ExpMarketShareData', serviceMode: doServiceMode19, doService: stockService.getExpMarketShare, data: null, dataReady: false, dirty: false, pagesIndex: INDEX_2+PAGE_SEP},

    // 厂家产品排名表
    {name: 'HSD_StarCompanyProductTable', serviceMode: doServiceMode1, doService: stockService.getStarCompanyProduct, data: null, handleData: handleStarCompanyProductTableData, dataReady: false, dirty: false, pagesIndex: INDEX_3+PAGE_SEP},
    // 产品指标表
    {name: 'HSD_StarProductCriteriaTable', serviceMode: doServiceMode1, doService: stockService.getStarProductCriteria, data: null, handleData: handleStarProductCriteriaTableData, dataReady: false, dirty: false, pagesIndex: INDEX_3+PAGE_SEP},
    // 线上评价概览
    {name: 'HSD_StarOnlineEvaluation', serviceMode: doServiceMode12, doService: stockService.getStarOnlineEvaluation, data: null, dependService: ['HSD_StarCompanyProductTable','HSD_StarProductCriteriaTable'], handleData: handleStarOnlineEvaluationData, dataReady: false, dirty: false, pagesIndex: INDEX_3+PAGE_SEP},
    // 淘系产品布局
    {name: 'HSD_StarProductLayout', serviceMode: doServiceMode12, doService: stockService.getStarProductLayout, data: null, handleData: handleStarData, dataReady: false, dirty: false, pagesIndex: INDEX_3+PAGE_SEP},
    // 淘系市场份额
    {name: 'HSD_StarMarketShare', serviceMode: doServiceMode12, doService: stockService.getStarMarketShare, data: null, handleData: handleStarData, dataReady: false, dirty: false, pagesIndex: INDEX_3+PAGE_SEP},
    // 最新评论
    {name: 'HSD_StarLatestCommentst', serviceMode: doServiceMode1, doService: stockService.getStarLatestCommentst, data: null, handleData: handleStarLatestCommentstData, dataReady: false, dirty: false, pagesIndex: INDEX_3+PAGE_SEP},
];

// 定时服务的序号
var RSI_Round = 0;
var RSI_Sales = 1;
// 实时服务
var realtime_service_collection = [
    {name: 'R_HSD_Round', doService: stockService.getRealtimeRound},  // 实时获取分销数据
    {name: 'R_HSD_Sales', doService: stockService.getRealtimeSales},  // 实时获取零售数据
];

// 获取某个实时数据
function getRealtimeValue(rsi) {
    var value = null;
    if (rsi >= 0 && rsi < realtime_service_collection.length) {
        var service = realtime_service_collection[rsi];
        // get data from local storage
        var item = storage.getItem(service.name);
        if (item != null) {
            value = item;
        }

        // load data from server
        service.doService().done(function(data){
            //console.log(data);
            var val = 0;
            switch (rsi) {
                case RSI_Round:
                    val = data.amt;
                    break;
                case RSI_Sales:
                    val = data.resultset[0][0];
                    break;
            }
            storage.setItem(service.name, val);
        })
    }

    return value;
}

// 判断所有数据是否准备好
function isAllDataReady() {
    var ready = true;
    for (var i = 0; i < service_collection.length; i++) {
        if (service_collection[i].data == null) {
            ready = false;
            break;
        }
    }

    return ready;
}

var KEY_DATE = 'HSD_Date';

/**
 * 依据名称获取服务序号
 * @param serviceName
 */
function getServiceIndex(serviceName) {
    var index = -1;

    for (var i = 0; i < service_collection.length; i++) {
        if (service_collection[i].name === serviceName) {
            index = i;
            break;
        }
    }

    return index;
}

// 加载后台数据
function loadData(reload) {
    var loaded = true;

    // 记录当前日期
    storage.setItem(KEY_DATE, getDateNowString());

    for (var i = 0; i < service_collection.length; i++) {
        var service = service_collection[i];

        // 先从本地缓存中读取数据
        var item = storage.getItem(service.name);
        if (item != null) {
            service.data = JSON.parse(item);
            console.log('data from localstorage: ' + service.name);
            DEBUG(service.data);

            // 初始化表格
            switch(i) {
                case SI_StarCompanyProductTable:
                    handleStarCompanyProductTableData(service.data);
                    break;
                case SI_StarProductCriteriaTable:
                    handleStarProductCriteriaTableData(service.data);
                    break;
            }
        }

        // 然后从后台服务器读取数据
        if (reload || item == null) {
            loaded = false;
            if (service.dependService != undefined) {
                // 需要等待另外一个数据完成后,再去获取数据
                var isOtherServiceReady = true;
                for (var d = 0; d < service.dependService.length; d++) {
                    var index = getServiceIndex(service.dependService[d]);
                    if (service_collection[index].data == null) {
                        isOtherServiceReady = false;
                        break;;
                    }
                }
                if (!isOtherServiceReady) {
                    continue;
                }
            }

            service.serviceMode(service);
        }
    }

    return loaded;
}

// 清除本地缓存数据
function clearStorage() {
//    storage.clear();
    for (var i = 0; i < service_collection.length; i++) {
        storage.removeItem(service_collection[i].name);
    }
}

// 获取下一次检查的等待时长 (毫秒)
function getCheckTimeout() {
//    return 30 * 1000;       // 30秒
    return 20 * 60 * 1000;  // 20分钟
}

// 检查是否要重新加载数据了
function checkDataReload() {
    var storage_date = storage.getItem(KEY_DATE);
    if (checkDateExpired(storage_date)) {
        // 清空本地缓存数据
        clearStorage();

        // 重新获取数据
        reloadData();
    }

    // 等待下一次检查
    setTimeout(checkDataReload, getCheckTimeout());
}

// 格式化货币
function formatMoney(n, sep){
    if(typeof (n) == 'undefined' || n == null || isNaN(n) || n === 'NaN'){
        return '-';
    }

    var re=/\d{1,3}(?=(\d{3})+$)/g;
    n = Math.round(n);
    n = n.toString();
    var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&"+sep)+s2;});

    return n1;
}

//console.log(getDateNowString());

var check_data_loadfinished_time = 1000;    // 1秒
var check_data_loadfinished_count = 200;    // 200次
var check_data_loadfinished_index = 0;
// 检查数据是否加载完成
function checkDataLoadFinished() {
    var bFinished = true;
    for (var i = 0; i < service_collection.length; i++) {
        if (!service_collection[i].dataReady) {
            bFinished = false;
        }
    }

    if (!bFinished) {
        check_data_loadfinished_index++;
        if (check_data_loadfinished_index < check_data_loadfinished_count) {
            // 等待一下检查
            setTimeout(checkDataLoadFinished, check_data_loadfinished_time);
        }
        else {
          //  console.log("checkDataLoadFinished timeout");
        }
    }
    else {
        var dirtyPage = '';
        // 判断数据是否有变动
        for (var i = 0; i < service_collection.length; i++) {
            if (service_collection[i].dirty) {
                dirtyPage += service_collection[i].pagesIndex;
            }
        }

        // 通知UI刷新
        if (dirtyPage.length > 0) {
            refreshPage(dirtyPage);
        }
    }
}

// 重新加载数据
function reloadData()
{
    // 设置标志位
    for (var i = 0; i < service_collection.length; i++) {
        service_collection[i].dataReady = false;
        service_collection[i].dirty = false;
    }

    // 重新加载数据
    loadData(true);

    // 启动定时器来加载数据是否完成
    check_data_loadfinished_index = 0;
    setTimeout(checkDataLoadFinished, check_data_loadfinished_time);
}

function data_init()  {

    if (true) {
        // 检查日期
        var storage_date = storage.getItem(KEY_DATE);
        if (checkDateExpired(storage_date)) {   // 数据过期
            // 清空本地存储数据
            // clearStorage();

            // 加载数据
            if (loadData(false)) {
                // 重新加载
                setTimeout(function () {
                    reloadData();
                }, 5000);
            }
        }
        else {
            // 加载数据
            loadData(false);
        }

        // 启动定时器来定时重新加载数据
        setTimeout(checkDataReload, getCheckTimeout());
    }
    else {  // 用于测试, 不用重新获取网络数据
        // 加载数据
        loadData(false);
    }
}

// 获取数据最后更新时间
function getLastUpdateTime() {
    var lastTime = '';
    var page_index = 0;
    if (currentSelect != undefined)
        page_index = currentSelect;
    var period_id = '';
    switch(page_index) {
        case 4: // page4
            if (service_collection[SI_EPDData].data != null) {
                var datum = service_collection[SI_EPDData].data;
                if (datum[0].period_wid != undefined && datum[0].period_wid.length == 8) {
                    period_id = datum[0].period_wid;
                }
            }
            break;
        case 5: // page5
            if (service_collection[SI_ReChanData].data != null) {
                var datum = service_collection[SI_ReChanData].data;
                if (datum[0].period_wid != undefined && datum[0].period_wid.length == 8) {
                    period_id = datum[0].period_wid;
                }
            }
            break;
        default:
            if (service_collection[SI_DepartmentSaleStock].data != null) {
                var datum = service_collection[SI_DepartmentSaleStock].data[0][0];
                if (datum[0].period_id != undefined && datum[0].period_id.length == 8) {
                    period_id = datum[0].period_id;
                }
            }
            break;
    }
    if (period_id != '') {
        lastTime = ' ' + period_id.substr(0,4) + '年' + period_id.substr(4,2) + '月' + period_id.substr(6,2) + '日';
    }

    return lastTime;
}