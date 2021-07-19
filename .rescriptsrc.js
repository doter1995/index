const { name } = require('./package');

module.exports = {
    webpack: (config) => {
        config.output.filename = 'static/js/[name].js'
        config.output.chunkFilename = 'static/js/[name].chunk.js'
        config.output.publicPath = '//localhost:3001/'
        config.output.library = `${name}-[name]`;
        config.output.libraryTarget = 'umd';
        config.output.jsonpFunction = `webpackJsonp_${name}`;
        config.output.globalObject = 'window';

        return config;
    },

    devServer: (_) => {
        const config = _;

        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        config.historyApiFallback = true;
        config.hot = false;
        config.watchContentBase = false;
        config.liveReload = false;

        return config;
    },
};