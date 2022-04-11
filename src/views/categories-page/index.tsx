import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/store";
import * as categoriesAction from "app/categories/categories.action";
import { selectTotalBudgetSummary } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CategoriesGrid from "./components/CategoriesGrid";
import Box from "@mui/material/Box";

import ExpenseAdder from "views/components/expense-adder";

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

function Categories() {
  const budgetSummary = useAppSelector((state) => selectTotalBudgetSummary(state));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAction.getCategories());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Title>Categories</Title>
        <Typography component="span" sx={{ fontWeight: "fontWeightBold" }} variant="h5">
          {formatCurrency(budgetSummary.totalBudget)}
        </Typography>
      </Box>

      <Grid container mb={1} spacing={3} sx={{ pb: 8 }}>
        <CategoriesGrid />
      </Grid>

      <ExpenseAdder />
    </>
  );
}

export default Categories;
