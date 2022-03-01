import { isAsyncActionType } from "utils/actionUtility";

import type { IAction } from "../types";
import type IProcessingState from "./types";

const initialState: IProcessingState = {};

function processingReducer(state = initialState, action: IAction<undefined>): IProcessingState {
  const isAsyncType = isAsyncActionType(action.type);

  if (!isAsyncType) {
    return state;
  }

  const isFinishedRequestType = action.type.includes("_FINISHED");
  const requestName = action.type.replace("_FINISHED", "");

  return {
    ...state,
    [requestName]: !isFinishedRequestType,
  };
}

export default processingReducer;
