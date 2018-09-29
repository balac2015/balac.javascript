// 构建运行时配置的通用验证函数：#object validation rules
const schema = {
	first: { required: true },
	last: { required: true }
};
// universal validation function
const validate = (schema, values) => {
	for (field in schema) {
		if (schema[field].required && !values[field]) {
			return false;
		}
	}
	return true;
};

console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true