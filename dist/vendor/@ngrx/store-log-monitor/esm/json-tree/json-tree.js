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
import { getChildrenFor } from './types';
import { JsonNodeComponent } from './json-node';
export let JsonTreeComponent = class JsonTreeComponent {
    constructor() {
        this.children = [];
        this.expanded = true;
    }
    set value(value) {
        this.children = getChildrenFor(value);
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], JsonTreeComponent.prototype, "expanded", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Object), 
    __metadata('design:paramtypes', [Object])
], JsonTreeComponent.prototype, "value", null);
JsonTreeComponent = __decorate([
    Component({
        selector: 'ngrx-json-tree',
        directives: [JsonNodeComponent],
        template: `
    <ngrx-json-node *ngFor="let child of children" [expanded]="expanded" [value]="child.value" [key]="child.key"></ngrx-json-node>
  `
    }), 
    __metadata('design:paramtypes', [])
], JsonTreeComponent);
