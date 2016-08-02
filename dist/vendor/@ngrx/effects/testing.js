"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var core_1 = require('@angular/core');
var filter_1 = require('rxjs/operator/filter');
var state_updates_1 = require('./state-updates');
var MockStateUpdates = (function (_super) {
    __extends(MockStateUpdates, _super);
    function MockStateUpdates() {
        _super.call(this);
    }
    MockStateUpdates.prototype.send = function (state, action) {
        this.next({ state: state, action: action });
    };
    MockStateUpdates.prototype.sendAction = function (action) {
        this.next({ state: null, action: action });
    };
    MockStateUpdates.prototype.sendState = function (state) {
        this.next({ state: state, action: null });
    };
    MockStateUpdates.prototype.whenAction = function () {
        var actionTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionTypes[_i - 0] = arguments[_i];
        }
        return filter_1.filter.call(this, function (_a) {
            var action = _a.action;
            return actionTypes.indexOf(action.type) > -1;
        });
    };
    return MockStateUpdates;
}(ReplaySubject_1.ReplaySubject));
exports.MockStateUpdates = MockStateUpdates;
exports.MOCK_EFFECTS_PROVIDERS = [
    new core_1.Provider(MockStateUpdates, {
        useClass: MockStateUpdates
    }),
    new core_1.Provider(state_updates_1.StateUpdates, {
        useExisting: MockStateUpdates
    })
];
