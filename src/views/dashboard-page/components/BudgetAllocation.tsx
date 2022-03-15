import { NavLink } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectCategoriesWithExpenses } from "app/categories/categories.selector";

import { styled, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

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

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "overflow",
})(({ theme, overflow }: { theme?: Theme; overflow: boolean }) => ({
  borderRadius: 5,
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme!.palette.grey[theme!.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: overflow ? theme!.palette.error.light : theme!.palette.success.light,
    borderRadius: 5,
  },
}));

function BudgetAllocation() {
  const budgetAllocationItems = useAppSelector((state) => selectCategoriesWithExpenses(state));

  console.log(budgetAllocationItems);

  const getBarWidth = (val: number) => {
    if (val > 100) return 100;

    return val;
  };

  return (
    <Paper
      sx={{
        px: 2,
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
      variant="outlined"
    >
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
                  color: "text.primary",
                }}
                variant="subtitle2"
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  color: item.rawPercentage > 100 ? "error.main" : "text.primary",
                }}
                variant="body2"
              >
                {item.sum}€ / {item.budget}€ ({item.percentage}%)
              </Typography>
            </Box>
            <BorderLinearProgress
              overflow={item.rawPercentage > 100}
              variant="determinate"
              value={getBarWidth(item.rawPercentage || 0)}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default BudgetAllocation;
