import { createSelector } from "reselect";

import type { Selector } from "reselect";
import type { RootState } from "../store";
import type { IBudgetSummary, ICategory, ICategoryWithExpenses } from "./types";
import type { IExpense } from "../expenses/types";

/**
 * NOTE: Expenses shall be grouped by month. Simplified POC for now...
 */
const _selectCategoriesWithExpenses = ({
  categories,
  expenses,
}: {
  categories: ICategory[];
  expenses: IExpense[];
}) => {
  const categoriesWithExpenses = categories.map((category) => {
    let sum = 0;
    const _categoryExpenses = expenses.reduce((arr: IExpense[], item) => {
      if (category.id === item.categoryId) {
        arr.push(item);
        sum += item.amount;
      }

      return arr;
    }, []);

    const _rawPercentage = (sum / category.budget) * 100;
    const _percentage =
      _rawPercentage > 100
        ? `+${(_rawPercentage - 100).toFixed(1).replace(".", ",")}`
        : _rawPercentage.toFixed(1).replace(".", ",");

    return {
      ...category,
      expenses: _categoryExpenses,
      rawSum: sum,
      sum: sum.toFixed(2).toString().replace(".", ","),
      rawPercentage: _rawPercentage,
      percentage: _percentage,
    };
  });

  return categoriesWithExpenses;
};

const _selectCategoryNames = (items: ICategory[]) => {
  interface PartialState {
    [key: string]: string;
  }

  const categoryNames = items.reduce((obj: PartialState, item) => {
    obj[item.id] = item.name;

    return obj;
  }, {});

  return categoryNames;
};

const _selectTotalExpenses: Selector<RootState, number> = createSelector(
  (state: RootState) => state.expenses.items,
  (items: IExpense[]) => items.reduce((total: number = 0, item) => (total += item.amount || 0), 0)
);

export const selectRawCategories = (state: RootState) => state.categories.items;

export const selectCategoriesWithExpenses: Selector<RootState, ICategoryWithExpenses[]> =
  createSelector(
    (state: RootState) => ({ categories: state.categories.items, expenses: state.expenses.items }),
    _selectCategoriesWithExpenses
  );

export const selectCategoryNames: Selector<RootState, { [key: string]: string }> = createSelector(
  (state: RootState) => state.categories.items,
  _selectCategoryNames
);

export const selectTotalBudget: Selector<RootState, number> = createSelector(
  (state: RootState) => state.categories.items,
  (items: ICategory[]) => items.reduce((total: number, item) => (total += item.budget), 0)
);

export const selectBudgetSummary: Selector<RootState, IBudgetSummary> = createSelector(
  selectTotalBudget,
  _selectTotalExpenses,
  (budget: number, expenses: number) => ({
    totalBudget: budget.toFixed(2),
    totalExpenses: expenses.toFixed(2),
    difference: (budget - expenses).toFixed(2),
    isOver: budget - expenses < 0,
    percentage: (expenses / budget) * 100 || 0,
  })
);
