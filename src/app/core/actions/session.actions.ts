import { Action } from '@ngrx/store';

export enum SessionActionTypes {
  Restore = '[Session] Restore',
}

export class Restore implements Action {
  readonly type = SessionActionTypes.Restore;

  constructor(public payload: any) {
  }
}

export type SessionActionsUnion = Restore;
