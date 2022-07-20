import { memo } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectCategoriesWithExpenses } from "app/categories/categories.selector";
import { ICategoryWithExpenses } from "app/categories/types";
import { formatCurrency, formatPercentage } from "utils/numbers";

import { Box, LinearProgressBar, Link, Paper, Typography } from "views/components/common";

const Header = memo(() => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
    <Typography color="text" component="h2" gutterBottom sx={{ mb: 0 }} variant="h6">
      Budget allocation
    </Typography>
    <Link
      align="right"
      color="primary"
      component={NavLink}
      sx={{ fontWeight: "fontWeightMedium" }}
      to="/categories"
    >
      Manage
    </Link>
  </Box>
));

const CategoryBudgetProgress = ({ item }: { item: ICategoryWithExpenses }) => (
  <Box sx={{ mb: 2.5 }}>
    <Box
      sx={{
        alignItems: "flex-start",
        display: "flex",
        justifyContent: "space-between",
        mb: 0.25,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          color: item.percentage > 100 ? "error.main" : "text.primary",
        }}
        variant="body2"
      >
        <Typography
          component="span"
          sx={{
            color: "text.primary",
            mr: 1,
          }}
          variant="subtitle2"
        >
          {item.name}
        </Typography>
        {formatCurrency(item.sum)} ({formatPercentage(item.percentage)})
      </Typography>
      <Typography
        sx={{
          color: item.percentage > 100 ? "error.main" : "text.primary",
        }}
        variant="body2"
      >
        {formatCurrency(item.budget - item.sum)}{" "}
        {item.percentage <= 100 && `(${formatPercentage(100 - item.percentage)})`}
      </Typography>
    </Box>

    <LinearProgressBar value={item.percentage} variant="determinate" />
  </Box>
);

const BudgetAllocation = () => {
  const budgetAllocationItems = useAppSelector((state) => selectCategoriesWithExpenses(state));

  return (
    <Paper>
      <Header />
      <Box>
        {budgetAllocationItems.map((item) => (
          <CategoryBudgetProgress item={item} key={item.id} />
        ))}
      </Box>
    </Paper>
  );
};

export default BudgetAllocation;
