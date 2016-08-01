import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Dispatcher } from '@ngrx/store';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { AppShell, AppShellActions } from './shell.redux';

const opendSidebarClasses: any = { 'sidebar-open': true, 'sidebar-collapse': false, };
const closedSidebarClasses: any = { 'sidebar-open': false, 'sidebar-collapse': true, };

const opendControlSidebarClasses: any = { 'control-sidebar-open': true };
const closedControlSidebarClasses: any = { 'control-sidebar-open': false };

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-mini',
  templateUrl: 'app-sidebar-mini.component.html',
  directives: [ StoreLogMonitorComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AppSidebarMiniComponent implements OnInit {

  @Input() state: Observable<AppShell>;

  sidebarMiniClasses: Observable<any>;
  controlSidebarClasses: Observable<any>;
  wrapperStyle: Observable<any>;
  contentWrapperStyle: Observable<any>;

  constructor(private dispatcher: Dispatcher) { }

  ngOnInit() {
    this.sidebarMiniClasses = this.state
      .map(s => s.isNavigationOpen ? opendSidebarClasses : closedSidebarClasses)
      .distinctUntilChanged();

    this.controlSidebarClasses = this.state
      .map(s => s.isControlNavigationOpen ? opendControlSidebarClasses : closedControlSidebarClasses)
      .distinctUntilChanged();

    this.wrapperStyle = this.state
      .map(s => <any>{ 'min-height':  (s.windowSize.height) + 'px' })
      .distinctUntilChanged();

    this.contentWrapperStyle = this.state
      .map(s => <any>{ 'min-height':  (s.windowSize.height - 50 - 51) + 'px' })
      .distinctUntilChanged();
  }

  toggleNavigation() { this.dispatcher.dispatch(AppShellActions.toggleNavigation()); }

  toggleControlNavigation() { this.dispatcher.dispatch(AppShellActions.toggleControlNavigation()); }

  toggleDevTools() { this.dispatcher.dispatch(AppShellActions.toggleDevTools()); }
}
