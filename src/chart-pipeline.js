piper.areaChart = piper.utils.pipeline(
    piper.data,
    piper.scaleX,
    piper.scaleY,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.areaShapes,
    piper.axisComponentX,
    piper.axisComponentY,
    piper.axisTitleComponentX,
    piper.axisTitleComponentY,
    piper.tooltipComponent
);

piper.lineChart = piper.utils.pipeline(
    piper.data,
    piper.scaleX,
    piper.scaleY,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.lineShapes,
    piper.axisComponentX,
    piper.axisComponentY,
    piper.axisTitleComponentX,
    piper.axisTitleComponentY,
    piper.tooltipComponent
);

piper.sparkline = piper.utils.pipeline(
    piper.data,
    piper.scaleX,
    piper.scaleY,
    piper.panelComponent,
    piper.lineShapes,
    piper.endCircle,
    piper.tooltipComponent
);

piper.barChart = piper.utils.pipeline(
    piper.data,
    piper.barChartAutoConfig,
    piper.scaleX,
    piper.scaleYStartAt0,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.barShapes,
    piper.axisComponentY,
    piper.axisComponentX
);

piper.singleAxis = piper.utils.pipeline(
    piper.data,
    piper.scaleX,
    piper.axisX,
    piper.panelComponent,
    piper.singleAxisComponentX
);

if (typeof module === "object" && module.exports) {
    var d3 = require("d3");
    module.exports = piper;
}
