const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        bundle: [
            "./src/index.tsx"
        ],
        vendor: [
            "classnames",
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

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, "src"),
                use: ["react-hot-loader", "ts-loader"]
            },
            {
                test: /\.css$/,
                use: [{loader: "style-loader"}, {loader: "typings-for-css-modules-loader", options: { modules: true, namedExport: true, camelCase: true }}]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify(process.env.NODE_ENV) } })
    ]
};

if (process.env.NODE_ENV === "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    );

    module.exports.resolve.alias = {
        "react": "react-lite",
        "react-dom": "react-lite"
    };
} else {
    module.exports.entry.bundle.unshift("webpack/hot/only-dev-server", "webpack-dev-server/client?http://localhost:8080");
    module.exports.plugins.push(new webpack.NamedModulesPlugin());
}