import { NavLink } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectCategoriesWithExpenses } from "app/categories/categories.selector";
import { formatCurrency, formatPercentage } from "utils/numbers";

import { Box, LinearProgressBar, Link, Paper, Typography } from "views/components/common";

interface TitleProps {
  children?: React.ReactNode;
}

export function Title(props: TitleProps) {
  return (
    <Typography
      color="text"
      component="h2"
      gutterBottom
      sx={{
        alignItems: "center",
        display: "flex",
        mb: 0,
      }}
      variant="h6"
    >
      {props.children}
    </Typography>
  );
}

function BudgetAllocation() {
  const budgetAllocationItems = useAppSelector((state) => selectCategoriesWithExpenses(state));

  const getBarWidth = (val: number) => {
    if (val > 100) return 100;

    return val;
  };

  return (
    <Paper>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Title>Budget allocation</Title>
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
      <Box>
        {budgetAllocationItems.map((item) => (
          <Box key={item.id} sx={{ mb: 2.5 }}>
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
            <LinearProgressBar
              overflow={item.percentage > 100}
              variant="determinate"
              value={getBarWidth(item.percentage || 0)}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default BudgetAllocation;
