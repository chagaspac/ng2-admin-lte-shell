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
var types_1 = require('./types');
var json_node_1 = require('./json-node');
var JsonTreeComponent = (function () {
    function JsonTreeComponent() {
        this.children = [];
        this.expanded = true;
    }
    Object.defineProperty(JsonTreeComponent.prototype, "value", {
        set: function (value) {
            this.children = types_1.getChildrenFor(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JsonTreeComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], JsonTreeComponent.prototype, "value", null);
    JsonTreeComponent = __decorate([
        core_1.Component({
            selector: 'ngrx-json-tree',
            directives: [json_node_1.JsonNodeComponent],
            template: "\n    <ngrx-json-node *ngFor=\"let child of children\" [expanded]=\"expanded\" [value]=\"child.value\" [key]=\"child.key\"></ngrx-json-node>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], JsonTreeComponent);
    return JsonTreeComponent;
}());
exports.JsonTreeComponent = JsonTreeComponent;
