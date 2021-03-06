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
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var keycodes_1 = require('./keycodes');
var CommanderComponent = (function () {
    function CommanderComponent() {
        var _this = this;
        this.keydown$ = new Subject_1.Subject();
        this._ignoreTags = ['INPUT', 'SELECT', 'TEXTAREA'];
        this.command = this.keydown$
            .filter(function (e) { return _this._ignoreTags.indexOf(e.target.tagName) < 0; })
            .filter(function (e) { return !(e.target.isContentEditable); })
            .filter(function (e) {
            var command = _this.parseCommand(_this.shortcut);
            if (!command) {
                return false;
            }
            var charCode = e.keyCode || e.which;
            var char = String.fromCharCode(charCode);
            return command.name.toUpperCase() === char.toUpperCase() &&
                command.alt === e.altKey &&
                command.ctrl === e.ctrlKey &&
                command.meta === e.metaKey &&
                command.shift === e.shiftKey;
        })
            .map(function (e) {
            e.preventDefault();
            return { command: _this.shortcut };
        });
    }
    CommanderComponent.prototype.parseCommand = function (s) {
        var keyString = s.trim().toLowerCase();
        if (!/^(ctrl-|shift-|alt-|meta-){0,4}\w+$/.test(keyString)) {
            throw new Error('The string to parse needs to be of the format "c", "ctrl-c", "shift-ctrl-c".');
        }
        var parts = keyString.split('-');
        var key = {
            ctrl: false,
            meta: false,
            shift: false,
            alt: false
        };
        var c;
        key.name = parts.pop();
        while ((c = parts.pop())) {
            key[c] = true;
        }
        if (key.ctrl) {
            key.sequence = keycodes_1.KEYCODES.ctrl[key.name] || key.name;
        }
        else {
            key.sequence = keycodes_1.KEYCODES.nomod[key.name] || key.name;
        }
        if (key.shift && key.sequence && key.sequence.length === 1) {
            key.sequence = key.sequence.toUpperCase();
        }
        return key;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CommanderComponent.prototype, "shortcut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Observable_1.Observable)
    ], CommanderComponent.prototype, "command", void 0);
    CommanderComponent = __decorate([
        core_1.Component({
            selector: 'ngrx-commander',
            template: '',
            styles: [':host{ display: none }'],
            host: {
                '(document:keydown)': 'keydown$.next($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CommanderComponent);
    return CommanderComponent;
}());
exports.CommanderComponent = CommanderComponent;
