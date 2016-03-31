var piper = {
    version: "0.1.0"
};

piper.utils = {
    pipeline: function() {
        var fns = arguments;
        var that = this;
        return function(config) {
            for (var i = 0; i < fns.length; i++) {
                var cache = fns[i].call(this, config);
                config = that.mergeAll(config, cache);
            }
        };
    },
    override: function(_objA, _objB) {
        for (var x in _objB) {
            if (x in _objA) {
                _objA[x] = _objB[x];
            }
        }
    },
    merge: function(obj1, obj2) {
        for (var p in obj2) {
            if (obj2[p] && obj2[p].constructor == Object) {
                if (obj1[p]) {
                    this.merge(obj1[p], obj2[p]);
                    continue;
                }
            }
            obj1[p] = obj2[p];
        }
    },
    mergeAll: function() {
        var newObj = {};
        var objs = arguments;
        for (var i = 0; i < objs.length; i++) {
            this.merge(newObj, objs[i]);
        }
        return newObj;
    }
};

piper.barChartAutoConfig = function(_config) {
    return {
        axisYPadding: 20
    };
};

piper.data = function(_config) {
    var config = {
        data: null
    };
    piper.utils.override(config, _config);
    var dataConverted = config.data.map(function(d, i) {
        return {
            x: i,
            y: d
        };
    });
    return {
        dataConverted: dataConverted
    };
};

piper.dataTime = function(_config) {
    var config = {
        data: null
    };
    piper.utils.override(config, _config);
    var dataConverted = config.data.map(function(d, i) {
        return {
            x: d.timestamp,
            y: d.value
        };
    });
    return {
        dataConverted: dataConverted
    };
};

piper.scaleX = function(_config) {
    var config = {
        dataConverted: null,
        margin: null,
        width: null,
        scaleType: null
    };
    piper.utils.override(config, _config);
    var chartWidth = config.width - config.margin.left - config.margin.right;
    var dataX = config.dataConverted.map(function(d) {
        return d.x;
    });
    var scaleX = d3.scale.linear().domain(d3.extent(dataX)).range([ 0, chartWidth ]);
    return {
        scaleX: scaleX,
        chartWidth: chartWidth
    };
};

piper.scaleXTime = function(_config) {
    var config = {
        dataConverted: null,
        margin: null,
        width: null,
        scaleType: null
    };
    piper.utils.override(config, _config);
    var chartWidth = config.width - config.margin.left - config.margin.right;
    var dataX = config.dataConverted.map(function(d) {
        return d.x;
    });
    var scaleX = d3.time.scale().domain(d3.extent(dataX)).range([ 0, chartWidth ]);
    return {
        scaleX: scaleX,
        chartWidth: chartWidth
    };
};

piper.scaleY = function(_config) {
    var config = {
        dataConverted: null,
        margin: null,
        height: null
    };
    piper.utils.override(config, _config);
    var chartHeight = config.height - config.margin.top - config.margin.bottom;
    var dataY = config.dataConverted.map(function(d) {
        return d.y;
    });
    var scaleY = d3.scale.linear().domain(d3.extent(dataY)).range([ chartHeight, 0 ]);
    return {
        scaleY: scaleY,
        chartHeight: chartHeight
    };
};

piper.scaleYStartAt0 = function(_config) {
    var config = {
        dataConverted: null,
        margin: null,
        height: null
    };
    piper.utils.override(config, _config);
    var chartHeight = config.height - config.margin.top - config.margin.bottom;
    var dataY = config.dataConverted.map(function(d) {
        return d.y;
    });
    var scaleY = d3.scale.linear().domain([ 0, d3.max(dataY) ]).range([ chartHeight, 0 ]);
    return {
        scaleY: scaleY,
        chartHeight: chartHeight
    };
};

