import { pipeline } from "./src/utils";
import { default as data } from "./src/data";
import { scaleX, scaleY } from "./src/scale";
import { axisX, axisY } from "./src/axis";
import { panelComponent, axisComponentX, axisComponentY } from "./src/axis-component";
import { lineShapes } from "./src/shape-component";


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

export default chartPipeline;