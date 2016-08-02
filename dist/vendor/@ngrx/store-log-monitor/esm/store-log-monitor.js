var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { LogMonitorComponent } from './log-monitor/log-monitor';
import { DockMonitorComponent } from './dock-monitor/dock-monitor';
export let StoreLogMonitorComponent = class StoreLogMonitorComponent {
    constructor() {
        this.toggleCommand = 'ctrl-h';
        this.positionCommand = 'ctrl-m';
        this.expandEntries = false;
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], StoreLogMonitorComponent.prototype, "toggleCommand", void 0);
__decorate([
    Input(), 
    __metadata('design:type', String)
], StoreLogMonitorComponent.prototype, "positionCommand", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], StoreLogMonitorComponent.prototype, "expandEntries", void 0);
StoreLogMonitorComponent = __decorate([
    Component({
        selector: 'ngrx-store-log-monitor',
        directives: [LogMonitorComponent, DockMonitorComponent],
        template: `
    <dock-monitor [toggleCommand]="toggleCommand" [positionCommand]="positionCommand">
      <log-monitor [expandEntries]="expandEntries"></log-monitor>
    </dock-monitor>
  `
    }), 
    __metadata('design:paramtypes', [])
], StoreLogMonitorComponent);
