import fetcher from "utils/fetcher";
import { mockResponse } from "utils/mockBackend/expenses";
import HttpErrorResponse from "models/HttpErrorResponse";

import type { IExpense, IExpensesParams } from "./types";

export async function getExpenses(params: IExpensesParams) {
  const endpoint = `tmp/expenses.json`;
  const response = await fetcher.get(endpoint);

  if (response instanceof HttpErrorResponse) {
    return response;
  }

  // mockResponse mimics filtering and sorting done by backend
  return mockResponse(response.data, params);
  // return response.data;
}

export async function addExpense(expense: Partial<IExpense>) {
  const endpoint = `tmp/expenses.json`;
  // const response = await fetcher.post(endpoint, expense);
  /* mocking successful/failed requests */
  const rand = Math.random();
  const response =
    Math.round(rand) === 1 ? await fetcher.post(endpoint, expense) : await fetcher.get(endpoint);
  /***/

  if (response instanceof HttpErrorResponse) {
    return response;
  }

  return response.data;
}
