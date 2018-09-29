var currentSelectIdStr = INDEX_1;

var bInit = false;

var playTimeInterval = 120*1000;//120s
var playTimer = null;
var g_enablePlay = true;

function resetInitPageFlat() {
    for (var n = 0; n < PAGE_ITEMS.length; n++) {
        PAGE_ITEMS[n].binit = false;
    }
}

function resetMenuHighLight(menuIndex) {
    var classString = 'right-menu-highlight';
    for (var i = 1; i <= 4; i++) {
        var id = '#rightMenuItem' + i.toString();
        if ($(id).hasClass(classString)) {
            $(id).removeClass(classString);
        }
    }
    var idSelect = '#rightMenuItem' + menuIndex.toString();
    if (!$(idSelect).hasClass(classString)) {
        $(idSelect).addClass(classString);
    }
    $('.right-bottom-menu').css('display','none');
}

/**
 * 重新页面
 *
 * @param pagesIndex
 */
function refreshPage(pagesIndex) {
    for (var n = 0; n < PAGE_ITEMS.length; n++) {
        if (PAGE_ITEMS[n].binit) {
            PAGE_ITEMS[n].binit = !containPage(pagesIndex, PAGE_ITEMS[n].pageName);
        }
    }

    // 刷新当前页面
    if (containPage(pagesIndex, currentSelectIdStr)) {
        entryPage(true);
    }

    // 刷新最后更新时间
    refreshLastUpdateTime();
}

// 刷新最后更新时间
function refreshLastUpdateTime() {
    // 数据更新时间
    // document.getElementById('lbTimeId').innerHTML=getLastUpdateTime();
}

function entryPage(bAniamte) {
    var timeMs = 10;
    if (bAniamte) {
        timeMs = 800;
    }
    setTimeout(function() {
        bInit = true;
        // 进场
        for (var n = 0; n < PAGE_ITEMS.length; n++) {
            if (currentSelectIdStr == PAGE_ITEMS[n].pageName) {
                PAGE_ITEMS[n].entry(!PAGE_ITEMS[n].binit);
                PAGE_ITEMS[n].binit = true;
                break;
            }
        }
    },timeMs);
}

var selectAniamtingPage = null;
var preSelectAniamtingPage = null;

function animateCallBack(){
    if (selectAniamtingPage != null) {
        selectAniamtingPage.animate({
            left:'0',
            top:'0',
            opacity:'1',
            height:'100%',
            width:'100%'
        },200);
    }
    if (preSelectAniamtingPage != null) {
        preSelectAniamtingPage.addClass('hide');
        preSelectAniamtingPage = null;
    }
    selectAniamtingPage = null;
}

function resetPage(indexStr, bIndex,idStr){
    if (selectAniamtingPage != null) {
        //动画进行中返回
        return;
    }
    if (idStr != null) {

    }
    if (currentSelectIdStr != indexStr) {
        var classString = 'hide';
        var oldSelectId = null;
        for (var i = 0; i < GROUP_1_PAGES.length; i++) {
            if (!$(GROUP_1_PAGES[i]).hasClass(classString)) {
                // $(id).removeClass('hide');
                //$(id).addClass(classString);
                oldSelectId = GROUP_1_PAGES[i];
                break;
            }
        }
        if (!$(INDEX_2).hasClass(classString)) {
            oldSelectId = INDEX_2;
        }
        if (!$(INDEX_3).hasClass(classString)) {
            oldSelectId = INDEX_3;
        }
        if (indexStr != INDEX_1 &&  indexStr != INDEX_2 &&  indexStr != INDEX_3) {
            if ($('#backIconId').hasClass(classString)) {
                // $(id).removeClass('hide');
                $('#backIconId').removeClass(classString);
            }
            if ($('#rightMenuId').hasClass(classString)) {
                // $(id).removeClass('hide');
                $('#rightMenuId').removeClass(classString);
            }
        } else {
            if (!$('#backIconId').hasClass(classString)) {
                // $(id).removeClass('hide');
                $('#backIconId').addClass(classString);
            }
            if (!$('#rightMenuId').hasClass(classString)) {
                // $(id).removeClass('hide');
                $('#rightMenuId').addClass(classString);
            }
        }

        for (var n = 0; n < PAGE_ITEMS.length; n++) {
            if (currentSelectIdStr == PAGE_ITEMS[n].pageName) {
                PAGE_ITEMS[n].exit();
                break;
            }
        }

        currentSelectIdStr = indexStr;
        entryPage(true);

        var selectId = indexStr;
        var bIndexSwitch = false;
        var strClientWidth = document.documentElement.clientWidth.toString() + 'px';
        var strClientHeight = document.documentElement.clientWidth.toString() + 'px';
        if ($(selectId).hasClass(classString)) {
            $(selectId).removeClass(classString);
            $(selectId).css('display','block');
            switch (currentSelectIdStr) {
                case INDEX_1:
                case INDEX_1_PAGE2:
                case INDEX_1_PAGE3:
                case INDEX_1_PAGE4:
                case INDEX_1_PAGE5:
                case INDEX_2:
                case INDEX_3:
                     $(selectId).css('opacity',0);
                     $(selectId).css('left','0');
                     $(selectId).css('top','0');
                     $(selectId).css('width','100%');
                     $(selectId).css('height','0');
                    break;
         /*       case INDEX_2:
                case INDEX_3:
                    $(selectId).css('opacity',0);
                    $(selectId).css('left','0');
                    $(selectId).css('top','0');
                    $(selectId).css('width','100%');
                    $(selectId).css('height','100%');
                    bIndexSwitch = true;
                    break;*/
            }
            preSelectAniamtingPage =  $(oldSelectId);
            selectAniamtingPage = $(selectId);
            if (bIndex) {
                preSelectAniamtingPage.fadeOut();
            } else {
                //使用首页动画效果
                //preSelectAniamtingPage.fadeOut();
                preSelectAniamtingPage.addClass(classString);

            }
          /*  if (bIndexSwitch) {
                selectAniamtingPage.animate({
                    left:'0',
                    top:'0',
                    opacity:'1',
                    height:'100%',
                    width:'100%'
                },800,'swing',animateCallBack);
            } else*/ {
                selectAniamtingPage.animate({
                    left:'0',
                    top:'0',
                    opacity:'0.6',
                    height:'100%',
                    width:'100%'
                },800,'swing',animateCallBack);
            }
        }
        $('#rightMenuBgId').fadeOut();
    }
}
function stopFunc(e) {
    e.stopPropagation ? e.stopPropagation() :
        e.cancelBubble = true;
    //其它页面按钮点击事件需防止冒泡，及重新开始定时器
    timePlay();
}

