exports.cssLoaders = (options) => {
    
};

exports.styleLoaders = (options) => {
    let output = [],
        loaders = exports.cssLoaders(options);

    for (let extension in loaders) {
        let loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
};