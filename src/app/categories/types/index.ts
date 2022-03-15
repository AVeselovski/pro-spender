/* Update with proper types, once known */

import type { IExpense } from "app/expenses/types";

/* Main default import (state), should be named for importing convenience */
export default interface ICategoriesState {
  readonly items: ICategory[];
  readonly [key: string]: any;
}

/* Other named exports */

export interface ICategory {
  id: number;
  vaultId: number;
  name: string;
  description: string;
  baseBudget: number;
  budget: number; // !! Temporary !!
  color: number;
}

export interface ICategoryWithExpenses extends ICategory {
  expenses: IExpense[];
  rawSum: number;
  sum: string;
  rawPercentage: number;
  percentage: string;
}

export interface IBudgetSummary {
  totalBudget: string;
  totalExpenses: string;
  difference: string;
  isOver: boolean;
  percentage: number;
}
