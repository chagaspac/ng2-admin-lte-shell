"use strict";
require('rxjs/add/observable/empty');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/switchMapTo');
require('rxjs/add/operator/takeUntil');
require('rxjs/add/operator/share');
var Observable_1 = require('rxjs/Observable');
var actions_1 = require('./actions');
var utils_1 = require('./utils');
exports.ExtensionActionTypes = {
    START: 'START',
    DISPATCH: 'DISPATCH',
    STOP: 'STOP',
    ACTION: 'ACTION'
};
exports.REDUX_DEVTOOLS_EXTENSION = new String('Redux Devtools Extension');
var Extension = (function () {
    function Extension(devtoolsExtension) {
        this.devtoolsExtension = devtoolsExtension;
        this.instanceId = "ngrx-store-" + Date.now();
        this.createActionStreams();
    }
    Extension.prototype.notify = function (action, state) {
        if (!this.devtoolsExtension || action.type !== actions_1.ActionTypes.PERFORM_ACTION) {
            return;
        }
        this.devtoolsExtension.send(utils_1.unliftAction(state), utils_1.unliftState(state), false, this.instanceId);
        this.devtoolsExtension.send(null, state, false, this.instanceId);
    };
    Extension.prototype.createChangesObservable = function () {
        var _this = this;
        if (!this.devtoolsExtension) {
            return Observable_1.Observable.empty();
        }
        return new Observable_1.Observable(function (subscriber) {
            var connection = _this.devtoolsExtension.connect({ instanceId: _this.instanceId });
            connection.subscribe(function (change) { return subscriber.next(change); });
            return connection.unsubscribe();
        });
    };
    Extension.prototype.createActionStreams = function () {
        // Listens to all changes based on our instanceId
        var changes$ = this.createChangesObservable().share();
        // Listen for the start action
        var start$ = changes$
            .filter(function (change) { return change.type === exports.ExtensionActionTypes.START; });
        // Listen for the stop action
        var stop$ = changes$
            .filter(function (change) { return change.type === exports.ExtensionActionTypes.STOP; });
        // Listen for lifted actions
        var liftedActions$ = changes$
            .filter(function (change) { return change.type === exports.ExtensionActionTypes.DISPATCH; })
            .map(function (change) { return change.payload; });
        // .filter(action => action.type !== 'JUMP_TO_STATE');
        // Listen for unlifted actions
        var actions$ = changes$
            .filter(function (change) { return change.type === exports.ExtensionActionTypes.DISPATCH; })
            .map(function (change) { return change.payload; });
        // Only take the action sources between the start/stop events
        this.actions$ = start$.switchMapTo(actions$.takeUntil(stop$));
        this.liftedActions$ = start$.switchMapTo(liftedActions$.takeUntil(stop$));
    };
    return Extension;
}());
exports.Extension = Extension;
