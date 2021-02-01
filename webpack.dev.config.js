const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, "build");
const APP_DIR = path.resolve(__dirname, "src");

module.exports = {
    entry: APP_DIR + "/index.js",
    output: {
        path: BUILD_DIR,
        filename: "js/main.[hash:6].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                // options: {
                //     presets: [
                //         "@babel/preset-react",
                //         "@babel/preset-env", {
                //             "include": [
                //                 "@babel/plugin-proposal-object-rest-spread",
                //                 "@babel/plugin-proposal-class-properties"
                //
                //             ]
                //         }
                //     ]
                // },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: ["style-loader", {loader: "css-loader"}, {loader: "sass-loader"}],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: "file-loader?name=images/img-[hash:6].[ext]&publicPath=/",
                exclude: /node_modules/
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader?name=fonts/font-[hash:6].[ext]&publicPath=/",
                exclude: /assets/
            },
            {
                test: /\.(mp4)$/,
                use: "file-loader?name=videos/vid-[hash:6].[ext]&publicPath=/",
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "public/index.html",
            filename: "index.html",
            // favicon: "./assets/favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:6].css",
            chunkFilename: "[id].[hash:6].css",
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true
    },
};
