import { Component, OnInit, HostListener } from '@angular/core';
import { Store, Dispatcher } from '@ngrx/store';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.redux';
import { AppShell, AppShellActions } from '../shell/shell.redux';
import { AppSidebarMiniComponent } from '../shell/app-sidebar-mini.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ AppSidebarMiniComponent, StoreLogMonitorComponent ]
})
export class AppComponent implements OnInit {
  appShell: Observable<AppShell>;

  constructor(
    private store: Store<AppState>,
    private dispatcher: Dispatcher
  ) {
    this.appShell = store.select(s => s.appShell);
  }

  ngOnInit() {
    this.dispatcher.dispatch(AppShellActions.setWindowSize(window.innerWidth, window.innerHeight));
  }

  @HostListener('window:resize', ['$event'])
  _windowResize($event) {
    this.dispatcher.dispatch(AppShellActions.setWindowSize(window.innerWidth, window.innerHeight));
  }
}