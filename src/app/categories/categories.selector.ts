import { createSelector } from "reselect";

import type { Selector } from "reselect";
import type { RootState } from "../store";
import type { ICategory, ICategoryWithExpense } from "./types";
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

export const selectRawCategories = (state: RootState) => state.categories.items;

export const selectCategoriesWithExpenses: Selector<RootState, ICategoryWithExpense[]> =
  createSelector(
    (state: RootState) => ({ categories: state.categories.items, expenses: state.expenses.items }),
    _selectCategoriesWithExpenses
  );

export const selectCategoryNames: Selector<RootState, { [key: string]: string }> = createSelector(
  (state: RootState) => state.categories.items,
  _selectCategoryNames
);
