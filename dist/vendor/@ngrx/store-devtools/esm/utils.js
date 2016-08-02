import { StoreDevtoolActions } from './actions';
export function difference(first, second) {
    return first.filter(item => second.indexOf(item) < 0);
}
/**
 * Provides an app's view into the state of the lifted store.
 */
export function unliftState(liftedState) {
    const { computedStates, currentStateIndex } = liftedState;
    const { state } = computedStates[currentStateIndex];
    return state;
}
export function unliftAction(liftedState) {
    return liftedState.actionsById[liftedState.nextActionId - 1];
}
/**
* Lifts an app's action into an action on the lifted store.
*/
export function liftAction(action) {
    return StoreDevtoolActions.performAction(action);
}
