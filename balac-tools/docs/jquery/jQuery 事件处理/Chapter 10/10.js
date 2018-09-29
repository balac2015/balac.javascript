/*
 * 1、追加数据页面
 * 让浏览器响应对某个页面元素的单击。
 * 在单击More Photos链接时，需要执行一次Ajax请求，加载下一组照片并将它们追加到 #gallery
*/
$(document).ready(function(e) {
	
	var pageNum = 1;
	
    $('#more-photos').click(function(e){
		e.preventDefault();
		
		var $link = $(this),
		    url = $link.attr('href');
			
		if (url) {
			$.get(url, function(data) {		// （有问题）
				// $('#gallery').append(data);
				
			});
			
			$('#gallery').append($(this).load(url));
			
			pageNum++;
			if (pageNum < 20) {
			    $link.attr('href', 'pages/' + pageNum + '.html');	
			} else {
				$link.remove();
			}
		}
		
	});
});

/*
 * 2、悬停时显示数据
 * 在用户鼠标移动到照片上的时候显示照片的详细信息。
 * 对点击 More Photos 新添加的照片无响应，
  			* 解决： 1、 在加载了新内容之后“重新绑定”事件处理程序
			*      2、 一开始把事件绑定到包含元素上，不依赖于时间冒泡
			*      3、事件委托
*/
$(document).ready(function(e) {
/*	
    $('div.photo').hover(function(){
		$(this).find('.details').fadeTo('slow', 0.7);	
	}, function(){
		$(this).find('.details').fadeOut('slow');	
	});
*/
	// 组合减少冗余代码
	$('div.photo').on('mouseenter mouseleave', function(e){
		var $details = $(this).find('.details');
		/*
		if (e.type == 'mouseenter') {
			$details.fadeTo('slow', 0.7);	
		} else {
			$details.fadeOut('slow');
		}	
		*/
		// 对 if 条件的简化
		// e.type == 'mouseenter' ? $details.fadeTo('slow', 0.7) : $details.fadeOut('slow');
		
		// 添加一个类，在 mouseenter 事件时添加类，在 mouseleave 事件发生时删除类
		// $(this).find('.details').toggleClass('entered', e.type == 'mouseenter');	
	});	
});

/*
 * 悬停显示数据 ---- 事件委托
*/
$(document).ready(function(e) {
/*	
    $('#gallery').on('mouseover mouseout', function (e) {
		var $target = $(e.target).closest('div.photo'),
			$details = $target.find('.details'),
			$related = $(e.relatedTarget).closest('div.photo');
			
		 if (e.type == 'mouseover' && $target.length) {
		 	$details.fadeTo('fast', 0.7);	 
		 } else if (e.type == 'mouseout' && !$related.length) {
		 	$details.fadeOut('fast');	 
		 }		
	});
*/	
	// 使用 jQuery 的委托方法
	// 在把'div.photo'作为第二个参数的情况下，.on()方法会把this关键字映射为'#gallery'中与该选择符匹配的元素。
	// 委托的作用域，此处为 $('#gallery')，也可用 $(document)（document 是页面中所有元素的祖先，可做所有事件委托的作用域，会有性能的牺牲）
	$('#gallery').on('mouseenter mouseleave', 'div.photo', function (e) {
		var $details = $(this).find('.details');
		e.type == 'mouseenter' ? $details.fadeTo('fast', 0.7) : $details.fadeOut('fast');	
	});
});

/*
	* 早委托
	* 因为没有等待整个文档就绪，所以可以确保所有<div class="photo">元素只要一呈现在页面上就可以应用mouseenter和mouseleave行为。
*/
(function($){
	$(document).on('mouseenter mouseleave', 'div.photo', function (e) {
		var $details = $(this).find('.details');
		e.type == 'mouseenter' ? $details.fadeTo('fast', 0.7) : $details.fadeOut('fast');		
	});	
})(jQuery);