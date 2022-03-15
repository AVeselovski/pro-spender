import { useEffect } from "react";

import { useAppDispatch } from "app/store";
import * as categoriesAction from "app/categories/categories.action";
import * as expensesAction from "app/expenses/expenses.action";

import Grid from "@mui/material/Grid";

import Summary from "./components/Summary";
import ExpensesTable from "./components/ExpensesTable";
import BudgetTotal from "./components/BudgetTotal";
import BudgetAllocation from "./components/BudgetAllocation";
import AddExpenseAction from "views/components/general/AddExpenseAction";

function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAction.requestCategories());
    dispatch(expensesAction.requestExpensesByPeriod());
  }, [dispatch]);

  return (
    <>
      <Grid container mb={1} spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={7}>
          <Summary />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={5}>
          <BudgetTotal />
        </Grid>
      </Grid>

      <Grid container mb={1} spacing={3} sx={{ pb: 8 }}>
        <Grid item xs={12} sm={12} md={6} lg={7}>
          <ExpensesTable />
        </Grid>

        <Grid item xs={12} sm={7} md={6} lg={5}>
          <BudgetAllocation />
        </Grid>
      </Grid>

      <AddExpenseAction />
    </>
  );
}

export default Dashboard;
