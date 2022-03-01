/* Update with proper types, once known */

import type { IExpense } from "app/expenses/types";

/* Main default import (state), should be named for importing convenience */
export default interface ICategoriesState {
  readonly [key: string]: any;
}

/* Other named exports */

export interface ICategory {
  id: number;
  name: string;
  budget: number;
}

export interface ICategoryWithExpense extends ICategory {
  expenses: IExpense[];
  rawSum: number;
  sum: string;
  rawPercentage: number;
  percentage: string;
}
