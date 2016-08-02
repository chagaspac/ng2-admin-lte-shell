import { ActionReducer, Action } from '@ngrx/store';

import { environment } from '../app';

const ACTION_PREFIX = 'APP_SHELL:';

export const AppShellActionTypes = {
    TOGGLE_NAVIGATION:  ACTION_PREFIX + 'TOGGLE_NAVIGATION',
    OPEN_NAVIGATION:    ACTION_PREFIX + 'OPEN_NAVIGATION',
    CLOSE_NAVIGATION:   ACTION_PREFIX + 'CLOSE_NAVIGATION',
    TOGGLE_CONTROL_NAVIGATION:  ACTION_PREFIX + 'TOGGLE_CONTROL_NAVIGATION',
    OPEN_CONTROL_NAVIGATION:    ACTION_PREFIX + 'OPEN_CONTROL_NAVIGATION',
    CLOSE_CONTROL_NAVIGATION:   ACTION_PREFIX + 'CLOSE_CONTROL_NAVIGATION',
    SET_WINDOW_SIZE:    ACTION_PREFIX + 'SET_WINDOW_SIZE',
    TOGGLE_DEVTOOLS:    ACTION_PREFIX + 'TOGGLE_DEVTOOLS',
};

export const AppShellActions = {
    toggleNavigation(): Action { return { type: AppShellActionTypes.TOGGLE_NAVIGATION }; },
    openNavigation(): Action { return { type: AppShellActionTypes.OPEN_NAVIGATION }; },
    closeNavigation(): Action { return { type: AppShellActionTypes.CLOSE_NAVIGATION }; },
    toggleControlNavigation(): Action { return { type: AppShellActionTypes.TOGGLE_CONTROL_NAVIGATION }; },
    openControlNavigation(): Action { return { type: AppShellActionTypes.OPEN_CONTROL_NAVIGATION }; },
    closeControlNavigation(): Action { return { type: AppShellActionTypes.CLOSE_CONTROL_NAVIGATION }; },
    setWindowSize(width: number, height: number): Action {
        return { type: AppShellActionTypes.SET_WINDOW_SIZE, payload: { width, height } };
    },
    toggleDevTools(): Action { return { type: AppShellActionTypes.TOGGLE_DEVTOOLS }; },
};

export interface AppShell {
    isNavigationOpen: boolean;
    isControlNavigationOpen: boolean;
    isDevToolsOpen: boolean;
    isProduction: boolean;
    isDevelopment: boolean;
    windowSize: { width: number; height: number; }
}

const defaultAppShellState: AppShell = {
    isNavigationOpen: false,
    isControlNavigationOpen: false,
    isDevToolsOpen: false,
    isProduction: environment.production,
    isDevelopment: !environment.production,
    windowSize: { width: 1024, height: 768 },
};

function setNavigation(state: AppShell, isOpen: boolean) {
    if (state.isNavigationOpen !== isOpen) {
        return Object.assign({}, state, {
            isNavigationOpen: isOpen,
            isControlNavigationOpen: state.isControlNavigationOpen && !isOpen
        });
    }
    return state;
}

function setControlNavigation(state: AppShell, isOpen: boolean) {
    if (state.isControlNavigationOpen !== isOpen) {
        return Object.assign({}, state, {
            isControlNavigationOpen: isOpen,
            isNavigationOpen: state.isNavigationOpen && !isOpen
        });
    }
    return state;
}

function setDevTools(state: AppShell, isOpen: boolean) {
    isOpen = isOpen && state.isDevelopment && !state.isProduction;
    if (state.isDevToolsOpen !== isOpen) {
        return Object.assign({}, state, {
            isDevToolsOpen: isOpen
        });
    }
    return state;
}

function setWindowSize(state: AppShell, size: { width: number, height: number }) {
    return Object.assign({}, state, { windowSize: size });
}

export const appShellReducer: ActionReducer<AppShell> = (state: AppShell, action: Action) => {
    if (!state) { state = defaultAppShellState; }

    switch (action.type) {
        case AppShellActionTypes.TOGGLE_DEVTOOLS: return setDevTools(state, !state.isDevToolsOpen);

        case AppShellActionTypes.TOGGLE_NAVIGATION: return setNavigation(state, !state.isNavigationOpen);
        case AppShellActionTypes.OPEN_NAVIGATION: return setNavigation(state, true);
        case AppShellActionTypes.CLOSE_NAVIGATION: return setNavigation(state, false);

        case AppShellActionTypes.TOGGLE_CONTROL_NAVIGATION: return setControlNavigation(state, !state.isControlNavigationOpen);
        case AppShellActionTypes.OPEN_CONTROL_NAVIGATION: return setControlNavigation(state, true);
        case AppShellActionTypes.CLOSE_CONTROL_NAVIGATION: return setControlNavigation(state, false);

        case AppShellActionTypes.SET_WINDOW_SIZE: return setWindowSize(state, action.payload);
    }
    return state;
};