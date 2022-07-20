import { createSelector, ParametricSelector } from "reselect";

import HttpErrorResponse from "models/HttpErrorResponse";
import { RootState } from "../store";
import IErrorState from "./types";

/**
 * Returns a new object with the keys being the finished action type
 * (e.g. "someAction/REQUEST_*_FINISHED") and the value being a
 * HttpErrorResponseModel.
 */
export const selectRawErrors: ParametricSelector<RootState, string[], IErrorState> = createSelector(
  (state: RootState) => state.error,
  (_: RootState, actionTypes: string[]) => actionTypes,
  _selectRawErrors
);

/**
 * Finds any errors matching the array of actionTypes and combines all error messages in to
 * a single string.
 */
export const selectErrorText: ParametricSelector<RootState, string[], string> = createSelector(
  (state: RootState) => state.error,
  (_: RootState, actionTypes: string[]) => actionTypes,
  _selectErrorText
);

/**
 * Returns true or false if there are errors found matching the array of actionTypes.
 */
export const hasErrors: ParametricSelector<RootState, string[], boolean> = createSelector(
  (state: RootState) => state.errors,
  (_state: RootState, actionTypes: string[]) => actionTypes,
  _hasErrors
);

function _selectRawErrors(errorState: IErrorState, actionTypes: string[]): IErrorState {
  interface PartialState {
    [key: string]: HttpErrorResponse;
  }

  return actionTypes.reduce((partialState: PartialState, actionType: string) => {
    const model: HttpErrorResponse = errorState[actionType];

    if (model) {
      partialState[actionType] = model;
    }

    return partialState;
  }, {});
}

function _selectErrorText(errorState: IErrorState, actionTypes: string[]): string {
  const errorList: string[] = actionTypes.reduce((errorMessages: string[], actionType: string) => {
    const model: HttpErrorResponse = errorState[actionType];

    if (model) {
      const { message, errors } = model;
      const arrayOfErrors: string[] = errors.length ? errors : [message];

      return errorMessages.concat(arrayOfErrors);
    }

    return errorMessages;
  }, []);

  return errorList.join(", ");
}

function _hasErrors(errorState: IErrorState, actionTypes: string[]): boolean {
  return actionTypes.map((actionType: string) => errorState[actionType]).filter(Boolean).length > 0;
}