piper.axisX = function(_config) {
    var config = {
        scaleX: null,
        axisXFormat: "%H:%M",
        axisXTimeResolution: "minutes",
        axisXTimeSteps: 2
    };
    piper.utils.override(config, _config);
    var axisX = d3.svg.axis().scale(config.scaleX).orient("bottom");
    return {
        axisX: axisX
    };
};

piper.axisY = function(_config) {
    var config = {
        scaleY: null,
        chartWidth: null,
        margin: null,
        axisYPadding: 0
    };
    piper.utils.override(config, _config);
    var axisY = d3.svg.axis().scale(config.scaleY).orient("left").ticks(6, "s").tickPadding(10);
    return {
        axisY: axisY
    };
};

piper.panelComponent = function(_config) {
    var config = {
        container: null,
        width: null,
        height: null,
        margin: null
    };
    piper.utils.override(config, _config);
    var root = d3.select(config.container).selectAll("svg").data([ 0 ]);
    root.enter().append("svg").attr({
        "class": "piper-chart"
    }).append("g").attr({
        "class": "panel"
    });
    root.attr({
        width: config.width,
        height: config.height
    });
    root.exit().remove();
    var panel = root.select("g.panel").attr({
        transform: "translate(" + config.margin.left + "," + config.margin.top + ")"
    });
    return {
        root: root,
        panel: panel
    };
};

piper.axisComponentX = function(_config) {
    var config = {
        axisX: null,
        chartHeight: null,
        panel: null
    };
    piper.utils.override(config, _config);
    var axisX = config.panel.selectAll("g.axis.x").data([ 0 ]);
    axisX.enter().append("g").attr({
        "class": "x axis",
        transform: "translate(" + [ 0, config.chartHeight ] + ")"
    });
    axisX.transition().attr({
        transform: "translate(" + [ 0, config.chartHeight ] + ")"
    }).call(config.axisX);
    axisX.exit().remove();
    return {};
};

piper.singleAxisComponentX = function(_config) {
    var config = {
        axisX: null,
        panel: null
    };
    piper.utils.override(config, _config);
    var axisX = config.panel.selectAll("g.axis.x.single").data([ 0 ]);
    axisX.enter().append("g").attr({
        "class": "x axis single"
    });
    axisX.transition().call(config.axisX);
    axisX.exit().remove();
    return {};
};

piper.axisComponentY = function(_config) {
    var config = {
        axisY: null,
        panel: null,
        axisYPadding: null
    };
    piper.utils.override(config, _config);
    var padding = config.axisYPadding || 0;
    var axisY = config.panel.selectAll("g.axis.y").data([ 0 ]);
    axisY.enter().append("g").attr({
        "class": "y axis",
        transform: "translate(" + [ -padding / 2, 0 ] + ")"
    });
    axisY.transition().call(config.axisY);
    axisY.exit().remove();
    return {};
};

piper.axisTitleComponentX = function(_config) {
    var config = {
        panel: null,
        axisTitleX: null,
        chartHeight: null,
        chartWidth: null
    };
    piper.utils.override(config, _config);
    var axisTitleX = config.panel.selectAll("text.axis-title.x").data([ 0 ]);
    axisTitleX.enter().append("text").attr({
        "class": "x axis-title"
    });
    axisTitleX.text(config.axisTitleX || "").attr({
        x: config.chartWidth - 40,
        y: config.chartHeight + 40
    });
    axisTitleX.exit().remove();
    return {};
};

piper.axisTitleComponentY = function(_config) {
    var config = {
        panel: null,
        axisTitleY: null
    };
    piper.utils.override(config, _config);
    var axisTitleY = config.panel.selectAll("text.axis-title.y").data([ 0 ]);
    axisTitleY.enter().append("text").attr({
        "class": "y axis-title"
    });
    axisTitleY.text(config.axisTitleY || "").attr({
        x: -40,
        y: -10
    });
    axisTitleY.exit().remove();
    return {};
};

