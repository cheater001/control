// Ramda
import { any, path } from "ramda";

// State
import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromLayout from "./layout.reducer";
import { LayoutActions } from "../actions";

// Models
import { LayoutSession } from "../models/layout";

export const LAYOUT_FEATURE_KEY = "Layout";

export interface LayoutState {
  // ToDo consider another name
  main: fromLayout.State;
}

export interface State extends fromRoot.State {
  [ LAYOUT_FEATURE_KEY ]: LayoutState;
}

export const reducers: ActionReducerMap<LayoutState, LayoutActions.LayoutActionsUnion> = {
  main: fromLayout.reducer,
};

export const selectLayoutState = createFeatureSelector<State, LayoutState>(LAYOUT_FEATURE_KEY);

export const selectLayoutMainState = createSelector(
  selectLayoutState,
  (state: LayoutState) => state.main,
);

export const getOpenedSidenav = createSelector(
  selectLayoutMainState,
  fromLayout.getOpenedSidenav,
);

export const getPinSidenav = createSelector(
  selectLayoutMainState,
  fromLayout.getPinSidenav,
);
export const getMqAlias = createSelector(
  selectLayoutMainState,
  fromLayout.getMqAlias,
);

export const getIsScreenSmall = createSelector(
  getMqAlias,
  alias => alias === "sm" || alias === "xs",
);

export const getHasBackdrop = createSelector(
  getIsScreenSmall,
  getPinSidenav,
  (isSmall, pinned) => isSmall || !pinned,
);

export const getSidenavMode = createSelector(
  getIsScreenSmall,
  getPinSidenav,
  (isSmall, pinned) => {
    if (isSmall) {
      return "over";
    } else if (pinned) {
      return "side";
    } else {
      return "over";
    }
  },
);

export const getProgress = createSelector(
  selectLayoutMainState,
  fromLayout.getProgress,
);
