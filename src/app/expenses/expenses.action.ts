import * as actionCreator from "utils/actionUtility";
import * as effect from "./expenses.effect";
import HttpErrorResponse from "models/HttpErrorResponse";
import ExpensesUrlParams from "models/ExpensesUrlParams";

import type { AppDispatch, RootState } from "../store";
import type { IExpensesParams } from "./types";

function getUrlParams(urlParams: URLSearchParams) {
  const _params: { [key: string]: any } = new ExpensesUrlParams();
  const _urlParams: Partial<IExpensesParams> = Object.fromEntries([...urlParams]);

  Object.keys(_params).forEach((key) => {
    if (_urlParams[key as keyof IExpensesParams]) {
      _params[key] = _urlParams[key as keyof IExpensesParams];
    }
  });

  return { ..._params } as IExpensesParams;
}

function withParams(params?: { [key: string]: string }) {
  const _params: { [key: string]: any } = new ExpensesUrlParams();

  if (params) {
    Object.keys(params).forEach((p) => {
      _params[p] = params[p];
    });
  }

  return { ..._params } as IExpensesParams;
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

    const _date = period ? new Date(period) : new Date();
    const _period = _date.toISOString().split("T")[0];

    const dataModel = await effect.fetchExpenses(
      withParams({ period: _period, page: "1", rows: "9000" }) // to get all rows for calculations (no backend yet)
    );
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(REQUEST_EXPENSES_FINISHED, dataModel, isError));
  };
}
