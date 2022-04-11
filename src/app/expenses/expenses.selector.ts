import { createSelector } from "reselect";

import type { Selector, ParametricSelector } from "reselect";
import type { RootState } from "../store";
import type { IExpense } from "./types";
import { ICategory } from "app/categories/types";

const _selectCategoryNames: Selector<RootState, { [key: string]: string }> = createSelector(
  (state: RootState) => state.categories.items,
  (items: ICategory[]) =>
    items.reduce((obj: { [key: string]: string }, item) => {
      obj[item.id] = item.name;

      return obj;
    }, {})
);

function _selectExpenses(
  items: IExpense[],
  limit: number,
  categoryNames: { [key: string]: string }
) {
  const slicedItems = limit ? items.slice(0, limit) : items;
  const formattedExpenses = slicedItems.map((expense) => {
    return {
      ...expense,
      date: expense.date,
      expense: expense.description,
      category: categoryNames[expense.categoryId],
      amount: expense.amount,
    };
  });

  return formattedExpenses;
}

export const selectRawExpenses = (state: RootState) => state.expenses.items;

type ExpenseWithCategory = IExpense & {
  category: string;
};

/**
 * Selects a set amount of expenses. All if limit not provided (0).
 */
export const selectExpenses: ParametricSelector<RootState, number, ExpenseWithCategory[]> =
  createSelector(
    (state: RootState) => state.expenses.items,
    (_state: RootState, limit: number = 0) => limit,
    _selectCategoryNames,
    _selectExpenses
  );

export const selectExpensesPagination = (state: RootState) => state.expenses.pagination;

/**
 * Calculated total of given expenses.
 */
export const selectExpensesTotal: Selector<RootState, number> = createSelector(
  (state: RootState) => state.expenses.items,
  (items: IExpense[]) => items.reduce((total: number, item) => (total += item.amount), 0)
);
