nodejs 全栈项目初探
	
	https://juejin.im/post/59f72b72f265da43163c5b09
	
	简易博客系统，基于 nodejs, express, mongodb

	前台功能：注册登陆、内容分页、分类展示

	后台功能：

	技术栈：nodejs - 搭建基本的后端环境

		express - 实现页面路由设计、页面渲染、后端数据处理

		mongoose - nodejs 与 mongodb 数据库连接的桥梁，定义数据库表结构、构建表模型、通过操作表模型实现对数据库的增删改查。

		ajax - 实现用户注册、登录相关逻辑判断与验证、无刷新提交平论、获取评论

		body-parser -  用于处理前端post请求提交过来的数据

		cookies -  保持用户登录状态，作为中间变量传递给模板实现逻辑上的渲染

		es6 - 模板字符串渲染评论，后端数据回馈的大面积promise操作

		swig - 模板渲染引擎，实现页面的引用、继承、代码的复用从而提高页面性能