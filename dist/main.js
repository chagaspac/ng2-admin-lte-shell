"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var store_devtools_1 = require('@ngrx/store-devtools');
var store_log_monitor_1 = require('@ngrx/store-log-monitor');
var _1 = require('./app/');
var app_redux_1 = require('./app/app.redux');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    store_1.provideStore(app_redux_1.appReducerObject),
    store_devtools_1.instrumentStore({
        monitor: store_log_monitor_1.useLogMonitor({
            position: 'right',
            visible: !_1.environment.production
        })
    })
]);
//# sourceMappingURL=main.js.map