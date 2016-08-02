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
var log_monitor_1 = require('./log-monitor/log-monitor');
var dock_monitor_1 = require('./dock-monitor/dock-monitor');
var StoreLogMonitorComponent = (function () {
    function StoreLogMonitorComponent() {
        this.toggleCommand = 'ctrl-h';
        this.positionCommand = 'ctrl-m';
        this.expandEntries = false;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StoreLogMonitorComponent.prototype, "toggleCommand", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StoreLogMonitorComponent.prototype, "positionCommand", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], StoreLogMonitorComponent.prototype, "expandEntries", void 0);
    StoreLogMonitorComponent = __decorate([
        core_1.Component({
            selector: 'ngrx-store-log-monitor',
            directives: [log_monitor_1.LogMonitorComponent, dock_monitor_1.DockMonitorComponent],
            template: "\n    <dock-monitor [toggleCommand]=\"toggleCommand\" [positionCommand]=\"positionCommand\">\n      <log-monitor [expandEntries]=\"expandEntries\"></log-monitor>\n    </dock-monitor>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StoreLogMonitorComponent);
    return StoreLogMonitorComponent;
}());
exports.StoreLogMonitorComponent = StoreLogMonitorComponent;
