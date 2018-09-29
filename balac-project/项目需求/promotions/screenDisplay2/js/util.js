/**
 * @file 常用函数
 * @author ex_hujie
 * @version 1.0.1 - 2015-11-23
 */

// 获取今日字符串
function getDateNowString() {
    var date = new Date();
    return date.getFullYear().toString() + formatMin(parseInt(date.getMonth() + 1).toString()) + formatMin(date.getDate());
}

/// 获取年月字符串
function getYearMonthString(year, month) {
    return year.toString() + formatMin(month).toString();
}

// 格式化日期字符串
function formatDateString(date) {
    return date.getFullYear().toString() + '年' + formatMin(parseInt(date.getMonth() + 1).toString()) + '月' + formatMin(date.getDate()) + '日 ' + formatMin(date.getHours()) + ':' + formatMin(date.getMinutes()) + ':' + formatMin(date.getSeconds());
}

// 格式化日期字符串
function formatDateString2(date) {
    return date.getFullYear().toString() + '-' + formatMin(parseInt(date.getMonth() + 1).toString()) + '-' + formatMin(date.getDate());
}

/**
 * 格式化为两位数日期
 *
 * @param date
 * @returns {string}
 */
function formatMin(date) {
    if (date < 10) {
        date = '0' + date;
    }

    return date.toString();
}

/**
 * 从元转化为亿元
 *
 * @param num           元
 * @param bint          是否强行转化为整数
 * @param fixlength     是否强行保留小数点的位数
  */

function dealHmillion(num, bint, fixlength){
    if(typeof (num) != 'undefined' && num != '-' ){
        num = num / 100000000;
        if(num < 100 && (bint == undefined || !bint)){
            if (fixlength != undefined && fixlength > 0) {
                num = num.toFixed(fixlength);
            }
            else {
                if (num < 10)
                    num = num.toFixed(2);
                else
                    num = num.toFixed(1);
            }
        } else {
            num = Math.round(num);
        }
    }
    return num;
}

function dealPlus(num){
    if(parseInt(num) < 0){
        num = 0;
    }
    return num;
}

function dealTThousand(num){
    if(typeof (num) != 'undefined' && num != '-' ){
        num = num / 10000;
        if(num < 1){
            num = num.toFixed(2);
        } else {
            num = parseInt(num);
        }
    }
    return num;
}

// 从万元转化为亿元
function dealHmillion2(num){
    if(typeof (num) != 'undefined' && num != '-' ){
        num = num / 10000;
        if(num < 1){
            num = num.toFixed(2);
        } else {
            num = parseInt(num);
        }
    }
    return num;
}

/**
 * 限制字符串长度 (用于公司名)
 *
 * @param str
 * @param limit
 * @returns {*}
 */
function limitString(str, limit) {
    var strLimit = str;
    if (str != undefined && str.length > limit) {
        strLimit = str.substr(0, limit);
        if (strLimit.indexOf('(') > 0) {        // 去除(
            strLimit = strLimit.substr(0, strLimit.indexOf('('));
        }
    }

    return strLimit;
}

