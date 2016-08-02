var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
let DockActions_1;
export let DockActions = DockActions_1 = class DockActions {
    toggleVisibility() {
        return { type: DockActions_1.TOGGLE_VISIBILITY };
    }
    changePosition() {
        return { type: DockActions_1.CHANGE_POSITION };
    }
    changeSize(size) {
        return { type: DockActions_1.CHANGE_SIZE, payload: size };
    }
    changeMonitor() {
        return { type: DockActions_1.CHANGE_MONITOR };
    }
};
DockActions.TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
DockActions.CHANGE_POSITION = '@@redux-devtools-log-monitor/CHANGE_POSITION';
DockActions.CHANGE_SIZE = '@@redux-devtools-log-monitor/CHANGE_SIZE';
DockActions.CHANGE_MONITOR = '@@redux-devtools-log-monitor/CHANGE_MONITOR';
DockActions = DockActions_1 = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], DockActions);
