(function(exports, global) {
    var datahub = exports = typeof exports === "object" ? exports : {};
    var root = typeof global === "object" ? global : window;
    if (typeof module === "object" && module.exports) {
        root.d3 = require("d3");
    } else {
        root.d3 = root.d3;
    }
    !function(dh) {
        var merge = function(obj1, obj2) {
            for (var p in obj2) {
                if (obj2[p] && obj2[p].constructor == Object) {
                    if (obj1[p]) {
                        merge(obj1[p], obj2[p]);
                        continue;
                    }
                }
                obj1[p] = obj2[p];
            }
        };
        var mergeAll = function(target, varArgs) {
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
        var htmlToNode = function(htmlString, parent) {
            while (parent.lastChild) {
                parent.removeChild(parent.lastChild);
            }
            return appendHtmlToNode(htmlString, parent);
        };
        var appendHtmlToNode = function(htmlString, parent) {
            return parent.appendChild(document.importNode(new DOMParser().parseFromString(htmlString, "text/html").body.childNodes[0], true));
        };
        var once = function once(fn, context) {
            var result;
            return function() {
                if (fn) {
                    result = fn.apply(context || this, arguments);
                    fn = null;
                }
                return result;
            };
        };
        var throttle = function throttle(callback, limit) {
            var wait = false;
            var timer = null;
            return function() {
                var that = this;
                if (!wait) {
                    wait = true;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        wait = false;
                        callback.apply(that, arguments);
                    }, limit);
                }
            };
        };
        var arrayStats = function(data, _accessor) {
            var flattened = [];
            var uniques = [];
            var values, value, i, j, min = Number.MAX_VALUE, max = Number.MIN_VALUE;
            var u = {};
            for (i = 0; i < data.length; i++) {
                values = data[i];
                for (j = 0; j < values.length; j++) {
                    value = _accessor ? _accessor(values[j]) : values[j];
                    flattened.push(value);
                    if (u.hasOwnProperty(value) || value === null) {
                        continue;
                    }
                    u[value] = 1;
                    if (value > max) {
                        max = value;
                    }
                    if (value < min) {
                        min = value;
                    }
                }
            }
            uniques = Object.keys(u).map(function(d, i) {
                return +d;
            });
            return {
                flattened: flattened,
                uniques: uniques,
                max: max,
                min: min
            };
        };
        var arrayUniques = function(data, accessor) {
            return arrayStats(data, accessor).uniques;
        };
        var arrayFlatten = function(data, accessor) {
            return arrayStats(data, accessor).flattened;
        };
        var bisection = function(array, x, isReversed) {
            var mid, low = 0, high = array.length - 1;
            while (low < high) {
                mid = low + high >> 1;
                if (isReversed && x >= array[mid] || !isReversed && x < array[mid]) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }
            return low;
        };
        var bisectionReversed = function(array, x) {
            return bisection(array, x, true);
        };
        var findMax = function(array) {
            var max = 0, a = array.length, counter;
            for (counter = 0; counter < a; counter++) {
                if (array[counter] > max) {
                    max = array[counter];
                }
            }
            return max;
        };
        var findMin = function(array) {
            var min = Infinity, a = array.length, counter;
            for (counter = 0; counter < a; counter++) {
                if (array[counter] < min) {
                    min = array[counter];
                }
            }
            return min;
        };
        var parseRGB = function(rgb) {
            return rgb.slice(4).slice(0, -1).split(",").map(function(d, i) {
                return parseInt(d);
            });
        };
        var pipeline = function() {
            var fns = arguments;
            var that = this;
            return function(config) {
                for (var i = 0; i < fns.length; i++) {
                    var cache = fns[i].call(this, config);
                    config = that.mergeAll(config, cache);
                }
                return config;
            };
        };
        var override = function(_objA, _objB) {
            for (var x in _objB) {
                if (x in _objA) {
                    _objA[x] = _objB[x];
                }
            }
        };
        var rebind = function(target) {
            return function() {
                target.on.apply(target, arguments);
                return this;
            };
        };
        var capitalize = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        var getExtent = function(d, isMin) {
            var func = isMin ? "min" : "max";
            if (d) {
                return d3[func](d.map(function(d) {
                    return d.value;
                }));
            }
            return null;
        };
        var getStackExtent = function(d, isMin) {
            var func = isMin ? "min" : "max";
            if (d && d.length) {
                var sums = d.map(function(d) {
                    return d3.sum(d.value);
                });
                return d3[func](sums);
            }
            return null;
        };
        var getMultiExtent = function(d, isMin) {
            var func = isMin ? "min" : "max";
            if (d && d.length) {
                var data = d.map(function(d, i) {
                    return d.value;
                });
                if (data[0].length) {
                    data = d3.merge(data);
                }
                return d3[func](data);
            }
            return null;
        };
        dh.utils = {
            merge: merge,
            mergeAll: mergeAll,
            htmlToNode: htmlToNode,
            appendHtmlToNode: appendHtmlToNode,
            once: once,
            throttle: throttle,
            arrayStats: arrayStats,
            arrayUniques: arrayUniques,
            arrayFlatten: arrayFlatten,
            bisection: bisection,
            bisectionReversed: bisectionReversed,
            findMax: findMax,
            findMin: findMin,
            parseRGB: parseRGB,
            pipeline: pipeline,
            override: override,
            rebind: rebind,
            capitalize: capitalize,
            getExtent: getExtent,
            getStackExtent: getStackExtent,
            getMultiExtent: getMultiExtent
        };
    }(datahub);
    !function(dh, d3) {
        var axesFormatAutoconfig = function(config) {
            var timeFormat = d3.utcFormat("%b %e, %Y at %H:%M UTC");
            var axisXFormat = "";
            if (!config.dataIsEmpty) {
                var fixedFloat = function(d) {
                    return d % 1 ? ~~(d * 100) / 100 : d;
                };
                var formatString = [];
                var timeExtent = d3.extent(config.timestamps);
                var min = timeExtent[0];
                var max = timeExtent[1];
                if (min.getTime() !== max.getTime() || min.getUTCMonth() !== max.getUTCMonth()) {
                    formatString.push("%b %e");
                }
                if (min.getYear() !== max.getYear()) {
                    formatString.push("%Y");
                }
                if (min.getYear() === max.getYear() && min.getUTCHours() !== max.getUTCHours()) {
                    formatString.push("%H:%M");
                }
                axisXFormat = d3.utcFormat(formatString.join(" "));
            }
            return {
                axisXFormat: axisXFormat,
                axisTitleXFormat: function(d) {
                    return timeFormat(d.data.x);
                },
                tooltipFormat: function(d) {
                    return fixedFloat(d.data.y);
                }
            };
        };
        var defaultConfig = function(config) {
            var defaultMargin = {
                top: 50,
                right: 50,
                bottom: 100,
                left: 50
            };
            return {
                margin: config.margin || defaultMargin,
                width: config.width || 600,
                height: config.height || 300
            };
        };
        var sortData = function(config) {
            config.dataConverted.sort(function(_a, _b) {
                var a = _a.x.getTime();
                var b = _b.x.getTime();
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return {};
        };
        var detectDataAllNulls = function(config) {
            var allNulls = !config.flattenedData.filter(function(d) {
                return d.y != null;
            }).length;
            return {
                dataIsAllNulls: allNulls
            };
        };
        var axisX = function(config) {
            var format = config.axisXFormat || "%b";
            var axisXFormat = d3.utcFormat(format) || function(d) {
                return d.toString();
            };
            var axisX = d3.axisBottom().scale(config.scaleX).tickFormat(axisXFormat);
            return {
                axisX: axisX
            };
        };
        var axisY = function(config) {
            var format = config.axisYFormat || ".2s";
            var axisYFormat = d3.format(format);
            var height = config.scaleY.range()[0];
            var axisY = d3.axisLeft().scale(config.scaleY).ticks(Math.max(~~(height / 30), 2)).tickPadding(10).tickFormat(axisYFormat).tickSize(-config.chartWidth);
            return {
                axisY: axisY
            };
        };
        var axisComponentX = function(config) {
            var axisX = config.container.selectAll("g.axis.x").data([ 0 ]);
            var axis = axisX.enter().append("g").attr("class", "x axis").attr("transform", "translate(" + [ 0, config.chartHeight ] + ")").merge(axisX).attr("display", function(d) {
                return config.dataIsEmpty ? "none" : null;
            }).attr("transform", "translate(" + [ 0, config.chartHeight ] + ")");
            axis.call(config.axisX);
            axisX.exit().remove();
            var labelsW = [];
            var texts = axis.selectAll(".tick").select("text").each(function(d, i) {
                var w = this.getBBox().width;
                if (w) {
                    labelsW.push(w);
                }
            });
            var skipCount = Math.floor(d3.max(labelsW) / config.stripeScaleX.bandwidth());
            if (skipCount) {
                axis.selectAll(".tick text").attr("display", function(d, i) {
                    return !!(i % (skipCount + 1)) ? "none" : "block";
                });
            }
            return {};
        };
        var axisComponentY = function(config) {
            var padding = config.axisYPadding || 0;
            var axisY = config.container.selectAll("g.axis.y").data([ 0 ]);
            axisY.enter().append("g").attr("class", "y axis").attr("transform", "translate(" + [ -padding / 2, 0 ] + ")").merge(axisY).call(config.axisY).attr("text-anchor", "start").selectAll("text").attr("dx", -config.margin.left + 10);
            axisY.exit().remove();
            return {};
        };
        var axisTitleComponentX = function(config) {
            var axisTitleXComponent = config.container.selectAll("text.axis-title.x").data([ 0 ]);
            axisTitleXComponent.enter().append("text").attr("class", "x axis-title").merge(axisTitleXComponent).text(config.axisTitleX || "").attr("x", config.chartWidth).attr("y", config.chartHeight);
            axisTitleXComponent.exit().remove();
            return {
                axisTitleXComponent: axisX
            };
        };
        var axisTitleComponentY = function(config) {
            var axisTitleY = config.container.selectAll("text.axis-title.y").data([ 0 ]);
            var axisY = axisTitleY.enter().append("text").attr("class", "y axis-title").merge(axisTitleY).text(config.axisTitleY || "").attr("x", -config.margin.left).attr("y", -10).attr("text-anchor", "start");
            axisTitleY.exit().remove();
            return {};
        };
        var chartTitleComponent = function(config) {
            var axisTitleX = config.container.selectAll("text.chart-title").data([ config.chartTitle || "" ]);
            axisTitleX.enter().append("text").attr("class", "chart-title").merge(axisTitleX).html(function(d) {
                return d;
            }).attr("x", function(d) {
                return (config.chartWidth - d.length * 5) / 2;
            }).attr("y", -5);
            axisTitleX.exit().remove();
            return {};
        };
        var shapePanel = function(config) {
            var shapePanel = config.container.selectAll("g.shapes").data([ 0 ]);
            var panel = shapePanel.enter().append("g").attr("class", "shapes").merge(shapePanel);
            shapePanel.exit().remove();
            return {
                shapePanel: panel
            };
        };
        var container = function(config) {
            var container = d3.select(config.parent).selectAll("div.widget-container").data([ 0 ]);
            var containerUpdate = container.enter().append("div").attr("class", "widget-container").merge(container).attr("width", config.width).attr("height", config.height);
            container.exit().remove();
            return {
                container: containerUpdate
            };
        };
        var svgContainer = function(config) {
            var widgetContainer = container(config).container;
            var root = widgetContainer.selectAll("svg").data([ 0 ]);
            var rootEnter = root.enter().append("svg").attr("class", "datahub-chart");
            var panel = rootEnter.append("g").attr("class", "panel").merge(root).attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");
            rootEnter.merge(root).attr("width", config.width).attr("height", config.height);
            root.exit().remove();
            return {
                root: root,
                container: panel
            };
        };
        var message = function(config) {
            var message = "";
            if (config.dataIsEmpty) {
                message = "(Data Unavailable)";
            } else if (config.dataIsAllNulls) {
                message = "Values are all null";
            }
            var text = config.container.select(".message-group").selectAll("text").data([ message ]);
            text.enter().append("text").merge(text).attr("x", config.chartWidth / 2).attr("y", function() {
                return config.height / 2 - this.getBBox().height / 2;
            }).text(function(d) {
                return d;
            }).attr("dx", function(d) {
                return -this.getBBox().width / 2;
            });
            text.exit().remove();
            return {};
        };
        var axisXFormatterTime = function(config) {
            config.container.select("g.axis.x").selectAll(".tick text").text(function(d) {
                return d3.timeFormat("%a")(d);
            });
            return {};
        };
        var axisXFormatterTimeHour = function(config) {
            config.container.select("g.axis.x").selectAll(".tick text").text(function(d) {
                return d3.timeFormat("%x")(d);
            });
            return {};
        };
        var axisXFormatterRotate30 = function(config) {
            config.container.select("g.axis.x").selectAll(".tick text").style("transform", "rotate(30deg)").style("text-anchor", "start");
            return {};
        };
        var axisYFormatSI = function(_config) {
            config.axisY.tickFormat(d3.format(".2s"));
            return {};
        };
        var labelsRewriterY = function(config) {
            if (!config.labelsRewriterY) {
                return {};
            }
            config.container.selectAll("g.axis.y").selectAll("text").html(function(d, i) {
                return config.labelsRewriterY(d, i, config);
            });
            return {};
        };
        var printer = function(config) {
            console.warn(config);
        };
        dh.common = {
            axesFormatAutoconfig: axesFormatAutoconfig,
            defaultConfig: defaultConfig,
            sortData: sortData,
            detectDataAllNulls: detectDataAllNulls,
            axisX: axisX,
            axisY: axisY,
            axisComponentX: axisComponentX,
            axisComponentY: axisComponentY,
            axisTitleComponentX: axisTitleComponentX,
            axisTitleComponentY: axisTitleComponentY,
            chartTitleComponent: chartTitleComponent,
            shapePanel: shapePanel,
            svgContainer: svgContainer,
            container: container,
            message: message,
            axisXFormatterTime: axisXFormatterTime,
            axisXFormatterTimeHour: axisXFormatterTimeHour,
            axisXFormatterRotate30: axisXFormatterRotate30,
            axisYFormatSI: axisYFormatSI,
            labelsRewriterY: labelsRewriterY,
            printer: printer
        };
    }(datahub, root.d3);
    !function(dh, d3) {
        var apiConfig = {
            currentBaseURI: "https://data.planetos.com/",
            baseURI: "https://api.planetos.com/v1a/",
            datasetsEndpoint: "https://api.planetos.com/v1/datasets/",
            apiKey: null
        };
        var setApiKey = function(apiKey) {
            apiConfig.apiKey = apiKey;
            return this;
        };
        var generateGeojson = function() {
            return {
                type: "Feature",
                properties: {
                    name: ""
                },
                geometry: {
                    type: "LineString",
                    coordinates: [ [ -170, 80 ], [ 170, 80 ], [ 170, -80 ], [ -170, -80 ], [ -170, 80 ] ]
                }
            };
        };
        var generateGeojsonPoints = function() {
            var points = generateArray(50, function(d, i) {
                return {
                    coordinates: [ Math.random() * 360 - 180, Math.random() * 180 - 90 ],
                    id: "random-point-" + i
                };
            });
            return pointsToFeatures(points);
        };
        var generateRandomString = function(len) {
            return Math.random().toString(36).substring(4, len + 4 || 8);
        };
        var pointsToFeatures = function(points) {
            return {
                type: "FeatureCollection",
                features: points.map(function(d) {
                    return {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: d.coordinates
                        },
                        properties: {
                            id: d.id
                        }
                    };
                })
            };
        };
        var getWorldVector = function(cb) {
            var geojsonUrl = "https://cdn.rawgit.com/johan/world.geo.json/master/countries.geo.json";
            getJSON(geojsonUrl, function(error, json) {
                cb(json);
            });
        };
        function createDateAsUTC(date) {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        }
        function convertDateToUTC(date) {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        }
        var generateRaster = function() {
            var rasterData = {
                lon: generateArray(360, function(d, i) {
                    return i - 180;
                }),
                lat: generateArray(180, function(d, i) {
                    return 180 - i - 90;
                }),
                values: generateArray(180, function(d, i) {
                    return generateArray(360, function(dB, iB) {
                        return ~~(Math.random() * 100);
                    });
                })
            };
            rasterData.uniqueValues = dh.utils.arrayUniques(rasterData.values);
            return rasterData;
        };
        var generateArray = function(n, _generationFn) {
            var generationFn = _generationFn || function(x, i) {
                return 0;
            };
            return Array.apply(null, Array(n)).map(generationFn);
        };
        var generateTimeSeries = function(_config) {
            var _config = _config || {};
            var config = {
                count: _config.count || 12,
                layerCount: _config.layerCount || 1,
                timeStart: _config.timeStart || "2016-01-01",
                timeIncrement: _config.timeIncrement || "month",
                step: _config.step || 1,
                min: _config.min || 0,
                max: _config.max || 100
            };
            var startValue = ~~(Math.random() * (config.max - config.min)) + config.min;
            var values = generateArray(config.count, function() {
                return generateArray(config.layerCount, function(d) {
                    startValue += (Math.random() * 2 - 1) * ((config.max - config.min) / 10);
                    startValue = Math.max(startValue, config.min);
                    return startValue;
                });
            });
            var timestamps = generateTimestamps(config);
            var merged = timestamps.map(function(d, i) {
                return {
                    timestamp: d,
                    value: values[i],
                    id: values[i].map(function(d) {
                        return ~~(Math.random() * 1e3);
                    }),
                    className: values[i].map(function(d) {
                        return Math.random().toString(36).substring(4, 8);
                    })
                };
            });
            return merged;
        };
        var generateTimeSeriesSplit = function(_config) {
            var _config = _config || {};
            var config = {
                count: _config.count || 12,
                layerCount: _config.layerCount || 1,
                timeStart: _config.timeStart || "2016-01-01",
                timeIncrement: _config.timeIncrement || "month",
                step: _config.step || 1,
                min: _config.min || 0,
                max: _config.max || 100
            };
            var startValue = ~~(Math.random() * (config.max - config.min)) + config.min;
            var values = generateArray(config.layerCount, function() {
                var dataset = {};
                var timestamps = generateTimestamps(config);
                dataset.data = generateArray(config.count, function(d, i) {
                    startValue += (Math.random() * 2 - 1) * ((config.max - config.min) / 10);
                    startValue = Math.max(startValue, config.min);
                    startValue = Math.min(startValue, config.max);
                    return {
                        value: startValue,
                        timestamp: timestamps[i]
                    };
                });
                dataset.metadata = {
                    id: generateRandomString(8)
                };
                return dataset;
            });
            return values;
        };
        var generateTimestamps = function(_config) {
            var _config = _config || {};
            var config = {
                count: _config.count || 12,
                layerCount: _config.layerCount || 1,
                timeStart: _config.timeStart || "2016-01-01",
                timeIncrement: _config.timeIncrement || "month",
                step: _config.step || 1,
                min: _config.min || 0,
                max: _config.max || 100
            };
            var intervalFuncName = "utc" + dh.utils.capitalize(config.timeIncrement) || "utcHour";
            var intervalFunc = d3[intervalFuncName];
            var intervalRangeFunc = d3[intervalFuncName + "s"];
            var dateStart = config.timeStart ? new Date(config.timeStart) : new Date();
            var dateEnd = intervalFunc.offset(dateStart, config.count * config.step);
            var dates = intervalRangeFunc(dateStart, dateEnd, config.step);
            var datesISOString = dates.map(function(d, i) {
                return d3.isoFormat(d);
            });
            return datesISOString;
        };
        var generateWeatherChartData = function() {
            var historicalDataConfig = {
                layerCount: 1,
                count: 10,
                timeIncrement: "minute",
                min: 0,
                max: 50
            };
            var forecastDataConfig = datahub.utils.mergeAll({}, historicalDataConfig, {
                layerCount: 1,
                count: 100,
                timeIncrement: "hour"
            });
            var generatedData = {
                historical: {
                    wind: datahub.data.generateTimeSeriesSplit(historicalDataConfig)[0],
                    windDirection: datahub.data.generateTimeSeriesSplit(historicalDataConfig)[0],
                    wave: datahub.data.generateTimeSeriesSplit(historicalDataConfig)[0],
                    tide: datahub.data.generateTimeSeriesSplit(historicalDataConfig)[0],
                    bottomAxis: datahub.data.generateTimeSeriesSplit(historicalDataConfig)[0],
                    topAxis: datahub.data.generateTimeSeriesSplit(historicalDataConfig)[0]
                },
                forecast: {
                    wind: datahub.data.generateTimeSeriesSplit(forecastDataConfig)[0],
                    windDirection: datahub.data.generateTimeSeriesSplit(forecastDataConfig)[0],
                    wave: datahub.data.generateTimeSeriesSplit(forecastDataConfig)[0],
                    tide: datahub.data.generateTimeSeriesSplit(forecastDataConfig)[0],
                    bottomAxis: datahub.data.generateTimeSeriesSplit(forecastDataConfig)[0],
                    topAxis: datahub.data.generateTimeSeriesSplit(forecastDataConfig)[0]
                }
            };
            return generatedData;
        };
        var getJSON = function(url, cb) {
            var xhr = typeof XMLHttpRequest != "undefined" ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xhr.open("get", url, true);
            xhr.onreadystatechange = function() {
                var status;
                var data;
                if (xhr.readyState == 4) {
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        cb(null, data);
                    } else {
                        cb(status);
                    }
                }
            };
            xhr.send();
        };
        function verifyApiKey(apiKey) {
            if (apiKey) {
                return true;
            } else {
                throw "You need to set an API key using `datahub.data.setApiKey(API_KEY)`. You can get yours at http://data.planetos.com/";
            }
        }
        var getDatasetDetails = function(datasetName, cb) {
            verifyApiKey(apiConfig.apiKey);
            var datasetDetailsURL = apiConfig.baseURI + "/datasets/" + datasetName + "?apikey=" + apiConfig.apiKey;
            console.log("get dataset details", datasetDetailsURL);
            getJSON(datasetDetailsURL, function(error, d) {
                if (d === undefined) {
                    console.log("Can not render dataset because of API error", error);
                    return false;
                }
                var featureType = d["FeatureType"] || "timeseries";
                var dataType = featureType.toLowerCase().trim() === "grid" ? "raster" : "timeseries";
                console.log("Data type:", dataType, d["ProductType"], d["FeatureType"], d);
                cb({
                    datasetInfo: d,
                    dataType: dataType,
                    productType: d["ProductType"]
                });
            });
            return this;
        };
        var getVariables = function(datasetName, defaultVariable, cb) {
            verifyApiKey(apiConfig.apiKey);
            var uri = apiConfig.baseURI + "/datasets/" + datasetName + "/variables" + "?apikey=" + apiConfig.apiKey;
            console.log("query variables", uri);
            getJSON(uri, function(error, json) {
                var variables = json[datasetName];
                var found;
                var curatedVariable = defaultVariable;
                if (curatedVariable) {
                    found = variables.filter(function(d) {
                        return d.name === curatedVariable;
                    })[0];
                }
                var variable = found || variables[0];
                cb({
                    variables: variables,
                    defaultVariable: variable
                });
            });
            return this;
        };
        var getTimestamps = function(datasetName, variableName, cb) {
            verifyApiKey(apiConfig.apiKey);
            var uri = apiConfig.baseURI + "/datasets/" + datasetName + "/variables/" + encodeURIComponent(variableName) + "/timestamps?apikey=" + apiConfig.apiKey;
            console.log("query timestamps", uri);
            getJSON(uri, function(error, json) {
                if (error) {
                    console.log("Server error", error);
                    return;
                }
                var timestamps = json.map(function(d) {
                    return new Date(parseInt(d));
                });
                cb({
                    timestamps: timestamps
                });
            });
            return this;
        };
        var getPreview = function(datasetName, variableName, timestamp, cb) {
            verifyApiKey(apiConfig.apiKey);
            var uri = apiConfig.baseURI + "/datasets/" + datasetName + "/variables/" + encodeURIComponent(variableName);
            if (timestamp) {
                uri += "/timestamps/" + timestamp;
            }
            uri += "/sample_data";
            uri += "?apikey=" + apiConfig.apiKey;
            console.log("query dataset", uri);
            getJSON(uri, function(error, json) {
                if (error) {
                    console.log("Server error", error);
                    return;
                }
                json.values = json.values.map(function(d, i) {
                    return d.map(function(dB) {
                        if (dB === -999) {
                            return null;
                        }
                        return dB;
                    });
                });
                json.uniqueValues = dh.utils.arrayUniques(json.values).sort();
                var datahubLink = apiConfig.currentBaseURI + "/datasets/" + datasetName + "?variable=" + variableName;
                cb({
                    json: json,
                    uri: uri,
                    datahubLink: datahubLink
                });
            });
            return this;
        };
        var getStations = function getStations(datasetName, cb) {
            verifyApiKey(apiConfig.apiKey);
            var uri = apiConfig.datasetsEndpoint + datasetName + "/stations" + "?apikey=" + apiConfig.apiKey;
            console.log("get stations", uri);
            getJSON(uri, function(error, json) {
                if (error) {
                    console.log("Server error", error);
                    return;
                }
                var stations = [];
                for (var x in json.station) {
                    var station = json.station[x];
                    if (station.SpatialExtent !== undefined) {
                        stations.push({
                            id: x,
                            coordinates: station.SpatialExtent.coordinates
                        });
                    }
                }
                cb({
                    stations: stations,
                    defaultStation: stations[0]
                });
            });
            return this;
        };
        var getStationVariables = function(datasetName, stationID, variableName, isAscending, cb) {
            verifyApiKey(apiConfig.apiKey);
            var pointCount = 500;
            var uri = apiConfig.datasetsEndpoint + datasetName + "/stations/" + stationID + "?apikey=" + apiConfig.apiKey + "&verbose=true&count=" + pointCount;
            if (!isAscending) {
                uri += "&time_order=desc";
            }
            console.log("station variable", uri);
            getJSON(uri, function(error, json) {
                if (error) {
                    console.log("Server error", error);
                    return;
                }
                console.log("Point API data", json, uri);
                var variablesMetadata = {};
                var ctx = json.metadata.contexts;
                var dataVars, dataVarTmp;
                for (var x in ctx) {
                    dataVars = ctx[x].dataVariables;
                    for (var y in dataVars) {
                        dataVarTmp = dataVars[y];
                        dataVarTmp.key = y;
                        variablesMetadata[y] = dataVarTmp;
                    }
                }
                var variablesData = {};
                json.entries.forEach(function(d) {
                    for (var x in d.data) {
                        if (!variablesData[x]) {
                            variablesData[x] = {
                                values: [],
                                timestamps: []
                            };
                        }
                        variablesData[x].values.push(d.data[x]);
                        variablesData[x].timestamps.push(new Date(d.axes.time));
                    }
                });
                var variableList = [];
                for (var key in variablesMetadata) {
                    variableList.push(variablesMetadata[key]);
                }
                var datahubLink = apiConfig.currentBaseURI + "/datasets/" + datasetName + "?variable=" + variableName;
                cb({
                    datasets: variablesData,
                    variablesMetadata: variablesMetadata,
                    variables: variableList,
                    datahubLink: datahubLink,
                    variableData: variablesData[variableName],
                    variableMetadata: variablesMetadata[variableName]
                });
            });
            return this;
        };
        var getImage = function(datasetName, variableName, timestamp, width, cb) {
            verifyApiKey(apiConfig.apiKey);
            var uri = apiConfig.baseURI + "/datasets/" + datasetName + "/variables/" + encodeURIComponent(variableName);
            if (timestamp) {
                uri += "/timestamps/" + timestamp;
            }
            uri += "/image";
            uri += "?width=" + width + "&projection=mercator";
            uri += "&apikey=" + apiConfig.apiKey;
            console.log("query image", uri);
            getJSON(uri, function(error, json) {
                cb(json.img, json.metadata);
            });
            return this;
        };
        dh.data = {
            generateRaster: generateRaster,
            generateGeojson: generateGeojson,
            generateTimeSeries: generateTimeSeries,
            generateTimeSeriesSplit: generateTimeSeriesSplit,
            generateTimestamps: generateTimestamps,
            generateWeatherChartData: generateWeatherChartData,
            getDatasetDetails: getDatasetDetails,
            getVariables: getVariables,
            getTimestamps: getTimestamps,
            getPreview: getPreview,
            getStations: getStations,
            getStationVariables: getStationVariables,
            getImage: getImage,
            getJSON: getJSON,
            apiConfig: apiConfig,
            pointsToFeatures: pointsToFeatures,
            generateGeojsonPoints: generateGeojsonPoints,
            getWorldVector: getWorldVector,
            setApiKey: setApiKey
        };
    }(datahub, root.d3);
    !function(dh, d3) {
        var template = function(config) {
            var containerNode = config.parent.querySelector(".widget-container");
            if (!containerNode) {
                var template = '<div class="widget-container">' + '<svg class="datahub-chart">' + '<g class="panel">' + '<g class="stripe-group"></g>' + '<g class="area-group"></g>' + '<g class="stacked-area-group"></g>' + '<g class="reference-bar-group"></g>' + '<g class="reference-line-group"></g>' + '<g class="bar-group"></g>' + '<g class="stacked-bar-group"></g>' + '<g class="estimate-bar-group"></g>' + '<g class="line-group"></g>' + '<g class="dot-group"></g>' + '<g class="threshold-line-group"></g>' + '<g class="y axis"></g>' + '<g class="x axis"></g>' + '<g class="active-group"></g>' + '<g class="title-container">' + '<text class="y axis-title"></text>' + '<text class="x axis-title"></text>' + '<text class="chart-title"></text>' + "</g>" + '<g class="message-group"></g>' + '<g class="events"><rect class="event-panel"></rect></g>' + "</g>" + "</svg>" + "</div>";
                containerNode = dh.utils.appendHtmlToNode(template, config.parent);
            }
            var chartWidth = config.width - config.margin.left - config.margin.right;
            var chartHeight = config.height - config.margin.top - config.margin.bottom;
            var container = d3.select(containerNode);
            container.select("svg").attr("width", config.width).attr("height", config.height);
            container.select(".panel").attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");
            container.select(".events rect").attr("width", chartWidth).attr("height", chartHeight).attr("opacity", 0);
            return {
                container: container,
                chartWidth: chartWidth,
                chartHeight: chartHeight
            };
        };
        var validateData = function(d, key, is2D) {
            return d[key] ? d[key].map(function(d) {
                d.timestamp = new Date(d.timestamp);
                d.value = Array.isArray(d.value) && !is2D ? d.value[0] : d.value;
                return d;
            }) : [];
        };
        var validateTimestamp = function(d) {
            return d.timestamp ? d.timestamp.map(function(d) {
                return new Date(d);
            }) : [];
        };
        var dataAdapter = function(config) {
            var d = config.data || {};
            return {
                dataIsEmpty: !d || !d.timestamp || !d.timestamp.length,
                data: {
                    timestamp: validateTimestamp(d),
                    stackedBarData: validateData(d, "stackedBarData", true),
                    stackedAreaData: validateData(d, "stackedAreaData", true),
                    lineData: validateData(d, "lineData", true),
                    barData: validateData(d, "barData"),
                    referenceData: validateData(d, "referenceData"),
                    estimateData: validateData(d, "estimateData"),
                    thresholdData: validateData(d, "thresholdData"),
                    areaData: validateData(d, "areaData")
                }
            };
        };
        var scaleX = function(config) {
            var dataX = config.dataIsEmpty ? 0 : config.data.timestamp;
            var scaleX = d3.scaleBand().domain(dataX).range([ 0, config.chartWidth ]).paddingInner(.4).paddingOuter(.2);
            var referenceScaleX = scaleX.copy().paddingInner(.1).paddingOuter(.05);
            var stripeScaleX = scaleX.copy().paddingInner(0).paddingOuter(0);
            var lineScaleX = scaleX.copy().paddingInner(1).paddingOuter(.5);
            return {
                scaleX: scaleX,
                referenceScaleX: referenceScaleX,
                stripeScaleX: stripeScaleX,
                lineScaleX: lineScaleX
            };
        };
        var scaleY = function(config) {
            var maxs = [];
            maxs.push(dh.utils.getExtent(config.data.barData));
            maxs.push(dh.utils.getExtent(config.data.referenceData));
            maxs.push(dh.utils.getExtent(config.data.estimateData));
            maxs.push(dh.utils.getExtent(config.data.thresholdData));
            maxs.push(dh.utils.getExtent(config.data.areaData));
            maxs.push(dh.utils.getStackExtent(config.data.stackedBarData));
            maxs.push(dh.utils.getStackExtent(config.data.stackedAreaData));
            maxs.push(dh.utils.getMultiExtent(config.data.lineData));
            var mins = [];
            var isMin = true;
            mins.push(dh.utils.getExtent(config.data.barData, isMin));
            mins.push(dh.utils.getExtent(config.data.referenceData, isMin));
            mins.push(dh.utils.getExtent(config.data.estimateData, isMin));
            mins.push(dh.utils.getExtent(config.data.thresholdData, isMin));
            mins.push(dh.utils.getExtent(config.data.areaData, isMin));
            mins.push(dh.utils.getStackExtent(config.data.stackedBarData, isMin));
            mins.push(dh.utils.getStackExtent(config.data.stackedAreaData, isMin));
            mins.push(dh.utils.getMultiExtent(config.data.lineData, isMin));
            var max = d3.max(maxs);
            var min;
            if (config.autoScaleY) {
                min = d3.min(mins);
                var padding = (max - min) / 10;
                min = Math.max(min - padding, 0);
                max += padding;
            } else {
                min = Math.min(d3.min(mins), 0);
                max = Math.max(max, 0);
            }
            var domain = [ min, max ];
            if (config.domain) {
                domain = config.domain;
            } else {
                domain;
            }
            if (config.reverseY) {
                domain = [ domain[1], domain[0] ];
            }
            var scaleY = d3.scaleLinear().domain(domain).range([ config.chartHeight, 0 ]);
            return {
                scaleY: scaleY
            };
        };
        var findData = function(data, key, timestamp) {
            if (!timestamp) {
                return null;
            }
            var index = data[key].map(function(d) {
                return d.timestamp && d.timestamp.getTime();
            }).indexOf(timestamp.getTime());
            if (index > -1) {
                var datum = dh.utils.mergeAll({}, data[key][index]);
                datum.value = [].concat(data[key][index].value);
                datum.id = [].concat(data[key][index].id);
                return datum;
            } else {
                return null;
            }
        };
        var findThresholdData = function(data, key, timestamp) {
            if (data[key][0]) {
                var datum = dh.utils.mergeAll({}, data[key][0]);
                datum.value = [].concat(data[key][0].value);
                datum.id = [].concat(data[key][0].id);
                return datum;
            } else {
                return null;
            }
        };
        var getValuesAtTimestamp = function(timestamp, data) {
            var values = {
                referenceData: findData(data, "referenceData", timestamp),
                estimateData: findData(data, "estimateData", timestamp),
                barData: findData(data, "barData", timestamp),
                stackedBarData: findData(data, "stackedBarData", timestamp),
                lineData: findData(data, "lineData", timestamp),
                areaData: findData(data, "areaData", timestamp),
                stackedAreaData: findData(data, "stackedAreaData", timestamp),
                thresholdData: findThresholdData(data, "thresholdData", timestamp)
            };
            return values;
        };
        var eventsPanel = function(config) {
            var eventPanel = config.container.select(".events .event-panel").on("mousemove touchstart", function(d) {
                if (config.dataIsEmpty) {
                    return;
                }
                var mouseX = d3.mouse(this)[0];
                var w = config.stripeScaleX.bandwidth();
                var domain = config.stripeScaleX.domain();
                var domainLength = domain.length;
                var index = Math.min(~~(mouseX / w), domainLength - 1);
                var timestamp = domain[index];
                var values = getValuesAtTimestamp(timestamp, config.data);
                config.events.call("hover", null, {
                    index: index,
                    timestamp: timestamp,
                    data: values,
                    config: config,
                    event: d3.event
                });
            }).on("mouseout", function(d) {
                config.events.call("mouseout", null, {});
            }).on("click", function(d) {
                config.events.call("click", null, {
                    event: d3.event
                });
            });
            return {
                eventPanel: eventPanel
            };
        };
        var barShapes = function(config) {
            var shapes = config.container.select(".bar-group").selectAll("rect.bar").data(config.data.barData);
            shapes.enter().append("rect").merge(shapes).attr("class", function(d) {
                return [ "bar", d.id, d.className ].join(" ");
            }).attr("x", function(d, i) {
                return config.scaleX(d.timestamp) || 0;
            }).attr("y", function(d) {
                if (config.autoScaleY) {
                    return config.chartHeight - (config.chartHeight - Math.abs(config.scaleY(d.value)));
                }
                if (d.value >= 0 || config.reverseY) {
                    return config.scaleY(0) - Math.abs(config.scaleY(d.value) - config.scaleY(0));
                } else {
                    return config.scaleY(0);
                }
            }).attr("width", function(d) {
                return config.scaleX.bandwidth();
            }).attr("height", function(d) {
                if (config.autoScaleY) {
                    return config.chartHeight - Math.abs(config.scaleY(d.value));
                }
                return Math.abs(config.scaleY(d.value) - config.scaleY(0));
            });
            shapes.exit().remove();
            return {};
        };
        var estimateBarShapes = function(config) {
            var shapes = config.container.select(".estimate-bar-group").selectAll("rect.estimate-bar").data(config.data.estimateData);
            shapes.enter().append("rect").merge(shapes).attr("class", function(d) {
                return [ "estimate-bar", d.id, d.className ].join(" ");
            }).attr("x", function(d, i) {
                return config.scaleX(d.timestamp) || 0;
            }).attr("y", function(d) {
                return config.scaleY(d.value) || 0;
            }).attr("width", function(d) {
                return config.scaleX.bandwidth();
            }).attr("height", function(d) {
                return config.chartHeight - config.scaleY(d.value) || 0;
            });
            shapes.exit().remove();
            return {};
        };
        var referenceBarShapes = function(config) {
            var shapes = config.container.select(".reference-bar-group").selectAll("rect.reference-bar").data(config.data.referenceData);
            shapes.enter().append("rect").merge(shapes).attr("class", function(d) {
                return [ "reference-bar", d.id, d.className ].join(" ");
            }).attr("x", function(d, i) {
                return config.referenceScaleX(d.timestamp) || 0;
            }).attr("y", function(d) {
                if (config.autoScaleY) {
                    return config.chartHeight - (config.chartHeight - Math.abs(config.scaleY(d.value)));
                }
                if (d.value >= 0 || config.reverseY) {
                    return config.scaleY(0) - Math.abs(config.scaleY(d.value) - config.scaleY(0));
                } else {
                    return config.scaleY(0);
                }
            }).attr("width", function(d) {
                return config.referenceScaleX.bandwidth();
            }).attr("height", function(d) {
                if (config.autoScaleY) {
                    return config.chartHeight - Math.abs(config.scaleY(d.value));
                }
                return Math.abs(config.scaleY(d.value) - config.scaleY(0));
            });
            shapes.exit().remove();
            var lines = config.container.select(".reference-line-group").selectAll("path.reference-top").data(config.data.referenceData);
            lines.enter().append("path").attr("class", "reference-top").merge(lines).attr("d", function(d, i) {
                var x = config.referenceScaleX(d.timestamp) || 0;
                var y = 0;
                if (d.value >= 0 || config.reverseY) {
                    y = config.scaleY(0) - Math.abs(config.scaleY(d.value) - config.scaleY(0));
                } else {
                    y = config.scaleY(0) + Math.abs(config.scaleY(d.value) - config.scaleY(0));
                }
                var width = config.referenceScaleX.bandwidth();
                return "M" + [ [ x, y ], [ x + width, y ] ];
            });
            lines.exit().remove();
            return {};
        };
        var stackedBarShapes = function(config) {
            if (!config.data.stackedBarData || !config.data.stackedBarData.length) {
                config.container.select(".stacked-bar-group").selectAll("g.stack").remove();
                return {};
            }
            var keys = config.data.stackedBarData[0].value.map(function(d, i) {
                return "y" + i;
            });
            var data = [];
            config.data.stackedBarData.forEach(function(d, i) {
                var datum = dh.utils.mergeAll({}, d);
                if (d.value && d.value.length) {
                    d.value.forEach(function(dB, iB) {
                        datum["y" + iB] = dB;
                    });
                    data.push(datum);
                }
            });
            var stackedBar = config.container.select(".stacked-bar-group").selectAll("g.stack").data(d3.stack().keys(keys)(data));
            var bar = stackedBar.enter().append("g").attr("class", "stack").merge(stackedBar).selectAll("rect.stacked-bar").data(function(d, i) {
                d.forEach(function(dB) {
                    dB.index = d.index;
                });
                return d;
            });
            bar.enter().append("rect").attr("class", "stacked-bar").merge(bar).attr("class", function(d, a, b) {
                var id = d.data.id ? d.data.id[d.index] : null;
                var className = d.data.className ? d.data.className[d.index] : null;
                return [ "stacked-bar", "layer" + d.index, id, className ].join(" ");
            }).filter(function(d) {
                return !Number.isNaN(d[0]) && !Number.isNaN(d[1]);
            }).attr("x", function(d) {
                return config.scaleX(d.data.timestamp);
            }).attr("y", function(d) {
                return config.scaleY(d[1]);
            }).attr("height", function(d) {
                return config.scaleY(d[0]) - config.scaleY(d[1]);
            }).attr("width", config.scaleX.bandwidth());
            bar.exit().remove();
            stackedBar.exit().remove();
            return {};
        };
        var lineShapes = function(config) {
            if (!config.data.lineData.length) {
                config.container.select(".line-group").selectAll("path.line").remove();
                return {};
            }
            var line = d3.line().defined(function(d) {
                return d.value != null;
            }).x(function(d) {
                return config.lineScaleX(d.timestamp);
            }).y(function(d) {
                return config.scaleY(d.value);
            });
            var data = [];
            var valueLength = config.data.lineData[0].value.length;
            if (typeof valueLength === "undefined") {
                data.push(config.data.lineData);
            } else {
                for (var i = 0; i < valueLength; i++) {
                    var layer = config.data.lineData.map(function(dB) {
                        return {
                            timestamp: dB.timestamp,
                            value: dB.value[i],
                            id: dB.id && dB.id[i],
                            className: dB.className && dB.className[i]
                        };
                    });
                    data.push(layer);
                }
            }
            var shapes = config.container.select(".line-group").selectAll("path.line").data(data);
            shapes.enter().append("path").style("fill", "none").merge(shapes).attr("class", function(d, i) {
                return [ "line", "layer" + i, d[0].id, d[0].className ].join(" ");
            }).attr("d", line);
            shapes.exit().remove();
            return {};
        };
        var dotShapes = function(config) {
            if (!config.data.lineData.length) {
                config.container.select(".dot-group").selectAll(".dot-layer").remove();
                return {};
            }
            var data = config.data.lineData;
            var dataCut = [];
            var valueLength = data[0].value.length;
            for (var i = 0; i < valueLength; i++) {
                var layer = [];
                data.forEach(function(dB, iB) {
                    var prevIdx = Math.max(0, iB - 1);
                    var nextIdx = Math.min(data.length - 1, iB + 1);
                    var currentIdx = iB;
                    var prev = data[prevIdx].value[i];
                    var next = data[nextIdx].value[i];
                    var current = dB.value[i];
                    if (current !== null && (prev === null || next === null) || currentIdx === prevIdx && currentIdx === nextIdx) {
                        layer.push({
                            value: current,
                            timestamp: dB.timestamp,
                            layer: i
                        });
                    }
                });
                dataCut.push(layer);
            }
            var dotLayers = config.container.select(".dot-group").selectAll(".dot-layer").data(dataCut);
            var dotLayersUpdate = dotLayers.enter().append("g").merge(dotLayers).attr("class", "dot-layer");
            dotLayers.exit().remove();
            var shapes = dotLayersUpdate.selectAll(".dot").data(function(d, i) {
                return d;
            });
            shapes.enter().append("circle").merge(shapes).attr("class", function(d, i, a) {
                return [ "dot", "layer" + d.layer ].join(" ");
            }).attr("cx", function(d) {
                return config.lineScaleX(d.timestamp);
            }).attr("cy", function(d) {
                return config.scaleY(d.value);
            }).attr("r", 2);
            shapes.exit().remove();
            return {};
        };
        var thresholdLineShape = function(config) {
            var line = config.container.select(".threshold-line-group").selectAll("line.threshold-line").data(config.data.thresholdData);
            line.enter().append("line").merge(line).attr("class", function(d) {
                return [ "threshold-line", d.id, d.className ].join(" ");
            }).attr("x1", 0).attr("y1", function(d) {
                return config.scaleY(d.value) || 0;
            }).attr("x2", config.chartWidth).attr("y2", function(d) {
                return config.scaleY(d.value) || 0;
            }).attr("display", function(d) {
                return d ? null : "none";
            });
            line.exit().remove();
            return {};
        };
        var areaShapes = function(config) {
            if (!config.data.areaData || !config.data.areaData.length) {
                config.container.select(".area-group").selectAll("path.area").remove();
                return {};
            }
            var areaGenerator = d3.area().defined(function(d) {
                return d.value != null;
            }).x(function(d) {
                return config.lineScaleX(d.timestamp);
            }).y0(config.chartHeight).y1(function(d) {
                return config.scaleY(d.value);
            });
            var shapes = config.container.select(".area-group").selectAll("path.area").data([ config.data.areaData ]);
            shapes.enter().append("path").attr("class", function(d, i) {
                return [ "area", "layer" + i, d[0].id, d[0].className ].join(" ");
            }).merge(shapes).attr("d", areaGenerator);
            shapes.exit().remove();
            return {};
        };
        var stackedAreaShapes = function(config) {
            if (!config.data.stackedAreaData || !config.data.stackedAreaData.length) {
                config.container.select(".stacked-area-group").selectAll("g.stack-area").remove();
                return {};
            }
            var keys = config.data.stackedAreaData[0].value.map(function(d, i) {
                return "y" + i;
            });
            var areaGenerator = d3.area().defined(function(d) {
                return !Number.isNaN(d[0]) && !Number.isNaN(d[1]);
            }).x(function(d) {
                return config.lineScaleX(d.data.timestamp);
            }).y0(function(d) {
                return config.scaleY(d[0]);
            }).y1(function(d) {
                return config.scaleY(d[1]);
            });
            var data = [];
            config.data.stackedAreaData.forEach(function(d, i) {
                var datum = dh.utils.mergeAll({}, d);
                if (d.value && d.value.length) {
                    d.value.forEach(function(dB, iB) {
                        datum["y" + iB] = dB;
                    });
                    data.push(datum);
                }
            });
            var stackedArea = config.container.select(".stacked-area-group").selectAll("g.stack-area").data(d3.stack().keys(keys)(data));
            var area = stackedArea.enter().append("g").attr("class", "stack-area").merge(stackedArea).selectAll("path.stacked-area").data(function(d, i) {
                d.forEach(function(dB) {
                    dB.index = d.index;
                });
                return [ d ];
            });
            area.enter().append("path").merge(area).attr("class", function(d) {
                var id = d[0].data.id ? d[0].data.id[d.index] : null;
                var className = d[0].data.className ? d[0].data.className[d.index] : null;
                return [ "stacked-area", "layer" + d.index, id, className ].join(" ");
            }).attr("d", areaGenerator);
            area.exit().remove();
            stackedArea.exit().remove();
            return {};
        };
        var stripes = function(config) {
            if (config.showStripes === false) {
                config.container.select(".stripe-group").selectAll("rect.stripe").remove();
                return {};
            }
            var shapes = config.container.select(".stripe-group").selectAll("rect.stripe").data(config.data.timestamp);
            shapes.enter().append("rect").attr("class", "stripe").merge(shapes).classed("even", function(d, i) {
                return i % 2;
            }).attr("x", function(d, i) {
                return config.stripeScaleX(d) || 0;
            }).attr("y", function(d) {
                return 0;
            }).attr("width", function(d) {
                return config.stripeScaleX.bandwidth();
            }).attr("height", function(d) {
                return config.chartHeight;
            });
            shapes.exit().remove();
            return {};
        };
        var active = function(config) {
            var activeTs = !config.activeDate || config.activeDate.getTime === undefined ? new Date(config.activeDate).getTime() : config.activeDate.getTime();
            var selectedTimestamp = config.data.timestamp.filter(function(d) {
                return d.getTime() === activeTs;
            });
            var shapes = config.container.select(".active-group").selectAll("rect.active").data(selectedTimestamp);
            shapes.enter().append("rect").attr("class", "active").merge(shapes).each(function(d) {
                if (config.dataIsEmpty) {
                    return;
                }
                var values = getValuesAtTimestamp(d, config.data);
                config.events.call("active", null, {
                    timestamp: d,
                    data: values,
                    config: config,
                    event: d3.event
                });
            }).attr("x", function(d, i) {
                return config.stripeScaleX(d) || 0;
            }).attr("y", function(d) {
                return 0;
            }).attr("width", function(d) {
                return config.stripeScaleX.bandwidth();
            }).attr("height", function(d) {
                return config.chartHeight;
            });
            shapes.exit().remove();
            return {};
        };
        var multi = dh.utils.pipeline(dh.common.defaultConfig, dataAdapter, template, scaleX, scaleY, eventsPanel, dh.common.axisX, dh.common.axisY, stripes, active, areaShapes, referenceBarShapes, stackedBarShapes, stackedAreaShapes, barShapes, estimateBarShapes, lineShapes, dotShapes, thresholdLineShape, dh.common.axisComponentY, dh.common.labelsRewriterY, dh.common.message, dh.common.axisComponentX, dh.common.axisTitleComponentX, dh.common.axisTitleComponentY, dh.common.chartTitleComponent);
        var multiChart = function(config) {
            var configCache, events = d3.dispatch("hover", "click", "mouseout", "active"), chartCache, uid = ~~(Math.random() * 1e4);
            var onResize = dh.utils.throttle(function() {
                configCache.width = configCache.parent.clientWidth;
                render();
            }, 200);
            d3.select(window).on("resize." + uid, onResize);
            var render = function() {
                chartCache = multi(configCache);
            };
            var setData = function(data) {
                var d = data ? JSON.parse(JSON.stringify(data)) : {};
                configCache = dh.utils.mergeAll({}, configCache);
                configCache.data = d;
                render();
                return this;
            };
            var setConfig = function(config) {
                configCache = dh.utils.mergeAll(configCache, config);
                render();
                return this;
            };
            var init = function(config, events) {
                setConfig(dh.utils.mergeAll(config, {
                    events: events
                }));
            };
            var destroy = function() {
                d3.select(window).on("resize." + uid, null);
                configCache.parent.innerHTML = null;
            };
            init(config, events);
            return {
                on: dh.utils.rebind(events),
                setConfig: setConfig,
                setData: setData,
                destroy: destroy
            };
        };
        dh.multiChart = multiChart;
    }(datahub, root.d3);
    if (typeof module === "object" && module.exports) {
        module.exports = exports;
    }
    global["datahub"] = exports;
})({}, function() {
    return this;
}());