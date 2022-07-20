import * as actionCreator from "utils/actionUtility";
import * as effect from "./user.effect";
import HttpErrorResponse from "models/HttpErrorResponse";
import { AppDispatch, RootState } from "../store";
import { IAction } from "../types";
import { ICredentials } from "./types";

export const ASYNC_CREATE_USER: string = "user/ASYNC_CREATE_USER";
export const ASYNC_CREATE_USER_FINISHED: string = "user/ASYNC_CREATE_USER_FINISHED";

export function signup(credentials: ICredentials, callback: () => void): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_CREATE_USER));

    const dataModel = await effect.createUser(credentials);
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(ASYNC_CREATE_USER_FINISHED, dataModel, isError));
    callback && callback();
  };
}

export const ASYNC_LOGIN_USER: string = "user/ASYNC_LOGIN_USER";
export const ASYNC_LOGIN_USER_FINISHED: string = "user/ASYNC_LOGIN_USER_FINISHED";

export function login(credentials: ICredentials, callback: () => void): any {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(actionCreator.createAction(ASYNC_LOGIN_USER));

    const dataModel = await effect.loginUser(credentials);
    const isError = dataModel instanceof HttpErrorResponse;

    dispatch(actionCreator.createAction(ASYNC_LOGIN_USER_FINISHED, dataModel, isError));
    callback && callback();
  };
}

export const LOGOUT: string = "user/LOGOUT";

export function logout(): IAction<undefined> {
  return actionCreator.createAction(LOGOUT);
}
