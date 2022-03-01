import type { Action } from "redux";
import type IErrorState from "./error/types";
import type IProcessingState from "./processing/types";
import type INotificationState from "./notification/types";
import type ICategoriesState from "./categories/types";
import type IExpensesState from "./expenses/types";

export default interface IState {
  readonly error: IErrorState;
  readonly processing: IProcessingState;
  readonly notification: INotificationState;
  readonly categories: ICategoriesState;
  readonly expenses: IExpensesState;
  readonly [key: string]: any;
}

/* Other named exports */

/* https://github.com/acdlite/flux-standard-action */
export interface IAction<T> extends Action<string> {
  readonly type: string;
  readonly payload?: T;
  readonly error?: boolean;
  readonly meta?: any;
}
