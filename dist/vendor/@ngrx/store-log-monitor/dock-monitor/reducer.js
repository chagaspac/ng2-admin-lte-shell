"use strict";
var store_1 = require('@ngrx/store');
var actions_1 = require('./actions');
exports.POSITIONS = ['left', 'top', 'right', 'bottom'];
function useDockMonitor(_options) {
    if (_options === void 0) { _options = {}; }
    var options = Object.assign({
        position: 'right',
        visible: true,
        size: 0.3
    }, _options);
    function position(state, action) {
        if (state === void 0) { state = options.position; }
        return (action.type === actions_1.DockActions.CHANGE_POSITION) ?
            exports.POSITIONS[(exports.POSITIONS.indexOf(state) + 1) % exports.POSITIONS.length] :
            state;
    }
    function size(state, action) {
        if (state === void 0) { state = options.size; }
        return (action.type === actions_1.DockActions.CHANGE_SIZE) ?
            action.size :
            state;
    }
    function visible(state, action) {
        if (state === void 0) { state = options.visible; }
        return (action.type === actions_1.DockActions.TOGGLE_VISIBILITY) ?
            !state :
            state;
    }
    return store_1.combineReducers({
        position: position,
        visible: visible,
        size: size
    });
}
exports.useDockMonitor = useDockMonitor;
