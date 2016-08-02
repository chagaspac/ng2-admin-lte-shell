var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JsonTreeComponent } from '../json-tree/json-tree';
export let LogMonitorEntryComponent = class LogMonitorEntryComponent {
    constructor() {
        this.expandEntries = false;
        this.disabled = false;
        this.toggle = new EventEmitter();
    }
    set item(value) {
        this._item = value;
        this.stateActionPair = {
            state: value.state,
            action: value.action
        };
    }
    get item() {
        return this._item;
    }
    handleToggle() {
        if (!this.disabled) {
            this.toggle.next({ id: this.item.actionId });
        }
    }
    logPayload() {
        console.log(this.item.action);
    }
    logState() {
        console.log(this.item.state);
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], LogMonitorEntryComponent.prototype, "expandEntries", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], LogMonitorEntryComponent.prototype, "disabled", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Object), 
    __metadata('design:paramtypes', [Object])
], LogMonitorEntryComponent.prototype, "item", null);
__decorate([
    Output(), 
    __metadata('design:type', Object)
], LogMonitorEntryComponent.prototype, "toggle", void 0);
LogMonitorEntryComponent = __decorate([
    Component({
        selector: 'log-monitor-entry',
        directives: [JsonTreeComponent],
        template: `
    <div class="title-bar" [ngClass]="{ collapsed: item.collapsed }" (click)="handleToggle()">
      {{ item.action.type }}
    </div>
    <div class="action-bar" *ngIf="!item.collapsed">
      <ngrx-json-tree [value]="stateActionPair" [expanded]="expandEntries"></ngrx-json-tree>
    </div>
  `,
        styles: [`
    :host{
      color: #FFFFFF;
      background-color: #4F5A65;
      cursor: pointer;
    }
    .title-bar{
      padding: 8px 0 7px 16px;
      background-color: rgba(0,0,0,0.1);
    }
    .action-bar{
      padding: 20px;
    }
    .collapsed{
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.5;
    }
  `]
    }), 
    __metadata('design:paramtypes', [])
], LogMonitorEntryComponent);
