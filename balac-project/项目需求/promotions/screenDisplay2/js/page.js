/**
 * @file 页面信息
 * @author ex_hujie
 * @version 1.0.1 - 2015-11-20
 */

// 第一组页面
var INDEX_1 = '#page1';
var INDEX_1_PAGE2 = '#page2';
var INDEX_1_PAGE3 = '#page3';
var INDEX_1_PAGE4 = '#page4';
var INDEX_1_PAGE5 = '#page5';
var GROUP_1_PAGES = [INDEX_1, INDEX_1_PAGE2, INDEX_1_PAGE3, INDEX_1_PAGE4, INDEX_1_PAGE5];
var GROUP_1 = 1;

// 第二组页面
var INDEX_2 = '#index_2';
var GROUP_2_PAGES = [INDEX_2];
var GROUP_2 = 2;

// 第三组页面
var INDEX_3 = '#index_3';
var GROUP_3_PAGES = [INDEX_3];
var GROUP_3 = 3;

// 所有页面
var ALL_PAGES = [GROUP_1_PAGES, GROUP_2_PAGES, GROUP_3_PAGES];

// 页面字符串的分隔符
var PAGE_SEP = ',';

// 记录页面信息
var PN_INDEX_1 = 0;
var PN_INDEX_1_PAGE2 = 1;
var PN_INDEX_1_PAGE3 = 2;
var PN_INDEX_1_PAGE4 = 3;
var PN_INDEX_1_PAGE5 = 4;
var PN_INDEX_2 = 5;
var PN_INDEX_3 = 6;
var PAGE_ITEMS = [
    {binit: false, pageName: INDEX_1, entry: null, exit: null},
    {binit: false, pageName: INDEX_1_PAGE2, entry: null, exit: null},
    {binit: false, pageName: INDEX_1_PAGE3, entry: null, exit: null},
    {binit: false, pageName: INDEX_1_PAGE4, entry: null, exit: null},
    {binit: false, pageName: INDEX_1_PAGE5, entry: null, exit: null},
    {binit: false, pageName: INDEX_2, entry: null, exit: null},
    {binit: false, pageName: INDEX_3, entry: null, exit: null},
];

// 获取当前组号
function getGroupIndex() {
    var classString = 'hide';
    var indexPage = -1;
    for (var i = 0; i < GROUP_1_PAGES.length; i++) {
        if (!$(GROUP_1_PAGES[i]).hasClass(classString)) {
            indexPage = GROUP_1;
            break;
        }
    }
    if (!$(INDEX_2).hasClass(classString)) {
        indexPage = GROUP_2;
    }
    if (!$(INDEX_3).hasClass(classString)) {
        indexPage = GROUP_3;
    }
    return indexPage;
}

// 向右导航
function goRightOther(){
    var indexPage =getGroupIndex();
    switch (indexPage) {
        case GROUP_1:
            window.location.href = window.SYSTEMCONFIG.gohome;
            break;
        case GROUP_2:
            resetPage(INDEX_1);
            break;
        case GROUP_3:
            resetPage(INDEX_2);
            break;
    }
    timePlay();
}

// 向左导航
function goLeftOther(){
    var indexPage =getGroupIndex();
    switch (indexPage) {
        case GROUP_1:
            resetPage(INDEX_2);
            break;
        case GROUP_2:
            resetPage(INDEX_3);
            break;
        case GROUP_3:
            goBigMap();
            break;
    }
    timePlay();
}

/**
 * 判断是否包括指定页面
 *
 * @param pages
 * @param page
 * @returns {*}
 */
function containPage(pages, page) {
    var contain = (pages.indexOf(page+PAGE_SEP) >= 0);

    return contain;
}