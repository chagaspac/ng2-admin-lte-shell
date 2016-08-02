"use strict";
var METADATA_KEY = '@ngrx/effects';
function Effect() {
    return function (target, propertyName) {
        if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, [], target);
        }
        var effects = Reflect.getOwnMetadata(METADATA_KEY, target);
        Reflect.defineMetadata(METADATA_KEY, effects.concat([propertyName]), target);
    };
}
exports.Effect = Effect;
function getEffectKeys(instance) {
    var target = Object.getPrototypeOf(instance);
    if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
        return [];
    }
    return Reflect.getOwnMetadata(METADATA_KEY, target);
}
exports.getEffectKeys = getEffectKeys;
