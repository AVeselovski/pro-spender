import { useEffect } from "react";

import { useAppDispatch } from "app/store";
import * as categoriesAction from "app/categories/categories.action";

import { Grid } from "views/components/common";
import ExpenseAdder from "views/components/expense-adder";
import CategoriesHeader from "./components/CategoriesHeader";
import CategoriesGrid from "./components/CategoriesGrid";

const Categories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAction.getCategories());
  }, [dispatch]);

  return (
    <>
      <CategoriesHeader />

      <Grid container mb={1} spacing={3} sx={{ pb: 8 }}>
        <CategoriesGrid />
      </Grid>

      <ExpenseAdder />
    </>
  );
};

export default Categories;
