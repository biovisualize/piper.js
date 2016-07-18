export function override(_objA, _objB) {
    for (var x in _objB) {
        if (x in _objA) { _objA[x] = _objB[x]; }
    }
}

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

export function pipeline() {
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

// from https://github.com/curran/reactive-property
export function reactiveProperty(value) {
    var listeners;

    function property(newValue) {
        if (arguments.length === 1) {
            value = newValue;
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i](value);
                }
            }
            return this;
        }
        return value;
    }

    property.on = function(listener) {
        if (!listeners) {
            listeners = [];
        }
        listeners.push(listener);
        if (typeof(value) !== "undefined" && value !== null) {
            listener(value);
        }
        return listener;
    };

    property.clear = function(listenerToRemove) {
        listeners = [];
        return this;
    };

    property.off = function(listenerToRemove) {
        if (listeners) {
            listeners = listeners.filter(function(listener) {
                return listener !== listenerToRemove;
            });
        }
    };

    return property;

}