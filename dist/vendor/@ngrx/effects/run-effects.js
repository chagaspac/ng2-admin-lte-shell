"use strict";
var core_1 = require('@angular/core');
var util_1 = require('./util');
var effects_1 = require('./effects');
var state_updates_1 = require('./state-updates');
function runEffects() {
    var effects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        effects[_i - 0] = arguments[_i];
    }
    var allEffects = util_1.flatten(effects)
        .map(function (effect) { return new core_1.Provider(effects_1.BOOTSTRAP_EFFECTS, {
        useClass: effect,
        multi: true
    }); });
    return allEffects.concat([
        effects_1.CONNECT_EFFECTS_PROVIDER,
        state_updates_1.STATE_UPDATES_PROVIDER
    ]);
}
exports.runEffects = runEffects;
