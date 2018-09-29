var scripts = {
    "build": "webpack --config build/webpack.base.js",

    "prod": "webpack --config build/webpack.prod.js",

    "dev": "webpack-dev-server --config build/webpack.dev.js --open",

    "watch": "webpack --watch --config build/webpack.base.js",

    "server": "node build/server.js"
};
