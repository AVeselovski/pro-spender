export const createAction = (
  type: string,
  payload: any = undefined,
  error: boolean = false,
  meta: any = null
) => ({ type, payload, error, meta });

export const isAsyncActionType = (type: string) => {
  return type.includes("ASYNC_");
};
