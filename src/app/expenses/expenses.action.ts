import * as actionCreator from "utils/actionUtility";
import * as effect from "./expenses.effect";
import HttpErrorResponse from "models/HttpErrorResponse";
import ExpensesUrlParams from "models/ExpensesUrlParams";

import type { AppDispatch, RootState } from "../store";
import type { IExpensesParams } from "./types";

function getUrlParams(urlParams: URLSearchParams) {
  const params: { [key: string]: any } = new ExpensesUrlParams();
  const _urlParams: Partial<IExpensesParams> = Object.fromEntries([...urlParams]);

  Object.keys(params).forEach((key) => {
    if (_urlParams[key as keyof IExpensesParams]) {
      params[key] = _urlParams[key as keyof IExpensesParams];
    }
  });

  return { ...params } as IExpensesParams;
}

function withParam(type: keyof IExpensesParams, param?: string) {
  const params: { [key: string]: any } = new ExpensesUrlParams();

  if (param) {
    params[type] = param;
  }

  return { ...params } as IExpensesParams;
}

export const REQUEST_EXPENSES: string = "expenses/REQUEST_EXPENSES";
export const REQUEST_EXPENSES_FINISHED: string = "expenses/REQUEST_EXPENSES_FINISHED";

export function requestExpenses(params: URLSearchParams): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(REQUEST_EXPENSES));

    const dataModel = await effect.fetchExpenses(getUrlParams(params));
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(REQUEST_EXPENSES_FINISHED, dataModel, isError));
  };
}

export const REQUEST_EXPENSES_BY_PERIOD: string = "expenses/REQUEST_EXPENSES_BY_PERIOD";

export function requestExpensesByPeriod(period?: string): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(REQUEST_EXPENSES));

    let _date = period ? new Date(period) : new Date();
    let param = _date.toISOString().split("T")[0];

    console.log(param);

    const dataModel = await effect.fetchExpenses(withParam("period", param));
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(REQUEST_EXPENSES_FINISHED, dataModel, isError));
  };
}
