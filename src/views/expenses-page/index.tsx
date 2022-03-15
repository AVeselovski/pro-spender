import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "app/store";
import * as categoriesAction from "app/categories/categories.action";
import * as expensesAction from "app/expenses/expenses.action";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpensesTable from "./components/ExpensesTable";
import Grid from "@mui/material/Grid";
import AddExpenseAction from "views/components/general/AddExpenseAction";

interface TitleProps {
  children?: React.ReactNode;
}

function Title(props: TitleProps) {
  return (
    <Typography
      color="default"
      component="h1"
      gutterBottom
      sx={{
        alignItems: "center",
        display: "flex",
        fontWeight: "fontWeightBold",
      }}
      variant="h5"
    >
      {props.children}
    </Typography>
  );
}

function Expenses() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAction.requestCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(expensesAction.requestExpenses(searchParams));
  }, [dispatch, searchParams]);

  return (
    <>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Title>Expenses</Title>
      </Box>
      <Grid sx={{ pb: 8 }}>
        <ExpensesTable />
      </Grid>

      <AddExpenseAction />
    </>
  );
}

export default Expenses;
