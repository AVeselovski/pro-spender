import * as actions from "./expenses.action";

import type { IAction } from "../types";
import type IExpensesState from "./types";

const initialState: IExpensesState = {
  items: [],
};

function expensesReducer(state = initialState, action: IAction<any>) {
  if (action.error) return state;

  switch (action.type) {
    case actions.REQUEST_EXPENSES_FINISHED:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}

export default expensesReducer;
