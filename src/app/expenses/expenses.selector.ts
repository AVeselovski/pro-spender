import { createSelector } from "reselect";

import { selectCategoryNames } from "app/categories/categories.selector";

import type { RootState } from "../store";
import type { IExpense } from "./types";

interface PartialState {
  [key: string]: string;
}

const _selectExpenses = (items: IExpense[], limit: number = 0, categoryName: PartialState) => {
  const slicedItems = limit ? items.slice(0, limit) : items;
  const formattedExpenses = slicedItems.map((expense) => {
    const _formattedAmount = `${expense.amount.toFixed(2).toString().replace(".", ",")}€`;

    return {
      date: expense.timestamp,
      expense: expense.description,
      category: categoryName[expense.categoryId],
      amount: _formattedAmount,
    };
  });

  return formattedExpenses;
};

export const selectRawExpenses = (state: RootState) => state.expenses.items;

export const selectExpenses = createSelector(
  (state: RootState) => state.expenses.items,
  (_state: RootState, limit: number) => limit,
  selectCategoryNames,
  _selectExpenses
);
