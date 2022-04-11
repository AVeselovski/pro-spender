import fetcher from "utils/fetcher";
import HttpErrorResponse from "models/HttpErrorResponse";

export async function getCategories() {
  const endpoint = `tmp/categories.json`;
  const response = await fetcher.get(endpoint);

  if (response instanceof HttpErrorResponse) {
    return response;
  }

  return response.data;
}
