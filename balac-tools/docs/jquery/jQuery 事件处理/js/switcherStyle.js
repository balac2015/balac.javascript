/**
 * switcherStyle.js 样式转换器（参考：jQuery 基础教程（第四版），第三章 事件）

 * 按钮的点击效果（通过点击按钮完成类名的切换来改变样式）

 * 样式转换器的显示/隐藏事件（能够隐藏/显示按钮）

 * 知识点：1、jQuery 事件委托，事件目标：event.target == this
 		   2、事件命名空间，便于识别特定的处理程序
 		   3、键盘事件

	.on() 可指定任何 DOM 事件，并为该事件添加一种行为
	
	.is() 接收选择符表达式为参数，测试当前 jquery 对象，对象集合中至少有一个匹配则返回 true

	.hasClass() 可测试任何选择符表达式

	学习：.split() 
*/
$(document).ready(function(){

	var oldClass = document.body.className || '';		// 获取 body 的初始类名
	var defaultStyle = 'media-md';						// 默认的当前设备类名
	var triggers = {									// 映射键码和对应的按钮
		X: 'media-xs',
		S: 'media-sm',
		M: 'media-md',
		L: 'media-lg'
	};

	// 设置样式
	var setStyle = function (clsName) {

		// 问题：clsName="media-md switcher-selected" 时，body 的添加筛选掉 "switcher-selected"
		$('body').removeClass().addClass(clsName + ' ' + oldClass);

		if (clsName.indexOf('switcher-selected') < 0) {
			$('.' + clsName).addClass('switcher-selected').siblings().removeClass('switcher-selected');
		}		
		
		$('#switcher').off('click.collapse', toggleSwitcher);
		if (clsName.indexOf(defaultStyle) >= 0) {
			$('#switcher').on('click.collapse', toggleSwitcher);
		}
	};	

	// 样式转换器的扩展/折叠处理
	var toggleSwitcher = function (event) {
		
		if (!$(event.target).is('input')) {
			$('#switcher input[type="button"]').toggleClass('switcher-hidden');
		}
	};

	// 处理 .off() 关闭的转化器点击事件
	$('#switcher').on('click.collapse', toggleSwitcher);

	// 转换器的点击、鼠标悬停事件
	$('#switcher')
		.click(function(event){
			if ($(event.target).is('input')) {
				setStyle(event.target.className);
			}
		})
		.hover(function(){
			$(this).addClass('switcher-hover');
		}, function(){
			$(this).removeClass('switcher-hover');
		});

	// 键盘按键事件
	$(document).keyup(function(event){
		// 转换为大写的 ASCII 值，事件对象的 .which 属性包含着被按下的那个键的标识符
		var key = String.fromCharCode(event.keyCode);
		if (key in triggers) {
			setStyle(triggers[key]);
		}
	});

	// 初始化	
	$('#switcher').trigger('click');					// 模拟用户单击，或 $('#switcher').click();
	$('#switcher input[type="button"].' + defaultStyle).addClass('switcher-selected');
	$('body').addClass(defaultStyle);


});