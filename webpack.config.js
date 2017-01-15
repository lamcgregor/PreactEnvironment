module.exports = {
    entry: './app/app.js',
    output: {
        filename: 'bundle.js',
        path: './public/js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}