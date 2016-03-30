piper.data = function(_config){
    var config = {
        data: null
    };
    piper.utils.override(config, _config);

    var dataConverted = config.data.map(function(d, i){
        return {
            x: i,
            y: d
        }
    });

    return {
        dataConverted: dataConverted
    };
};