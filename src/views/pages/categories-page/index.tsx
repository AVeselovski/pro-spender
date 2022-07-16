import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/store";
import * as categoriesAction from "app/categories/categories.action";
import { selectTotalBudgetSummary } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import { Box, Grid, PageTitle, Typography } from "views/components/common";
import CategoriesGrid from "./components/CategoriesGrid";

import ExpenseAdder from "views/components/expense-adder";

function Categories() {
  const budgetSummary = useAppSelector((state) => selectTotalBudgetSummary(state));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAction.getCategories());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mb: 3 }}>
        <PageTitle>Categories</PageTitle>
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
