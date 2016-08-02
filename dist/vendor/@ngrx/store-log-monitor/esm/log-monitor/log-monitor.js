var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/map';
import { Component, Input } from '@angular/core';
import { StoreDevtools } from '@ngrx/store-devtools';
import { LogMonitorEntryComponent } from './log-monitor-entry';
import { LogMonitorButtonComponent } from './log-monitor-button';
export let LogMonitorComponent = class LogMonitorComponent {
    constructor(devtools) {
        this.devtools = devtools;
        this.expandEntries = true;
        this.canRevert$ = devtools.liftedState.map(s => !(s.computedStates.length > 1));
        this.canSweep$ = devtools.liftedState.map(s => !(s.skippedActionIds.length > 0));
        this.canCommit$ = devtools.liftedState.map(s => !(s.computedStates.length > 1));
        this.items$ = devtools.liftedState
            .map(({ actionsById, skippedActionIds, stagedActionIds, computedStates }) => {
            const actions = [];
            for (let i = 0; i < stagedActionIds.length; i++) {
                const actionId = stagedActionIds[i];
                const action = actionsById[actionId].action;
                const { state, error } = computedStates[i];
                let previousState;
                if (i > 0) {
                    previousState = computedStates[i - 1].state;
                }
                actions.push({
                    key: actionId,
                    collapsed: skippedActionIds.indexOf(actionId) > -1,
                    action,
                    actionId,
                    state,
                    previousState,
                    error
                });
            }
            return actions;
        });
    }
    handleToggle(id) {
        this.devtools.toggleAction(id);
    }
    handleReset() {
        this.devtools.reset();
    }
    handleRollback() {
        this.devtools.rollback();
    }
    handleSweep() {
        this.devtools.sweep();
    }
    handleCommit() {
        this.devtools.commit();
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], LogMonitorComponent.prototype, "expandEntries", void 0);
LogMonitorComponent = __decorate([
    Component({
        selector: 'log-monitor',
        directives: [LogMonitorEntryComponent, LogMonitorButtonComponent],
        styles: [`
    :host {
      display: block;
      background-color: #2A2F3A;
      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;
      position: relative;
      overflow-y: hidden;
      width: 100%;
      height: 100%;
      min-width: 300px;
      direction: ltr;
    }

    .button-bar {
      text-align: center;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-color: transparent;
      z-index: 1;
      display: flex;
      flex-direction: row;
      padding: 0 4px;
    }

    .elements {
      position: absolute;
      left: 0;
      right: 0;
      top: 38px;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }
  `],
        template: `
    <div class="button-bar">
      <log-monitor-button (action)="handleReset()" [disabled]="canReset$ | async">
        Reset
      </log-monitor-button>

      <log-monitor-button (action)="handleRollback()">
        Revert
      </log-monitor-button>

      <log-monitor-button (action)="handleSweep()" [disabled]="canSweep$ | async">
        Sweep
      </log-monitor-button>

      <log-monitor-button (action)="handleCommit()" [disabled]="canCommit$ | async">
        Commit
      </log-monitor-button>
    </div>
    <div class="elements">
      <log-monitor-entry
        *ngFor="let item of (items$ | async); let i = index"
        [item]="item"
        [disabled]="i === 0"
        [expandEntries]="expandEntries"
        (toggle)="handleToggle($event.id)">
      </log-monitor-entry>
    </div>
  `
    }), 
    __metadata('design:paramtypes', [StoreDevtools])
], LogMonitorComponent);
