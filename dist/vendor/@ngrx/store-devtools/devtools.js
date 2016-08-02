"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('rxjs/add/operator/scan');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/map');
require('rxjs/add/operator/withLatestFrom');
require('rxjs/add/operator/publishReplay');
require('rxjs/add/operator/skip');
require('rxjs/add/operator/observeOn');
var queue_1 = require('rxjs/scheduler/queue');
var store_1 = require('@ngrx/store');
var reducer_1 = require('./reducer');
var actions_1 = require('./actions');
var utils_1 = require('./utils');
var DevtoolsDispatcher = (function (_super) {
    __extends(DevtoolsDispatcher, _super);
    function DevtoolsDispatcher() {
        _super.apply(this, arguments);
    }
    return DevtoolsDispatcher;
}(store_1.Dispatcher));
exports.DevtoolsDispatcher = DevtoolsDispatcher;
var StoreDevtools = (function () {
    function StoreDevtools(dispatcher, actions$, reducers$, initialState, options, extension) {
        var liftedInitialState = reducer_1.liftInitialState(initialState, options.monitor);
        var liftReducer = reducer_1.liftReducerWith(initialState, liftedInitialState, options.monitor, {
            maxAge: options.maxAge
        });
        var liftedActions$ = actions$
            .skip(1)
            .merge(extension.actions$)
            .map(utils_1.liftAction)
            .merge(dispatcher, extension.liftedActions$)
            .observeOn(queue_1.queue);
        var liftedReducers$ = reducers$
            .map(liftReducer);
        var liftedState = liftedActions$
            .withLatestFrom(liftedReducers$)
            .scan(function (liftedState, _a) {
            var action = _a[0], reducer = _a[1];
            var nextState = reducer(liftedState, action);
            extension.notify(action, nextState);
            return nextState;
        }, liftedInitialState)
            .publishReplay(1)
            .refCount();
        var state = liftedState
            .map(utils_1.unliftState);
        this.dispatcher = dispatcher;
        this.liftedState = liftedState;
        this.state = state;
    }
    StoreDevtools.prototype.dispatch = function (action) {
        this.dispatcher.dispatch(action);
    };
    StoreDevtools.prototype.next = function (action) {
        this.dispatcher.dispatch(action);
    };
    StoreDevtools.prototype.error = function (error) { };
    StoreDevtools.prototype.complete = function () { };
    StoreDevtools.prototype.performAction = function (action) {
        this.dispatch(actions_1.StoreDevtoolActions.performAction(action));
    };
    StoreDevtools.prototype.reset = function () {
        this.dispatch(actions_1.StoreDevtoolActions.reset());
    };
    StoreDevtools.prototype.rollback = function () {
        this.dispatch(actions_1.StoreDevtoolActions.rollback());
    };
    StoreDevtools.prototype.commit = function () {
        this.dispatch(actions_1.StoreDevtoolActions.commit());
    };
    StoreDevtools.prototype.sweep = function () {
        this.dispatch(actions_1.StoreDevtoolActions.sweep());
    };
    StoreDevtools.prototype.toggleAction = function (id) {
        this.dispatch(actions_1.StoreDevtoolActions.toggleAction(id));
    };
    StoreDevtools.prototype.jumpToState = function (index) {
        this.dispatch(actions_1.StoreDevtoolActions.jumpToState(index));
    };
    StoreDevtools.prototype.importState = function (nextLiftedState) {
        this.dispatch(actions_1.StoreDevtoolActions.importState(nextLiftedState));
    };
    return StoreDevtools;
}());
exports.StoreDevtools = StoreDevtools;
