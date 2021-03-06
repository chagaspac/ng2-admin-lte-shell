"use strict";
exports.ActionTypes = {
    PERFORM_ACTION: 'PERFORM_ACTION',
    RESET: 'RESET',
    ROLLBACK: 'ROLLBACK',
    COMMIT: 'COMMIT',
    SWEEP: 'SWEEP',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    SET_ACTIONS_ACTIVE: 'SET_ACTIONS_ACTIVE',
    JUMP_TO_STATE: 'JUMP_TO_STATE',
    IMPORT_STATE: 'IMPORT_STATE'
};
/**
* Action creators to change the History state.
*/
exports.StoreDevtoolActions = {
    performAction: function (action) {
        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?');
        }
        return { type: exports.ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
    },
    reset: function () {
        return { type: exports.ActionTypes.RESET, timestamp: Date.now() };
    },
    rollback: function () {
        return { type: exports.ActionTypes.ROLLBACK, timestamp: Date.now() };
    },
    commit: function () {
        return { type: exports.ActionTypes.COMMIT, timestamp: Date.now() };
    },
    sweep: function () {
        return { type: exports.ActionTypes.SWEEP };
    },
    toggleAction: function (id) {
        return { type: exports.ActionTypes.TOGGLE_ACTION, id: id };
    },
    setActionsActive: function (start, end, active) {
        if (active === void 0) { active = true; }
        return { type: exports.ActionTypes.SET_ACTIONS_ACTIVE, start: start, end: end, active: active };
    },
    jumpToState: function (index) {
        return { type: exports.ActionTypes.JUMP_TO_STATE, index: index };
    },
    importState: function (nextLiftedState) {
        return { type: exports.ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState };
    }
};
