(function(){
    var prizeName = '', // 奖品几等奖
        prizeId = '', // 奖品对应的ID
        prizeList = [], // 所有奖品列表
        //ztbAccount = '13587016036', // 直通宝账号
        ztbAccount = findAccount(),
        stage = '1',  // 所有奖品列表接口传入参数
        number = 20,  // 获取中奖列表的条数
        chances = [], // 保存机会数组
        chanceNum = -1, // 机会数标识
        changeIndex  = 0, // 机会数组索引
        hNum1 = 45, // list1子单行高
        hNum2 = 35, // list2子单行高
        prize = '', // 中奖提示
        luckyId = 0, // 抽奖活动的ID
        time = new Date, // 当前时间
        paint = false,
        drawTestUrl = 'http://10.16.27.186:8080/', // 抽奖测试地址
        drawUrl = 'http://mm.midea.com/', // 抽奖正式地址
        ztbTestUrl = 'http://202.104.30.106:8895/', // 直通宝测试地址
        ztbUrl = 'http://ztbapp.annto.com.cn:8899/'; // 直通宝正式地址

    //截取URL中直通宝账号
    function findAccount() {
        var obj = window.location.search;
        var index = obj.indexOf('=',0);
        return obj.substring(index+1);
    }
    // alert(ztbAccount);
    // alert(window.location.href);
    // 接口 获取奖品列表
    function getPrizeList(params) {
        $.ajax({
            type: 'get',
            url: ztbTestUrl + 'api/v2/driver/getPrizeList',
            data: {
                stage: params
            },
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            success: function (result) {
                prizeList = result.data;
            },
            error: function () {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
            }
        });
    }
    getPrizeList(stage);
    // 接口 获取抽奖次数 积分 账号列表
    function getChanceList(params) {
        $.ajax({
            type: 'get',
            url: ztbTestUrl + 'api/v2/driver/getChanceList',
            data: {
                ztbAccount: params
            },
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            success: function(result) {
                console.log(result.total);
                chances = result.data;
                chanceNum = chances.length;
                $('#ztbAccount').html(ztbAccount);
                $('#integral').html(result.points);
                $('#chanceNum').html(chanceNum);
            },
            error: function(err) {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
            }
        });
    }
    getChanceList(ztbAccount);
    // 接口 获取前20为中奖名单
    function getAllPrizeList(params) {
        $.ajax({
            type: 'get',
            url: ztbTestUrl + 'api/v2/driver/getAllPrizeList',
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                number: params
            },
            success: function(result) {
                if(result.data.length) {
                    $('#list1').css('padding-top', 0);
                    $('#list1').css('padding-bottom', 0);
                    products(result.data);
                } else {
                    $('#list1').css('padding-top', 15);
                    $('#list1').css('padding-bottom', 15);
                    $('#list1').html('暂无中奖名单')
                }
            },
            error: function() {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
            }
        });
    }
    getAllPrizeList(number);
    // 接口 保存中奖结果
    function savePrize(prize, chance, usr) {
        $.ajax({
            type: 'get',
            url: ztbTestUrl + 'api/v2/driver/savePrize',
            data:{
                prizeId: prize,
                chanceId: chance,
                ztbAccount: usr
            },
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            success: function(result) {
            },
            error: function() {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
            }
        });
    }
    // savePrize();
    //接口 获取抽奖活动ID
    function getActivity () {
        $.ajax({
            type: 'get',
            url: drawTestUrl + 'luckydraw/h5/getLuckyDrawByDate',
            data:{
                activity: '3', // 3 直通宝抽奖
                date: time.getTime() // 时间
            },
            dataType: "jsonp",
            success: function(result) {
                luckyId = result.data;
            },
            error: function() {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
            }
        });
    }
    getActivity();
    // 接口 获取我的奖品
    function getMyPrize (params) {
        $.ajax({
            type: 'get',
            url: ztbTestUrl + 'api/v2/driver/getMyPrizeList',
            data:{
                ztbAccount: params
            },
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            success: function(result) {
                if(result.data.length) {
                    prizes(result.data);
                } else {
                    $('#list2').css('padding-top', 15);
                    $('#list2').css('padding-bottom', 17);
                    $('#list2').html('暂无奖品')
                }
            },
            error: function() {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
            }
        });
    }
    //接口 开始抽奖
    function startPrize (id, usr) {
        $.ajax({
            type: 'get',
            url: drawTestUrl + 'luckydraw/h5/startUserLuckyDraw',
            data:{
                luckydrawid: id,
                userid: usr
            },
            dataType: "jsonp",
            success: function(result) {
                if(!result.code) {
                    prizeName = result.data.winning_name;
                    prize = result.data.winning_desc;
                    // 通过奖项等级匹配出对应奖品的ID
                    var tempLevel = 0;
                    switch (prizeName) {
                        case '一等奖':
                            tempLevel = 1;
                            break;
                        case '二等奖':
                            tempLevel = 2;
                            break;
                        case '三等奖':
                            tempLevel = 3;
                            break;
                        case '四等奖':
                            tempLevel = 4;
                            break;
                        default:
                            tempLevel = 5;
                            break;
                    }
                    prizeList.forEach(function (item) {
                        if(item.prizeLevel == tempLevel) {
                            prizeId = item.prizeId;
                        }
                    });
                    // 旋转转盘到对应奖品
                    setTimeout(function(){
                        runCup();
                    }, 100);
                    // 保存抽奖接口到接口
                    savePrize(prizeId, chances[changeIndex].chanceId, ztbAccount);
                    if(tempLevel != 5 && tempLevel != 0) {
                        if(tempLevel != 1) {
                            setTimeout(function(){
                                getChanceList(ztbAccount);
                            }, 6000);
                        }
                        setTimeout(function(){
                            getAllPrizeList(number);
                        }, 2000);
                        setTimeout(function(){
                            getMyPrize(ztbAccount);
                        }, 2000);
                    }
                    changeIndex ++;
                    chanceNum --;
                    $('#chanceNum').html(chanceNum);
                } else {
                    $('#no-chance-tip').height($('body').height() + 9);
                    $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                    $('#no-chance-tip').fadeIn();
                    startPrizeFlag = false;
                }
            },
            error: function() {
                $('#no-chance-tip').height($('body').height() + 9);
                $('#ok-txt').html('哎呀！出错啦~请稍后再试');
                $('#no-chance-tip').fadeIn();
                startPrizeFlag = false;
            }
        });
        return true;
    }
    // 我的奖品写进html
    function prizes(params) {
        var productTempHtml = [];
        var videos_html = $('#list2');

        for (var i = 0; i < params.length; i++) {
            var item = params[i];

            productTempHtml.push(prizesItem(item));
        }
        videos_html.html(productTempHtml.join(''));
        //hNum2 = $("#list2").find("div").first().height() + 15;
        //console.log(hNum2)
        list2Scroll();
    }
    function prizesItem(item) {
        var itemHtml = [];

        itemHtml.push('<div class="pad-t-15" style="height: 20px">');
        itemHtml.push('<span style="width: 50%">' + item['prizeName'] + '</span>');
        var tempDate = new Date(item['createDate']),
            month = tempDate.getMonth() + 1 <= 9 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1,
            day = tempDate.getDate() <= 9 ? '0' + tempDate.getDate() : tempDate.getDate();
        itemHtml.push('<span style="width: 50%">' + month + '-' + day + '</span>');
        itemHtml.push('</div>');
        return itemHtml.join('');
    }
    // 获奖20位名单写进html
    function products(params) {
        var productTempHtml = [];
        var videos_html = $('#list1');

        for (var i = 0; i < params.length; i++) {
            var item = params[i];

            productTempHtml.push(productsItem(item));
        }
        videos_html.html(productTempHtml.join(''));
        //hNum1 = $("#list1").find("div").first().height() + 15;
        list1Scroll();
    }
    function productsItem(item) {
        var itemHtml = [];
        item['createBy'] = item['createBy'].substr(0, 3) + '****' + item['createBy'].substr(7);
        itemHtml.push('<div class="pad-t-15" style="height: 30px">');
        itemHtml.push('<span style="width: 34%">'+ item['driverName'] + ' ' + item['createBy'] +'</span>');
        itemHtml.push('<span style="width: 30%">' + item['prizeName'] + '</span>');
        var tempDate = new Date(item['createDate']),
            month = tempDate.getMonth() + 1 <= 9 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1,
            day = tempDate.getDate() <= 9 ? '0' + tempDate.getDate() : tempDate.getDate();
        itemHtml.push('<span style="width: 30%">' + month + '-' + day + '</span>');
        itemHtml.push('</div>');
        return itemHtml.join('');
    }
    //旋转角度
    var angles;
    //旋转次数
    var rotNum = 0;
    //初始化画布
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    setTimeout(function() {
        canvasRun();
    }, 100);

    var startBtn = document.getElementById('tupBtn');
    startBtn.onclick = function(){
        // 调用用户抽奖接口
       /* if(!ztbAccount) {
            $('#no-chance-tip').height($('body').height() + 9);
            $('#ok-txt').html('正在获取用户信息，请稍等一下...');
            $('#no-chance-tip').fadeIn();
        }*/
        if(chanceNum > 0 && paint) {
            startPrize(luckyId, ztbAccount);
        } else if(chanceNum == 0){
            $('#no-chance-tip').height($('body').height() + 9);
            $('#ok-txt').html('当前抽奖次数为0，与货主达成交易即可获得抽奖机会');
            $('#no-chance-tip').fadeIn();
            return;
        } else {
            $('#no-chance-tip').height($('body').height() + 9);
            $('#ok-txt').html('正在获取用户抽奖信息，请稍等...');
            $('#no-chance-tip').fadeIn();
            return;
        }
        //转盘旋转过程“开始抽奖”按钮无法点击
        startBtn['disabled'] = true;
        $('#tupBtn').addClass('ing_btn');
        //旋转次数加一
        rotNum = rotNum + 1;
    };
    $('#tip-mask').hide();
    $('#close-btn').click(function() {
        $('#tip-mask').fadeOut();
    });
    $('#ok-btn').click(function() {
        $('#no-chance-tip').fadeOut();
    });
    //转盘旋转
    function runCup(){
        probability();
        var canvas = ctx.canvas;
        $(canvas).stopRotate();
        $(canvas).rotate({
            angle:0,
            animateTo:angles,
            duration:6000,
            callback:function (){
                //“开始抽奖”按钮无法点击恢复点击
                startBtn['disabled'] = false;
                $('#tupBtn').removeClass('ing_btn');
                if(!startBtn['disabled']) {
                    $('#tip-mask').height($('body').height() + 9);
                    switch (prizeName) {
                        case '一等奖':
                            $('#prize-box').hide();
                            $('#tip3').show();
                            $('#prize-name').show();
                            $('#tip-mask').fadeIn();
                            $('#tip1').html('亲!');
                            $('#tip2').html('您中奖了');
                            $('#tip3').html('恭喜您获得');
                            $('#prize-name').html(prize);
                            break;
                        case '二等奖':
                            $('#prize-box').hide();
                            $('#tip3').show();
                            $('#prize-name').show();
                            $('#tip-mask').fadeIn();
                            $('#tip1').html('亲!');
                            $('#tip2').html('您中奖了');
                            $('#tip3').html('恭喜您获得');
                            $('#prize-name').html(prize);
                            break;
                        case '三等奖':
                            $('#prize-box').hide();
                            $('#tip3').show();
                            $('#prize-name').show();
                            $('#tip-mask').fadeIn();
                            $('#tip1').html('亲!');
                            $('#tip2').html('您中奖了');
                            $('#tip3').html('恭喜您获得');
                            $('#prize-name').html(prize);
                            break;
                        case '四等奖':
                            $('#prize-box').hide();
                            $('#tip3').show();
                            $('#prize-name').show();
                            $('#tip-mask').fadeIn();
                            $('#tip1').html('亲!');
                            $('#tip2').html('您中奖了');
                            $('#tip3').html('恭喜您获得');
                            $('#prize-name').html(prize);
                            break;
                       /* case '五等奖':
                            $('#prize-box').hide();
                            $('#tip3').show();
                            $('#prize-name').show();
                            $('#tip-mask').fadeIn();
                            $('#tip1').html('亲!');
                            $('#tip2').html('您中奖了');
                            $('#tip3').html('恭喜您获得');
                            $('#prize-name').html(prize);
                            break;*/
                        default:
                            $('#tip3').hide();
                            $('#prize-name').hide();
                            $('#tip-mask').fadeIn();
                            $('#tip1').html('没中奖');
                            $('#tip2').html('再接再厉');
                            $('#prize-box').show();
                            break;
                    }
                }
            }
        });
    }

    //各奖项对应的旋转角度及中奖公告内容
    function probability(){
        //一等奖
        if ( prizeName == '一等奖' ) {
            angles = 1800 - 72 * 2;
        }
        //二等奖
        else if ( prizeName == '二等奖' ) {
            angles = 1800 - 72 * 3;
        }
        //三等奖
        else if ( prizeName == '三等奖' ) {
            angles = 1800 - 72;
        }
        //四等奖
        else if ( prizeName == '四等奖' ) {
            angles = 1800;
        }
        //五等奖
        //else if ( prizeName == '五等奖' ) {
        //    angles = 1800 - 60 * 4;
        //}
        //没中奖
        else {
            angles = 1800 - 72 * 4;
        }
    }
    //绘制转盘
    function canvasRun(){
        //转盘边框
        var outline = document.getElementById('outline');
        if(outline.complete) {
            setTimeout(function(){
                ctx.drawImage(outline, 0, 0, outline.width, outline.height, 0, 0, 600, 600);
            }, 100);
        } else {
            outline.onload = function() { //在图片加载完成后才能向canvas绘制图片
                setTimeout(function(){
                    ctx.drawImage(outline, 0, 0, outline.width, outline.height, 0, 0, 600, 600);
                }, 100);
            };
        }

        //转盘线条
        setTimeout(function() {
            createCircle();
        },100);
        //转盘奖品
        //var card = document.getElementById('card');
        var card2 = document.getElementById('card2');
        // var card3 = document.getElementById('card3');
        var card4 = document.getElementById('card4');
        var card6 = document.getElementById('card6');
        var imgSrcs = [card2, card2, card4, card2, card6];
        setTimeout(function() {
            prizeOnload(imgSrcs);
        },100);
    }

    //外圆
    function createCircle(){
        ctx.save();
        ctx.beginPath();
        ctx.arc(300, 300, 300, 0, 2*Math.PI);
        ctx.lineWidth = 2; //线条宽度
        ctx.strokeStyle = '#f1032d'; //线条颜色
        ctx.stroke();
        ctx.restore();
        for (var i = 0; i< 5; i++){
            var x = 300 + 244 * Math.cos((144 * i + 36) * Math.PI / 360); //计算圆上的坐标
            var y = 300 + 244 * Math.sin((144 * i + 36) * Math.PI / 360);
            //绘图开始
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(300, 300); //每次都需要移动到圆心
            ctx.lineTo(x, y); //绘制一条直线到目标坐标(x,y)
            ctx.lineWidth = 0.5; //线条宽度
            ctx.strokeStyle = '#e0dbb3'; //线条颜色
            ctx.stroke();
            ctx.restore();
            //绘图结束
        }
    }

    function prizeOnload(imgSrcs){
        for(var i = 0; i < imgSrcs.length; i++) {
            if (!imgSrcs[i].complete) {
                break;
            }
        }
        if(i == imgSrcs.length) {
            paint = true;
            createCirText(imgSrcs);
        } else {
            imgSrcs[i].onload = function() {
                prizeOnload(imgSrcs);
            }
        }
    }
    function rePaint() {
        if(!paint) {
            canvasRun();
        } else {
            return;
        }
    }
    setTimeout(function() {
        rePaint();
    }, 5000);
    //各奖项
    function createCirText(imgSrcs){
        ctx.textAlign='start';
        ctx.textBaseline='middle';
        var step = 2 * Math.PI / 5;
        for ( var i = 0; i < 5; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(300, 300);
            ctx.rotate(i * step); //以(150,150)旋转坐标轴
            if( i === 0) {
                ctx.drawImage(imgSrcs[i], 0, 0, imgSrcs[i].width, imgSrcs[i].height, -70,-210, 58, 58); //绘制圆盘上的奖品
                ctx.font = "28px Microsoft YaHei";
                ctx.fillStyle = '#000';
                ctx.fillText('积分',-8,-195,120); //添加文字
                ctx.font = "28px Microsoft YaHei";
                ctx.fillText('￥100',-22,-165,120);
            } else if(i === 1) {
                ctx.drawImage(imgSrcs[i], 0, 0, imgSrcs[i].width, imgSrcs[i].height, -70,-210, 58, 58); //绘制圆盘上的奖品
                ctx.font = "28px Microsoft YaHei";
                ctx.fillStyle = '#000';
                ctx.fillText('积分',-8,-195,120); //添加文字
                ctx.font = "28px Microsoft YaHei";
                ctx.fillText('￥200',-22,-165,120);
            } else if(i === 2) {
                ctx.drawImage(imgSrcs[i], 0, 0, imgSrcs[i].width, imgSrcs[i].height, -70,-236, 66, 100); //绘制圆盘上的奖品
                ctx.font = "28px Microsoft YaHei";
                ctx.fillStyle = '#000';
                ctx.fillText('小米',6,-196,120); //添加文字
                ctx.font = "28px Microsoft YaHei";
                ctx.fillText('手机',8,-168,120);
            }else if(i === 3) {
                ctx.drawImage(imgSrcs[i], 0, 0, imgSrcs[i].width, imgSrcs[i].height, -70,-210, 58, 58); //绘制圆盘上的奖品
                ctx.font = "28px Microsoft YaHei";
                ctx.fillStyle = '#000';
                ctx.fillText('积分',-8,-195,120); //添加文字
                ctx.font = "28px Microsoft YaHei";
                ctx.fillText('￥500',-22,-165,120);
            }else if(i === 4) {
                ctx.font = " 28px Microsoft YaHei";
                ctx.fillStyle = '#000';
                ctx.fillText('谢谢参与',-57,-180,120); //添加文字
            }
            ctx.closePath();
            ctx.restore();
        }
    }

    // 中奖名单 我的奖品 规则TAB切换
    // list1 所有中奖名单
    // list2 我的奖品
    // list3 规则
    $('#list2').hide();
    $('#list3').hide();
    $('#myPrize').click(function() {
        $("#list1").stop();
        //list2Scroll();
        $('#myPrize').addClass('fc-dark-yellow');
        $('#all').removeClass('fc-dark-yellow').addClass('fc-white');
        $('#rule').removeClass('fc-dark-yellow');
        getMyPrize(ztbAccount);
        $('#list2').show();
        var cNum = $('#list2').children().length;
        if(cNum > 5) {
            $('#list2').css('height', hNum2*5 + 15);
        }
        $('#list1').hide();
        $('#list3').hide();
    });
    $('#all').click(function() {
        //$("#list2").stop(true);
        list1Scroll();
        $('#all').addClass('fc-dark-yellow');
        $('#myPrize').removeClass('fc-dark-yellow').addClass('fc-white');
        $('#rule').removeClass('fc-dark-yellow');
        $('#list1').show();
        var cNum = $('#list1').children().length;
        if(cNum > 5) {
            $('#list1').css('height', hNum1*5 + 15);
        }
        $('#list2').hide();
        $('#list3').hide();
    });
    $('#rule').click(function() {
        $('#rule').addClass('fc-dark-yellow');
        $('#all').removeClass('fc-dark-yellow').addClass('fc-white');
        $('#myPrize').removeClass('fc-dark-yellow');
        $('#list3').show();
        $('#list2').hide();
        $('#list1').hide();
    });

    // list1滚动
    function list1Scroll() {
        var list1 = $('#list1');
        var cNum = list1.children().length;
        if(cNum > 5) {
            list1.addClass('over-css');
            list1.css('height', hNum1*5 + 15);
            scroll(list1, hNum1);
        }
    }

    // list2 滚动
    function list2Scroll() {
        var list2 = $('#list2');
        var cNum = list2.children().length;
        if(cNum > 5) {
            list2.addClass('over-css');
            list2.css('height', hNum1*5 + 15);
            scroll(list2, hNum2);
        }
    }

    function scroll(list, height) {
        list.animate({
            scrollTop: height
        }, 2000, function() {
            var first = list.children()[0],
                html = first.outerHTML;
            list.append(html);
            $(first).remove();
            list.scrollTop(0);
            list.stop();
            window.setTimeout(function() {
                scroll(list, height);
            }, 400);
        });
    }
})();
