piper.tooltipWidget = function(tooltipNode) {
    var root = d3.select(tooltipNode)
        .style({
            position: 'absolute',
            'pointer-events': 'none'
        });
    var setText = function(html) {
        root.html(html);
        return this;
    };
    var position = function(pos) {
        root.style({
            left: pos[0] + 'px',
            top: pos[1] + 'px'
        });
        return this;
    };
    var show = function() {
        root.style({
            display: 'block'
        });
        return this;
    };
    var hide = function() {
        root.style({
            display: 'none'
        });
        return this;
    };

    return {
        setText: setText,
        setPosition: position,
        show: show,
        hide: hide
    };
};