import * as actionCreator from "utils/actionUtility";
import * as effect from "./expenses.effect";
import HttpErrorResponse from "models/HttpErrorResponse";

import type { AppDispatch, RootState } from "../store";

export const REQUEST_EXPENSES: string = "expenses/REQUEST_EXPENSES";
export const REQUEST_EXPENSES_FINISHED: string = "expenses/REQUEST_EXPENSES_FINISHED";

export function requestExpenses(): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(REQUEST_EXPENSES));

    const dataModel = await effect.fetchExpenses();
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(REQUEST_EXPENSES_FINISHED, dataModel, isError));
  };
}
