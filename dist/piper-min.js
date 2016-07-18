var piper={version:"0.1.0"};if(piper.utils={pipeline:function(){var e=arguments,t=this;return function(r){for(var n=0;n<e.length;n++){var i=e[n].call(this,r);r=t.mergeAll(r,i)}return r}},override:function(e,t){for(var r in t)r in e&&(e[r]=t[r])},merge:function(e,t){for(var r in t)t[r]&&t[r].constructor==Object&&e[r]?this.merge(e[r],t[r]):e[r]=t[r]},mergeAll:function(){for(var e={},t=arguments,r=0;r<t.length;r++)this.merge(e,t[r]);return e},reactiveProperty:function(e){function t(t){if(1===arguments.length){if(e=t,r)for(var n=0;n<r.length;n++)r[n](e);return this}return e}var r;return t.on=function(t){return r||(r=[]),r.push(t),"undefined"!=typeof e&&null!==e&&t(e),t},t.off=function(e){r&&(r=r.filter(function(t){return t!==e}))},t}},piper.barChartAutoConfig=function(e){return{axisYPadding:20}},piper.data=function(e){var t={data:null};piper.utils.override(t,e);var r=t.data.map(function(e,t){return{x:t,y:e}});return{dataConverted:r}},piper.dataTime=function(e){var t={data:null};piper.utils.override(t,e);var r=t.data.map(function(e,t){return{x:e.timestamp,y:e.value}});return{dataConverted:r}},piper.dataTimeFromSeparateArrays=function(e){var t={data:null};piper.utils.override(t,e);var r=t.data.timestamps.map(function(e,r){return{x:e.getTime(),y:t.data.values[r]}});return{dataConverted:r}},piper.dataGrouped=function(e){var t={data:null};piper.utils.override(t,e);var r=t.data.map(function(e,t){return{x:t,groupName:e.key,y:e.values.map(function(e,t){return e.value})}}),n=d3.merge(r.map(function(e,t){return e.y}));return{dataConverted:r,dataFlat:n}},piper.scaleX=function(e){var t={dataConverted:null,margin:null,width:null,scaleType:null};piper.utils.override(t,e);var r=t.width-t.margin.left-t.margin.right,n=t.dataConverted.map(function(e){return e.x}),i=d3.scale.linear().domain(d3.extent(n)).range([0,r]);return{scaleX:i,chartWidth:r}},piper.scaleXTime=function(e){var t={dataConverted:null,margin:null,width:null,scaleType:null};piper.utils.override(t,e);var r=t.width-t.margin.left-t.margin.right,n=t.dataConverted.map(function(e){return e.x}),i=d3.time.scale().domain(d3.extent(n)).range([0,r]);return{scaleX:i,chartWidth:r}},piper.scaleY=function(e){var t={dataConverted:null,margin:null,height:null};piper.utils.override(t,e);var r=t.height-t.margin.top-t.margin.bottom,n=t.dataConverted.map(function(e){return e.y}),i=d3.scale.linear().domain(d3.extent(n)).range([r,0]);return{scaleY:i,chartHeight:r}},piper.scaleYGrouped=function(e){var t={dataConverted:null,margin:null,height:null};piper.utils.override(t,e);var r=t.height-t.margin.top-t.margin.bottom,n=t.dataConverted.map(function(e){return e.y}),i=d3.scale.linear().domain(d3.extent(d3.merge(n))).range([r,0]);return{scaleY:i,chartHeight:r}},piper.scaleYFrom0=function(e){var t={dataConverted:null,margin:null,height:null};piper.utils.override(t,e);var r=t.height-t.margin.top-t.margin.bottom,n=t.dataConverted.map(function(e){return e.y}),i=d3.scale.linear().domain([0,d3.max(n)]).range([r,0]);return{scaleY:i,chartHeight:r}},piper.scaleYFrom0Padded=function(e){var t={dataConverted:null,margin:null,height:null};piper.utils.override(t,e);var r=t.height-t.margin.top-t.margin.bottom,n=t.dataConverted.map(function(e){return e.y}),i=d3.max(n),a=1-(i-d3.min(n))/i,p=i+i*a,l=d3.scale.linear().domain([0,p]).range([r,0]);return{scaleY:l,chartHeight:r}},piper.scaleYExtent=function(e){var t={extentY:null,scaleY:null};return piper.utils.override(t,e),t.scaleY.domain(t.extentY),{}},piper.axisX=function(e){var t={scaleX:null,axisXFormat:"%H:%M",axisXTimeResolution:"minutes",axisXTimeSteps:2};piper.utils.override(t,e);var r=d3.svg.axis().scale(t.scaleX).orient("bottom");return{axisX:r}},piper.axisY=function(e){var t={scaleY:null};piper.utils.override(t,e);var r=t.scaleY.range()[0],n=d3.svg.axis().scale(t.scaleY).orient("left").ticks(Math.max(~~(r/30),2),".s3").tickPadding(10);return{axisY:n}},piper.panelComponent=function(e){var t={container:null,width:null,height:null,margin:null};piper.utils.override(t,e);var r=d3.select(t.container).selectAll("svg").data([0]);r.enter().append("svg").attr({"class":"piper-chart"}).append("g").attr({"class":"panel"}),r.attr({width:t.width,height:t.height}),r.exit().remove();var n=r.select("g.panel").attr({transform:"translate("+t.margin.left+","+t.margin.top+")"});return{root:r,panel:n}},piper.axisComponentX=function(e){var t={axisX:null,chartHeight:null,panel:null};piper.utils.override(t,e);var r=t.panel.selectAll("g.axis.x").data([0]);return r.enter().append("g").attr({"class":"x axis",transform:"translate("+[0,t.chartHeight]+")"}),r.transition().attr({transform:"translate("+[0,t.chartHeight]+")"}).call(t.axisX),r.exit().remove(),{}},piper.singleAxisComponentX=function(e){var t={axisX:null,panel:null};piper.utils.override(t,e);var r=t.panel.selectAll("g.axis.x.single").data([0]);return r.enter().append("g").attr({"class":"x axis single"}),r.transition().call(t.axisX),r.exit().remove(),{}},piper.axisComponentY=function(e){var t={axisY:null,panel:null,axisYPadding:null};piper.utils.override(t,e);var r=t.axisYPadding||0,n=t.panel.selectAll("g.axis.y").data([0]);return n.enter().append("g").attr({"class":"y axis",transform:"translate("+[-r/2,0]+")"}),n.transition().call(t.axisY),n.exit().remove(),{}},piper.axisTitleComponentX=function(e){var t={panel:null,axisTitleX:null,chartHeight:null,chartWidth:null};piper.utils.override(t,e);var r=t.panel.selectAll("text.axis-title.x").data([0]);return r.enter().append("text").attr({"class":"x axis-title"}),r.text(t.axisTitleX||"").attr({x:t.chartWidth,y:t.chartHeight}),r.exit().remove(),{}},piper.axisTitleComponentY=function(e){var t={panel:null,axisTitleY:null};piper.utils.override(t,e);var r=t.panel.selectAll("text.axis-title.y").data([0]);return r.enter().append("text").attr({"class":"y axis-title"}),r.text(t.axisTitleY||"").attr({x:-40,y:-10}),r.exit().remove(),{}},piper.chartTitleComponent=function(e){var t={panel:null,chartTitle:null,chartWidth:null};piper.utils.override(t,e);var r=t.panel.selectAll("text.chart-title").data([0]);return r.enter().append("text").attr({"class":"chart-title"}),r.text(t.chartTitle||"").attr({x:function(e){return(t.chartWidth-5*t.chartTitle.length)/2},y:-5}),r.exit().remove(),{}},piper.tooltipHTMLWidget=function(e){var t=d3.select(e).style({position:"absolute","pointer-events":"none",display:"none"}),r=function(e){return t.html(e),this},n=function(e){return t.style({left:e[0]+"px",top:e[1]+"px"}),this},i=function(){return t.style({display:"block"}),this},a=function(){return t.style({display:"none"}),this},p=function(){return t.node()};return{setText:r,setPosition:n,show:i,hide:a,getRootNode:p}},piper.thresholdLine=function(e){var t={panel:null,scaleY:null,margin:null,chartWidth:null,thresholdY:null};if(piper.utils.override(t,e),"number"!=typeof t.thresholdY)return{};var r=t.scaleY(t.thresholdY),n="M"+[[0,r],[t.chartWidth+6,r]].join("L"),i=t.panel.selectAll("path.threshold").data([0]);return i.enter().append("path").attr({"class":"threshold shape"}).style({fill:"none"}),i.attr({d:n}),i.exit().remove(),{}},piper.thresholdLineLabel=function(e){var t={panel:null,scaleY:null,margin:null,chartWidth:null,thresholdY:null,thresholdYLabel:null};if(piper.utils.override(t,e),!t.thresholdYLabel)return{};var r=t.scaleY(t.thresholdY),n=("M"+[[0,r],[t.chartWidth+6,r]].join("L"),t.panel.selectAll("text.threshold-label").data([0]));return n.enter().append("text").attr({"class":"threshold-label",x:t.chartWidth+8,y:r+2}),n.text(t.thresholdYLabel),n.exit().remove(),{}},piper.verticalLine=function(e){var t={panel:null,dataConverted:null,scaleX:null,scaleY:null,chartHeight:null,margin:null,verticalLineX:null,verticalLineValue:null};piper.utils.override(t,e);var r=t.scaleX(t.verticalLineX),n="M"+[[r,0],[r,t.chartHeight]].join("L"),i=t.panel.selectAll("path.vertical-line").data([0]);i.enter().append("path").attr({"class":"vertical-line shape"}),i.attr({d:n}),i.exit().remove();var a=t.panel.selectAll("text.vertical-line-label").data([0]);return a.enter().append("text").attr({"class":"vertical-line-label"}),a.attr({x:r+2,y:t.chartHeight+t.margin.top+t.margin.bottom/4}).text(t.verticalLineValue),i.exit().remove(),{}},piper.tooltipComponent=function(e){var t={container:null,panel:null,dataConverted:null,scaleX:null,scaleY:null,events:null,chartWidth:null,chartHeight:null};piper.utils.override(t,e),piper.utils.override(t,piper.eventsBinder(t));var r=t.panel.selectAll("g.hover-tooltip").data([0]);return r.enter().append("g").classed("hover-tooltip",!0).attr({r:4}).style({"pointer-events":"none",display:"none"}).append("text"),r.exit().remove(),t.events.mousemove.on(function(e){r.attr({transform:"translate("+e.shapePosition+")"}).select("text").text(e.data.y)}),t.events.mouseenter.on(function(e){r.style({display:"block"})}),t.events.mouseout.on(function(e){r.style({display:"none"})}),{}},piper.hoverCircleComponent=function(e){var t={container:null,panel:null,dataConverted:null,scaleX:null,scaleY:null,events:null,chartWidth:null,chartHeight:null};piper.utils.override(t,e),piper.utils.override(t,piper.eventsBinder(t));var r=t.panel.selectAll("circle.hover-circle").data([0]);return r.enter().append("circle").classed("hover-circle",!0).attr({r:3}).style({"pointer-events":"none",display:"none"}),r.exit().remove(),t.events.mousemove.on(function(e){r.attr({transform:"translate("+e.shapePosition+")"})}),t.events.mouseenter.on(function(e){r.style({display:"block"})}),t.events.mouseout.on(function(e){r.style({display:"none"})}),{}},piper.tooltipLineComponent=function(e){var t={container:null,panel:null,dataConverted:null,scaleX:null,scaleY:null,events:null,chartWidth:null,chartHeight:null};piper.utils.override(t,e),piper.utils.override(t,piper.eventsBinder(t));var r=t.panel.selectAll("g.line-container").data([0]);r.enter().append("g").attr({"class":"line-container","pointer-events":"none"}).style({visibility:"hidden"}).append("line").attr({"class":"tooltip-line"}),r.exit().remove();var n=r.select(".tooltip-line");return t.events.mouseenter.on(function(e){n.style({visibility:"visible"})}),t.events.mouseout.on(function(e){n.style({visibility:"hidden"})}),t.events.mousemove.on(function(e){var t=e.shapePosition[0],r=e.shapePosition[1];n.attr({x1:0,y1:r,x2:t,y2:r})}),{}},piper.shapePanel=function(e){var t={panel:null};piper.utils.override(t,e);var r=t.panel.selectAll("g.shapes").data([0]);return r.enter().append("g").attr({"class":"shapes"}),r.exit().remove(),{shapePanel:r}},piper.areaShapes=function(e){var t={panel:null,dataConverted:null,scaleX:null,scaleY:null,shapePanel:null};piper.utils.override(t,e);var r=piper.shapePanel(t);piper.utils.override(t,r);var n=d3.svg.area().defined(function(e){return null!=e.y}).x(function(e){return t.scaleX(e.x)}).y(function(e){return t.scaleY(e.y)}).y0(t.scaleY.range()[0]),i=t.shapePanel.selectAll("path.line").data([t.dataConverted]);return i.enter().append("path").attr({"class":"line shape"}),i.attr({d:n}),i.exit().remove(),{}},piper.lineShapes=function(e){var t={panel:null,dataConverted:null,scaleX:null,scaleY:null,shapePanel:null};piper.utils.override(t,e);var r=piper.shapePanel(t);piper.utils.override(t,r);var n=d3.svg.line().defined(function(e){return null!=e.y}).x(function(e){return t.scaleX(e.x)}).y(function(e){return t.scaleY(e.y)}),i=t.shapePanel.selectAll("path.line").data([t.dataConverted]);return i.enter().append("path").attr({"class":"line shape"}).style({fill:"none"}),i.attr({d:n}),i.exit().remove(),{}},piper.barShapes=function(e){var t={panel:null,dataConverted:null,scaleX:null,scaleY:null,chartHeight:null,shapePanel:null};piper.utils.override(t,e);var r=piper.shapePanel(t);piper.utils.override(t,r);var n=t.scaleX.range(),i=n[1]-n[0],a=i/(t.dataConverted.length-1)/2,p=t.shapePanel.selectAll("rect.bar").data(t.dataConverted);return p.enter().append("rect").attr({"class":"bar shape"}),p.transition().attr({x:function(e){return t.scaleX(e.x)-a/2},y:function(e){var r=t.scaleY(e.y);return e.barY=e.y>0&&r===t.chartHeight?t.chartHeight-1:r,e.barY},width:function(e){return a},height:function(e){return t.chartHeight-e.barY}}),p.exit().remove(),{}},piper.barShapesGrouped=function(e){var t={panel:null,dataConverted:null,dataFlat:null,scaleX:null,scaleY:null,chartHeight:null,chartWidth:null,shapePanel:null};piper.utils.override(t,e);var r=piper.shapePanel(t);piper.utils.override(t,r);var n=t.chartWidth/(t.dataFlat.length-1)/2,i=t.chartWidth/(t.dataConverted.length-1),a=t.shapePanel.selectAll("g.shape-group").data(t.dataConverted);a.enter().append("g").attr({"class":"shape-group"}),a.attr({transform:function(e,t){return"translate("+(i*t-i/4)+" 0)"}}),a.exit().remove();var p=a.selectAll("rect.bar").data(function(e){return e.y});return p.enter().append("rect").attr({"class":"bar shape"}),p.transition().attr({x:function(e,t){return n*t},y:function(e){var r=t.scaleY(e);return r=e&&e>0&&r===t.chartHeight?t.chartHeight-1:r},width:function(e){return n},height:function(e){var r=t.scaleY(e);return r=e&&e>0&&r===t.chartHeight?t.chartHeight-1:r,t.chartHeight-r}}),p.exit().remove(),{}},piper.endCircle=function(e){var t={panel:null,dataConverted:null,scaleX:null,scaleY:null,width:null,shapePanel:null};piper.utils.override(t,e);var r=piper.shapePanel(t);piper.utils.override(t,r);var n=t.dataConverted[t.dataConverted.length-1],i=t.shapePanel.selectAll("circle.end-circle").data([n]);return i.enter().append("circle").attr({"class":"end-circle shape"}),i.attr({cx:function(e){return t.scaleX(e.x)},cy:function(e){return t.scaleY(e.y)},r:2}),i.exit().remove(),{}},piper.events={mousemove:piper.utils.reactiveProperty(),mouseenter:piper.utils.reactiveProperty(),mouseout:piper.utils.reactiveProperty()},piper.eventsBinder=function(e){var t={container:null,panel:null,dataConverted:null,scaleX:null,scaleY:null,chartWidth:null,chartHeight:null};piper.utils.override(t,e);var r=t.dataConverted.map(function(e){return e.x}),n=t.scaleX(r[1])-t.scaleX(r[0]),i=t.panel.selectAll("g.event-panel-container").data([0]);this.dataConverted=t.dataConverted;return i.enter().append("g").attr({"class":"event-panel-container"}).append("rect").attr({"class":"event-panel"}).style({visibility:"hidden","pointer-events":"all"}),i.select("rect").attr({width:t.chartWidth,height:t.chartHeight}).on("mouseenter",function(e){piper.events.mouseenter({mouse:d3.mouse(this)})}).on("mouseout",function(e){piper.events.mouseout({mouse:d3.mouse(this)})}).on("mousemove",function(e,i){var a=d3.mouse(this),p=d3.mouse(t.container),l=this.getBoundingClientRect(),o=t.container.getBoundingClientRect(),s=o.left,u=o.top,c=t.scaleX.invert(a[0]-n/2),d=d3.bisectLeft(r,c.getTime()),h=t.dataConverted[d];if(h)var v=h.x,m=h.y,x=t.scaleX(v),f=t.scaleY(m);piper.events.mousemove({data:h,mouse:a,mouseFromContainer:[p[0]+s+window.pageXOffset,p[1]+u+window.pageYOffset],shapePosition:[x,f],shapePositionFromContainer:[x+l.left-o.left,f+l.top-o.top]})}),i.exit().remove(),{events:piper.events}},piper.axisXFormatterTime=function(e){var t={panel:null,dataConverted:null};return piper.utils.override(t,e),t.panel.select("g.axis.x").selectAll(".tick text").text(function(e){return d3.time.format("%a")(e)}),{}},piper.axisXFormatterTimeHour=function(e){var t={panel:null};return piper.utils.override(t,e),t.panel.select("g.axis.x").selectAll(".tick text").text(function(e){return d3.time.format("%x")(e)}),{}},piper.axisXFormatterRotate30=function(e){var t={panel:null};return piper.utils.override(t,e),t.panel.select("g.axis.x").selectAll(".tick text").style({transform:"rotate(30deg)","text-anchor":"start"}),{}},piper.axisYFormatSI=function(e){var t={axisY:null};return piper.utils.override(t,e),t.axisY.tickFormat(d3.format(".2s")),{}},piper.areaChart=piper.utils.pipeline(piper.data,piper.scaleX,piper.scaleY,piper.scaleYExtent,piper.axisX,piper.axisY,piper.axisYFormatSI,piper.panelComponent,piper.areaShapes,piper.axisComponentX,piper.axisComponentY,piper.axisTitleComponentX,piper.axisTitleComponentY,piper.chartTitleComponent,piper.tooltipComponent),piper.areaChartTime=piper.utils.pipeline(piper.dataTime,piper.scaleXTime,piper.scaleY,piper.axisX,piper.axisY,piper.panelComponent,piper.areaShapes,piper.axisComponentX,piper.axisComponentY,piper.axisTitleComponentX,piper.axisTitleComponentY,piper.axisXFormatterTimeHour,piper.tooltipComponent),piper.areaChartTimeRotated=piper.utils.pipeline(piper.dataTime,piper.scaleXTime,piper.scaleY,piper.scaleYExtent,piper.axisX,piper.axisY,piper.panelComponent,piper.areaShapes,piper.axisComponentX,piper.axisComponentY,piper.axisTitleComponentX,piper.axisTitleComponentY,piper.chartTitleComponent,piper.axisXFormatterTimeHour,piper.axisXFormatterRotate30,piper.hoverEvents,piper.HTMLTooltip,piper.hoverCircle),piper.areaChartFrom0=piper.utils.pipeline(piper.data,piper.scaleX,piper.scaleYFrom0Padded,piper.axisX,piper.axisY,piper.panelComponent,piper.areaShapes,piper.axisComponentY,piper.thresholdLine,piper.thresholdLineLabel,piper.axisTitleComponentX,piper.axisTitleComponentY,piper.chartTitleComponent,piper.tooltipComponent),piper.lineChart=piper.utils.pipeline(piper.data,piper.scaleX,piper.scaleY,piper.axisX,piper.axisY,piper.panelComponent,piper.lineShapes,piper.axisComponentX,piper.axisComponentY,piper.axisTitleComponentX,piper.axisTitleComponentY,piper.tooltipComponent),piper.sparkline=piper.utils.pipeline(piper.data,piper.scaleX,piper.scaleY,piper.panelComponent,piper.lineShapes,piper.endCircle,piper.tooltipComponent),piper.barChart=piper.utils.pipeline(piper.data,piper.barChartAutoConfig,piper.scaleX,piper.scaleYStartAt0,piper.axisX,piper.axisY,piper.panelComponent,piper.barShapes,piper.axisComponentY,piper.axisComponentX),piper.barChartPrumo=piper.utils.pipeline(piper.data,piper.barChartAutoConfig,piper.scaleX,piper.scaleY,piper.axisX,piper.axisY,piper.panelComponent,piper.barShapes,piper.axisComponentY,piper.thresholdLine,piper.thresholdLineLabel,piper.axisTitleComponentX,piper.axisTitleComponentY,piper.chartTitleComponent,piper.tooltipComponent),piper.barChartGroupedPrumo=piper.utils.pipeline(piper.dataGrouped,piper.barChartAutoConfig,piper.scaleX,piper.scaleYGrouped,piper.axisX,piper.axisY,piper.panelComponent,piper.barShapesGrouped,piper.axisComponentX,piper.axisComponentY,piper.thresholdLine,piper.thresholdLineLabel,piper.axisTitleComponentY,piper.chartTitleComponent,piper.hoverEvents),piper.singleAxis=piper.utils.pipeline(piper.data,piper.scaleX,piper.axisX,piper.panelComponent,piper.singleAxisComponentX),piper.timeseriesLineChart=piper.utils.pipeline(piper.dataTimeFromSeparateArrays,piper.scaleXTime,piper.scaleY,piper.axisX,piper.axisY,piper.panelComponent,piper.lineShapes,piper.axisComponentX,piper.axisComponentY,piper.axisTitleComponentY,piper.tooltipComponent,piper.hoverCircleComponent,piper.tooltipLineComponent),"object"==typeof module&&module.exports){var d3=require("d3");module.exports=piper}