import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Provider } from '@angular/core';
import { filter } from 'rxjs/operator/filter';
import { StateUpdates } from './state-updates';
export class MockStateUpdates extends ReplaySubject {
    constructor() {
        super();
    }
    send(state, action) {
        this.next({ state, action });
    }
    sendAction(action) {
        this.next({ state: null, action });
    }
    sendState(state) {
        this.next({ state, action: null });
    }
    whenAction(...actionTypes) {
        return filter.call(this, ({ action }) => actionTypes.indexOf(action.type) > -1);
    }
}
export const MOCK_EFFECTS_PROVIDERS = [
    new Provider(MockStateUpdates, {
        useClass: MockStateUpdates
    }),
    new Provider(StateUpdates, {
        useExisting: MockStateUpdates
    })
];
