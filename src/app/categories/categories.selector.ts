import { createSelector } from "reselect";

import type { Selector } from "reselect";
import type { RootState } from "../store";
import type { IBudgetSummary, ICategory, ICategoryWithExpenses } from "./types";
import type { IExpense } from "../expenses/types";

function _selectCategoriesWithExpenses({
  categories,
  expenses,
}: {
  categories: ICategory[];
  expenses: IExpense[];
}) {
  const categoriesWithExpenses = categories.map((category) => {
    let sum = 0;
    const categoryExpenses = expenses.reduce((arr: IExpense[], item) => {
      if (category.id === item.categoryId) {
        arr.push(item);
        sum += item.amount;
      }

      return arr;
    }, []);

    const percentage = (sum / category.budget) * 100;

    return {
      ...category,
      expenses: categoryExpenses,
      sum,
      percentage,
    };
  });

  return categoriesWithExpenses;
}

export const selectRawCategories = (state: RootState) => state.categories.items;

/**
 * Selects categories with all expenses and expenses summary (sum, percentage).
 */
export const selectCategoriesWithExpenses: Selector<RootState, ICategoryWithExpenses[]> =
  createSelector(
    (state: RootState) => ({ categories: state.categories.items, expenses: state.expenses.items }),
    _selectCategoriesWithExpenses
  );

/**
 * Selects categories names as mapped object (id and name in key value pairs).
 */
export const selectCategoryNames: Selector<RootState, { [key: string]: string }> = createSelector(
  (state: RootState) => state.categories.items,
  (items: ICategory[]) =>
    items.reduce((obj: { [key: string]: string }, item) => {
      obj[item.id] = item.name;

      return obj;
    }, {})
);

/**
 * Selects total budget (sum of all categories budgets).
 */
export const selectTotalBudget: Selector<RootState, number> = createSelector(
  (state: RootState) => state.categories.items,
  (items: ICategory[]) => items.reduce((total: number, item) => (total += item.budget), 0)
);

/**
 * Selects the total budget summary.
 */
export const selectTotalBudgetSummary: Selector<RootState, IBudgetSummary> = createSelector(
  selectTotalBudget,
  (state: RootState) =>
    state.expenses.items.reduce((total: number = 0, item) => (total += item.amount || 0), 0),
  (budget: number, expenses: number) => ({
    totalBudget: budget,
    totalExpenses: expenses,
    difference: budget - expenses,
    isOver: budget - expenses < 0,
    percentage: (expenses / budget) * 100 || 0,
  })
);
