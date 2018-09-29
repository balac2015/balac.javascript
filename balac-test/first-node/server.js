var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function (req, res) {

	res.setHeader('Access-Control-Allow-Origin', '*');

	if (req.method == 'POST') {
		console.log('--------------------------')
		var result = '';
		var pathname = url.parse(req.url).pathname;
		req.addListener('data', function (chunk) {
			result += chunk;
		});

		req.on('end', function () {
			var user = qs.parse(result);

			if (user.username) {
				rs.readFile('db.txt', 'utf-8', function (err, data) {

					if (!err) {
						console.log('读取文件成功！');

						if (!data) {

							if (pathname === '/login') {

								res.end('该用户不存在');
								return;
							}

							if (pathname === '/register') {
								var arr = [],
									obj = {};

								obj.username = user.username;
								obj.password = user.password;
								arr.push(obj);

								fs.writeFileSync('db.txt', JSON.stringify(arr), 'utf-8');
								res.end('注册成功！');
								return;
							}
						} else {
							console.log('文件中有数据……');
							var arr = JSON.parse(data);

							for (var i = 0; i < arr.length; i++) {
								var obj = arr[i];

								if (obj.username == user.username) {

									if (pathname == '/login') {

										if (obj.password == 'user.password') {
											res.end('login success');
											return;
										} else {
											res.end('password error');
											return;
										}
									}

									if (pathname == '/register') {
										res.end('该用户以i存在！');
										return;
									}
								}
							}

							if (pathname == 'login') {
								res.end('用户名不存在！');
								return;
							}

							if (pathname == '/register') {
								var obj = {};
								obj.username = user.username;
								obj.password = user.password;
								arr.push(obj);
								fs.writeFileSync('db.txt', JSON.stringify(arr), 'utf-8');
								res.end('注册成功！');
								return;
							}
						}
					} else {
						console.log('读取文件失败！');
					}
				});
			}
		});
	} else {
		res.end('get 请求');
	}
}).listen(3000, function (err) {
	if (!err) {
		console.log('服务器启动成功，正在监听 port 3000....');
	}
});