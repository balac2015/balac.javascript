	构造 jQuery 对象

	jQuery 对象由构造函数 jQuery() 创建，$() 是 jQuery() 的缩写。类数组对象、length 属性、jQuery 方法


构造函数 jQuery()

	构造函数 jQuery() 有 7 种用法（传入参数的不同）
	
		jQuery( selector [,context] ) 接受一个 CSS 选择器表达式和可选的选择器上下文

				返回一个包含了匹配的 DOM 元素的 jQuery 对象

		jQuery( html [,ownerDocument] )、jQuery( html, props )

				用提供的 HTML 代码创建 DOM 元素

		jQuery( element )、jQuery( elementArray )

				封装 DOM 元素为 jQuery 对象

		jQuery( object )

				封装普通对象为 jQuery 对象

		jQuery( Callbacks )

				绑定 ready 事件监听函数，当 DOM 结构加载完成时执行

		jQuery( jQuery object )

				接受一个 jQuery 对象，返回该 jQuery 对象的拷贝副本

		jQuery()

				创建一个空 jQuery 对象


	jQuery( selector [,context] )

		selector 传入的是 string，则检查是选择器表达式（未匹配则返回空 jQuery 对象，其 length = 0）还是 HTML 代码

			简单的 '#id' 且未指定 context，则用原生 document.getElementById 查找元素，否则复杂的用 .find() 查找

		context 限定查找范围（上下文），默认 document，如 $('span', this).addClass('bar');


	jQuery( html [,ownerDocument] )、jQuery( html, props )
		
		html 传入的是 html 代码，则会创建包含 DOM 元素的 jQuery 对象。

			单独标签：$('<img/>')、$('<a></a>') 会用原生 document.createElement() 创建 DOM 元素，否则复杂的用浏览器的 innerHTML 创建（过程由 jQuery.buildFragment()、jQuery.clean() 实现）

		ownerDocument 指定创建新 DOM 元素的文档对象，默认当前文档

		html 是单独标签时，第二个参数可以是 props（包含属性、事件的普通对象，创建 DOM 后，props 被传给 .attr() ）

			$('<div/>', {		// 可含特殊属性：val, css, html, text, data, width, height, offset 对应方法将被执行（属性值为参数）
				'class': 'test',	// 关键字
				text: 'click me',	// 其它属性被设置到创建的 DOM 上
				click: function() {	// 会做浏览器兼容的属性：type, value, tabiindex 等
					$(this).toggleClass('test');
				}
			}).appendTo('body');		
		

	jQuery( element )、jQuery( elementArray )
		
		传入 DOM 元素或 DOM 元素数组，返回 jQuery 对象。如 $(this)


	jQuery( object )
		
		传入普通 JS 对象，可方便实现自定义事件的绑定和触发
		
			var $foo = $( { foo: 'bar', hello: 'world' } );						
			$foo.on('custom', function() {});		// 自定义事件 custom
			$foo.trigger('custom');					// 触发事件


	jQuery( Callbacks )
		
		传入函数，则在 document 上绑定 ready 事件监听函数，当 DOM 加载完成时执行。

		ready 事件早于 load 事件	

		ready 事件是 DOMContentLoaded 事件、onreadystatechange 事件、doScrollCheck() 的统称，不是原生事件


	jQuery( jQuery object )
		
		传入 jQuery 对象，返回副本。副本与传入的 jQuery 对象引用完全相同的 DOM 元素


	jQuery()
		
		不传参数，返回空 jQuery 对象，length 为 0

		可用来复用 jQuery 对象，空 jQuery 对象在需要时先手动修改其中的元素，再调用方法，避免重复创建 jQuery 对象


总体结构：

// 构造 jQuery 对象模块的总体源码结构
(function( window, undefined) {

var jQuery = (function() {
	var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	},
	// 一堆局部变量声明
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		init: function( selector, context, rootjQuery ) { ... },
		// 一堆原型属性和方法
	};
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend = jQuery.fn.extend = function() { ... };
	jQuery.extend({
		// 一堆静态属性和方法
	});
	return jQuery;
});
// 省略其它模块的代码
window.jQuery = window.$ = jQuery; 	
})();	


