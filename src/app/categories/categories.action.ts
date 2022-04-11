import * as actionCreator from "utils/actionUtility";
import * as effect from "./categories.effect";
import HttpErrorResponse from "models/HttpErrorResponse";

import type { AppDispatch, RootState } from "../store";

export const ASYNC_GET_CATEGORIES: string = "expenses/ASYNC_GET_CATEGORIES";
export const ASYNC_GET_CATEGORIES_FINISHED: string = "expenses/ASYNC_GET_CATEGORIES_FINISHED";

export function getCategories(): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_GET_CATEGORIES));

    const dataModel = await effect.getCategories();
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(ASYNC_GET_CATEGORIES_FINISHED, dataModel, isError));
  };
}
