piper.thresholdLine = function(_config){
    var config = {
        panel: null,
        scaleY: null,
        margin: null,
        chartWidth: null,
        thresholdY: null
    };
    piper.utils.override(config, _config);

    if(typeof config.thresholdY !== 'number'){
        return {};
    }

    var scaledThresholdY = config.scaleY(config.thresholdY);
    var path = 'M' + [[0, scaledThresholdY], [config.chartWidth + 6, scaledThresholdY]].join('L');

    var shapes = config.panel.selectAll('path.threshold')
        .data([0]);
    shapes.enter().append('path')
        .attr({
            'class': 'threshold shape'
        })
        .style({fill: 'none'});
    shapes.attr({
        d: path
    });
    shapes.exit().remove();

    return {};
};

piper.thresholdLineLabel = function(_config){
    var config = {
        panel: null,
        scaleY: null,
        margin: null,
        chartWidth: null,
        thresholdY: null,
        thresholdYLabel: null
    };
    piper.utils.override(config, _config);

    if(!config.thresholdYLabel){
        return {};
    }

    var scaledThresholdY = config.scaleY(config.thresholdY);
    var path = 'M' + [[0, scaledThresholdY], [config.chartWidth + 6, scaledThresholdY]].join('L');

    var text = config.panel.selectAll('text.threshold-label')
        .data([0]);
    text.enter().append('text')
        .attr({
            'class': 'threshold-label',
            x: config.chartWidth + 8,
            y: scaledThresholdY + 2
        });
    text.text(config.thresholdYLabel);
    text.exit().remove();

    return {};
};

piper.verticalLine = function(_config){
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        chartHeight: null,
        margin: null,
        verticalLineX: null,
        verticalLineValue: null
    };
    piper.utils.override(config, _config);

    var scaledverticalLineX = config.scaleX(config.verticalLineX);
    var path = 'M' + [[scaledverticalLineX, 0], [scaledverticalLineX, config.chartHeight]].join('L');

    var shapes = config.panel.selectAll('path.vertical-line')
        .data([0]);
    shapes.enter().append('path')
        .attr({
            'class': 'vertical-line shape'
        });
    shapes.attr({
        d: path
    });
    shapes.exit().remove();

    var label = config.panel.selectAll('text.vertical-line-label')
        .data([0]);
    label.enter().append('text')
        .attr({
            'class': 'vertical-line-label'
        });
    label.attr({
        x: scaledverticalLineX + 2,
        y: config.chartHeight + config.margin.top + config.margin.bottom / 4
    })
    .text(config.verticalLineValue);
    shapes.exit().remove();

    return {};
};