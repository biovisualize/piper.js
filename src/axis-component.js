export function panelComponent(config) {
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

export function axisComponentX(config) {
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

export function axisComponentY(config) {
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