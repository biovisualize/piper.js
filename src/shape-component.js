export function lineShapes(config) {

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
