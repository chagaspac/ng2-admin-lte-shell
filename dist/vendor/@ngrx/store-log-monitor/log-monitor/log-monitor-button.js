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
var LogMonitorButtonComponent = (function () {
    function LogMonitorButtonComponent() {
        this.action = new core_1.EventEmitter();
    }
    LogMonitorButtonComponent.prototype.handleAction = function ($event) {
        if (!this.disabled) {
            this.action.next({});
        }
        $event.stopPropagation();
        return false;
    };
    __decorate([
        core_1.HostBinding('class.disabled'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LogMonitorButtonComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LogMonitorButtonComponent.prototype, "action", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LogMonitorButtonComponent.prototype, "handleAction", null);
    LogMonitorButtonComponent = __decorate([
        core_1.Component({
            selector: 'log-monitor-button',
            template: "\n    <ng-content></ng-content>\n  ",
            styles: ["\n    :host{\n      flex-grow: 1;\n      display: inline-block;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n      cursor: pointer;\n      font-weight: bold;\n      border-radius: 3px;\n      padding: 4px 8px;\n      margin: 5px 3px 5px 3px;\n      font-size: 0.8em;\n      color: white;\n      text-decoration: none;\n      background-color: #4F5A65;\n    }\n\n    :host.disabled{\n      opacity: 0.2;\n      cursor: text;\n      background-color: transparent;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], LogMonitorButtonComponent);
    return LogMonitorButtonComponent;
}());
exports.LogMonitorButtonComponent = LogMonitorButtonComponent;
