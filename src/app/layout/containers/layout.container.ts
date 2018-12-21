// RxJS
import { Subject, Observable } from 'rxjs';
import { withLatestFrom, filter, skip } from 'rxjs/operators';

// Angular
import { Component, ContentChildren, QueryList } from '@angular/core';
import { NavigationStart, Router, RouterEvent, RouterLink } from '@angular/router';

// State
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromLayout from 'app/layout/reducers';
// import * as fromAuth from 'app/auth/reducers';
import { LayoutActions } from 'app/layout/actions';

@Component({
  selector: 'ease-layout',
  template: `
    <mat-sidenav-container fullscreen class="mq-alias-{{ mqAlias$ | async }}"
                           [hasBackdrop]="hasBackdrop$ | async"
                           (backdropClick)="backdropClick()">

      <mat-sidenav [mode]="sidenavMode$ | async"
                   [opened]="showSidenav$ | async"
                   [fixedInViewport]="false">

        <ease-side-nav [pinned]="pinSidenav$ | async"
                       [smallScreen]="isScreenSmall$ | async"
                       (closedSidenav)="sidenavCloseClick()"
                       (pinSidenav)="pinSidenav()"
                       (unpinSidenav)="unpinSidenav()">

          <cdk-accordion>
            <ng-content select="ease-nav-item, ease-nav-group-item">
            </ng-content>
          </cdk-accordion>

        </ease-side-nav>

      </mat-sidenav>

      <mat-sidenav-content fxLayout="column">

        <ease-navbar class="mat-elevation-z3"
                     [showNavbar]="showSidenav$ | async"
                     [mqAlias]="mqAlias$ | async"
                     (openedSidenav)="openSidenav()">
        </ease-navbar>

        <section fxFlex class="nav-content">
          <ng-content select="router-outlet"></ng-content>
        </section>

      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styles: [ `
    mat-sidenav-container {
      height: 100%;
      min-height: 100%;
    }

    section {
      overflow: auto;
    }

    @media print {
      .nav-content {
        overflow: visible !important;
      }
    }

  ` ],
})
export class LayoutComponent {
  @ContentChildren(RouterLink, { descendants: true }) links: QueryList<RouterLink>;

  navigate$ = new Subject();

  // loggedIn$: Observable<boolean> = this.store.pipe(select(fromAuth.getLoggedIn));
  // logo$: Observable<string> = this.store.pipe(select(fromAuth.getLogo));

  showSidenav$: Observable<boolean> = this.store.pipe(select(fromLayout.getOpenedSidenav));
  pinSidenav$: Observable<boolean> = this.store.pipe(select(fromLayout.getPinSidenav));
  hasBackdrop$: Observable<boolean> = this.store.pipe(select(fromLayout.getHasBackdrop));
  sidenavMode$: Observable<string> = this.store.pipe(select(fromLayout.getSidenavMode));
  mqAlias$: Observable<string> = this.store.pipe(select(fromLayout.getMqAlias));
  isScreenSmall$: Observable<boolean> = this.store.pipe(select(fromLayout.getIsScreenSmall));

  constructor(private store: Store<fromRoot.State>,
              private router: Router) {

    // this.store.dispatch(new LayoutActions.Init());

    this.router.events.pipe(
      filter((s: RouterEvent) => s instanceof NavigationStart),
      // Skip initial navigation
      skip(1),
    ).subscribe(_ => this.navigate$.next());

    this.navigate$.pipe(
      withLatestFrom(this.sidenavMode$),
      filter(([ _, mode ]) => mode === 'over'),
    ).subscribe(_ => this.store.dispatch(new LayoutActions.CloseSidenav()));
  }

  backdropClick() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  sidenavCloseClick() {
    this.store.dispatch(new LayoutActions.UnpinSidenav());
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  pinSidenav() {
    this.store.dispatch(new LayoutActions.PinSidenav());
  }

  unpinSidenav() {
    this.store.dispatch(new LayoutActions.UnpinSidenav());
  }
}
