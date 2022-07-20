import { isAsyncActionType } from "utils/actionUtility";
import { IAction } from "../types";
import IProcessingState from "./types";

const initialState: IProcessingState = {};

function processingReducer(state = initialState, action: IAction<undefined>): IProcessingState {
  const isAsyncType = isAsyncActionType(action.type);

  if (!isAsyncType) {
    return state;
  }

  const isFinishedType = action.type.includes("_FINISHED");
  const actionType = action.type.replace("_FINISHED", "");

  return {
    ...state,
    [actionType]: !isFinishedType,
  };
}

export default processingReducer;
