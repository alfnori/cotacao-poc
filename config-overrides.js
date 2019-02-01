
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    console.log(config);
    config.devServer = {
        historyApiFallback: true,
    };
    return config;
}