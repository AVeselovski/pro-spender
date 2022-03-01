import fetcher from "utils/fetcher";
import HttpErrorResponse from "models/HttpErrorResponse";

export async function fetchExpenses() {
  const endpoint = `tmp/expenses.json`;
  const response = await fetcher.get(endpoint);

  if (response instanceof HttpErrorResponse) {
    return response;
  }

  return response.data;
}
