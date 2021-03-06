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
var DockComponent = (function () {
    function DockComponent() {
        this.position = 'right';
        this.size = 0.3;
        this.visible = true;
    }
    Object.defineProperty(DockComponent.prototype, "absoluteSize", {
        get: function () {
            return 100 * this.size + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "restSize", {
        get: function () {
            return (100 - (100 * this.size)) + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "leftPosition", {
        get: function () {
            return this.calculatePosition('left', 'right');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "rightPosition", {
        get: function () {
            return this.calculatePosition('right', 'left');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "topPosition", {
        get: function () {
            return this.calculatePosition('top', 'bottom');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "bottomPosition", {
        get: function () {
            return this.calculatePosition('bottom', 'top');
        },
        enumerable: true,
        configurable: true
    });
    DockComponent.prototype.calculatePosition = function (primary, secondary) {
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
                    return "-" + this.absoluteSize;
                case secondary:
                    return '100%';
                default:
                    return '0%';
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DockComponent.prototype, "position", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DockComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DockComponent.prototype, "visible", void 0);
    __decorate([
        core_1.HostBinding('style.left'), 
        __metadata('design:type', Object)
    ], DockComponent.prototype, "leftPosition", null);
    __decorate([
        core_1.HostBinding('style.right'), 
        __metadata('design:type', Object)
    ], DockComponent.prototype, "rightPosition", null);
    __decorate([
        core_1.HostBinding('style.top'), 
        __metadata('design:type', Object)
    ], DockComponent.prototype, "topPosition", null);
    __decorate([
        core_1.HostBinding('style.bottom'), 
        __metadata('design:type', Object)
    ], DockComponent.prototype, "bottomPosition", null);
    DockComponent = __decorate([
        core_1.Component({
            selector: 'ngrx-dock',
            template: "\n    <div class=\"dock\">\n      <div class=\"dock-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            styles: ["\n    :host {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      transition: all 0.3s;\n      z-index: 9999;\n    }\n\n    .dock {\n      position: absolute;\n      z-index: 1;\n      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);\n      background-color: white;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n    }\n\n    .dock-content {\n      width: 100%;\n      height: 100%;\n      overflow: auto;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], DockComponent);
    return DockComponent;
}());
exports.DockComponent = DockComponent;
