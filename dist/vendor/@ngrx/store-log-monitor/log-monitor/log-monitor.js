"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var store_devtools_1 = require('@ngrx/store-devtools');
var log_monitor_entry_1 = require('./log-monitor-entry');
var log_monitor_button_1 = require('./log-monitor-button');
var LogMonitorComponent = (function () {
    function LogMonitorComponent(devtools) {
        this.devtools = devtools;
        this.expandEntries = true;
        this.canRevert$ = devtools.liftedState.map(function (s) { return !(s.computedStates.length > 1); });
        this.canSweep$ = devtools.liftedState.map(function (s) { return !(s.skippedActionIds.length > 0); });
        this.canCommit$ = devtools.liftedState.map(function (s) { return !(s.computedStates.length > 1); });
        this.items$ = devtools.liftedState
            .map(function (_a) {
            var actionsById = _a.actionsById, skippedActionIds = _a.skippedActionIds, stagedActionIds = _a.stagedActionIds, computedStates = _a.computedStates;
            var actions = [];
            for (var i = 0; i < stagedActionIds.length; i++) {
                var actionId = stagedActionIds[i];
                var action = actionsById[actionId].action;
                var _b = computedStates[i], state = _b.state, error = _b.error;
                var previousState = void 0;
                if (i > 0) {
                    previousState = computedStates[i - 1].state;
                }
                actions.push({
                    key: actionId,
                    collapsed: skippedActionIds.indexOf(actionId) > -1,
                    action: action,
                    actionId: actionId,
                    state: state,
                    previousState: previousState,
                    error: error
                });
            }
            return actions;
        });
    }
    LogMonitorComponent.prototype.handleToggle = function (id) {
        this.devtools.toggleAction(id);
    };
    LogMonitorComponent.prototype.handleReset = function () {
        this.devtools.reset();
    };
    LogMonitorComponent.prototype.handleRollback = function () {
        this.devtools.rollback();
    };
    LogMonitorComponent.prototype.handleSweep = function () {
        this.devtools.sweep();
    };
    LogMonitorComponent.prototype.handleCommit = function () {
        this.devtools.commit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LogMonitorComponent.prototype, "expandEntries", void 0);
    LogMonitorComponent = __decorate([
        core_1.Component({
            selector: 'log-monitor',
            directives: [log_monitor_entry_1.LogMonitorEntryComponent, log_monitor_button_1.LogMonitorButtonComponent],
            styles: ["\n    :host {\n      display: block;\n      background-color: #2A2F3A;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n      position: relative;\n      overflow-y: hidden;\n      width: 100%;\n      height: 100%;\n      min-width: 300px;\n      direction: ltr;\n    }\n\n    .button-bar {\n      text-align: center;\n      border-bottom-width: 1px;\n      border-bottom-style: solid;\n      border-color: transparent;\n      z-index: 1;\n      display: flex;\n      flex-direction: row;\n      padding: 0 4px;\n    }\n\n    .elements {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 38px;\n      bottom: 0;\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n  "],
            template: "\n    <div class=\"button-bar\">\n      <log-monitor-button (action)=\"handleReset()\" [disabled]=\"canReset$ | async\">\n        Reset\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleRollback()\">\n        Revert\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleSweep()\" [disabled]=\"canSweep$ | async\">\n        Sweep\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleCommit()\" [disabled]=\"canCommit$ | async\">\n        Commit\n      </log-monitor-button>\n    </div>\n    <div class=\"elements\">\n      <log-monitor-entry\n        *ngFor=\"let item of (items$ | async); let i = index\"\n        [item]=\"item\"\n        [disabled]=\"i === 0\"\n        [expandEntries]=\"expandEntries\"\n        (toggle)=\"handleToggle($event.id)\">\n      </log-monitor-entry>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_devtools_1.StoreDevtools])
    ], LogMonitorComponent);
    return LogMonitorComponent;
}());
exports.LogMonitorComponent = LogMonitorComponent;
