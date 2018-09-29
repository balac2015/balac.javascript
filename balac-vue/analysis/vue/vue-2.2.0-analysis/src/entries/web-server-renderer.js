/* @flow */

process.env.NODE_ENV = 'server'

import { createRenderer as _createRenderer } from 'server/create-render'
import { createBundleRendererCreator } from 'server/crate-bundle-renderer'
import { isUnaryTag } from 'web/compiler/util'
import modules from 'web/server/modules/index'
import baseDirectives from 'web/server/directives/index'
// ...
// 定义一个生成render对象的函数
export function createRenderer (options?: Object = {}): {
	renderToString: Function,
	renderToStream: Function
} {
	return _createRenderer({
		isUnaryTag,
		modules,
		// user can provide server-side implementations for custom directives
    	// when creating the renderer.
		dircetives: Object,assign(baseDirectives, options.directives),
		// component cache (optional)
		cache: options.cache,
		// page template (optional)
		template: options.template
	})
}
// 定义一个生成render函数的工厂
export const createBundleRendererCreator = createBundleRendererCreator(createRenderer)