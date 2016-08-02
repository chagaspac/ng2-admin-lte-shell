"use strict";
var store_1 = require('@ngrx/store');
var devtools_1 = require('./devtools');
var config_1 = require('./config');
var extension_1 = require('./extension');
var REDUX_DEVTOOLS_EXTENSION_PROVIDER = {
    provide: extension_1.REDUX_DEVTOOLS_EXTENSION,
    useFactory: function () {
        if (window && window.devToolsExtension) {
            return window.devToolsExtension;
        }
        return null;
    }
};
var EXTENSION_PROVIDER = {
    provide: extension_1.Extension,
    deps: [extension_1.REDUX_DEVTOOLS_EXTENSION],
    useFactory: function (reduxDevtoolsExtension) {
        return new extension_1.Extension(reduxDevtoolsExtension);
    }
};
var DEVTOOLS_DISPATHCER_PROVIDER = {
    provide: devtools_1.DevtoolsDispatcher,
    useFactory: function () { return new devtools_1.DevtoolsDispatcher(); }
};
var STORE_DEVTOOLS_PROVIDER = {
    provide: devtools_1.StoreDevtools,
    deps: [devtools_1.DevtoolsDispatcher, store_1.Dispatcher, store_1.Reducer, store_1.INITIAL_STATE, config_1.OPTIONS, extension_1.Extension],
    useFactory: function (dispatcher, actions, reducer, initialState, options, extension) {
        return new devtools_1.StoreDevtools(dispatcher, actions, reducer, initialState, options, extension);
    }
};
var STATE_PROVIDER = {
    provide: store_1.State,
    deps: [devtools_1.StoreDevtools],
    useFactory: function (devtools) {
        return devtools.state;
    }
};
var REDUCER_PROVIDER = {
    provide: store_1.Reducer,
    deps: [devtools_1.DevtoolsDispatcher, store_1.INITIAL_REDUCER],
    useFactory: function (dispatcher, reducer) {
        return new store_1.Reducer(dispatcher, reducer);
    }
};
function instrumentStore(_options) {
    if (_options === void 0) { _options = {}; }
    var DEFAULT_OPTIONS = {
        monitor: function () { return null; }
    };
    var options = Object.assign({}, DEFAULT_OPTIONS, _options);
    if (options.maxAge < 2) {
        throw new Error("Devtools 'maxAge' cannot be less than 2, got " + options.maxAge);
    }
    return [
        {
            provide: config_1.OPTIONS,
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
exports.instrumentStore = instrumentStore;
