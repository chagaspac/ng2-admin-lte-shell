var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostBinding, Input } from '@angular/core';
export let DockComponent = class DockComponent {
    constructor() {
        this.position = 'right';
        this.size = 0.3;
        this.visible = true;
    }
    get absoluteSize() {
        return `${100 * this.size}%`;
    }
    get restSize() {
        return `${100 - (100 * this.size)}%`;
    }
    get leftPosition() {
        return this.calculatePosition('left', 'right');
    }
    get rightPosition() {
        return this.calculatePosition('right', 'left');
    }
    get topPosition() {
        return this.calculatePosition('top', 'bottom');
    }
    get bottomPosition() {
        return this.calculatePosition('bottom', 'top');
    }
    calculatePosition(primary, secondary) {
        if (this.visible) {
            switch (this.position) {
                case secondary:
                    return this.restSize;
                default:
                    return '0%';
            }
        }
        else {
            switch (this.position) {
                case primary:
                    return `-${this.absoluteSize}`;
                case secondary:
                    return '100%';
                default:
                    return '0%';
            }
        }
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], DockComponent.prototype, "position", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Number)
], DockComponent.prototype, "size", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], DockComponent.prototype, "visible", void 0);
__decorate([
    HostBinding('style.left'), 
    __metadata('design:type', Object)
], DockComponent.prototype, "leftPosition", null);
__decorate([
    HostBinding('style.right'), 
    __metadata('design:type', Object)
], DockComponent.prototype, "rightPosition", null);
__decorate([
    HostBinding('style.top'), 
    __metadata('design:type', Object)
], DockComponent.prototype, "topPosition", null);
__decorate([
    HostBinding('style.bottom'), 
    __metadata('design:type', Object)
], DockComponent.prototype, "bottomPosition", null);
DockComponent = __decorate([
    Component({
        selector: 'ngrx-dock',
        template: `
    <div class="dock">
      <div class="dock-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
        styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.3s;
      z-index: 9999;
    }

    .dock {
      position: absolute;
      z-index: 1;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      background-color: white;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .dock-content {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `]
    }), 
    __metadata('design:paramtypes', [])
], DockComponent);
