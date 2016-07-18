(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.piper = factory());
}(this, function () { 'use strict';

    function merge(obj1, obj2) {
        for (var p in obj2) {
            if (obj2[p] && obj2[p].constructor == Object) {
                if (obj1[p]) {
                    this.merge(obj1[p], obj2[p]);
                    continue;
                }
            }
            obj1[p] = obj2[p];
        }
    }

    function mergeAll() {
        var newObj = {};
        var objs = arguments;
        for (var i = 0; i < objs.length; i++) {
            merge(newObj, objs[i]);
        }
        return newObj;
    }

    function pipeline() {
        var fns = arguments;
        return function(config) {
            for (var i = 0; i < fns.length; i++) {
                //                    console.log(i, 'before', config);
                var cache = fns[i].call(this, config);
                config = mergeAll(config, cache);
                //                    console.log(i, 'after', config);
            }
            return config;
        };
    }

    function data(config) {
        var data = config.data;

        return {
            data: data
        };
    };

    function scaleX(config){
        var chartWidth = config.width - config.margin.left - config.margin.right;

        var scaleX = d3.scaleUtc()
            .domain(d3.extent(config.data, function(d){ return d[0]; }))
            .range([0, chartWidth]);

        return {
            scaleX: scaleX,
            chartWidth: chartWidth
        };
    };

    function scaleY(config){
        var chartHeight = config.height - config.margin.top - config.margin.bottom;

        var scaleY = d3.scaleLinear()
            .domain(d3.extent(config.data, function(d){ return d[1]; }))
            .range([chartHeight, 0]);

        return {
            scaleY: scaleY,
            chartHeight: chartHeight
        };
    };

    function axisX(config){
        var axisX = d3.axisBottom(config.scaleX);

        return {
            axisX: axisX
        };
    }

    function axisY(config){
        var height = config.scaleY.range()[0];

        var axisY = d3.axisLeft(config.scaleY)
            .ticks(Math.max(~~(config.height / 30), 2))
            .tickPadding(10);

        return {
            axisY: axisY
        };
    }

    function panelComponent(config) {
        var root = d3.select(config.container)
            .selectAll('svg')
            .data([0]);
        var panel = root.enter().append('svg')
            .attr('class', 'piper-chart')
            .attr('width', config.width)
            .attr('height', config.height)
            .append('g')
            .attr('class', 'panel')
            .merge(root).attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');
        root.exit().remove();

        return {
            root: root,
            panel: panel
        };
    }

    function axisComponentX(config) {
        var axisX = config.panel.selectAll('g.axis.x')
            .data([0]);
        axisX.enter().append('g')
            .attr('class', 'x axis')
            .merge(axisX)
            .attr('transform', 'translate(' + [0, config.chartHeight] + ')')
            .call(config.axisX);
        axisX.exit().remove();

        return {};
    }

    function axisComponentY(config) {
        var padding = config.axisYPadding || 0;
        var axisY= config.panel.selectAll('g.axis.y')
            .data([0]);
        axisY.enter().append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + [-padding / 2, 0] + ')')
            .merge(axisY).call(config.axisY);
        axisY.exit().remove();

        return {};
    }

    function lineShapes(config) {

        var shapePanel = config.panel.selectAll('g.shapes')
            .data([0]);
        var shapePanelEnter = shapePanel.enter().append('g')
            .attr('class', 'shapes');
        shapePanel.exit().remove();

        var shapePanel = shapePanelEnter.merge(shapePanel)

        var line = d3.line()
            .defined(function(d) {
                return d[1] != null;
            })
            .x(function(d) {
                return config.scaleX(d[0]);
            })
            .y(function(d) {
                return config.scaleY(d[1]);
            });

        var shapes = shapePanel.selectAll('path.line')
            .data([config.data]);
        shapes.enter().append('path')
            .attr('class', 'line shape')
            .style('fill', 'none')
            .style('stroke', 'black')
            .merge(shapes).attr('d', line);
        shapes.exit().remove();

        return {};
    }

    var chartPipeline = pipeline(
        data,
        scaleX,
        scaleY,
        axisX,
        axisY,
        panelComponent,
        lineShapes,
        axisComponentX,
        axisComponentY
    );

    return chartPipeline;

}));