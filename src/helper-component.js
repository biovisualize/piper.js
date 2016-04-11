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

piper.HTMLTooltip = function(_config){
    var config = {
        container: null,
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        eventPanel: null,
        mousemove: null,
        mouseenter: null,
        mouseout: null,
        chartWidth: null,
        chartHeight: null
    };
    piper.utils.override(config, _config);
    if(!config.mousemove){
        piper.utils.override(config, piper.hoverEvents(config));
    }

    var tooltipContainer = d3.select(config.container)
        .selectAll('div.tooltip')
        .data([0]);
    tooltipContainer.enter().append('div').classed('tooltip', true);

    var tooltip = piper.tooltipWidget(tooltipContainer.node());

    config.mousemove.on(function(d){
        var pos = d.shapePositionFromContainer;
        // var pos = d.mouseFromContainer;
        tooltip.setPosition([pos[0] + 10, pos[1] - 10]).setText(d.data.y);
    });
    config.mouseenter.on(function(d){ tooltip.show(); });
    config.mouseout.on(function(d){ tooltip.hide(); });

    return {};
};

piper.hoverCircle = function(_config){
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        eventPanel: null,
        mousemove: null,
        mouseenter: null,
        mouseout: null,
        chartWidth: null,
        chartHeight: null
    };
    piper.utils.override(config, _config);
    if(!config.mousemove){
        piper.utils.override(config, piper.hoverEvents(config));
    }

    var circleComponent = function(circleNode) {
        var root = d3.select(circleNode)
            .attr({
                r: 4
            })
            .style({
                'pointer-events': 'none'
            });
        var position = function(pos) {
            root.attr({
                transform: 'translate(' + pos + ')'
            });
            return this;
        };
        var show = function() {
            root.style({
                display: 'block'
            });
            return this;
        };
        var hide = function() {
            root.style({
                display: 'none'
            });
            return this;
        };

        return {
            setPosition: position,
            show: show,
            hide: hide
        };
    };

    var circleContainer = config.panel
        .selectAll('circle.hover')
        .data([0]);
    circleContainer.enter().append('circle').classed('hover', true);

    var tooltip = circleComponent(circleContainer.node());

    config.mousemove.on(function(d){ tooltip.setPosition(d.shapePosition); });
    config.mouseenter.on(function(d){ tooltip.show(); });
    config.mouseout.on(function(d){ tooltip.hide(); });

    return {};
};