jQuery.fn.init( selector, context, rootjQuery)
	
	负责解析参数 selector、context 的类型，并执行相应逻辑，最后返回 jQuery.fn.init() 的实例

	init: function( selector, context, rootjQuery ) {	// 99  定义构造函数 jQuery.fn.init()
		var match, elem, ret, doc;						// 100

	99 行，selector 参数，可接受任意类型值，有效的为：undefined, dom, 字符串，函数，jQuery 对象，对象，其它值没有意义

			context 参数，可不传，或传入 dom, jQuery 对象，对象 	

			rootjQuery 参数，应用场景：

				document.getElementById() 查找失败 

					return rootjQuery.find( selector )

				selector 是选择器表达式且未指定 context 

					return ( context || rootjQuery ).find( selector )

				selector 是函数 

					return rootjQuery.ready( selector )

				定义 rootjQuery

					rootjQuery = jQuery( document ); 


	selector 参数可转换为 false（undefined, '', null 等）
		
		直接返回 this（空 jQuery 对象，其 length = 0）	

		if ( !selector ) {
			return this;
		}

	selector 参数是 DOM 元素 

		if ( selector.nodeType ) {		// 有 nodeType 属性，则认为是 DOM 元素
			this.context = this[0] = selector;	// 手动设置第一个元素、属性 context 指向该 DOM 元素
			this.length = 1;			// 属性 length
			return this;				// 返回包含了该 DOM 元素应用的 jQuery 对象
		}

		nodeType 属性声明了文档树中节点的类型。（Element 节点该属性值是 1，Comment 节点是 9，Document 对象是 9，DocumentFragment 节点是 11）

	selector 参数是字符串 'body'

		if ( selector === 'body' && !context && document.body ) { //文档树中只会存在一个 body 元素
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}		

	selector 参数是其它字符串：先检测 selector 是 HTML 代码还是 #id

		if ( typeof selector === 'string' ) {
			if ( selector.charAt( 0 ) === '<' && selector.charAt( selector.length - 1 ) === '>' && selector.length >= 3 ) {
				match = [null, selector, null];			// 假设是 HTML 代码，不表示合法："<div></p>"
			} else {
				match = quickExpr.exec( selector );		// 正则检测是否是复杂的 HTML 代码，如 "abc<div>", #id
			}
		}

		正则 quickExpr 的定义：

			quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, // 两个分组，依次匹配 HTML 代码和 id，

				匹配成功，数组 match 第一个元素为参数 selector，第二个为匹配的 HTML 代码或 undefined，第三个为匹配的 id 或 undefined

				quickExpr.exec( '#target' );		// ['#target', undefined', 'target']
				quickExpr.exec( '<div>' );			// ['<div>', '<div>', undefined]
				quickExpr.exec( 'abc<div>' );		// ['abc<div>', ']	
				quickExpr.exec( 'abc<div>abc#id' );	// ['abc<div>abc#id', <'div>', undefined]
				quickExpr.exec( 'div' );			// null
				quickExpr.exec( '<div><img></div>' );// ['<div><img></div>', <div><img></div>', undefined]

		selector 参数是单独标签，调用 document.createElement() 创建对应 DOM

			if ( match && ( match[1] || !context )) {	
				if ( match[1] ) {					// selector 为 HTML 代码
					context = context instanceof jQuery ? context[0] : context;		// 修正 context
					doc = ( context ? context.ownerDocument || context : document );// 修正 doc

					ret = rsingleTag.exec( selector );	// 检测 HTML 代码是否是单独标签
					if ( ret ) {
						if ( jQuery.isPlainObject( context )) {			// 检测对象是否是“纯粹”的对象
							selector = [ document.createElement( ret[1] )];
							jQuery.fn.attr.call( selector, context, true );
						} else {
							selector = [ doc.createElement( ret[1] )];
						}
					}
				}
			}

		正则 rsingleTag 定义：

			rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/; 检测 HTML 代码是否是单独标签，返回数组

			(\w+) 分组，不包含左右尖括号、不包含属性，可自关闭或不关闭，\1 指向匹配的第一个分组

		selector 是复杂 HTML 代码，利用浏览器的 innerHTML 机制创建 DOM 元素

			else {
				ret = jQuery.buildFragment( [ match[1] ], [ doc ] );	// 由 jQuery.buildFragment() 和 jQuery.clean() 实现
				// 缓存条件下，使用转换后的 DOM 元素时先复制再使用，否则直接使用
				selector = ( ret.cacheable ? jQuery.clone( ret.fragment) : ret.fragment ).childNodes;
			}
			return jQuery.merge( this, selector );

			jQuery.buildFragment() 返回值的格式：

				{
					fragment: 含有转换后的 DOM 元素的文档片段
					cacheable: HTML 代码是否满足缓存条件
				}

		selector 是 '#id'，且未指定参数 context，调用 document.getElementById() 查找 DOM 元素

			else {
				elem = document.getElementById( match[2] );
				if ( elem && elem.parentNode ) {		// Blackberry 4.6 会返回已经不在文档中的 DOM 节点
					if ( elem.id !=== match[2] ) {		// 找到的 id 属性与传入的值不相等时
						return rootjQuery.find( selector );
					}
					this.length = 1;
					this[0] = elem;
				}
				this.context = document;
				this.selector = selector;
				return this;							// 返回当前 jQuery 对象
			}

		参数 selector 是选择器表达式

			else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );
			} else {
				return this.constructor( context ).find( selector );	// 上下文不是 jQuery 对象时
			}


	selector 参数是函数

		else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );	// 即 $(function) 是 $(document).ready(function) 的缩写
		}


	selector 参数是 jQuery 对象

		if ( selector.selector !== undefined ) {	// 有 selector 属性则认为是 jQuery 对象
			this.selector = selector.selector;
			this.context = selector.context;
		}


	selector 参数是任意其他值
		
		return jQuery.makeArray( selector, this );

		selector 是数组或伪数组（如 jQuery 对象），都添加到当前 jQuery 对象中，	

		selector 是 JS 对象，作为第一个元素放入到当前 jQuery 对象中，

		其它类型的值，作为第一个元素放入当前 jQuery 对象中。最后返回当前 jQuery 对象中
			

	总结：jQuery.fn.init( selector, context, rootjQuery ) 12 分支：相关判断和执行过程：



