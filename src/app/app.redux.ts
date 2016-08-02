import { appShellReducer, AppShell } from '../shell/shell.redux';

export interface AppState {
    appShell: AppShell;
}

export const appReducerObject = {
    appShell: appShellReducer
};
