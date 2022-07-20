import * as actionCreator from "utils/actionUtility";
import * as effect from "./expenses.effect";
import { addNotification } from "app/notification/notification.action";
import HttpErrorResponse from "models/HttpErrorResponse";
import ExpensesUrlParams from "models/ExpensesUrlParams";
import { NotificationStatusEnum } from "app/notification/types";
import { AppDispatch, RootState } from "../store";
import { IExpense, IExpensesParams } from "./types";

export const ASYNC_GET_EXPENSES: string = "expenses/ASYNC_GET_EXPENSES";
export const ASYNC_GET_EXPENSES_FINISHED: string = "expenses/ASYNC_GET_EXPENSES_FINISHED";

export function getExpenses(params: URLSearchParams): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_GET_EXPENSES));

    const dataModel = await effect.getExpenses(_getUrlParams(params));
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(ASYNC_GET_EXPENSES_FINISHED, dataModel, isError));
  };
}

export const ASYNC_GET_EXPENSES_BY_PERIOD: string = "expenses/ASYNC_GET_EXPENSES_BY_PERIOD";

export function getExpensesByPeriod(period?: string): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_GET_EXPENSES));

    const date = period ? new Date(period) : new Date();
    const _period = date.toISOString().split("T")[0];

    const dataModel = await effect.getExpenses(
      // to get all rows of period (no backend yet)
      _withParams({ period: _period, page: "1", rows: "9999" })
    );
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(ASYNC_GET_EXPENSES_FINISHED, dataModel, isError));
  };
}

export const ASYNC_ADD_EXPENSE: string = "expenses/ASYNC_ADD_EXPENSE";
export const ASYNC_ADD_EXPENSE_FINISHED: string = "expenses/ASYNC_ADD_EXPENSE_FINISHED";

export function addExpense(expense: Partial<IExpense>, callback?: () => void): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_ADD_EXPENSE));

    const dataModel = await effect.addExpense(expense);
    const isError = dataModel instanceof HttpErrorResponse;

    if (isError) {
      dispatch(addNotification(dataModel.message, NotificationStatusEnum.Error));
    } else {
      dispatch(addNotification("Expense added!", NotificationStatusEnum.Success));
      callback && callback();
    }

    dispatch(actionCreator.createAction(ASYNC_ADD_EXPENSE_FINISHED, dataModel, isError));
  };
}

function _getUrlParams(urlParams: URLSearchParams) {
  const expensesParams: Partial<IExpensesParams> = Object.fromEntries([...urlParams]);
  const params: { [key: string]: any } = new ExpensesUrlParams();

  Object.keys(params).forEach((key) => {
    if (expensesParams[key as keyof IExpensesParams]) {
      params[key] = expensesParams[key as keyof IExpensesParams];
    }
  });

  return { ...params } as IExpensesParams;
}

function _withParams(params?: { [key: string]: string }) {
  const expensesParams: { [key: string]: any } = new ExpensesUrlParams();

  if (params) {
    Object.keys(params).forEach((p) => {
      expensesParams[p] = params[p];
    });
  }

  return { ...expensesParams } as IExpensesParams;
}
