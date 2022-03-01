import { createSelector, ParametricSelector } from "reselect";

import type { RootState } from "../store";
import type IProcessingState from "./types";

/**
 * Returns true if any of the action types provided exist.
 */
export const selectLoadingStates: ParametricSelector<RootState, string[], boolean> = createSelector(
  (state: RootState) => state.processing,
  (_: RootState, actionTypes: string[]) => actionTypes,
  _selectLoadingStates
);

function _selectLoadingStates(state: IProcessingState, actionTypes: string[]): boolean {
  return actionTypes.some((actionType: string) => state[actionType]);
}
