piper.axisXFormatter = function(_config){
    var config = {
        panel: null,
        dataConverted: null
    };
    piper.utils.override(config, _config);

    config.panel.select('g.axis.x.single')
        .selectAll('.tick:first-child text')
        .text(function(d){
            return d3.time.format('%a')(d);
        });

    return {};
};