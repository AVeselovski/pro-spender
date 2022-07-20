import * as actionCreator from "utils/actionUtility";
import HttpErrorResponse from "models/HttpErrorResponse";
import * as effect from "./categories.effect";
import { AppDispatch, RootState } from "../store";
import { IAction } from "../types";

export const SET_TAB: string = "categories/ASYNC_GET_CATEGORIES";

export function setTab(key: string, value: number): IAction<string> {
  return actionCreator.createAction(SET_TAB, { [key]: value });
}

/* Async */

export const ASYNC_GET_CATEGORIES: string = "categories/ASYNC_GET_CATEGORIES";
export const ASYNC_GET_CATEGORIES_FINISHED: string = "categories/ASYNC_GET_CATEGORIES_FINISHED";

export function getCategories(): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_GET_CATEGORIES));

    const dataModel = await effect.getCategories();
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(ASYNC_GET_CATEGORIES_FINISHED, dataModel, isError));
  };
}
