import { useAppSelector } from "app/store";
import { selectBudgetSummary } from "app/categories/categories.selector";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

interface TitleProps {
  children?: React.ReactNode;
}

export function Title(props: TitleProps) {
  return (
    <Typography
      color="primary"
      component="h2"
      gutterBottom
      sx={{
        alignItems: "center",
        display: "flex",
      }}
      variant="h6"
    >
      {props.children}
    </Typography>
  );
}

function MonthlyProgress({ value = 0, ...props }: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative", mr: 2, mt: 1 }}>
      <CircularProgress
        {...props}
        size={90}
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        thickness={4}
        value={100}
        variant="determinate"
      />
      <CircularProgress
        {...props}
        size={90}
        sx={{
          animationDuration: "550ms",
          color: value <= 100 ? "success.light" : "error.light",
          left: 0,
          position: "absolute",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        thickness={4}
        value={value}
        variant="determinate"
      />
      <Box
        sx={{
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <Typography
          color={value <= 100 ? "success.main" : "error.main"}
          component="span"
          sx={{ mb: "0.25rem" }}
          variant="h5"
        >
          {`${value.toFixed(0)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function BudgetTotal() {
  const budgetSummary = useAppSelector((state) => selectBudgetSummary(state));

  const totalExpenses = budgetSummary.totalExpenses.replace(".", ",");
  const totalBudget = budgetSummary.totalBudget.replace(".", ",");
  const budgetRatio = `${totalExpenses}€ / ${totalBudget}€`;

  const difference = budgetSummary.difference.replace(".", ",");
  const diffMsg = budgetSummary.isOver ? "over budget" : "under budget";
  const budgetDifference = `${difference}€ ${diffMsg}`;

  return (
    <Paper
      sx={{
        alignItems: "center",
        display: "flex",
        minHeight: 170,
        justifyContent: "center",
        mb: 2,
        px: 2,
        py: 1,
      }}
      variant="outlined"
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      >
        <MonthlyProgress value={budgetSummary.percentage} />
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
}

export default BudgetTotal;
