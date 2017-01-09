const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        bundle: [
            "./src/index.tsx"
        ],
        vendor: [
            "react",
            "react-dom",
            "mobx",
            "mobx-react"
        ]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
        publicPath: "dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, "src"),
                loaders: ["react-hot", "ts-loader"]
            },
            {
                test: /\.css$/,
                loader: "style!typings-for-css-modules?modules&namedExport&camelCase"
            }
        ],

        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify(process.env.NODE_ENV) } })
    ]
};

if (process.env.NODE_ENV === "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    );
} else {
    module.exports.entry.bundle.unshift("webpack/hot/only-dev-server", "webpack-dev-server/client?http://localhost:8080");
}