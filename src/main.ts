import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { AppComponent, environment } from './app/';
import { appReducerObject } from './app/app.redux';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  provideStore(appReducerObject),
  instrumentStore({
    monitor: useLogMonitor({
      position: 'right',
      visible: !environment.production
    })
  })
]);
