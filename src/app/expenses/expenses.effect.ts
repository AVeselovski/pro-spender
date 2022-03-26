import fetcher from "utils/fetcher";
import { mockResponse } from "utils/mockBackend/expenses";
import HttpErrorResponse from "models/HttpErrorResponse";

import type { IExpensesParams } from "./types";

export async function fetchExpenses(params: IExpensesParams) {
  const endpoint = `tmp/expenses.json`;
  const response = await fetcher.get(endpoint);

  if (response instanceof HttpErrorResponse) {
    return response;
  }

  // mockResponse mimics filtering and sorting done by backend
  return mockResponse(response.data, params);
}
