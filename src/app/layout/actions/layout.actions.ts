// State
import { Action } from '@ngrx/store';

// Models
import { LayoutSession } from '../models/layout';

export enum LayoutActionTypes {
  RestoreLayout = '[Layout] Restore Layout',

  StartProgress = '[Layout] Start Progress',
  EndProgress = '[Layout] End Progress',

  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',

  PinSidenav = '[Layout] Pin Sidenav',
  UnpinSidenav = '[Layout] Unpin Sidenav',

  ChangedMqAlias = '[Layout] Changed Media Query Alias',
}

export class RestoreLayout implements Action {
  readonly type = LayoutActionTypes.RestoreLayout;

  constructor(public payload: LayoutSession) {
  }
}

export class StartProgress implements Action {
  readonly type = LayoutActionTypes.StartProgress;
}

export class EndProgress implements Action {
  readonly type = LayoutActionTypes.EndProgress;
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}

export class PinSidenav implements Action {
  readonly type = LayoutActionTypes.PinSidenav;
}

export class UnpinSidenav implements Action {
  readonly type = LayoutActionTypes.UnpinSidenav;
}

export class ChangedMqAlias implements Action {
  readonly type = LayoutActionTypes.ChangedMqAlias;

  constructor(public payload: any) {
  }
}

export type LayoutActionsUnion =
  | RestoreLayout
  | StartProgress
  | EndProgress

  | OpenSidenav
  | CloseSidenav

  | PinSidenav
  | UnpinSidenav

  | ChangedMqAlias;
