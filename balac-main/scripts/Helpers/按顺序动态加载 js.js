/**
 * js文件的动态加载一般是通过在 HTML 里面追加 <script> 标签进行处理，但是有时候动态追加的几个js文件有先后的依赖顺序，
 * 例如 a.js、b.js、c.js 依次依赖，如果直接用追加 <script> 标签方法可能会导致先加载完 c.js，但是 a.js 和 b.js 没加载完导致报错。
 *
 * 解决的按顺序动态加载 js 文件的方案是按顺序等待文件加载，依次等待上一个 js 文件加载完后再加载下一个文件
 */ 

/**
 * js列表加载索引
 * @type {number}
 * @private
 */
var _index = 0;

/**
 * 加载js文件
 * @name loadJs
 * @param {String} url
 * @param {Function} callback   文件加载后回调时间
 */
  function loadJs(url, callback) {
    var _script = document.createElement('script');
    _script.src = url;
    success = success || function(){};

    if(navigator.userAgent.indexOf("MSIE")>0){
        _script.onreadystatechange = function(){
            if('loaded' === this.readyState || 'complete' === this.readyState){
                callback();
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            }
        }
    }else{
        _script.onload = function(){
            callback();
            this.onload = this.onreadystatechange = null;
            this.parentNode.removeChild(this);
        }
    }
    document.getElementsByTagName('head')[0].appendChild(_script);
}
    
/**
 * 加载 js 文件列表
 * @name loadJsList
 * @param {Array} arr
 */
export function loadJsList (arr) {

	if(_index < arr.length) {
		loadJs(arr[_index], function () {
			_index++;
			loadJs(arr[_index]);
		});
	}
}