import { combineReducers, Reducer, ReducersMapObject } from "redux";

import errorReducer from "./error/error.reducer";
import processingReducer from "./processing/processing.reducer";
import notificationReducer from "./notification/notification.reducer";
import userReducer from "./user/user.reducer";
import categoriesReducer from "./categories/categories.reducer";
import expensesReducer from "./expenses/expenses.reducer";
import IState from "./types";

function rootReducer(): Reducer<IState> {
  const reducers: ReducersMapObject<IState> = {
    error: errorReducer,
    processing: processingReducer,
    notification: notificationReducer,
    user: userReducer,
    categories: categoriesReducer,
    expenses: expensesReducer,
  };

  return combineReducers(reducers);
}

export default rootReducer;
