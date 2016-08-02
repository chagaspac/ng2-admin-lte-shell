import { combineReducers } from '@ngrx/store';
import { DockActions } from './actions';
export const POSITIONS = ['left', 'top', 'right', 'bottom'];
export function useDockMonitor(_options = {}) {
    const options = Object.assign({
        position: 'right',
        visible: true,
        size: 0.3
    }, _options);
    function position(state = options.position, action) {
        return (action.type === DockActions.CHANGE_POSITION) ?
            POSITIONS[(POSITIONS.indexOf(state) + 1) % POSITIONS.length] :
            state;
    }
    function size(state = options.size, action) {
        return (action.type === DockActions.CHANGE_SIZE) ?
            action.size :
            state;
    }
    function visible(state = options.visible, action) {
        return (action.type === DockActions.TOGGLE_VISIBILITY) ?
            !state :
            state;
    }
    return combineReducers({
        position,
        visible,
        size
    });
}
