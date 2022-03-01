import HttpErrorResponse from "models/HttpErrorResponse";

const API_URL = "http://localhost:3000";

export interface IRequestOptions {
  method: string;
  headers: { [key: string]: string };
  body: undefined | string;
}

/**
 * Wrapper for `fetch()`, courtesy of
 * https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper and
 * https://redux.js.org/tutorials/essentials/part-3-data-flow.
 *
 * @param endpoint Endpoint path
 * @param method Request method, defaults to GET
 * @param body Optional request body
 */
async function fetcher(
  endpoint: string,
  method: string = "GET",
  body: { [key: string]: string } | undefined = undefined
) {
  // const token = store.getState().auth.token;
  const options: IRequestOptions = {
    method,
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: undefined,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let responseData;

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    // console.log(response);

    responseData = await response.json();
    // console.log(responseData);

    if (!response.ok) {
      const errorMsg = responseData.message
        ? `${response.status} | ${responseData.message}`
        : `${response.status} | API request failed.`;
      const error = new Error(errorMsg);
      console.error('"fetcher" error, response not OK.', error);

      const errorModel = new HttpErrorResponse();

      errorModel.errors = [errorMsg];
      errorModel.message = errorMsg;
      errorModel.status = response.status;
      errorModel.url = response.url;

      return errorModel;
    }

    return {
      status: response.status,
      data: responseData,
      headers: response.headers,
      url: response.url,
    };
  } catch (error: any) {
    console.error(error);
    const errorMsg = error.message || responseData;

    return Promise.reject(`500 | ${errorMsg}`);
  }
}

/**
 * @param endpoint Endpoint path
 */
fetcher.get = function (endpoint: string) {
  return fetcher(endpoint, "GET");
};

/**
 * @param endpoint Endpoint path
 * @param body Request body
 */
fetcher.post = function (endpoint: string, body: { [key: string]: any }) {
  return fetcher(endpoint, "POST", body);
};

/**
 * @param endpoint Endpoint path (with id)
 * @param body Request body
 */
fetcher.put = function (endpoint: string, body: { [key: string]: any }) {
  return fetcher(endpoint, "PUT", body);
};

/**
 * @param endpoint Endpoint path (with id)
 */
fetcher.delete = function (endpoint: string) {
  return fetcher(endpoint, "DELETE");
};

export default fetcher;
