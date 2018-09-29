// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(function(){
    // 在需要多次使用某个jQuery对象时，最好也把这个对象保存到一个变量中，从而达到缓存数据的目的
    var $speech = $('div.speech');
    var defaultSize = $speech.css('fontSize');

   $('#switcher button').click(function(){
        var size = parseInt($speech.css('fontSize'));

       switch(this.id) {
           case 'switcher-large':
               size *= 1.4;
               break;
           case 'switcher-small':
               size /= 1.4;
               break;
           default:
               size = parseInt(defaultSize);
       }
       // $speech.css('fontSize', size + 'px');

       $speech.animate({fontSize: size + 'px'}, 'slow');
   });
});

$(function(){
   var $firstPara = $('p').eq(1);
    $firstPara.hide();

   $('a.more').click(function(e){
       e.preventDefault();  // 阻止默认操作

       // slideToggle()
       // $firstPara.slideToggle('slow');

       // animate()，一次添加多个动画效果
       $firstPara.animate({
           height: 'toggle',
           opacity: 'toggle'
       }, 'slow');

       var $link = $(this);
       if ($link.text() == 'read more') {
           $link.text('read less');
       } else {
           $link.text('read more');
       }
   });
});

$(document).ready(function(){
    $('div.label').click(function(){
        var paraWidth = $('div.speech p').outerWidth();
        var $switcher = $(this).parent();
        var switcherWidth = $switcher.outerWidth();

        // 多个属性添加动画
        $switcher.css({position: 'relative'})
			.animate({
				borderWidth: '5px',
				left: paraWidth - switcherWidth,
				height: '+=20px'    // 在原来基础上再以动画方式变化20像素
        	}, 'slow');

        // 一组元素的多重效果
        $switcher
            .css({position: 'relative'})
            .animate({left: paraWidth - switcherWidth}, 'slow')
            .animate({height: '+=20px'}, 'slow')
            .animate({borderWidth: '5px'}, 'slow');
		
		// 连缀
		$switcher 
			.css({position: 'relative'})
			.fadeTo('fast', 0.5)	// 将其不透明度减退为0.5。
			.animate({left: paraWidth - switcherWidth}, 'slow')  // 将其移动到右侧。
			.fadeTo('slow', 1.0)	// 将其渐增回完全不透明。
			.slideUp('slow')		// 隐藏它。
			.slideDown('slow');		// 再将其显示出来。
			
		// 越过队列，.animate() 的第二种形式（透明度减半 fast 的同时右移 slow）
		$switcher 
			.css({position: 'relative'})
			.fadeTo('fast', 0.5)	// 将其不透明度减退为0.5。
			.animate({
				left: paraWidth - switcherWidth
			}, {			// 第二个参数，选项对象
				duration: 'slow',
				queue: false	// queue选项，把该选项设置为false即可让当前动画与前一个动画同时开始。
			})
			.fadeTo('slow', 1.0)	// 将其渐增回完全不透明。
			.slideUp('slow')		// 隐藏它。
			.slideDown('slow');		// 再将其显示出来
			
		// 手工队列，排队不能自动应用到其他的非效果方法，如.css()，在.slideUp()执行后但在.slideDown()执行前，把<div id="switcher">的背景颜色修改为红色
		$switcher 
			.css({position: 'relative'})
			.fadeTo('fast', 0.5)	// 将其不透明度减退为0.5。
			.animate({
				left: paraWidth - switcherWidth
			}, {			// 第二个参数，选项对象
				duration: 'slow',
				queue: false	// queue选项，把该选项设置为false即可让当前动画与前一个动画同时开始。
			})
			.fadeTo('slow', 1.0)	// 将其渐增回完全不透明。
			.slideUp('slow')		// 隐藏它。
			// .css({backgroundColor: '#f00'})		// 即使在连缀的正确位置上，但在单击后立即执行，
			.queue(function(next){		// .queue()方法就可以把函数添加到相应元素的效果队列中。
				$switcher.css({backgroundColor: '#f00'});
				next();		// 调用 next() 其返回的结果将作为参数传给回调函数。添加的这个next ()方法可以让队列在中断的地方再接续起来，然后再与后续的.slideDown ('slow')连缀在一起。如果在此不使用next()方法，动画就会中断。
			})
/*			
			// slideUp() 回调函数使用
			.slideUp('slow', function(){
				$switcher.css({backgroundColor: '#f00'});	
			})
			*/
			.slideDown('slow');		// 再将其显示出来
		
    });
});

$(function(){
	$('p').eq(2)
		.css('border', '1px solid #333')
		.click(function(){
			var $clickedItem = $(this);
			$clickedItem.next().slideDown('slow', function(){
				$clickedItem.slideUp('slow');	
			});
		});	
	$('p').eq(3).css('backgroundColor', '#ccc').hide();
});