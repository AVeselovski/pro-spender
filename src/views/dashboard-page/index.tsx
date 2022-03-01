import { useEffect } from "react";

import { useAppDispatch } from "app/store";
import * as categoriesAction from "app/categories/categories.action";
import * as expensesAction from "app/expenses/expenses.action";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import ExpensesTable from "./components/ExpensesTable";
import BudgetAllocation from "./components/BudgetAllocation";

function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAction.requestCategories());
    dispatch(expensesAction.requestExpenses());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={8}>
        <Paper
          sx={{
            px: 0,
            py: 2,
            display: "flex",
            flexDirection: "column",
            height: 320,
          }}
        >
          <ExpensesTable />
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} lg={4}>
        <Paper
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            flexDirection: "column",
            // height: 320,
          }}
        >
          <BudgetAllocation />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
