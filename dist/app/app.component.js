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
var shell_redux_1 = require('../shell/shell.redux');
var app_sidebar_mini_component_1 = require('../shell/app-sidebar-mini.component');
var AppComponent = (function () {
    function AppComponent(store, dispatcher) {
        this.store = store;
        this.dispatcher = dispatcher;
        this.appShell = store.select(function (s) { return s.appShell; });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.dispatcher.dispatch(shell_redux_1.AppShellActions.setWindowSize(window.innerWidth, window.innerHeight));
    };
    AppComponent.prototype._windowResize = function ($event) {
        this.dispatcher.dispatch(shell_redux_1.AppShellActions.setWindowSize(window.innerWidth, window.innerHeight));
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "_windowResize", null);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [app_sidebar_mini_component_1.AppSidebarMiniComponent, store_log_monitor_1.StoreLogMonitorComponent]
        }), 
        __metadata('design:paramtypes', [store_1.Store, store_1.Dispatcher])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map