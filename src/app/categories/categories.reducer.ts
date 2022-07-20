import * as actions from "./categories.action";
import { IAction } from "../types";
import ICategoriesState from "./types";

const initialState: ICategoriesState = {
  items: [],
  tabs: {
    layout: 0,
    nav: 0,
  },
};

function categoriesReducer(state = initialState, action: IAction<any>) {
  if (action.error) return state;

  switch (action.type) {
    case actions.SET_TAB:
      return {
        ...state,
        tabs: {
          ...state.tabs,
          ...action.payload,
        },
      };

    /* Async */

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
