/** 
 *  
 * 可上下滚动菜单

 * @author ex_hujie
 * @date 2015-11-217
 *
 */

/**
 * 创建滚动菜单实体
 * @param menuObject		菜单
 * @param menu_index		菜单列表中的序号
 * @param onIndexChanged	当菜单选项改变后,调用此接口
 */
function newScrollMenu(menuObject, menu_index, onIndexChanged) {
	this.menuObject = menuObject;
	this.menu = $('#' + menuObject.menu_id);
	this.menu_index = menu_index;
	this.onIndexChanged = onIndexChanged;
}

/**
 * 顺序播放
 * @param menus
 * @param menu_index
 */
function menu_playInterval(menus, menu_index) {
	if (menus[menu_index].chart != null) {
		menus[menu_index].index++;
		if (menus[menu_index].index >= menus[menu_index].count)
			menus[menu_index].index = 0;
		menu_makeItemVisible($('#' + menus[menu_index].menu_id), menus[menu_index].index, menus[menu_index].options);
		menus[menu_index].menu_object.changeActiveIndex();

		if (menus[menu_index].chart.component.timeline != null) {
			menus[menu_index].chart.component.timeline.next();
		}
	}
}

/**
 * 激活项可见
 *
 * @param menu
 * @param activeIndex
 * @param options
 */
function menu_makeItemVisible(menu, activeIndex, options) {
	if (options != undefined) {
		if (activeIndex < options.showIndex) {
			menu_scrollUpStep(menu, options, options.showIndex - activeIndex);
		}
		else if (activeIndex > options.showIndex + options.showLines - 1) {
			menu_scrollDownStep(menu, options, activeIndex - (options.showIndex + options.showLines - 1));
		}
	}
}

/**
 * 向下滚动
 *
 * @param menu
 * @param options
 * @param step
 */
function menu_scrollDownStep(menu, options, step) {
	for(i=0;i<step;i++) {
		var start=$("li:first", menu);
		start.css("display","none");
		start.appendTo(menu);
		$("li:eq("+(options.showLines-1)+")",menu).each(function(){
			$(this).css("display","block");
		})
	}
	options.showIndex += step;
}

/**
 * 向上滚动
 *
 * @param menu
 * @param options
 * @param step
 */
function menu_scrollUpStep(menu, options, step) {
	var count = $("li",menu).length;
	for(i=0;i<step;i++) {
		var end=$("li:eq("+(options.showLines-1)+")", menu);
		end.css("display","none");
		var start = $("li:eq("+(count-1)+")", menu);
		start.css("display","block");
		start.prependTo(menu);
	}
	options.showIndex -= step;
}

newScrollMenu.prototype= {
	/**
	 * 初始化菜单
	 */
	init: function() {
		if (this.menuObject.options != undefined) {
			// 返回到起点
			if (this.menuObject.options.showIndex > 0) {
				var step = this.menuObject.options.showIndex;
				menu_scrollUpStep(this.menu, this.menuObject.options, step)
			}

			// 初始化显示
			$("li", this.menu).each(function () {
				$(this).css("display", "none");
			})
			$("li:lt(" + this.menuObject.options.showLines + ")", this.menu).each(function () {
				$(this).css("display", "block");
			})

			this.menuObject.options.showIndex = 0;
		}
	},

	// 响应菜单滚动消息
	onMouseWheel: function(delta) {
		if (delta < 0)
			this.scrollDown();
		else
			this.scrollUp();
	},

	// 向下滚动
	scrollDown: function() {
		var count = $("li", this.menu).length;
		if (this.menuObject.options.showIndex + this.menuObject.options.showLines < count) {
			var step = (count - (this.menuObject.options.showIndex + this.menuObject.options.showLines) < this.menuObject.options.scrollNum) ? count - (this.menuObject.options.showIndex + this.menuObject.options.showLines) : this.menuObject.options.scrollNum;
			menu_scrollDownStep(this.menu, this.menuObject.options, step)
		}
	},

	// 向上滚动
	scrollUp: function() {
		if (this.menuObject.options.showIndex > 0) {
			var step = (this.menuObject.options.showIndex < this.menuObject.options.scrollNum) ? this.menuObject.options.showIndex : this.menuObject.options.scrollNum;
			menu_scrollUpStep(this.menu, this.menuObject.options, step)
		}
	},

	/**
	 * 改变menu选中状态
	 */
	changeActiveIndex: function() {
		var menuItems = $('#' + this.menuObject.menu_id + ' li');
		var activeClass = 'active';
		var showIndex = 0;
		if (this.menuObject.options != undefined) {
			showIndex = this.menuObject.options.showIndex;
		}
		for (var i = 0; i < this.menuObject.count; i++) {
			var item = menuItems.eq(i);
			if (i == this.menuObject.index - showIndex) {
				if (!item.hasClass(activeClass))
					item.addClass(activeClass);
			}
			else {
				if (item.hasClass(activeClass))
					item.removeClass(activeClass);
			}
		}

		// 通知UI, 菜单选项改变了
		if (this.onIndexChanged !== undefined) {
			this.onIndexChanged(this.menu_index);
		}
	},

	/**
	 * 手工选中菜单中某项
	 *
	 * @param index
	 */
	selectMenuIndex: function(index) {
		if (this.menuObject.interval_id != null)
			clearInterval(this.menuObject.interval_id);

		if (this.menuObject.options != undefined) {
			index += this.menuObject.options.showIndex;
		}
		this.menuObject.index = index;
		this.changeActiveIndex();

		if (this.menuObject.chart != null && this.menuObject.chart.component.timeline != null) {
			this.menuObject.chart.component.timeline.play(index, false);
		}
		this.menuObject.interval_id = setInterval('menu_playInterval(' + this.menuObject.name + ', ' + this.menu_index + ')', menu_play_interval);
	}

}