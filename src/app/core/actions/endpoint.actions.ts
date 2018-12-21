import { Action } from '@ngrx/store';

export enum EndpointActionTypes {
  Set = '[Endpoint] Set Value',
  Restore = '[Endpoint] Restore Value From Local Storage',
}

export class Set implements Action {
  readonly type = EndpointActionTypes.Set;

  constructor(public payload: string) {
  }
}

export class Restore implements Action {
  readonly type = EndpointActionTypes.Restore;

  constructor(public payload: string) {
  }
}

export type EndpointActionsUnion = Set | Restore;
