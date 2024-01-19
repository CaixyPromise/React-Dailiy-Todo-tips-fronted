const path = require('path');
//  配置路径别名 @ 指向 src 目录
module.exports = function override(config, env) {
    // 设置路径别名
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src/')
    };

    return config;
};