function resetMenuStatus() {
    var display =$('#rightMenuBgId').css('display');
    if(display == 'none'){
    } else {
        $('#rightMenuBgId').fadeOut();
        $('#rightMenuId').removeClass('right-menu-down');
        $('#rightMenuId').addClass('right-menu-normal');
    }
}

function initMenu() {
    setTimeout(function() {
        var rightMenu  = document.getElementById('rightMenuId');
        if (rightMenu != null) {
      /*  var initControl  = document.getElementById('index-box0');
        if (initControl != null) {*/
         $('#rightMenuId').bind("click",function(e){
             e = e||event;
             stopFunc(e);
             if (document.getElementById('rightMenuBgId') != null) {
                 var display =$('#rightMenuBgId').css('display');
                 if(display == 'none'){
                     $('#rightMenuBgId').fadeIn();
                     $('#rightMenuId').removeClass('right-menu-normal');
                     $('#rightMenuId').addClass('right-menu-down');
                 } else {
                   /*  $('#rightMenuBgId').animate({
                         height:'0px'
                     });*/
                      $('#rightMenuBgId').fadeOut();
                     $('#rightMenuId').removeClass('right-menu-down');
                     $('#rightMenuId').addClass('right-menu-normal');
                 }
             }
            });
            $('#rightMenuItem1').bind("click",function(){
                resetPage(INDEX_1_PAGE2);
                timePlay();
                resetMenuHighLight(1);
            });
            $('#rightMenuItem2').bind("click",function(){
                resetPage(INDEX_1_PAGE3);
                resetMenuHighLight(2);
                timePlay();
            });
            $('#rightMenuItem3').bind("click",function(){
                resetPage(INDEX_1_PAGE4);
                timePlay();
                resetMenuHighLight(3);
            });
            $('#rightMenuItem4').bind("click",function(){
                resetPage(INDEX_1_PAGE5);
                timePlay();
                resetMenuHighLight(4);
            });

            /*$('#backIconId').bind("click",function(){
                resetPage(1,true);
                $('.right-bottom-menu').css('display','block');
            });*/
        //首页按钮绑定
            $('#index-box0').bind("click",function(){
                resetPage(INDEX_1_PAGE2,true);
                timePlay();
                resetMenuHighLight(1);
            });
            $('#index-box1').bind("click",function(){
                resetPage(INDEX_1_PAGE3,true);
                timePlay();
                resetMenuHighLight(2);
            });
            $('#index-box2').bind("click",function(){
                resetPage(INDEX_1_PAGE4,true);
                timePlay();
                resetMenuHighLight(3);
            });
            $('#index-box3').bind("click",function(){
                resetPage(INDEX_1_PAGE5,true);
                timePlay();
                resetMenuHighLight(4);
            });
            $(INDEX_1_PAGE2).bind("click",function(){
                resetPage(INDEX_1,true);
                timePlay();
                  $('.right-bottom-menu').css('display','block');
            });
            $(INDEX_1_PAGE3).bind("click",function(){
                resetPage(INDEX_1,true);
                timePlay();
                $('.right-bottom-menu').css('display','block');
            });

            $(INDEX_1_PAGE4).bind("click",function(){
                resetPage(INDEX_1,true);
                timePlay();
                $('.right-bottom-menu').css('display','block');
            });
            $(INDEX_1_PAGE5).bind("click",function(){
                resetPage(INDEX_1,true);
                timePlay();
                $('.right-bottom-menu').css('display','block');
            });

            document.onclick = function(e){
                resetMenuStatus();
            }
              /*  $("btn").onclick = function(e){
                    $('#rightMenuBgId').style.display = "block";
                    e = e||event;
                    stopFunc(e);
                }*/
                $('#rightMenuBgId').onclick = function(e){
                    e = e||event;
                    stopFunc(e);
                }
            } else {
            initMenu();
        }
    },100);
}

