const config = {
    // 指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配:
    resolve: {
        extensions: ['.js', '.jsx', '.cscc', '.json']
    }
};

module.exports = config;
