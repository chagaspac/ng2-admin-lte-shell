var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { KEYCODES } from './keycodes';
export let CommanderComponent = class CommanderComponent {
    constructor() {
        this.keydown$ = new Subject();
        this._ignoreTags = ['INPUT', 'SELECT', 'TEXTAREA'];
        this.command = this.keydown$
            .filter(e => this._ignoreTags.indexOf(e.target.tagName) < 0)
            .filter(e => !(e.target.isContentEditable))
            .filter(e => {
            const command = this.parseCommand(this.shortcut);
            if (!command) {
                return false;
            }
            const charCode = e.keyCode || e.which;
            const char = String.fromCharCode(charCode);
            return command.name.toUpperCase() === char.toUpperCase() &&
                command.alt === e.altKey &&
                command.ctrl === e.ctrlKey &&
                command.meta === e.metaKey &&
                command.shift === e.shiftKey;
        })
            .map(e => {
            e.preventDefault();
            return { command: this.shortcut };
        });
    }
    parseCommand(s) {
        const keyString = s.trim().toLowerCase();
        if (!/^(ctrl-|shift-|alt-|meta-){0,4}\w+$/.test(keyString)) {
            throw new Error('The string to parse needs to be of the format "c", "ctrl-c", "shift-ctrl-c".');
        }
        const parts = keyString.split('-');
        const key = {
            ctrl: false,
            meta: false,
            shift: false,
            alt: false
        };
        let c;
        key.name = parts.pop();
        while ((c = parts.pop())) {
            key[c] = true;
        }
        if (key.ctrl) {
            key.sequence = KEYCODES.ctrl[key.name] || key.name;
        }
        else {
            key.sequence = KEYCODES.nomod[key.name] || key.name;
        }
        if (key.shift && key.sequence && key.sequence.length === 1) {
            key.sequence = key.sequence.toUpperCase();
        }
        return key;
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], CommanderComponent.prototype, "shortcut", void 0);
__decorate([
    Output(), 
    __metadata('design:type', Observable)
], CommanderComponent.prototype, "command", void 0);
CommanderComponent = __decorate([
    Component({
        selector: 'ngrx-commander',
        template: '',
        styles: [':host{ display: none }'],
        host: {
            '(document:keydown)': 'keydown$.next($event)'
        }
    }), 
    __metadata('design:paramtypes', [])
], CommanderComponent);
