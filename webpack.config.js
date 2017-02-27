var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './app/app.js',
    output: {
        filename: 'bundle.js',
        path: './public/js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css/,
                loaders: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../css/styles.css")
    ]
}