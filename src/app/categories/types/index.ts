import { IExpense } from "app/expenses/types";

/* Main default import (state), should be named for importing convenience */

export default interface ICategoriesState {
  readonly items: ICategory[];
  readonly tabs: Tabs;
  readonly [key: string]: any;
}

interface Tabs {
  layout: number;
  nav: number;
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
  sum: number;
  percentage: number;
}

export interface IBudgetSummary {
  totalBudget: number;
  totalExpenses: number;
  difference: number;
  isOver: boolean;
  percentage: number;
}
