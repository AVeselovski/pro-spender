import * as actions from "./error.action";
import HttpErrorResponse from "models/HttpErrorResponse";
import { isAsyncActionType } from "utils/actionUtility";
import { IAction } from "../types";
import IErrorState from "./types";

const initialState: IErrorState = {};

function errorsReducer(state = initialState, action: IAction<any>): IErrorState {
  if (action.type === actions.REMOVE_ERROR) {
    const newState: {
      [key: string]: HttpErrorResponse;
    } = {};

    Object.entries(state).forEach(([key, value]) => {
      if (value.id !== action.payload) {
        newState[key] = value;
      }
    });

    return newState;
  }

  if (action.type === actions.CLEAR_ALL_ERRORS) {
    return initialState;
  }

  const isFinishedType = action.type.includes("_FINISHED");
  const isStartType = isAsyncActionType(action.type) && !isFinishedType;

  /*
   * If an action is started we want to remove the old error of same type because a
   * new action has been re-dispatched.
   */
  if (isStartType) {
    const { [`${action.type}_FINISHED`]: _value, ...stateWithoutFinishedType } = state;

    return stateWithoutFinishedType;
  }

  const isError = isFinishedType && Boolean(action.error);

  if (!isError) {
    return state;
  }

  /*
   * At this point the "type" will be a finished action type:
   * (e.g. "someAction.REQUEST_*_FINISHED").
   * The payload will be a HttpErrorResponse model.
   */
  return {
    ...state,
    [action.type]: action.payload,
  };
}

export default errorsReducer;
