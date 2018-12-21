import { LayoutActions } from "../actions";

export interface State {
  openedSidenav: boolean;
  pinSidenav: boolean;
  progress: number;
  mqAlias: string | null;
}

const initialState: State = {
  openedSidenav: false,
  pinSidenav: false,
  progress: 0,
  mqAlias: null,
};

export function reducer(state: State = initialState, action: LayoutActions.LayoutActionsUnion): State {
  switch (action.type) {
    case LayoutActions.LayoutActionTypes.StartProgress:
      return {
        ...state,
        progress: state.progress + 1,
      };

    case LayoutActions.LayoutActionTypes.EndProgress:
      return {
        ...state,
        // Todo: understand why http calls and responses are causing progress to decrement negative
        progress: state.progress > 0 ? state.progress - 1 : state.progress,
      };

    case LayoutActions.LayoutActionTypes.CloseSidenav:
      return {
        ...state,
        openedSidenav: false,
      };

    case LayoutActions.LayoutActionTypes.OpenSidenav:
      return {
        ...state,
        openedSidenav: true,
      };

    case LayoutActions.LayoutActionTypes.PinSidenav:
      return {
        ...state,
        pinSidenav: true,
      };

    case LayoutActions.LayoutActionTypes.RestoreLayout:
      return {
        ...state,
        openedSidenav: action.payload.opened,
        pinSidenav: action.payload.pinned,
      };

    case LayoutActions.LayoutActionTypes.UnpinSidenav:
      return {
        ...state,
        pinSidenav: false,
      };

    case LayoutActions.LayoutActionTypes.ChangedMqAlias:
      return {
        ...state,
        mqAlias: action.payload,
      };

    default:
      return state;
  }
}

export const getOpenedSidenav = (state: State) => state.openedSidenav;
export const getPinSidenav = (state: State) => state.pinSidenav;
export const getMqAlias = (state: State) => state.mqAlias;
export const getProgress = (state: State) => state.progress;
