import { useAppSelector } from "app/store";
import { selectTotalBudgetSummary } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import { Box, Chip, CircularProgress, Paper, Typography } from "views/components/common";

const BudgetTotal = () => {
  const budgetSummary = useAppSelector((state) => selectTotalBudgetSummary(state));

  const expenses = budgetSummary.totalExpenses;
  const budget = budgetSummary.totalBudget;
  const budgetRatio = `${formatCurrency(expenses)} / ${formatCurrency(budget)}`;

  const diffMsg = budgetSummary.isOver ? "over budget" : "under budget";
  const budgetDifference = `${formatCurrency(budgetSummary.difference)} ${diffMsg}`;

  return (
    <Paper
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: 180,
        mb: 2,
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress value={budgetSummary.percentage} />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            ml: 2,
          }}
        >
          <Typography variant="h6">{budgetRatio}</Typography>
          <Chip
            color={budgetSummary.isOver ? "error" : "success"}
            label={budgetDifference}
            size="medium"
            sx={{ fontSize: "body1.fontSize", mt: 1, width: "auto" }}
            variant="outlined"
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default BudgetTotal;
