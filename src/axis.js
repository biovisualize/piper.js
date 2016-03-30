piper.axisX = function(_config){
    var config = {
        scaleX: null,
        axisXFormat: '%H:%M',
        axisXTimeResolution: 'minutes',
        axisXTimeSteps: 2
    };
    piper.utils.override(config, _config);

    var axisX = d3.svg.axis()
        .scale(config.scaleX)
        .orient('bottom');

    return {
        axisX: axisX
    };
};

piper.axisY = function(_config){
    var config = {
        scaleY: null,
        chartWidth: null,
        margin: null,
        axisYPadding: 0
    };
    piper.utils.override(config, _config);

    var axisY = d3.svg.axis()
        .scale(config.scaleY)
        .orient('left')
        .ticks(6, 's')
        .tickPadding(10);

    return {
        axisY: axisY
    };
};