var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {

	var params = url.parse(request.url, true).query;
	var str = {
		id: params.id,
		name: params.name
	};
	var aa = JSON.stringify(str);

	response.writeHeader(200, {
		'Content-Type': 'text/plain',
		'charset': 'utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
	});

	// 大长串解决跨域
	response.write(aa);

	// 返回的数据必须是 string 或者 buffer，不然一直报错，ajax 端设置为 json
	response.end();
});

server.listen(3300);
console.log('server is running at port 3300');