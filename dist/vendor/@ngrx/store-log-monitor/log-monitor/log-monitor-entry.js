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
var core_1 = require('@angular/core');
var json_tree_1 = require('../json-tree/json-tree');
var LogMonitorEntryComponent = (function () {
    function LogMonitorEntryComponent() {
        this.expandEntries = false;
        this.disabled = false;
        this.toggle = new core_1.EventEmitter();
    }
    Object.defineProperty(LogMonitorEntryComponent.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            this._item = value;
            this.stateActionPair = {
                state: value.state,
                action: value.action
            };
        },
        enumerable: true,
        configurable: true
    });
    LogMonitorEntryComponent.prototype.handleToggle = function () {
        if (!this.disabled) {
            this.toggle.next({ id: this.item.actionId });
        }
    };
    LogMonitorEntryComponent.prototype.logPayload = function () {
        console.log(this.item.action);
    };
    LogMonitorEntryComponent.prototype.logState = function () {
        console.log(this.item.state);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LogMonitorEntryComponent.prototype, "expandEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LogMonitorEntryComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], LogMonitorEntryComponent.prototype, "item", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LogMonitorEntryComponent.prototype, "toggle", void 0);
    LogMonitorEntryComponent = __decorate([
        core_1.Component({
            selector: 'log-monitor-entry',
            directives: [json_tree_1.JsonTreeComponent],
            template: "\n    <div class=\"title-bar\" [ngClass]=\"{ collapsed: item.collapsed }\" (click)=\"handleToggle()\">\n      {{ item.action.type }}\n    </div>\n    <div class=\"action-bar\" *ngIf=\"!item.collapsed\">\n      <ngrx-json-tree [value]=\"stateActionPair\" [expanded]=\"expandEntries\"></ngrx-json-tree>\n    </div>\n  ",
            styles: ["\n    :host{\n      color: #FFFFFF;\n      background-color: #4F5A65;\n      cursor: pointer;\n    }\n    .title-bar{\n      padding: 8px 0 7px 16px;\n      background-color: rgba(0,0,0,0.1);\n    }\n    .action-bar{\n      padding: 20px;\n    }\n    .collapsed{\n      text-decoration: line-through;\n      font-style: italic;\n      opacity: 0.5;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], LogMonitorEntryComponent);
    return LogMonitorEntryComponent;
}());
exports.LogMonitorEntryComponent = LogMonitorEntryComponent;
