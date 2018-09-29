(function(window) {

    // 获取全局参数函数
    function GETSYSTEMCONFIG(type) {
        'use strict';

        switch (type) {
            case 'local': {     // 测试
                return {
                    type: 'local',
                    gohome:'http://10.16.26.166:8080/pentaho/kdisplay/No3.html',
                    location: 'http://10.16.26.166:8080',
                    locationReal: 'http://10.16.26.166:8080',   // 实时数据
                    locationExp: 'http://10.16.26.166:8080',   // 外销数据
                    locationStar: 'http://data.midea.com.cn',   // 观星台数据
                    debug: true,
                    alertDebug: false
                };
            }

            case 'pro': {       // 生产
                return {
                    type: 'pro',
                    gohome:'http://ceo.midea.com',
                    location: 'http://ceo.midea.com:8088',
                    locationReal: 'http://ceo.midea.com',       // 实时数据
                    locationExp: 'http://ceo.midea.com:8088',       // 外销数据
                    locationStar: 'http://data.midea.com.cn:8088', // 观星台数据
                    debug: false,
                    alertDebug: false
                };
            }

            case 'proxy': {     // 代理
                return {
                    type: 'pro',
                    gohome:'../map',
                    location: 'http://ceo.midea.com:8088',
                    locationReal: 'http://ceo.midea.com:8088',       // 实时数据
                    locationExp: 'http://ceo.midea.com',       // 外销数据
                    locationStar: 'http://data.midea.com.cn:8088', // 观星台数据
                    debug: false,
                    alertDebug: false
                };
            }

            default: {
                alert('[System Info] ## config error! ##');
            }
        }
    }
    window.SYSTEMCONFIG = GETSYSTEMCONFIG('local'); // 'local' , 'pro', 'proxy'

    // 获取服务分类
    function GETSERVICETYPE(type) {
        'use strict';

        switch (type) {
            case 'centre': {     // 总部
                return {
                    bi: '/BICxo',
                    star: '/report',
                };
            }
            case 'dept': {     // 事业部
                return {
                    bi: '/BICxoDept',
                    star: '/report',
                };
            }
            default: {
                alert('[System Info] ## config error! ##');
            }
        }
    }
    window.SYSTEMCONFIG.serviceType = GETSERVICETYPE('centre'); // 'centre' , 'dept'

    // 所有服务
    window.SYSTEMCONFIG.services = {
        stock: '/GetStock.do',
        detail: '/GetDailyStock.do',
        getRetail: '/GetRetail.do',
        biDetail: '/GetDaily.do',
        getSale: '/GetSale.do',
        getInv:'/GetInv.do',
        getRatio:'/GetRatio.do',

        GetEPD: '/GetEPD.do',
        GetDistr: '/GetDistr.do',
        GetInvPro: '/GetInvPro.do',
        GetReChan: '/GetReChan.do',
        GetCompChan: '/GetCompChan.do',
        GetTotalRet:'/GetTotalRet.do',
        GetRetail:'/GetRetail.do',
        GetPlan:'/GetPlan.do',

        getIdcClsfy:'/getIdcClsfy.do',

        // 实时数据
        getRound:'/GetRound.do',

        // 外销数据
        getExpMthsTrend:'/getExpMthsTrend.do',
        getExpSaleRate:'/getExpSaleRate.do',
        getExpShare:'/getExpShare.do',
        getExpMarketShare:'/getExpMarketShare.do',

        // 观星台数据
        getStarData:'/loadData.do',
    };

})(window);

// DEBUG函数
function DEBUG(data, method) {
    'use strict';

    var methodName = method ? method : 'SYSTEM';

    function getTime() {
        var
            sysTime = new Date(),
            hour = (sysTime.getHours() > 9) ? sysTime.getHours() : '0' + sysTime.getHours(),
            minutes = (sysTime.getMinutes() > 9) ? sysTime.getMinutes() : '0' + sysTime.getMinutes(),
            seconds = (sysTime.getSeconds() > 9) ? sysTime.getSeconds() : '0' + sysTime.getSeconds(),
            milliseconds = sysTime.getMilliseconds();

        return (hour + ':' + minutes + ':' + seconds + ':' + milliseconds);
    }

    if (SYSTEMCONFIG.alertDebug === true) {
        alert('System time : ' + getTime() + '\n' + 'Method name : ' + methodName + '\n' + JSON.stringify(data));
    } else if (SYSTEMCONFIG.debug === true) {
        console.log('System time : ' + getTime() + '\n' + 'Method name : ' + methodName);
        console.log(data);
        console.log('#######################################');
        console.log('');
    }
}

