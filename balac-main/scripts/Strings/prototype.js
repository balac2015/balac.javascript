/**
 * 对 String.prototype 的扩展
 */

 /**
  * 清除字符串中的空格
  * @param {Number} 1 去掉字符串开头空格，-1 去掉字符串结尾空格，0 去掉前后空格，undefined 去掉字符串中所有的空格
  * @return {String} 去除指定空格后的字符串
  */
 String.prototype.trim = function () {
     let args = Array.prototype.slice.call(arguments, 0, 1)[0];

    if (args === 1) {
        return this.replace(/(^\s*)/g, "");           // 去除字符串开头空格
    }

    if (args === -1) {
        return this.replace(/(\s*$)/g, "");           // 去除字符串末尾空格
    }

    if (args === 0) {
        return this.replace(/(^\s*)|(\s*$)/g, "");    // 去除前后空格
    }

    if (args === undefined) {
        return this.replace(/(\s*)/g, "");           // 去除所有空格
    }
 };

 /**
  * 转为字符串片段为大写
  * @param {Number} start 需要截取字符串的开始位置
  * @param {Number | undefined} end 需要截取字符串的结束位置
  * @return {String} 字符串
  */
 String.prototype.toUpperString = function (start = 0, end = this.length) {
     // 需要转换的部分字符串片段
     const str = this.slice(start, end).toUpperCase();

     return this.replace();  // 转换后的字符串，
 };
 // 字符串片段转换为小写
 String.prototype.toLowerString = function (start = 0, end = this.length) {};
 // 字符串片段大小写互换
 String.prototype.to反转String = function (start = 0, end = this.length) {};

 /**
  * 每个单词首字母大小写转换 "my name is tome" => "My Name Is Tome"
  */
