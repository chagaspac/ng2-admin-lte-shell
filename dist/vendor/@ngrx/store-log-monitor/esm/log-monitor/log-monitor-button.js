var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
export let LogMonitorButtonComponent = class LogMonitorButtonComponent {
    constructor() {
        this.action = new EventEmitter();
    }
    handleAction($event) {
        if (!this.disabled) {
            this.action.next({});
        }
        $event.stopPropagation();
        return false;
    }
};
__decorate([
    HostBinding('class.disabled'),
    Input(), 
    __metadata('design:type', Boolean)
], LogMonitorButtonComponent.prototype, "disabled", void 0);
__decorate([
    Output(), 
    __metadata('design:type', Object)
], LogMonitorButtonComponent.prototype, "action", void 0);
__decorate([
    HostListener('click', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], LogMonitorButtonComponent.prototype, "handleAction", null);
LogMonitorButtonComponent = __decorate([
    Component({
        selector: 'log-monitor-button',
        template: `
    <ng-content></ng-content>
  `,
        styles: [`
    :host{
      flex-grow: 1;
      display: inline-block;
      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;
      cursor: pointer;
      font-weight: bold;
      border-radius: 3px;
      padding: 4px 8px;
      margin: 5px 3px 5px 3px;
      font-size: 0.8em;
      color: white;
      text-decoration: none;
      background-color: #4F5A65;
    }

    :host.disabled{
      opacity: 0.2;
      cursor: text;
      background-color: transparent;
    }
  `]
    }), 
    __metadata('design:paramtypes', [])
], LogMonitorButtonComponent);
