export function axisX(config){
    var axisX = d3.axisBottom(config.scaleX);

    return {
        axisX: axisX
    };
}

export function axisY(config){
    var height = config.scaleY.range()[0];

    var axisY = d3.axisLeft(config.scaleY)
        .ticks(Math.max(~~(config.height / 30), 2))
        .tickPadding(10);

    return {
        axisY: axisY
    };
}