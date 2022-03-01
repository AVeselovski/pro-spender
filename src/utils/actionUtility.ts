export const createAction = (
  type: string,
  payload: any = undefined,
  error: boolean = false,
  meta: any = null
) => ({ type, payload, error, meta });

export const isAsyncActionType = (type: string) => {
  return (
    type.includes("REQUEST_") ||
    type.includes("POST_") ||
    type.includes("PUT_") ||
    type.includes("DELETE_")
  );
};
