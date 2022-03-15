/* Update with proper types, once known */

/* Main default import (state), should be named for importing convenience */
export default interface IExpensesState {
  readonly [key: string]: any;
}

/* Other named exports */

export interface IExpense {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
  categoryId: number;
}

export type Sortable = "date" | "expense" | "category" | "amount";
export type Order = "asc" | "desc";

export interface IExpensesParams {
  page: string;
  rows: string;
  sort: Sortable;
  order: Order;
  period?: string;
  category?: string;
  q?: string;
}
