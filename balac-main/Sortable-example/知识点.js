// 查看 st/app.js

// canvas 返回包含图片展示的 data URI（https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL）

// DOMContentLoaded 事件

// Background
document.addEventListener("DOMContentLoaded", function () {
	function setNoiseBackground(el, width, height, opacity) {
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var val = Math.floor(Math.random() * 255);
				context.fillStyle = "rgba(" + val + "," + val + "," + val + "," + opacity + ")";
				context.fillRect(i, j, 1, 1);
			}
		}

		el.style.background = "url(" + canvas.toDataURL("image/png") + ")";
	}

	setNoiseBackground(document.getElementsByTagName('body')[0], 50, 50, 0.02);
}, false);

var loadScripts = function (desc, callback) {
		var deps = [], key, idx = 0;

		for (key in desc) {
			deps.push(key);
		}

		(function _next() {
			var pid,
				name = deps[idx],
				script = document.createElement('script');

			script.type = 'text/javascript';
			script.src = desc[deps[idx]];

			pid = setInterval(function () {
				if (window[name]) {
					clearTimeout(pid);

					deps[idx++] = window[name];

					if (deps[idx]) {
						_next();
					} else {
						callback.apply(null, deps);
					}
				}
			}, 30);

			document.getElementsByTagName('head')[0].appendChild(script);
		})()
	},

	console = window.console;


if (!console.log) {
	console.log = function () {
		alert([].join.apply(arguments, ' '));
	};
}