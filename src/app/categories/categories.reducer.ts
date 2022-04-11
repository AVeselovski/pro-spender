import * as actions from "./categories.action";

import type { IAction } from "../types";
import type ICategoriesState from "./types";

const initialState: ICategoriesState = {
  items: [],
};

function categoriesReducer(state = initialState, action: IAction<any>) {
  if (action.error) return state;

  switch (action.type) {
    case actions.ASYNC_GET_CATEGORIES_FINISHED:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}

export default categoriesReducer;