function initAll(bInit) {
    setTimeout(function() {
        if(/*!isAllDataReady() || */!echartsInit
        ) {
            initAll(bInit)
        } else {
            //初始化全部页面，然后再次进入时
            if ($(currentSelectIdStr).hasClass('hide')) {
                $(currentSelectIdStr).removeClass('hide');
            }
            $(currentSelectIdStr).css('opacity','1');
            entryPage(true);
            timePlay();
        }
    },200);
}

//自适应屏幕显示间隔

function updateTableHead() {
    var tableHeadDiv = document.getElementById('index3-table-div');
    if (tableHeadDiv != null) {
        $('#index3-table-div-2').css('width',tableHeadDiv.offsetWidth + 2.8*winFactor + 'px');
    }
    //计算右边线位置，不使用border-width的做法
    var tableDiv = document.getElementById('index3-table-div');
    if (tableDiv != null) {
        var left = tableDiv.offsetLeft + tableDiv.offsetWidth - 1;
        var top = tableDiv.offsetTop;
        $('#index3-table-line').css('top',top+'px');
        $('#index3-table-line').css('left',left+'px');
        $('#index3-table-line').css('height',tableDiv.offsetHeight + 'px');
        $('#index3-table-line').removeClass('hide');
    }
}

function adaptSeperate() {
    var divList =  $('.adapt-seperate');
    var divListFull =  $('.adapt-seperate-full');
    var pieList =  $('.pie-kong');
    var height = seperateHeight/2;
    var heightPic = seperateHeight;
    //计算间隔大小

    var heightAdjust = height- 10*winFactor;
    if (heightAdjust < 0) {
        heightAdjust = 0;
    }
    for(var i=0; i<divList.length; i++) {
        divList.eq(i).css('height',heightAdjust.toString() + 'px');
    }

    //计算间隔大小 地图背景
    for(var i=0; i<divListFull.length; i++) {
        divListFull.eq(i).css('height',heightPic.toString() + 'px');
    }

    for(var i=0; i<pieList.length; i++) {
        pieList.eq(i).css('height',height.toString() + 'px');
    }

    //计算自适应表格大小
    var idList = [];
    var heightPage2 = 660*winFactor + height;
    var heightPage3 = 685*winFactor + height;
    var heightPage5 = 660*winFactor + height;

    //page 1
    adapatChart('bar4', heightPage3);
    adapatChart('bar1', heightPage5);
    
    //page2
    idList = ['page2-bar-1','page2-bar-2','page2-bar-3'];
    for(var i=0; i<idList.length; i++) {
        adapatChart(idList[i],heightPage2);
    }
    //page 3
    idList = ['salesBarId1','salesBarId2','salesScatterId1','salesScatterId2'];
    for(var i=0; i<idList.length; i++) {
        adapatChart(idList[i],heightPage3);
    }
    //page4
    adapatChart('ScatterPage4',heightPage3);
    adapatChart('page4-bar-1',heightPage5);
    adapatChart('page4-bar-2',heightPage5);

    //page5
    idList = ['page5-bar-1','page5-bar-2','page5-bar-3'];
    for(var i=0; i<idList.length; i++) {
        adapatChart(idList[i],heightPage5);
    }
    adapatChart('page5-pie-1',700*winFactor+height);

    //index_2

    adapatChart('index2-bar-1',heightPage5);
    adapatChart('index2-scatter',730*winFactor+height);
    adapatChart('index2-bar-2',heightPage5);
    adapatChart('index2-pie-1',740*winFactor+height);

    //index-3
    adapatChart('index3-radar-1',580*winFactor+height);
    adapatChart('index3-scatter-1',heightPage5);
    adapatChart('index3-pie-1',740*winFactor+height);

   // adatapatCharWidth('index3-table-div', 1648*winFactor-1);
    adapatChart('index3-table-div',550*winFactor+height);
    updateTableHead();
}



