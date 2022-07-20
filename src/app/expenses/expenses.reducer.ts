import * as actions from "./expenses.action";
import { IAction } from "../types";
import IExpensesState from "./types";

const initialState: IExpensesState = {
  items: [],
  pagination: { pages: 0, rows: 0 },
};

function expensesReducer(state = initialState, action: IAction<any>) {
  if (action.error) return state;

  switch (action.type) {
    case actions.ASYNC_GET_EXPENSES_FINISHED:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload.pagination },
        items: action.payload.items,
      };
    default:
      return state;
  }
}

export default expensesReducer;
