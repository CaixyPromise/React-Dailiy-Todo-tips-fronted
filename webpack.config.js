const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json', '.tsx', '.ts'],
        alias: {
            '@/': path.resolve('src'),
        }
    }
}