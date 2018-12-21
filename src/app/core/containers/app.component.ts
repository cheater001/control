import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// import * as AuthActions from '@example-app/auth/actions/auth.actions';
// import * as fromAuth from '@example-app/auth/reducers';
import * as fromRoot from 'app/reducers';

import { LayoutActions } from '@core/actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-progress-bar *ngIf="progress$ | async" mode="indeterminate" color="accent"></mat-progress-bar>
    <ng-container>
      <ease-layout>
        <ease-nav-item routerLink="/system-admin/organizations">
          Item 1
        </ease-nav-item>

        <ease-nav-item routerLink="/system-admin/releases">
          Item 2
        </ease-nav-item>

        <router-outlet></router-outlet>
      </ease-layout>
    </ng-container>
  `,
  styles: [ `
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    :host([aria-hidden="true"]) {
      .mat-progress-bar{
        display: none;
      }
    }

    ease-layout {
      height: 100%;
      min-height: 100%;
    }

    mat-progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 3px;
      z-index: 9999;
    }
  ` ],
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    // this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    // this.closeSidenav();

    // this.store.dispatch(new AuthActions.LogoutConfirmation());
  }
}
