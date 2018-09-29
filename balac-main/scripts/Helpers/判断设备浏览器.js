export const isUserAgent = () => {
    var u = navigator.userAgent;

    if (u.indexOf('Android') !== -1 || u.indexOf('Linux') !== -1) {

        return 'Android';   // 安卓手机
    }

    if (u.indexOf('iPhone') !== -1){

        return 'iPhone';    // 苹果手机
    }

    if (u.indexOf('iPad') !== -1) {

        return 'iPad';      // iPad
    }

    if (u.indexOf('Windows Phone') !== -1) {

        return 'Windows Phone'; // winphone 手机
    }

    if (u.indexOf('Opera') !== -1) {

        return 'Opera';     // Opera 浏览器

    }

    if (u.indexOf('compatible') !== -1 && u.indexOf("MSIE") !== -1) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);

        if ([7, 8, 9, 10, 11].indexOf(fIEVersion) !== -1) {
            return 'IE' + fIEVersion;
        }

        return 'IE7 以下，版本过低';
    }

    if (u.indexOf('Edge') !== -1) {

        return 'Edge';
    }

    if (u.indexOf('Firefox') !== -1) {

        return 'Firefox';   // Firefox 浏览器
    }

    if (u.indexOf('Safari') !== -1 && u.indexOf('Chrome') === -1) {

        return 'Safari';
    }

    if (u.indexOf('Chrome') !== -1 && u.indexOf('Safari') !== -1) {

        return 'Chrome';
    }
};
