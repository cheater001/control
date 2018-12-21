import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

// State
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { EndpointActions } from 'app/core/actions';

@Component({
  selector: 'app-controls',
  template: `
    <app-endpoint-form (changed)="onChanged($event)"
                       [endpoint]="endpoint$ | async">
    </app-endpoint-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent implements OnInit, OnDestroy {
  endpoint$ = this.store.pipe(select(fromRoot.getEndpoint));

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onChanged($event: string) {
    this.store.dispatch(new EndpointActions.Set($event));
  }
}
