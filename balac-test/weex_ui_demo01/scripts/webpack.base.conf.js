const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config.js');

const rootPath = path.resolve(__dirname, '..', 'src')
const entryFile = path.join(rootPath, config.entryFile)

// const content = require(entryFile);

// // console.log( entryFile )
// // const content = fs.readFileSync(entryFile, 'utf8');
// content('index')

config.outputFile.forEach((entry) => {
    let content = require(entryFile)(entry);

    console.log('=======', content)
});


process.exit(1);



var assetsPath = (_path) => {
  return path.posix.join(__dirname, _path)
};
// webpack configuration
var getBaseConfig = () => {
    return {
        /*
        entry: () => {
            return fs.readdirSync('src').reduce((entrys, file) => {
                if (entryFiles.indexOf(file) !== -1) {
                    let name = file.split('.')[0];
                    entrys[name] = path.resolve('src', file);
                }

                return entrys;
            }, {});
        },
        */
        entry: () => {
            return '';
        },
        output: {
            path: path.join(__dirname, '../dist')
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.join(__dirname, '..', 'src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.vue(\?[^?]+)?$/,
                    use: [
                        {
                            loader: 'vue-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: assetsPath('media/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: '// { "framework": "Vue"} \n',
                raw: true,
                exclude: 'Vue'
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, '..', 'src/assets'),
                    to: 'assets',
                    ignore: ['.*']
                }
            ])
        ]
    };
};


// Config for compile jsbundle for web.
const webConfig = getBaseConfig();
webConfig.output.filename = '[name].web.js';

// Config for compile jsbundle for native.
const weexConfig = getBaseConfig();
weexConfig.output.filename = '[name].js';


module.exports = [webConfig, weexConfig];
