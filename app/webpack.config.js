const HtmlWebPackPlugin = require("html-webpack-plugin");
const babelConfig = require('../babel.config');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelConfig
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),

        new webpack.DefinePlugin({
            __DEV__: true,
            __PROFILE__: true,
            __UMD__: true,
            'process.env.NODE_ENV': "'development'",
            __EXPERIMENTAL__: false,
            // Enable forked reconciler.
            // NOTE: I did not put much thought into how to configure this.
            __VARIANT__: false,
        }),

        new webpack.NormalModuleReplacementPlugin(/(.*)\/SchedulerHostConfig(\.*)|(.*)\/ReactFiberHostConfig(\'|\.)/, resource => {
            resource.request = resource.request.replace(/\/SchedulerHostConfig/g, '/forks/SchedulerHostConfig.default');
            //resource.request = resource.request.replace(/\/ReactFiberHostConfig/g, '/forks/ReactFiberHostConfig.dom');
        }),
    ],
    resolve: {
        alias: {
            'shared/invariant': path.resolve(__dirname, 'polyfills/invariant'),
            'shared/ReactSharedInternals': 'react/src/ReactSharedInternals',
            shared: path.resolve(__dirname, '../packages/shared'),
            'react-reconciler': path.resolve(__dirname, '../packages/react-reconciler'),
            react: path.resolve(__dirname, '../packages/react'),
            'react-dom': path.resolve(__dirname, '../packages/react-dom'),
            scheduler: path.resolve(__dirname, '../packages/scheduler'),
            'object-assign': 'shared/forks/object-assign.inline-umd',
        }
    }
};