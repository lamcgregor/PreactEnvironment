module.exports = {
    entry: './app/app.js',
    output: {
        filename: 'bundle.js',
        path: 'views'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}