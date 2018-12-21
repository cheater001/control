// RxJS
import { defer, of } from 'rxjs';
import { map, tap, pluck, pairwise, filter, withLatestFrom } from 'rxjs/operators';

// Angular
import { Injectable } from '@angular/core';

// State
import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRoot from 'app/reducers';
import { SessionActions, EndpointActions } from '../actions';

@Injectable()
export class EndpointEffects {
  @Effect()
  restore$ = this.actions$.pipe(
    ofType<SessionActions.Restore>(SessionActions.SessionActionTypes.Restore),
    map(action => action.payload),
    map(_ => {
      const endpoint = JSON.parse(window.localStorage.getItem('Endpoint'));

      return new EndpointActions.Restore(endpoint);
    }),
  );

  @Effect({ dispatch: false })
  set$ = this.actions$.pipe(
    ofType<EndpointActions.Set>(EndpointActions.EndpointActionTypes.Set),
    map(action => action.payload),
    tap(endpoint => window.localStorage.setItem('Endpoint', JSON.stringify(endpoint))),
  );

  constructor(private actions$: Actions,
              private store: Store<fromRoot.State>) {
  }
}
