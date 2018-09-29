
/**
  * hasClass() 筛选 class
  */
function hasClass (elem, cls) {
	var reClass = new RegExp(' ' + cls + ' ');
	return reClass.test(' ' + elem.className + ' ');
}
// hasClass() 使用
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
	if (hasClass(divs[i], 'poem-stanza') && !hasClass(divs[i], 'highlight')) {
		divs[i].className += 'highlight';
	}
}
// jQuery 解决
$('div.poem-stanza').addClass('highlight');


/**
 * jQuery 选择元素相关
 */
$('#selected-plays li:not(.horizontal)').addClass('sub-level'); 	// 否定式伪类元素负，#selected-plays 后代中否定 class 的 li 元素

$('a[href^="http"][href*="henry"]').addClass('henrylink'); 			// 属性选择符，组合使用，* 匹配任意位置

$('tr:even').addClass('alt');			// 自定义选择符，找到所有的 tr 然后在其中选择奇数，:even 奇数选择，:odd 偶数选择

$('tr').filter(':even').addClass('alt');							// 重写 $('tr:even').addClass('alt');

$('tr:nth-child(odd)').addClass('alt');								// :nth-child() 从 1 开始计数

$('td:contains(content)').addClass('highlight');					// 基于上下文内容选择元素	

$('input[type="radio"]:checked')									// 可选择所有选中的单选按钮

$('input[type="password"], input[type="text"]:disabled')   			// 选择所有密码输入字段和禁用的文本输入字段。

var myTag = $('#my-element').get(0).tagName;						// 获取元素的标签名，$('#my-element').get(0) 为 DOM 对象

var myTag = $('#my-element')[0].tagName;							// .get() 简写方式
	
// 必须包含一个带有域名（this.hostname）的href属性。这个测试可以排除 mailto 及类似链接。链接指向的域名（还是this.hostname）必须不等于（!=）页面当前所在域的名称（location.hostname）。
$('a').filter(function(){
	return this.hostname && this.hostname != location.hostname;
}).addClass('external');


/**
 * jQuery 事件处理相关
 */
 // 事件委托
$('#switcher').on('click', 'button', function(){	// 第二个参数为选择符表达式，绑定到 $() 对象，同时 event.target 和选择符表达式比较
	// jQuery会把click事件处理程序绑定到#switcher对象，同时比较event.target和选择符表达式（这里的'button'）。如果匹配，jQuery会把this关键字映射到匹配的元素，否则不会执行事件处理程序。
}); 

// 为事件处理程序添加命名空间
$().on('click.collapse', function(event){});
$().off('click.collapse');

// 键盘响应事件
$(document).keyup(function(){					// 所有键盘事件最终都会冒泡到 document 元素
	var key = String.fromCharCode(event.which); // 事件对象的.which 属性包含着被按下的那个键的标识符。对字母键而言，这个标识符就是相应大写字母的ASCII值。
});

// 模仿用户操作
$().click();		// 或 $().trigger('click');