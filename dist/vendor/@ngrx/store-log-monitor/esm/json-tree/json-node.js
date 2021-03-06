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
import * as types from './types';
let JsonNodeComponent_1;
export let JsonNodeComponent = JsonNodeComponent_1 = class JsonNodeComponent {
    constructor() {
        this.expanded = false;
    }
    set value(value) {
        this.label = types.getLabelFor(value);
        this.type = types.getTypeOf(value);
        if (this.type === types.KNOWN.Array || this.type === types.KNOWN.Object || this.type === types.KNOWN.Iterable) {
            this.children = types.getChildrenFor(value);
        }
        else {
            this.children = null;
        }
    }
    toggle() {
        if (this.children) {
            this.expanded = !this.expanded;
        }
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], JsonNodeComponent.prototype, "key", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], JsonNodeComponent.prototype, "expanded", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Object), 
    __metadata('design:paramtypes', [Object])
], JsonNodeComponent.prototype, "value", null);
JsonNodeComponent = JsonNodeComponent_1 = __decorate([
    Component({
        selector: 'ngrx-json-node',
        directives: [JsonNodeComponent],
        styles: [`
    :host {
      display: block;
      padding: 2px 2px 2px 20px;
      position: relative;
      color: #70AFCD;
      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;
    }
    .expanded-indicator {
      position: absolute;
      top: 7px;
      left: 5px;
      font-size: 10px;
      transition: transform 200ms;
    }

    .expanded .expanded-indicator {
      transform: rotate(90deg);
    }

    .node-key::after {
      content: ': ';
      display: inline;
    }

    .expanded .node-label {
      color: #BABBBD !important;
    }

    .node-label {
      color: #9AC05C;
    }

    .node-label.array, .node-label.null, .node-label.iterable {
      color: #D182C0;
    }

    .node-label.number, .node-label.undefined, .node-label.boolean {
      color: #F86936;
    }
  `],
        template: `
    <div (click)="toggle()" [class.expanded]="expanded">
      <span class="expanded-indicator" *ngIf="children">▶</span>
      <span class="node-key">{{ key }}</span>
      <span class="node-label" [ngClass]="type">{{ label }}</span>
    </div>
    <div class="child-nodes" *ngIf="children && expanded">
      <ngrx-json-node *ngFor="let child of children" [value]="child.value" [key]="child.key"></ngrx-json-node>
    </div>
  `
    }), 
    __metadata('design:paramtypes', [])
], JsonNodeComponent);