function adatapatCharWidth(chartId,chartWidth) {
    var chart = document.getElementById(chartId);
    if (chart != null) {
        var cssText = chartWidth.toString() + 'px';
        $('#'+chartId).css('width',cssText);
    }
}

function adapatChart(chartId,chartHeight) {
    //自动获取chart height设置有问题
    var chart = document.getElementById(chartId);
    if (chart != null) {
        chartHeight += seperateHeight/2;
        var cssText = chartHeight.toString() + 'px';
        $('#'+chartId).css('height',cssText);
        /*chart.offsetHeight += chartHeight;*/
    }
}

function resizeBody() {
    if (bInit) {
        initAllFontSize();
        resetInitPageFlat();
        /*adaptSeperate();*/
        entryPage(false);
    }
}



function stopTimePlay() {
  if (playTimer != null) {
      clearTimeout(playTimer);
      playTimer = null;
  }
}

function getNextPageIdStr(curIdStr) {
    var nextPageId = '';
    switch (curIdStr) {
        case INDEX_1:
            nextPageId = INDEX_1_PAGE2;
            break;
        case INDEX_1_PAGE2:
            nextPageId = INDEX_1_PAGE3;
            break;
        case INDEX_1_PAGE3:
            nextPageId = INDEX_1_PAGE4;
            break;
        case INDEX_1_PAGE4:
            nextPageId = INDEX_1_PAGE5;
            break;
        case INDEX_1_PAGE5:
            nextPageId = INDEX_2;
            break;
        case INDEX_2:
            nextPageId = INDEX_3;
            break;
        case INDEX_3:
            nextPageId = '#bigmap';
            break;
    }
    return nextPageId;
}
function getMenuHighLight(curIdStr) {
    var menuHighLight = 0;
    switch (curIdStr) {
        case INDEX_1:
            menuHighLight = 0;
            break;
        case INDEX_1_PAGE2:
            menuHighLight = 1;
            break;
        case INDEX_1_PAGE3:
            menuHighLight = 2;
            break;
        case INDEX_1_PAGE4:
            menuHighLight = 3;
            break;
        case INDEX_1_PAGE5:
            menuHighLight = 4;
            break;
        case INDEX_2:
            menuHighLight = 0;
            break;
        case INDEX_3:
            menuHighLight = 0;
            break;
    }
    return menuHighLight;
}


function goBigMap() {
    $('.right-bottom-menu').css('display','block');
    //一轮完成后跳转到大地图
    window.location.href = window.SYSTEMCONFIG.gohome;
}

function timePlay() {
    if (g_enablePlay) {
        stopTimePlay();
        var toIndexIdStr = getNextPageIdStr(currentSelectIdStr);
        playTimer = setTimeout(function() {
            var bIndex = (toIndexIdStr == INDEX_1);
            resetPage(toIndexIdStr,bIndex);
            if (toIndexIdStr == '#bigmap') {
                goBigMap();
            } else {
                resetMenuStatus();
                var resetIndex = getMenuHighLight(toIndexIdStr);
                resetMenuHighLight(resetIndex);
            }
            timePlay();
        },playTimeInterval);
    }
}

function commonJsReady() {
    'use strict';
    setTimeout(function() {
        initMenu();
        initAllFontSize();
        initAll(true);
    },300);
}
//sprintf
String.prototype.format= function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(s,i){
        return args[i];
    });
}


//div内容无缝滚动（下方向）目前只支持一个页面只有一个滚动
var marqueeTimer = null;
function stopmarquee(id,childId) {
    if (marqueeTimer != null) {
        clearInterval(marqueeTimer);
        marqueeTimer = null;
    }
    if (id != null) {
        var o = document.getElementById(id);
        o.scrollTop = 0;
    }
    if (childId != null) {
    }
}
function startmarquee(id,childId,speed, delay) {
    var p = false;
    var o = document.getElementById(id);
    var child = document.getElementById(childId);
    o.scrollTop = 0;

    var scrollStep = 1.0;
    function start() {
        stopmarquee();
        marqueeTimer = setInterval(scrolling, speed);
    }
    function scrolling() {
        o.scrollTop = o.scrollTop  + 1.4;
        if ( o.scrollTop > o.scrollHeight- o.offsetHeight) {
            o.scrollTop = 0;
            stopmarquee();
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
    o.onmouseover = function (e) {
        e.stopPropagation();
        stopmarquee();
    }
    o.onmouseout = function (e) {
        e.stopPropagation();
        start();
    }
    child.onmouseover = function (e) {
        e.stopPropagation();
        stopmarquee();
    }
    child.onmouseout = function (e) {
        e.stopPropagation();
        start();
    }
}



