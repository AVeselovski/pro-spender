import * as actions from "./user.action";
import { IAction } from "../types";
import IUserState, { IUser } from "./types";

const initialState: IUserState = {};

function userReducer(state = initialState, action: IAction<IUser | undefined>): IUserState {
  if (action.error) return state;

  switch (action.type) {
    case actions.ASYNC_CREATE_USER_FINISHED:
      return action.payload as IUser;
    case actions.ASYNC_LOGIN_USER_FINISHED:
      return action.payload as IUser;
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
