// RxJS
import { defer } from 'rxjs';
import { map, tap, pluck, pairwise, filter, withLatestFrom } from 'rxjs/operators';

// Angular
import { Injectable } from '@angular/core';

// State
import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRoot from 'app/reducers';
import * as fromLayout from '../reducers';
import { SessionActions } from '@core/actions';
import { LayoutActions } from '../actions';

// Flex Layout
import { ObservableMedia } from '@angular/flex-layout';

@Injectable()
export class LayoutEffects {
  @Effect()
  restoreLayout$ = this.actions$.pipe(
    ofType(SessionActions.SessionActionTypes.Restore),
    withLatestFrom(this.store.pipe(select(fromLayout.getMqAlias))),
    map(([ _, mqAlias ]) => {
      const pinned = JSON.parse(window.localStorage.getItem('SideNavPinned'));

      return new LayoutActions.RestoreLayout({
        pinned,
        opened: mqAlias !== 'sm' && pinned,
      });
    }),
  );

  @Effect()
  mqAlias$ = defer(() => this.media.asObservable().pipe(
    pluck('mqAlias'),
    map(alias => new LayoutActions.ChangedMqAlias(alias)),
  ));

  @Effect()
  showSidenav$ = this.actions$.pipe(
    ofType<LayoutActions.ChangedMqAlias>(LayoutActions.LayoutActionTypes.ChangedMqAlias),
    map(action => action.payload),
    pairwise(),
    withLatestFrom(this.store.pipe(select(fromLayout.getPinSidenav))),
    filter(([ [ prev, curr ], pinned ]) =>
      pinned && prev === 'sm' && curr === 'md',
    ),
    map(_ => new LayoutActions.OpenSidenav()),
  );

  @Effect()
  hideSidenav$ = this.actions$.pipe(
    ofType<LayoutActions.ChangedMqAlias>(LayoutActions.LayoutActionTypes.ChangedMqAlias),
    map(action => action.payload),
    pairwise(),
    withLatestFrom(this.store.pipe(select(fromLayout.getOpenedSidenav))),
    filter(([ [ prev, curr ], opened ]) =>
      opened && prev === 'md' && curr === 'sm',
    ),
    map(_ => new LayoutActions.CloseSidenav()),
  );

  @Effect({ dispatch: false })
  pinSidenav$ = this.actions$.pipe(
    ofType(LayoutActions.LayoutActionTypes.PinSidenav),
    tap(_ => window.localStorage.setItem('SideNavPinned', 'true')),
  );

  @Effect({ dispatch: false })
  unpinSidenav$ = this.actions$.pipe(
    ofType(LayoutActions.LayoutActionTypes.UnpinSidenav),
    tap(_ => window.localStorage.setItem('SideNavPinned', 'false')),
  );

  constructor(private actions$: Actions,
              private store: Store<fromRoot.State>,
              private media: ObservableMedia) {
  }
}
