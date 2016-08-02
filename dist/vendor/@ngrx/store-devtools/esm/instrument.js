import { State, INITIAL_STATE, INITIAL_REDUCER, Dispatcher, Reducer } from '@ngrx/store';
import { StoreDevtools, DevtoolsDispatcher } from './devtools';
import { OPTIONS } from './config';
import { Extension, REDUX_DEVTOOLS_EXTENSION } from './extension';
const REDUX_DEVTOOLS_EXTENSION_PROVIDER = {
    provide: REDUX_DEVTOOLS_EXTENSION,
    useFactory() {
        if (window && window.devToolsExtension) {
            return window.devToolsExtension;
        }
        return null;
    }
};
const EXTENSION_PROVIDER = {
    provide: Extension,
    deps: [REDUX_DEVTOOLS_EXTENSION],
    useFactory(reduxDevtoolsExtension) {
        return new Extension(reduxDevtoolsExtension);
    }
};
const DEVTOOLS_DISPATHCER_PROVIDER = {
    provide: DevtoolsDispatcher,
    useFactory: () => new DevtoolsDispatcher()
};
const STORE_DEVTOOLS_PROVIDER = {
    provide: StoreDevtools,
    deps: [DevtoolsDispatcher, Dispatcher, Reducer, INITIAL_STATE, OPTIONS, Extension],
    useFactory(dispatcher, actions, reducer, initialState, options, extension) {
        return new StoreDevtools(dispatcher, actions, reducer, initialState, options, extension);
    }
};
const STATE_PROVIDER = {
    provide: State,
    deps: [StoreDevtools],
    useFactory(devtools) {
        return devtools.state;
    }
};
const REDUCER_PROVIDER = {
    provide: Reducer,
    deps: [DevtoolsDispatcher, INITIAL_REDUCER],
    useFactory(dispatcher, reducer) {
        return new Reducer(dispatcher, reducer);
    }
};
export function instrumentStore(_options = {}) {
    const DEFAULT_OPTIONS = {
        monitor: () => null
    };
    const options = Object.assign({}, DEFAULT_OPTIONS, _options);
    if (options.maxAge < 2) {
        throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${options.maxAge}`);
    }
    return [
        {
            provide: OPTIONS,
            useValue: options
        },
        REDUX_DEVTOOLS_EXTENSION_PROVIDER,
        EXTENSION_PROVIDER,
        DEVTOOLS_DISPATHCER_PROVIDER,
        STORE_DEVTOOLS_PROVIDER,
        STATE_PROVIDER,
        REDUCER_PROVIDER
    ];
}
