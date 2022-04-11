import * as actionCreator from "utils/actionUtility";

import type { IAction } from "../types";

export const REMOVE_ERROR: string = "error/REMOVE_ERROR";

export function removeById(id: string): IAction<string> {
  return actionCreator.createAction(REMOVE_ERROR, id);
}

export const CLEAR_ALL_ERRORS: string = "error/CLEAR_ALL_ERRORS";

export function clearAll(): IAction<undefined> {
  return actionCreator.createAction(CLEAR_ALL_ERRORS);
}
