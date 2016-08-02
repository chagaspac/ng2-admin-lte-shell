"use strict";
var app_1 = require('../app');
var ACTION_PREFIX = 'APP_SHELL:';
exports.AppShellActionTypes = {
    TOGGLE_NAVIGATION: ACTION_PREFIX + 'TOGGLE_NAVIGATION',
    OPEN_NAVIGATION: ACTION_PREFIX + 'OPEN_NAVIGATION',
    CLOSE_NAVIGATION: ACTION_PREFIX + 'CLOSE_NAVIGATION',
    TOGGLE_CONTROL_NAVIGATION: ACTION_PREFIX + 'TOGGLE_CONTROL_NAVIGATION',
    OPEN_CONTROL_NAVIGATION: ACTION_PREFIX + 'OPEN_CONTROL_NAVIGATION',
    CLOSE_CONTROL_NAVIGATION: ACTION_PREFIX + 'CLOSE_CONTROL_NAVIGATION',
    SET_WINDOW_SIZE: ACTION_PREFIX + 'SET_WINDOW_SIZE',
    TOGGLE_DEVTOOLS: ACTION_PREFIX + 'TOGGLE_DEVTOOLS',
};
exports.AppShellActions = {
    toggleNavigation: function () { return { type: exports.AppShellActionTypes.TOGGLE_NAVIGATION }; },
    openNavigation: function () { return { type: exports.AppShellActionTypes.OPEN_NAVIGATION }; },
    closeNavigation: function () { return { type: exports.AppShellActionTypes.CLOSE_NAVIGATION }; },
    toggleControlNavigation: function () { return { type: exports.AppShellActionTypes.TOGGLE_CONTROL_NAVIGATION }; },
    openControlNavigation: function () { return { type: exports.AppShellActionTypes.OPEN_CONTROL_NAVIGATION }; },
    closeControlNavigation: function () { return { type: exports.AppShellActionTypes.CLOSE_CONTROL_NAVIGATION }; },
    setWindowSize: function (width, height) {
        return { type: exports.AppShellActionTypes.SET_WINDOW_SIZE, payload: { width: width, height: height } };
    },
    toggleDevTools: function () { return { type: exports.AppShellActionTypes.TOGGLE_DEVTOOLS }; },
};
var defaultAppShellState = {
    isNavigationOpen: false,
    isControlNavigationOpen: false,
    isDevToolsOpen: false,
    isProduction: app_1.environment.production,
    isDevelopment: !app_1.environment.production,
    windowSize: { width: 1024, height: 768 },
};
function setNavigation(state, isOpen) {
    if (state.isNavigationOpen !== isOpen) {
        return Object.assign({}, state, {
            isNavigationOpen: isOpen,
            isControlNavigationOpen: state.isControlNavigationOpen && !isOpen
        });
    }
    return state;
}
function setControlNavigation(state, isOpen) {
    if (state.isControlNavigationOpen !== isOpen) {
        return Object.assign({}, state, {
            isControlNavigationOpen: isOpen,
            isNavigationOpen: state.isNavigationOpen && !isOpen
        });
    }
    return state;
}
function setDevTools(state, isOpen) {
    isOpen = isOpen && state.isDevelopment && !state.isProduction;
    if (state.isDevToolsOpen !== isOpen) {
        return Object.assign({}, state, {
            isDevToolsOpen: isOpen
        });
    }
    return state;
}
function setWindowSize(state, size) {
    return Object.assign({}, state, { windowSize: size });
}
exports.appShellReducer = function (state, action) {
    if (!state) {
        state = defaultAppShellState;
    }
    switch (action.type) {
        case exports.AppShellActionTypes.TOGGLE_DEVTOOLS: return setDevTools(state, !state.isDevToolsOpen);
        case exports.AppShellActionTypes.TOGGLE_NAVIGATION: return setNavigation(state, !state.isNavigationOpen);
        case exports.AppShellActionTypes.OPEN_NAVIGATION: return setNavigation(state, true);
        case exports.AppShellActionTypes.CLOSE_NAVIGATION: return setNavigation(state, false);
        case exports.AppShellActionTypes.TOGGLE_CONTROL_NAVIGATION: return setControlNavigation(state, !state.isControlNavigationOpen);
        case exports.AppShellActionTypes.OPEN_CONTROL_NAVIGATION: return setControlNavigation(state, true);
        case exports.AppShellActionTypes.CLOSE_CONTROL_NAVIGATION: return setControlNavigation(state, false);
        case exports.AppShellActionTypes.SET_WINDOW_SIZE: return setWindowSize(state, action.payload);
    }
    return state;
};
//# sourceMappingURL=shell.redux.js.map