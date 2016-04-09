piper.eventCatchingLayer = function(_config){
    var config = {
        panel: null,
        chartWidth: null,
        chartHeight: null,
    };
    piper.utils.override(config, _config);

    var dispatch = d3.dispatch('mousemove');

    var eventPanelContainer = config.panel
        .selectAll('g.event-panel-container')
        .data([0]);
    eventPanelContainer.enter().append('g')
        .attr({
            'class': 'event-panel-container'
        })
        .append('rect')
        .attr({
            'class': 'event-panel'
        });
    eventPanelContainer.exit().remove();

    var eventPanel = eventPanelContainer.select('.event-panel')
        .attr({
            width: config.chartWidth,
            height: config.chartHeight
        })
        .style({
            visibility: 'hidden',
            'pointer-events': 'all'
        });

    return {eventPanel: eventPanel, dispatch: dispatch};
};

piper.events = function(_config){
    var config = {
        eventer: null,
        dispatch: null
    };
    piper.utils.override(config, _config);

    if(config.eventer){
        d3.rebind(config.eventer, config.dispatch, 'on');
    }
    return {};
};

piper.tooltipComponent = function(_config){
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        eventPanel: null,
        chartWidth: null,
        chartHeight: null,
        dispatch: null,
        eventer: null
    };
    piper.utils.override(config, _config);
    var newConfig = piper.eventCatchingLayer(config);
    piper.utils.override(config, newConfig);
    newConfig = piper.events(config);
    piper.utils.override(config, newConfig);

    var dataConvertedX = config.dataConverted.map(function(d){ return d.x; });
    var deltaX = config.scaleX(dataConvertedX[1]) - config.scaleX(dataConvertedX[0]);

    var tooltipGroup = config.panel
        .selectAll('g.tooltip-container')
        .data([0]);
    tooltipGroup.enter().append('g')
        .attr({
            'class': 'tooltip-container',
            'pointer-events': 'none'
        })
        .style({visibility: 'hidden'})
        .append('circle')
        .attr({
            'class': 'tooltip-circle',
            r: 3
        });
    tooltipGroup.exit().remove();

    var valueGroup = config.panel
        .selectAll('g.value-container')
        .data([0]);
    valueGroup.enter().append('g')
        .attr({
            'class': 'value-container',
            'pointer-events': 'none'
        })
        .style({visibility: 'hidden'})
        .append('text')
        .attr({
            'class': 'value-label',
            dx: 2,
            dy: -4
        });
    valueGroup.exit().remove();

    var lineGroup = config.panel
        .selectAll('g.line-container')
        .data([0]);
    lineGroup.enter().append('g')
        .attr({
            'class': 'line-container',
            'pointer-events': 'none'
        })
        .style({visibility: 'hidden'})
        .append('line')
        .attr({
            'class': 'tooltip-line'
        });
    lineGroup.exit().remove();

    var valueLabel = valueGroup.select('.value-label');
    var tooltipCircle = tooltipGroup.select('.tooltip-circle');
    var tooltipLine = lineGroup.select('.tooltip-line');

    config.eventPanel
        .on('mouseenter', function(d){
            tooltipGroup.style({visibility: 'visible'});
            valueGroup.style({visibility: 'visible'});
            tooltipLine.style({visibility: 'visible'});
        })
        .on('mouseout', function(d){
            tooltipGroup.style({visibility: 'hidden'});
            valueGroup.style({visibility: 'hidden'});
            tooltipLine.style({visibility: 'hidden'});
        })
        .on('mousemove', function(d, i){
            var mouse = d3.mouse(this);
            var dateAtCursor = config.scaleX.invert(mouse[0] - deltaX / 2);
            var dataPointIndexAtCursor = d3.bisectLeft(dataConvertedX, dateAtCursor);
            var dataPointAtCursor = config.dataConverted[dataPointIndexAtCursor];
            if(dataPointAtCursor){
                var xValue = dataPointAtCursor.x;
                var value = dataPointAtCursor.y;
                var x = config.scaleX(xValue);
                var y = config.scaleY(value);
                tooltipGroup.attr({transform: 'translate(' + [x, y] + ')'});
                valueGroup.attr({transform: 'translate(' + [0, y] + ')'});
                valueLabel.text(value);
                tooltipLine.attr({
                    x1: 0,
                    y1: y,
                    x2: x,
                    y2: y
                });
            }
            config.dispatch.mousemove(dataPointAtCursor);
    });

    return {};
};