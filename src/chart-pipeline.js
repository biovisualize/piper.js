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
    piper.chartTitleComponent,
    piper.tooltipComponent
);

piper.areaChartTime = piper.utils.pipeline(
    piper.dataTime,
    piper.scaleXTime,
    piper.scaleY,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.areaShapes,
    piper.axisComponentX,
    piper.axisComponentY,
    piper.axisTitleComponentX,
    piper.axisTitleComponentY,
    piper.axisXFormatterTimeHour,
    piper.tooltipComponent
);

piper.areaChartTimeRotated = piper.utils.pipeline(
    piper.dataTime,
    piper.scaleXTime,
    piper.scaleY,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.areaShapes,
    piper.axisComponentX,
    piper.axisComponentY,
    piper.axisTitleComponentX,
    piper.axisTitleComponentY,
    piper.chartTitleComponent,
    piper.axisXFormatterTimeHour,
    piper.axisXFormatterRotate30,
    piper.tooltipComponent
);

piper.areaChartFrom0 = piper.utils.pipeline(
    piper.data,
    piper.scaleX,
    piper.scaleYFrom0Padded,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.areaShapes,
    piper.axisComponentY,
    piper.thresholdLine,
    piper.thresholdLineLabel,
    piper.axisTitleComponentX,
    piper.axisTitleComponentY,
    piper.chartTitleComponent,
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

piper.barChartPrumo = piper.utils.pipeline(
    piper.data,
    piper.barChartAutoConfig,
    piper.scaleX,
    piper.scaleY,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.barShapes,
    piper.axisComponentY,
    piper.thresholdLine,
    piper.thresholdLineLabel,
    piper.axisTitleComponentX,
    piper.axisTitleComponentY,
    piper.chartTitleComponent,
    piper.tooltipComponent
);

piper.barChartGroupedPrumo = piper.utils.pipeline(
    piper.dataGrouped,
    piper.barChartAutoConfig,
    piper.scaleX,
    piper.scaleYGrouped,
    piper.axisX,
    piper.axisY,
    piper.panelComponent,
    piper.barShapesGrouped,
    piper.axisComponentX,
    piper.axisComponentY,
    piper.thresholdLine,
    piper.thresholdLineLabel,
    piper.axisTitleComponentY,
    piper.chartTitleComponent,
    piper.tooltipComponent
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