piper.tresholdLine = function(_config) {
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        margin: null,
        chartWidth: null,
        thresholdY: null
    };
    piper.utils.override(config, _config);
    if (typeof config.thresholdY !== "number") {
        return {};
    }
    var scaledThresholdY = config.scaleY(config.thresholdY);
    var path = "M" + [ [ config.margin.left, scaledThresholdY ], [ config.chartWidth, scaledThresholdY ] ].join("L");
    var shapes = config.panel.selectAll("path.treshold").data([ 0 ]);
    shapes.enter().append("path").attr({
        "class": "treshold shape"
    }).style({
        fill: "none"
    });
    shapes.attr({
        d: path
    });
    shapes.exit().remove();
    return {};
};

piper.verticalLine = function(_config) {
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
    var path = "M" + [ [ scaledverticalLineX, 0 ], [ scaledverticalLineX, config.chartHeight ] ].join("L");
    var shapes = config.panel.selectAll("path.vertical-line").data([ 0 ]);
    shapes.enter().append("path").attr({
        "class": "vertical-line shape"
    });
    shapes.attr({
        d: path
    });
    shapes.exit().remove();
    var label = config.panel.selectAll("text.vertical-line-label").data([ 0 ]);
    label.enter().append("text").attr({
        "class": "vertical-line-label"
    });
    label.attr({
        x: scaledverticalLineX + 2,
        y: config.chartHeight + config.margin.top + config.margin.bottom / 4
    }).text(config.verticalLineValue);
    shapes.exit().remove();
    return {};
};

piper.shapePanel = function(_config) {
    var config = {
        panel: null
    };
    piper.utils.override(config, _config);
    var shapePanel = config.panel.selectAll("g.shapes").data([ 0 ]);
    shapePanel.enter().append("g").attr({
        "class": "shapes"
    });
    shapePanel.exit().remove();
    return {
        shapePanel: shapePanel
    };
};

piper.areaShapes = function(_config) {
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        shapePanel: null
    };
    piper.utils.override(config, _config);
    var newConfig = piper.shapePanel(config);
    piper.utils.override(config, newConfig);
    var area = d3.svg.area().defined(function(d) {
        return d.y != null;
    }).x(function(d) {
        return config.scaleX(d.x);
    }).y(function(d) {
        return config.scaleY(d.y);
    }).y0(config.scaleY.range()[0]);
    var shapes = config.shapePanel.selectAll("path.line").data([ config.dataConverted ]);
    shapes.enter().append("path").attr({
        "class": "line shape"
    });
    shapes.attr({
        d: area
    });
    shapes.exit().remove();
    return {};
};

piper.lineShapes = function(_config) {
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        shapePanel: null
    };
    piper.utils.override(config, _config);
    var newConfig = piper.shapePanel(config);
    piper.utils.override(config, newConfig);
    var line = d3.svg.line().defined(function(d) {
        return d.y != null;
    }).x(function(d) {
        return config.scaleX(d.x);
    }).y(function(d) {
        return config.scaleY(d.y);
    });
    var shapes = config.shapePanel.selectAll("path.line").data([ config.dataConverted ]);
    shapes.enter().append("path").attr({
        "class": "line shape"
    }).style({
        fill: "none"
    });
    shapes.attr({
        d: line
    });
    shapes.exit().remove();
    return {};
};

piper.barShapes = function(_config) {
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        chartHeight: null,
        shapePanel: null
    };
    piper.utils.override(config, _config);
    var newConfig = piper.shapePanel(config);
    piper.utils.override(config, newConfig);
    var scaleXRange = config.scaleX.range();
    var width = scaleXRange[1] - scaleXRange[0];
    var barWidth = width / (config.dataConverted.length - 1) / 2;
    var shapes = config.shapePanel.selectAll("rect.bar").data(config.dataConverted);
    shapes.enter().append("rect").attr({
        "class": "bar shape"
    });
    shapes.transition().attr({
        x: function(d) {
            return config.scaleX(d.x) - barWidth / 2;
        },
        y: function(d) {
            return config.scaleY(d.y);
        },
        width: function(d) {
            return barWidth;
        },
        height: function(d) {
            return config.chartHeight - config.scaleY(d.y);
        }
    });
    shapes.exit().remove();
    return {};
};

