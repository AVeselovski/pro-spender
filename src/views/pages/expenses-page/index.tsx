import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "app/store";
import * as categoriesAction from "app/categories/categories.action";
import * as expensesAction from "app/expenses/expenses.action";

import { Box, Grid, PageTitle } from "views/components/common";
import ExpenseAdder from "views/components/expense-adder";
import ExpensesTable from "./components/ExpensesTable";

function Expenses() {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(categoriesAction.getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(expensesAction.getExpenses(searchParams));
  }, [dispatch, searchParams]);

  return (
    <>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mb: 3 }}>
        <PageTitle>Expenses</PageTitle>
      </Box>
      <Grid sx={{ pb: 8 }}>
        <ExpensesTable />
      </Grid>

      <ExpenseAdder />
    </>
  );
}

export default Expenses;
