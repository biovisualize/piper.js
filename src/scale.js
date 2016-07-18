export function scaleX(config){
    var chartWidth = config.width - config.margin.left - config.margin.right;

    var scaleX = d3.scaleUtc()
        .domain(d3.extent(config.data, function(d){ return d[0]; }))
        .range([0, chartWidth]);

    return {
        scaleX: scaleX,
        chartWidth: chartWidth
    };
};

export function scaleY(config){
    var chartHeight = config.height - config.margin.top - config.margin.bottom;

    var scaleY = d3.scaleLinear()
        .domain(d3.extent(config.data, function(d){ return d[1]; }))
        .range([chartHeight, 0]);

    return {
        scaleY: scaleY,
        chartHeight: chartHeight
    };
};