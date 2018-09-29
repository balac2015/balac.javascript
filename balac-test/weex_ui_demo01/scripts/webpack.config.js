module.exports = (env) => {
    let webpackConfig;

    switch (env.NODE_ENV) {
        case "prod":
        case "production":
            webpackConfig = require('./webpack.prod.conf.js');
            break;
        case "test":
        case "testing":
            webpackConfig = require('./webpack.test.conf.js');
            break;
        case "plugin":
            let buildPlugins = require('./plugin.js');
            buildPlugins();
            break;
        case "base":
        case "common":
            webpackConfig = require('./webpack.base.conf.js');
            break;
        case "dev":
        case "development":
        default:
            webpackConfig = require('./webpack.dev.conf.js');
            break;
    }
    
            webpackConfig = require('./webpack.base.conf.js');

    return webpackConfig;
};
