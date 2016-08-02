var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { filter } from 'rxjs/operator/filter';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Dispatcher, State } from '@ngrx/store';
import { Injectable, Provider } from '@angular/core';
export let StateUpdates = class StateUpdates extends ReplaySubject {
    constructor(actions$, state$) {
        super(1);
        withLatestFrom
            .call(actions$, state$)
            .subscribe(([action, state]) => {
            super.next({ action, state });
        });
    }
    next(update) { }
    error(err) { }
    complete() { }
    whenAction(...actionTypes) {
        return filter.call(this, ({ action }) => actionTypes.indexOf(action.type) > -1);
    }
};
StateUpdates = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Dispatcher, State])
], StateUpdates);
export const STATE_UPDATES_PROVIDER = new Provider(StateUpdates, {
    useClass: StateUpdates
});
