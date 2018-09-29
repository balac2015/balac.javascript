/* @flow */

import deindent from 'de-indent'
import { parseHTML } from 'compiler/parser/html-parser'
import { markeMap } from 'shared/util'

// 用来匹配换行的正则表达式
const splitRE = /\r?\n/g 
// 定义了一个判断标签是否是script、style、template标签的函数
const isSpecialTag = markeMap('script,style,template', true)

type Attribute = {
	name: string,
	value: string
}

/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 */
// 解析单个 .vue 文件的函数
export function parseComponent (
	// flow 语法：参数后面加（: 类型）表示参数的类型
	content: string,
	// 参数后面加（?: 类型）表示可省略参数和类型， (= {}) 是es6语法，表示参数的默认值……
	options?: Object = {}
	// （function(): 类型）表示函数的返回值类型，
	// 这里的SFCDescriptor是一个自定义类型，定义在flow/complier.js里面
	 // 感觉有点像结构体(struct)，另外flow还支持interface和class的定义
): SFCDescriptor {
	// 最后导出的sfc对象，分为template、script、style和自定义块四部分
    // 其中style和自定义块允许多个，template和script只允许一个
	const sfc: SFCDescriptor = {
		template: null,
		script: null,
		styles: [],
		customBlocks: []
	}
	// 因为最后是使用compiler/parser/html-parser模块进行解析的，而html-parser模块会根据dom结构进行递归解析的，
    // 所以每个代码块都有自己的深度，这里的depth就是用来标记深度的，从后续的代码中可以看出，sfc/parser模块不会处理嵌套的块，只处理一层，这个变量被用来做锁了……
    let depth = 0
    // 当前处理的代码块
    let currentBlock: ?(SFCBlock | SFCCustomBlock) = null

     // 匹配到标签开始时的钩子，主要是对标签的属性进行处理
    function start (
    	tag: string,
    	attrs: Array<Attribute>,
    	unary: boolean,
    	start: number,
    	end: number
    ) {
    	// 根据当前解析深度进行判断
    	if (depth === 0) {
    		// 如果当前深度是0，也就是说不是嵌套的标签，则进行处理
            // 先缓存当前块的信息
    		currentBlock = {
    			type: tag,
    			content: '',
    			// 这里的start是用来标记标签内的内容的起点的
    			start: end,
    			// 设置属性列表这个地方有意思，通过函数定义的flow里面可以看到arrts是个数组，这里通过数组的reduce特性直接把一个[{"key","value"}...]形式的数组转换为{"key":"value"...}形式的对象了
    			attrs: attrs.reduce((cumulated, { name, value }) => {
    				cumulated[name] = value || true
    				return cumulated
    			}, Object.create(null))
    		}
    		// 判断是否是特殊标签
    		if (isSpecialTag(tag)) {
    			// 是特殊标签，则检查标签属性，并对特殊属性进行处理
    			checkAttrs(currentBlock, attrs)
    			// 检查是否是style标签
    			if (tag === 'style') {
    				// 是style标签就推进队列
					sfc.styles.push(currentBlock)
				} else {
					// 不是就直接赋值
					sfc[tag] = currentBlock
				}
    		} else { // custom blocks
    			// 不是特殊标签，则推进自定义标签的队列
    			sfc.customBlocks.push(currentBlock)
    		}
    	}
    	// 这个属性是根据parseHTML接收的options.isUnaryTag返回的，因为在调用parseHTML时没传，所以unary总是false
    	if (!unary) {
    		// 上锁
    		depth++
    	}
    }

    // 检查标签的特殊属性，以便做特殊的处理，特殊属性的使用方法貌似文档中都没有写呢，
    // 貌似这些属性都是给style标签用的，我是从https://github.com/vuejs-templates/webpack 这个项目中看到的相关例子
    function checkAttrs (block: SFCBlock, attrs: Array<Attribute>) {
    	for (let i = 0; i < attrs.length; i++) {
    		const attr = attrs[i]
    		// 可以用lang标签设置style标签内用的预处理语法，less，sass之类的
    		if (attr.name === 'lang') {
    			block.lang = attr.value
    		}
    		// 如果设置了scoped属性，那么这个标签就只对当前组件有作用
    		if (attr.name === 'scoped') {
    			block.scoped = true
    		}
    		// 没找到这个属性是干嘛使的……╮(￣▽￣)╭有可能是为了配合src来用的，module作为src的前缀，
            // 具体参考 https://github.com/vuejs-templates/webpack/blob/17351f5e3b1306a117aaa80b7d575b9aa3144866/docs/static.md#asset-resolving-rules URLs prefixed with 这一小节的说明。            
    		if (attr.name === 'module') {
    			block.module = attr.value || true
    		}
    		// 用src属性设置内容对应的文件
    		if (attr.name === 'src') {
    			block.src = attr.value
    		}
    	}
    }

    // 匹配到标签结束时调用的钩子，主要是对标签里的内容进行处理
    function end (tag: string, start: number, end: number) {
    	// 检查锁的状态，并且标签不是不对称标签(不是<tag/>这样的)
    	if (depth === 1 && currentBlock) {
    		// end标记的是标签内的内容结束的位置
    		currentBlock.end = start
    		// 去除标签内的缩进，deindent是尤大大专门为了去除缩进开发的模块……
    		let text = deindent(content.slice(currentBlock.start, currentBlock.end))
    		// pad content so that linters and pre-processors can output correct
      		// line numbers in errors and warnings
      		// 判断是不是template标签，不是统一都要加pad，目的是在lint报错时，报错信息行数能对应上……
      		if (currentBlock.type !== 'template' && options.pad) {
      			text = padContent(currentBlock) + text
      		}
      		// 给content属性赋值
      		currentBlock.content = text
      		// 至空currentBlock的引用，currentBlock其实已经保存在sfc的属性的引用上了，currentBlock其实只是个临时变量，这里充分的运用了js对象都是引用类型的特性呢……
      		currentBlock = null
    	}
    	// 解锁
    	depth--
    }

    // 用来生成能跟.vue文件行数对应上的内容用的……用来对应lint软件或者预编译软件的报错信息的行数……
    // 话说做框架可真不容易呢，不止要实现功能，连报错信息能不能对应上都要考虑……
    function padContent (block: SFCBlock | SFCCustomBlock) {
    	// 获取当前这段代码到底在多少行
    	const offset = content.slice(0, block.start).split(splitRE).length
    	// 根据不同的块使用不同的换行……
    	const padChar = block.type === 'script' && !block.lang
    		? '//\n'
    		: '\n'
    	// 最后返回对应行数的换行
    	return Array(offset).join(padChar)
    }

    // 这个调用也是整个parseComponent函数最核心的部分，使用compiler/parser/html-parser模块的能力来解析模板
    // parseHTML函数接收一个options参数（第二个），里面可以设置匹配到标签开始和结束时的钩子，通过钩子来获取自己写想要的内容，
 	// 就是说，比如有个<tag>xxx</tag>这样的内容，匹配到<tag>时，执行start，匹配到</tag>时，执行end，
    // 如果匹配到<tab/>，就只执行start，貌似是这样吧，我只粗略的看了下parseHTML，后续详细看发现错了再纠正。
    // 其实直接运行parseHTML不加options也是可以的，只不过不会返回任何的内容，是完全无意义的操作呢……╮(￣▽￣)╭
    parseHTML(content, {
    	start,
    	end
    })

	// 最后返回实例
    return sfc
}