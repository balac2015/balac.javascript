// 注释告诉 Flow： 这个文件需要进行类型检查。为了测试，我们的注释基本上就是在参数或方法名后加一个冒号，关于 Flow 注释的更多使用方法，请查
// @flow

class Dog {
	constructor (name: string) {
		this.name = name;
	}
	bark () {
		return `wah wah, i am ${ this.name }`;
	}
}

export default Dog;