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
require('rxjs/add/observable/merge');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/distinctUntilChanged');
var store_devtools_1 = require('@ngrx/store-devtools');
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var Observable_1 = require('rxjs/Observable');
var commander_1 = require('./commander');
var dock_1 = require('./dock');
var actions_1 = require('./actions');
var DockMonitorComponent = (function () {
    function DockMonitorComponent(tools, actions) {
        var _this = this;
        this.tools = tools;
        this.actions = actions;
        this.state$ = this.tools.liftedState.map(function (s) { return s.monitorState; });
        this.visible$ = this.state$.map(function (s) { return s.visible; }).distinctUntilChanged();
        this.position$ = this.state$.map(function (s) { return s.position; }).distinctUntilChanged();
        this.size$ = this.state$.map(function (s) { return s.size; }).distinctUntilChanged();
        this.toggle$ = new Subject_1.Subject();
        this.toggleAction$ = this.toggle$
            .map(function () { return _this.actions.toggleVisibility(); });
        this.changePosition$ = new Subject_1.Subject();
        this.positionAction$ = this.changePosition$
            .map(function () { return _this.actions.changePosition(); });
        Observable_1.Observable
            .merge(this.toggleAction$, this.positionAction$)
            .subscribe(this.tools);
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DockMonitorComponent.prototype, "toggleCommand", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DockMonitorComponent.prototype, "positionCommand", void 0);
    DockMonitorComponent = __decorate([
        core_1.Component({
            selector: 'dock-monitor',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            directives: [dock_1.DockComponent, commander_1.CommanderComponent],
            providers: [actions_1.DockActions],
            template: "\n    <ngrx-commander [shortcut]=\"toggleCommand\" (command)=\"toggle$.next($event)\"></ngrx-commander>\n    <ngrx-commander [shortcut]=\"positionCommand\" (command)=\"changePosition$.next($event)\"></ngrx-commander>\n\n    <ngrx-dock [visible]=\"visible$ | async\" [position]=\"position$ | async\" [size]=\"size$ | async\">\n      <ng-content></ng-content>\n    </ngrx-dock>\n  "
        }), 
        __metadata('design:paramtypes', [store_devtools_1.StoreDevtools, actions_1.DockActions])
    ], DockMonitorComponent);
    return DockMonitorComponent;
}());
exports.DockMonitorComponent = DockMonitorComponent;
