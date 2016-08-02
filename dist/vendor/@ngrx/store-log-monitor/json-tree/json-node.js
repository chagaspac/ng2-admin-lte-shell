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
var types = require('./types');
var JsonNodeComponent = (function () {
    function JsonNodeComponent() {
        this.expanded = false;
    }
    Object.defineProperty(JsonNodeComponent.prototype, "value", {
        set: function (value) {
            this.label = types.getLabelFor(value);
            this.type = types.getTypeOf(value);
            if (this.type === types.KNOWN.Array || this.type === types.KNOWN.Object || this.type === types.KNOWN.Iterable) {
                this.children = types.getChildrenFor(value);
            }
            else {
                this.children = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    JsonNodeComponent.prototype.toggle = function () {
        if (this.children) {
            this.expanded = !this.expanded;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JsonNodeComponent.prototype, "key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JsonNodeComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], JsonNodeComponent.prototype, "value", null);
    JsonNodeComponent = __decorate([
        core_1.Component({
            selector: 'ngrx-json-node',
            directives: [JsonNodeComponent],
            styles: ["\n    :host {\n      display: block;\n      padding: 2px 2px 2px 20px;\n      position: relative;\n      color: #70AFCD;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n    }\n    .expanded-indicator {\n      position: absolute;\n      top: 7px;\n      left: 5px;\n      font-size: 10px;\n      transition: transform 200ms;\n    }\n\n    .expanded .expanded-indicator {\n      transform: rotate(90deg);\n    }\n\n    .node-key::after {\n      content: ': ';\n      display: inline;\n    }\n\n    .expanded .node-label {\n      color: #BABBBD !important;\n    }\n\n    .node-label {\n      color: #9AC05C;\n    }\n\n    .node-label.array, .node-label.null, .node-label.iterable {\n      color: #D182C0;\n    }\n\n    .node-label.number, .node-label.undefined, .node-label.boolean {\n      color: #F86936;\n    }\n  "],
            template: "\n    <div (click)=\"toggle()\" [class.expanded]=\"expanded\">\n      <span class=\"expanded-indicator\" *ngIf=\"children\">\u25B6</span>\n      <span class=\"node-key\">{{ key }}</span>\n      <span class=\"node-label\" [ngClass]=\"type\">{{ label }}</span>\n    </div>\n    <div class=\"child-nodes\" *ngIf=\"children && expanded\">\n      <ngrx-json-node *ngFor=\"let child of children\" [value]=\"child.value\" [key]=\"child.key\"></ngrx-json-node>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], JsonNodeComponent);
    return JsonNodeComponent;
}());
exports.JsonNodeComponent = JsonNodeComponent;
