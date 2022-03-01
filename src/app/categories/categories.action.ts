import * as actionCreator from "utils/actionUtility";
import * as effect from "./categories.effect";
import HttpErrorResponse from "models/HttpErrorResponse";

import type { AppDispatch, RootState } from "../store";

export const REQUEST_CATEGORIES: string = "expenses/REQUEST_CATEGORIES";
export const REQUEST_CATEGORIES_FINISHED: string = "expenses/REQUEST_CATEGORIES_FINISHED";

export function requestCategories(): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(REQUEST_CATEGORIES));

    const dataModel = await effect.fetchCategories();
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(REQUEST_CATEGORIES_FINISHED, dataModel, isError));
  };
}