piper.endCircle = function(_config) {
    var config = {
        panel: null,
        dataConverted: null,
        scaleX: null,
        scaleY: null,
        width: null,
        shapePanel: null
    };
    piper.utils.override(config, _config);
    var newConfig = piper.shapePanel(config);
    piper.utils.override(config, newConfig);
    var lastDataY = config.dataConverted[config.dataConverted.length - 1];
    var shapes = config.shapePanel.selectAll("circle.end-circle").data([ lastDataY ]);
    shapes.enter().append("circle").attr({
        "class": "end-circle shape"
    });
    shapes.attr({
        cx: function(d) {
            return config.scaleX(d.x);
        },
        cy: function(d) {
            return config.scaleY(d.y);
        },
        r: 2
    });
    shapes.exit().remove();
    return {};
};

piper.eventCatchingLayer = function(_config) {
    var config = {
        panel: null,
        chartWidth: null,
        chartHeight: null
    };
    piper.utils.override(config, _config);
    var dispatch = d3.dispatch("mousemove");
    var eventPanelContainer = config.panel.selectAll("g.event-panel-container").data([ 0 ]);
    eventPanelContainer.enter().append("g").attr({
        "class": "event-panel-container"
    }).append("rect").attr({
        "class": "event-panel"
    });
    eventPanelContainer.exit().remove();
    var eventPanel = eventPanelContainer.select(".event-panel").attr({
        width: config.chartWidth,
        height: config.chartHeight
    }).style({
        visibility: "hidden",
        "pointer-events": "all"
    });
    return {
        eventPanel: eventPanel,
        dispatch: dispatch
    };
};

piper.events = function(_config) {
    var config = {
        eventer: null,
        dispatch: null
    };
    piper.utils.override(config, _config);
    if (config.eventer) {
        d3.rebind(config.eventer, config.dispatch, "on");
    }
    return {};
};

