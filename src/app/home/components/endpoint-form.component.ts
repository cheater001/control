import { merge } from 'rxjs';
import { startWith, takeWhile, debounceTime } from 'rxjs/operators';

import {
  Component,
  OnDestroy,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-endpoint-form',
  template: `
    <h3>Current Endpoint</h3>
    <code *ngIf="endpoint; else elseBlock">{{ endpoint }}</code>
    <ng-template #elseBlock>
      There is no endpoint now...
    </ng-template>
    <div>
      <button (click)="save()" mat-raised-button *ngIf="editing; else elseEditingBlock">
        Save Endpoint
      </button>
      <ng-template #elseEditingBlock>
        <button (click)="showControl()" mat-raised-button>
          Set Endpoint
        </button>
      </ng-template>

      <mat-form-field *ngIf="editing">
        <mat-label>Set endpoint</mat-label>
        <input type="text" matInput [formControl]="endpointControl" name="Endpoint">
      </mat-form-field>
    </div>
  `,
  styles: [ `
  ` ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsTableComponent implements OnDestroy {
  @Input() endpoint: string;
  @Output() changed = new EventEmitter<string>();

  editing: boolean = false;
  endpointControl = new FormControl();

  alive = true;

  constructor() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  showControl() {
    this.editing = true;
  }

  save() {
    this.editing = false;
    this.changed.emit(this.endpointControl.value);
  }
}
