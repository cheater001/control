// RxJS
import { defer, of } from 'rxjs';
import { map, tap, pluck, pairwise, filter, withLatestFrom } from 'rxjs/operators';

// Angular
import { Injectable } from '@angular/core';

// State
import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRoot from 'app/reducers';
import { SessionActions } from '../actions';

@Injectable()
export class SessionEffects {
  @Effect()
  init$ = defer(() => of(new SessionActions.Restore({})));

  constructor(private actions$: Actions,
              private store: Store<fromRoot.State>) {
  }
}
