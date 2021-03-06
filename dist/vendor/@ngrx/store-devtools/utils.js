"use strict";
var actions_1 = require('./actions');
function difference(first, second) {
    return first.filter(function (item) { return second.indexOf(item) < 0; });
}
exports.difference = difference;
/**
 * Provides an app's view into the state of the lifted store.
 */
function unliftState(liftedState) {
    var computedStates = liftedState.computedStates, currentStateIndex = liftedState.currentStateIndex;
    var state = computedStates[currentStateIndex].state;
    return state;
}
exports.unliftState = unliftState;
function unliftAction(liftedState) {
    return liftedState.actionsById[liftedState.nextActionId - 1];
}
exports.unliftAction = unliftAction;
/**
* Lifts an app's action into an action on the lifted store.
*/
function liftAction(action) {
    return actions_1.StoreDevtoolActions.performAction(action);
}
exports.liftAction = liftAction;
