var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { StoreDevtools } from '@ngrx/store-devtools';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CommanderComponent } from './commander';
import { DockComponent } from './dock';
import { DockActions } from './actions';
export let DockMonitorComponent = class DockMonitorComponent {
    constructor(tools, actions) {
        this.tools = tools;
        this.actions = actions;
        this.state$ = this.tools.liftedState.map(s => s.monitorState);
        this.visible$ = this.state$.map(s => s.visible).distinctUntilChanged();
        this.position$ = this.state$.map(s => s.position).distinctUntilChanged();
        this.size$ = this.state$.map(s => s.size).distinctUntilChanged();
        this.toggle$ = new Subject();
        this.toggleAction$ = this.toggle$
            .map(() => this.actions.toggleVisibility());
        this.changePosition$ = new Subject();
        this.positionAction$ = this.changePosition$
            .map(() => this.actions.changePosition());
        Observable
            .merge(this.toggleAction$, this.positionAction$)
            .subscribe(this.tools);
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], DockMonitorComponent.prototype, "toggleCommand", void 0);
__decorate([
    Input(), 
    __metadata('design:type', String)
], DockMonitorComponent.prototype, "positionCommand", void 0);
DockMonitorComponent = __decorate([
    Component({
        selector: 'dock-monitor',
        changeDetection: ChangeDetectionStrategy.OnPush,
        directives: [DockComponent, CommanderComponent],
        providers: [DockActions],
        template: `
    <ngrx-commander [shortcut]="toggleCommand" (command)="toggle$.next($event)"></ngrx-commander>
    <ngrx-commander [shortcut]="positionCommand" (command)="changePosition$.next($event)"></ngrx-commander>

    <ngrx-dock [visible]="visible$ | async" [position]="position$ | async" [size]="size$ | async">
      <ng-content></ng-content>
    </ngrx-dock>
  `
    }), 
    __metadata('design:paramtypes', [StoreDevtools, DockActions])
], DockMonitorComponent);