jQuery.buildFragment( args, nodes, scripts )
	
	实现原理：jQuery.buildFragment 此案创建一个文档片段 DocumentFragment, 然后调用 jQuery.clean( elems, context, fragment, scripts ) 将 HTML 代码转换为 DOM 元素，并存储在创建文档片段中。

		DocumentFragment 为文档的一部分，插入文档树时插入 DocumentFragment 的所有子孙节点，若 HTML 符合缓存，则先把 DOM 缓存 

		jQuery.buildFragment() 同时为 jQuery 对象和 DOM 操作提供底层支持


	源码分析，jQuery.buildFragment( args, nodes, scripts ) 执行的 5 个关键步骤：	

		1、若 HTML 代码符合缓存条件，则尝试从缓存对象 jQuery.fragments 中读取缓存的 DOM 元素 

		2、创建文档片段 DocumentFragment

		3、调用 jQuery.clean( elems, context, fragment, scripts ) 将 HTML 转换为 DOM，并存储在创建的文档片段中

		4、若 HTML 代码符合缓存条件，则把转换后的 DOM 元素放入缓存对象 jQuery.fragments 

		5、最后返回文档片段和缓存状态 { fragment: fragment, cacheable: cacheable }


	定义 jQuery.buildFragment( args, nodes, scripts )

		jQuery.buildFragment = function( args, nodes, scripts )

			args 参数：数组，待转换为 DOM 元素的 HTML 代码

			nodes，数组，含有文档对象、jQuery 对象或 DOM 元素，用于修正创建文档片段 DocumentFragment 的文档对象

			scripts，数组，存放 HTML 代码中的 scripts 元素，传给 jQuery.clean() 后会提取 DOM 中的 script 元素并存入 scripts，.domManip( args, table, callback ) 把 DOM 传入文档树后，会手动执行数组 scripts 中的元素


	定义局部变量，修正文档对象			

		var fragment, cacheable, cacheresults, doc,
			first = args[ 0 ];
		if ( nodes && nodes[0] ) {
			doc = nodes[0].ownerDocument || nodes[0];
		}
		if ( !doc.createDocumentFragment ) {	// $('abc<div></div>', {'class': 'test'}) 时 doc 为 {'class':'test'} 情况的排除
			doc = document;
		}


	尝试从缓存对象 jQuery.fragments 中读取缓存的 DOM 元素

		if ( args.length === 1 && typeof first === 'string' && first.length < 512 && doc === document && first.charAt(0) === '<' && !rnocache.test( first ) && (jQuery.support.checkClone || !rchecked.test( first )) && (jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {
			cacheable = true;
			cacheresults = jQuery.fragments[ first ];
			if ( cacheresults && cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
		jQuery.fragments = {};

		HTML 代码长度小于 512（1 / 2KB），否则可能会导致缓存占用内存过大

		只缓存当前文档创建的 DOM 元素，只缓存 DOM 元素 

		正则 rnocache = /<(?:script|object|embed|option|style)/i;  不能含有的标签

		正则 rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i;  单选按钮和复选框是否被选中的检测

		正则 rnoshimcache = 'abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video'; 是否含 H5 标签的检测

		rnoshimcache = new RegExp( '<(?:' + nodeNames + ')' , 'i' )		

	...


jQuery.clean( elems, context, fragment, scripts )
	
	实现原理：负责把 HTML 代码转换成 DOM 元素，并提取其中的 script 元素，

	...


jQuery.extend()、jQuery.fn.extend()
	
	用于合并两个或多个对象的属性到第一个对象：常用语编写插件和处理函数的参数

		jQuery.extend( [deep], target, object1 [,objectN] )

		jQuery.fn.extend( [deep], target, object1 [,objectN] )

	...


原型属性和方法（构造 jQuery 对象模块时，除 .init(), .extend() 外的属性和方法）
	
	.selector, .jquery, .length, .size()

	.toArray(), .get( [index] )

	.each( function(index, element) ), jQuery.each( collection, callback(indexInArray, valueOfElement) )

	.mat( callback(index, domElement) ), jQuery.map( arrayOrObject, callback(value, indexOrKey) )

	.pushStack( elements, name, arguments )

	.end()

	.eq( index ), .first(), .last(), .slice( start[, end] )

	.push( value, ... ), .sort( [orderfunc] ), .splice( start, deleteCount, value, ... )


静态属性和方法（是其它模块实现的基础）
	
	jQuery.noConflict( [removeAll] )

	类型检查：jQuery.isFunction( obj ), jQuery.isArray( obj ), jQuery.isWindow( obj ), jQuery.isNumberic( value ), jQuery.type( obj ), jQuery.isPlainObject( object ), jQuery.isEmptyObject( object )

	解析 JSON 和 XML：jQuery.parseJSON( data ), jQuery.parseXML( data )

	jQuery.globalEval( code )

	jQuery.camelCase( string )

	jQuery.nodeName( elem, name )

	jQuery.trim( str )

	数组操作方法：jQuery.makeArray( obj ), jQuery.inArray( value, array[, fromIndex] ), jQuery.merge( first, second ), jQuery.grep( array, function())

	jQuery.guid, jQuery.proxy( function, context )

	jQuery.access( elems, key, value, exec, fn( elem, key, value ), pass )

	jQuery.eror( message ), jQuery.noop(), jQuery.now()

	浏览器嗅探：jQuery.uaMatch( ua ), jQuery.browser

