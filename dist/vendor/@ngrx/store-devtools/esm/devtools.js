import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/observeOn';
import { queue } from 'rxjs/scheduler/queue';
import { Dispatcher } from '@ngrx/store';
import { liftReducerWith, liftInitialState } from './reducer';
import { StoreDevtoolActions as actions } from './actions';
import { liftAction, unliftState } from './utils';
export class DevtoolsDispatcher extends Dispatcher {
}
export class StoreDevtools {
    constructor(dispatcher, actions$, reducers$, initialState, options, extension) {
        const liftedInitialState = liftInitialState(initialState, options.monitor);
        const liftReducer = liftReducerWith(initialState, liftedInitialState, options.monitor, {
            maxAge: options.maxAge
        });
        const liftedActions$ = actions$
            .skip(1)
            .merge(extension.actions$)
            .map(liftAction)
            .merge(dispatcher, extension.liftedActions$)
            .observeOn(queue);
        const liftedReducers$ = reducers$
            .map(liftReducer);
        const liftedState = liftedActions$
            .withLatestFrom(liftedReducers$)
            .scan((liftedState, [action, reducer]) => {
            const nextState = reducer(liftedState, action);
            extension.notify(action, nextState);
            return nextState;
        }, liftedInitialState)
            .publishReplay(1)
            .refCount();
        const state = liftedState
            .map(unliftState);
        this.dispatcher = dispatcher;
        this.liftedState = liftedState;
        this.state = state;
    }
    dispatch(action) {
        this.dispatcher.dispatch(action);
    }
    next(action) {
        this.dispatcher.dispatch(action);
    }
    error(error) { }
    complete() { }
    performAction(action) {
        this.dispatch(actions.performAction(action));
    }
    reset() {
        this.dispatch(actions.reset());
    }
    rollback() {
        this.dispatch(actions.rollback());
    }
    commit() {
        this.dispatch(actions.commit());
    }
    sweep() {
        this.dispatch(actions.sweep());
    }
    toggleAction(id) {
        this.dispatch(actions.toggleAction(id));
    }
    jumpToState(index) {
        this.dispatch(actions.jumpToState(index));
    }
    importState(nextLiftedState) {
        this.dispatch(actions.importState(nextLiftedState));
    }
}
