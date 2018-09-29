// https://github.com/RubaXa/Sortable
var sortable = new Sortable(el, {
	/**
	 * @group: String | Object
	 * 'string': ''	从一个列表拖到另一个列表中，两个列表必须具有相同的 group 值
	 *	'object': {
	 *		name: '',	// 同 group string
	 *		pull: true | false | 'clone' | function,	// 定义从列表容器中移出去的设置
	 *		put: true | false | ['foo', 'bar'] | function,	// 定义往这个容器放置列表单元的设置，['foo', 'bar'] 代表 group 的 name 值
	 *		revertClone: boolean		// 移动到另一个列表后，将克隆的元素恢复到初始位置
	 *	}	 
	 */
	group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }

	// 列表中是否可拖拽排序
	sort: true,  // sorting inside list

	// 鼠标选中列表项后可以开始拖动的延迟时间
	delay: 0, // time in milliseconds to define when the sorting should start

	// 与 options.fallbackTolerance	类似，在取消延迟排序之前必须发生的最小指针移动。值 3 ~ 5 之间最好
	// delay 设置后，即使您的手指没有移动，一些具有非常敏感触摸显示屏的手机（如三星Galaxy S8）也会触发不需要的触摸移动事件，从而导致排序无法触发。
	touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event

	// 拖放排序等功能是否可用，sortable.option('disabled') // get, sortable.option('disabled', true);	// set
	disabled: false, // Disables the sortable if set to true.


	store: null,  // @see Store

	// 定义排序动画的时间
	animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
	
	// 列表元素的 .my-handle 区域允许拖动，其他区域可文本选择。（Sortable 将默认禁用用户的文本选择，使列表项可拖动）
	handle: ".my-handle",  // Drag handle selector within list items
	
	// 定义不能进行拖放的项的类名
	filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
	preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
	
	// 定义那些项可进行拖放类名
	draggable: ".item",  // Specifies which items inside the element should be draggable
	
	// 拖动时在放置处产生的影子元素的类名
	ghostClass: "sortable-ghost",  // Class name for the drop placeholder

	// 当选中列表项时，增加的类名
	chosenClass: "sortable-chosen",  // Class name for the chosen item

	// 当拖动时增加的类名
	dragClass: "sortable-drag",  // Class name for the dragging item
	dataIdAttr: 'data-id',

	// true 时，将不使用原生的html5的拖放，可以修改一些拖放中元素的样式等
	forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

	// forceFallback 为 true 时，拖放元素的类名
	fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
	
	// 将克隆的 DOM 添加到 body
	fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
	
	// 模拟本机阻力阈值，3px 到 5px 可能是很好的
	// 单击元素时，按下时间到释放时间移动的阈值，超过阈值算作拖动
	fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

	// 当排序的容器是个可滚动的区域，拖放可以引起区域滚动
	scroll: true, // or HTMLElement
	// 有自定义滚动条时的处理
	scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
	// 定义鼠标必须靠近边缘以开始滚动的方式。
	scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
	// 鼠标指针进入scrollSensitivity距离后窗口应滚动的速度
	scrollSpeed: 10, // px

	setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
		dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
	},

	// Element is chosen
	onChoose: function (/**Event*/evt) {
		evt.oldIndex;  // element index within parent
	},

	// Element dragging started
	onStart: function (/**Event*/evt) {
		evt.oldIndex;  // element index within parent
	},

	// Element dragging ended
	onEnd: function (/**Event*/evt) {
		var itemEl = evt.item;  // dragged HTMLElement
		evt.to;    // target list
		evt.from;  // previous list
		evt.oldIndex;  // element's old index within old parent
		evt.newIndex;  // element's new index within new parent
	},

	// Element is dropped into the list from another list
	onAdd: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Changed sorting within list
	onUpdate: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Called by any change to the list (add / update / remove)
	onSort: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Element is removed from the list into another list
	onRemove: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Attempt to drag a filtered element
	onFilter: function (/**Event*/evt) {
		var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
	},

	// Event when you move an item in the list or between lists
	onMove: function (/**Event*/evt, /**Event*/originalEvent) {
		// Example: http://jsbin.com/tuyafe/1/edit?js,output
		evt.dragged; // dragged HTMLElement
		evt.draggedRect; // TextRectangle {left, top, right и bottom}
		evt.related; // HTMLElement on which have guided
		evt.relatedRect; // TextRectangle
		originalEvent.clientY; // mouse position
		// return false; — for cancel
	},

	// Called when creating a clone of element
	onClone: function (/**Event*/evt) {
		var origEl = evt.item;
		var cloneEl = evt.clone;
	}
});

事件对象：（事件对象在各个函数中略有不同，可通过输出对象查看对象的属性，下面简单列举几个）

	to：HTMLElement--移动到列表容器
	from：HTMLElement--来源的列表容器
	item：HTMLElement--被移动的列表单元
	clone：HTMLElement--副本的列表单元
	oldIndex：number/undefined--在列表容器中的原序号
	newIndex：number/undefined--在列表容器中的新序号

Method:
	// @name {String}
	// @value {undefined | *}
	// @return {*}
	.option(name [, value])	// get or set the option

	// @el {String}
	// @selector {HTMLElement | undefined}
	// @return {HTMLElement | null}
	.closest(el [, selector])

	// @return {String[]}
	.toArray()		// Serializes the sortable's item data-id's (dataIdAttr option) into an array of string.

	.sort(order)

	.save()

	.destory()

// 保存和恢复排序
<ul>
	<li data-id="1">order</li>
	<li data-id="2">save</li>
	<li data-id="3">restore</li>
</ul>
Sortable.create(el, {
	group: "localStorage-example",
	store: {
		/**
		 * Get the order of elements. Called once during initialization.
		 * @param   {Sortable}  sortable
		 * @returns {Array}
		 */
		get: function (sortable) {
			var order = localStorage.getItem(sortable.options.group.name);
			return order ? order.split('|') : [];
		},

		/**
		 * Save the order of elements. Called onEnd (when the item is dropped).
		 * @param {Sortable}  sortable
		 */
		set: function (sortable) {
			var order = sortable.toArray();
			localStorage.setItem(sortable.options.group.name, order.join('|'));
		}
	}
})	