piper.tooltipComponent = function(_config) {
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
    var dataConvertedX = config.dataConverted.map(function(d) {
        return d.x;
    });
    var deltaX = config.scaleX(dataConvertedX[1]) - config.scaleX(dataConvertedX[0]);
    var tooltipGroup = config.panel.selectAll("g.tooltip-container").data([ 0 ]);
    tooltipGroup.enter().append("g").attr({
        "class": "tooltip-container",
        "pointer-events": "none"
    }).style({
        visibility: "hidden"
    }).append("circle").attr({
        "class": "tooltip-circle",
        r: 3
    });
    tooltipGroup.exit().remove();
    var valueGroup = config.panel.selectAll("g.value-container").data([ 0 ]);
    valueGroup.enter().append("g").attr({
        "class": "value-container",
        "pointer-events": "none"
    }).style({
        visibility: "hidden"
    }).append("text").attr({
        "class": "value-label",
        dy: -4
    });
    valueGroup.exit().remove();
    var lineGroup = config.panel.selectAll("g.line-container").data([ 0 ]);
    lineGroup.enter().append("g").attr({
        "class": "line-container",
        "pointer-events": "none"
    }).style({
        visibility: "hidden"
    }).append("line").attr({
        "class": "tooltip-line"
    });
    lineGroup.exit().remove();
    var valueLabel = valueGroup.select(".value-label");
    var tooltipCircle = tooltipGroup.select(".tooltip-circle");
    var tooltipLine = lineGroup.select(".tooltip-line");
    config.eventPanel.on("mouseenter", function(d) {
        tooltipGroup.style({
            visibility: "visible"
        });
        valueGroup.style({
            visibility: "visible"
        });
        tooltipLine.style({
            visibility: "visible"
        });
    }).on("mouseout", function(d) {
        tooltipGroup.style({
            visibility: "hidden"
        });
        valueGroup.style({
            visibility: "hidden"
        });
        tooltipLine.style({
            visibility: "hidden"
        });
    }).on("mousemove", function(d) {
        var mouse = d3.mouse(this);
        var dateAtCursor = config.scaleX.invert(mouse[0] - deltaX / 2);
        var dataPointIndexAtCursor = d3.bisectLeft(dataConvertedX, dateAtCursor);
        var dataPointAtCursor = config.dataConverted[dataPointIndexAtCursor];
        if (dataPointAtCursor) {
            var date = dataPointAtCursor.x;
            var value = dataPointAtCursor.y;
            var x = config.scaleX(date);
            var y = config.scaleY(value);
            tooltipGroup.attr({
                transform: "translate(" + [ x, y ] + ")"
            });
            valueGroup.attr({
                transform: "translate(" + [ 0, y ] + ")"
            });
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

piper.axisXFormatterTime = function(_config) {
    var config = {
        panel: null,
        dataConverted: null
    };
    piper.utils.override(config, _config);
    config.panel.select("g.axis.x").selectAll(".tick text").text(function(d) {
        return d3.time.format("%a")(d);
    });
    return {};
};

piper.axisXFormatterTimeHour = function(_config) {
    var config = {
        panel: null
    };
    piper.utils.override(config, _config);
    config.panel.select("g.axis.x").selectAll(".tick text").text(function(d) {
        return d3.time.format("%H:%M")(d);
    });
    return {};
};

piper.axisXFormatterRotate30 = function(_config) {
    var config = {
        panel: null
    };
    piper.utils.override(config, _config);
    config.panel.select("g.axis.x").selectAll(".tick text").style({
        transform: "rotate(30deg)",
        "text-anchor": "start"
    });
    return {};
};

piper.areaChart = piper.utils.pipeline(piper.data, piper.scaleX, piper.scaleY, piper.axisX, piper.axisY, piper.panelComponent, piper.areaShapes, piper.axisComponentX, piper.axisComponentY, piper.axisTitleComponentX, piper.axisTitleComponentY, piper.tooltipComponent);

piper.areaChartTime = piper.utils.pipeline(piper.dataTime, piper.scaleXTime, piper.scaleY, piper.axisX, piper.axisY, piper.panelComponent, piper.areaShapes, piper.axisComponentX, piper.axisComponentY, piper.axisTitleComponentX, piper.axisTitleComponentY, piper.axisXFormatterTimeHour, piper.tooltipComponent);

piper.areaChartTimeRotated = piper.utils.pipeline(piper.dataTime, piper.scaleXTime, piper.scaleY, piper.axisX, piper.axisY, piper.panelComponent, piper.areaShapes, piper.axisComponentX, piper.axisComponentY, piper.axisTitleComponentX, piper.axisTitleComponentY, piper.axisXFormatterTimeHour, piper.axisXFormatterRotate30, piper.tooltipComponent);

piper.lineChart = piper.utils.pipeline(piper.data, piper.scaleX, piper.scaleY, piper.axisX, piper.axisY, piper.panelComponent, piper.lineShapes, piper.axisComponentX, piper.axisComponentY, piper.axisTitleComponentX, piper.axisTitleComponentY, piper.tooltipComponent);

piper.sparkline = piper.utils.pipeline(piper.data, piper.scaleX, piper.scaleY, piper.panelComponent, piper.lineShapes, piper.endCircle, piper.tooltipComponent);

piper.barChart = piper.utils.pipeline(piper.data, piper.barChartAutoConfig, piper.scaleX, piper.scaleYStartAt0, piper.axisX, piper.axisY, piper.panelComponent, piper.barShapes, piper.axisComponentY, piper.axisComponentX);

piper.singleAxis = piper.utils.pipeline(piper.data, piper.scaleX, piper.axisX, piper.panelComponent, piper.singleAxisComponentX);

if (typeof module === "object" && module.exports) {
    var d3 = require("d3");
    module.exports = piper;
}