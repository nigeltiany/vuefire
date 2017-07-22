var path = require('path');
module.exports = {
    entry: ['./src/vuefire.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'vuefire.js',
        library: ['vuefire'],
        libraryTarget: 'umd'
    },
    devtool: "source-map",
    plugins: [
    ],
    module: {
        loaders: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}