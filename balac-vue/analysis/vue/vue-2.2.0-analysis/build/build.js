const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const uglify = require('uglify-js')

if (!if.existsSync('dist')) {
	fs.mkdirSync('dist')
}

let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
	const filters = process.argv[2].split(',')
	builds = builds.filter(b => {
		return filters.some(f => b.dest.indexOf(f) > -1)
	})
} else {
	// filter out weex builds by default
	builds = builds.filter(b => {
		return b.dest.indexOf('weex') === -1
	})
}

build(builds)

function build (builds) {
	let built = 0
	const total = builds.length
	const next = () => {
		buildEntry(builds[built]).then(() => {
			built++

			if (built < total) {
				next()
			}
		}).catch(logError)
	}
	next()
}

function buildEntry (config) {
	const isProd = /min\.js$/.test(config.dest)

	return rollup.rollup(config).then(bundle => {
		const code = bundle.generate(config).code

		if (isProd) {
			var minified = (config.banner ? config.banner + '\n' : '') + uglify.minify(code, {
				formString: true,
				output: {
					screw_ie8: true,
					ascii_only: true
				}
				compress: {
					pure_funcs: ['makeMap']
				}
			}).code

			return write(config.dest, minified, true)
		} else {
			return write(config.dest, code)
		}
	})
}

function write (dest, code, zip) {
	return new Promise(resolve, reject) => {
		function report (extra) {
			console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
			resolve()
		}

		fs.writeFile(dest, code, err => {
			if (err) {
				return 
			}
		})
	}
}