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
var store_1 = require('@ngrx/store');
var store_log_monitor_1 = require('@ngrx/store-log-monitor');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/distinctUntilChanged');
var shell_redux_1 = require('./shell.redux');
var opendSidebarClasses = { 'sidebar-open': true, 'sidebar-collapse': false, };
var closedSidebarClasses = { 'sidebar-open': false, 'sidebar-collapse': true, };
var opendControlSidebarClasses = { 'control-sidebar-open': true };
var closedControlSidebarClasses = { 'control-sidebar-open': false };
var AppSidebarMiniComponent = (function () {
    function AppSidebarMiniComponent(dispatcher) {
        this.dispatcher = dispatcher;
    }
    AppSidebarMiniComponent.prototype.ngOnInit = function () {
        this.sidebarMiniClasses = this.state
            .map(function (s) { return s.isNavigationOpen ? opendSidebarClasses : closedSidebarClasses; })
            .distinctUntilChanged();
        this.controlSidebarClasses = this.state
            .map(function (s) { return s.isControlNavigationOpen ? opendControlSidebarClasses : closedControlSidebarClasses; })
            .distinctUntilChanged();
        this.wrapperStyle = this.state
            .map(function (s) { return { 'min-height': (s.windowSize.height) + 'px' }; })
            .distinctUntilChanged();
        this.contentWrapperStyle = this.state
            .map(function (s) { return { 'min-height': (s.windowSize.height - 50 - 51) + 'px' }; })
            .distinctUntilChanged();
    };
    AppSidebarMiniComponent.prototype.toggleNavigation = function () { this.dispatcher.dispatch(shell_redux_1.AppShellActions.toggleNavigation()); };
    AppSidebarMiniComponent.prototype.toggleControlNavigation = function () { this.dispatcher.dispatch(shell_redux_1.AppShellActions.toggleControlNavigation()); };
    AppSidebarMiniComponent.prototype.toggleDevTools = function () { this.dispatcher.dispatch(shell_redux_1.AppShellActions.toggleDevTools()); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], AppSidebarMiniComponent.prototype, "state", void 0);
    AppSidebarMiniComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-sidebar-mini',
            templateUrl: 'app-sidebar-mini.component.html',
            directives: [store_log_monitor_1.StoreLogMonitorComponent],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [],
        }), 
        __metadata('design:paramtypes', [store_1.Dispatcher])
    ], AppSidebarMiniComponent);
    return AppSidebarMiniComponent;
}());
exports.AppSidebarMiniComponent = AppSidebarMiniComponent;
//# sourceMappingURL=app-sidebar-mini.component.js.map