(function(window) {

    // ��ȡȫ�ֲ�������
    function GETSYSTEMCONFIG(type) {
        'use strict';

        switch (type) {
            case 'local': {     // ����
                return {
                    type: 'local',
                    gohome:'http://10.16.26.166:8080/pentaho/kdisplay/No3.html',
                    location: 'http://10.16.26.166:8080',
                    locationReal: 'http://10.16.26.166:8080',   // ʵʱ����
                    locationExp: 'http://10.16.26.166:8080',   // ��������
                    locationStar: 'http://data.midea.com.cn',   // ����̨����
                    debug: true,
                    alertDebug: false
                };
            }

            case 'pro': {       // ����
                return {
                    type: 'pro',
                    gohome:'http://ceo.midea.com',
                    location: 'http://ceo.midea.com:8088',
                    locationReal: 'http://ceo.midea.com',       // ʵʱ����
                    locationExp: 'http://ceo.midea.com:8088',       // ��������
                    locationStar: 'http://data.midea.com.cn:8088', // ����̨����
                    debug: false,
                    alertDebug: false
                };
            }

            case 'proxy': {     // ����
                return {
                    type: 'pro',
                    gohome:'../map',
                    location: 'http://ceo.midea.com:8088',
                    locationReal: 'http://ceo.midea.com:8088',       // ʵʱ����
                    locationExp: 'http://ceo.midea.com',       // ��������
                    locationStar: 'http://data.midea.com.cn:8088', // ����̨����
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

    // ��ȡ�������
    function GETSERVICETYPE(type) {
        'use strict';

        switch (type) {
            case 'centre': {     // �ܲ�
                return {
                    bi: '/BICxo',
                    star: '/report',
                };
            }
            case 'dept': {     // ��ҵ��
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

    // ���з���
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

        // ʵʱ����
        getRound:'/GetRound.do',

        // ��������
        getExpMthsTrend:'/getExpMthsTrend.do',
        getExpSaleRate:'/getExpSaleRate.do',
        getExpShare:'/getExpShare.do',
        getExpMarketShare:'/getExpMarketShare.do',

        // ����̨����
        getStarData:'/loadData.do',
    };

})(window);

// DEBUG����
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

