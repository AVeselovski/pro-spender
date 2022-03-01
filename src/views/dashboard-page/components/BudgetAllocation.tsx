import { useState } from "react";

import { useAppSelector } from "app/store";
import {
  selectCategoriesWithExpenses,
  selectRawCategories,
} from "app/categories/categories.selector";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";

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

function BudgetAllocation() {
  const budgetAllocationItems = useAppSelector((state) => selectCategoriesWithExpenses(state));

  const getBarWidth = (val: number) => {
    if (val > 100) return 100;

    return val;
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Title>Budget allocation</Title>
      </Box>
      <Box sx={{ mt: 1 }}>
        {budgetAllocationItems.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: "fontSize",
                  fontWeight: "fontWeightMedium",
                }}
              >
                {item.name}
              </Typography>
              <Typography sx={{ color: item.rawPercentage > 100 ? "error.main" : "text.primary" }}>
                {item.sum}€ / {item.budget}€ ({item.percentage}%)
              </Typography>
            </Box>
            <Box
              sx={{
                height: "10px",
                border: "1px solid",
                borderColor: item.rawPercentage > 100 ? "error.light" : "success.light",
                borderRadius: "999px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  height: "8px",
                  backgroundColor: item.rawPercentage > 100 ? "error.light" : "success.light",
                  borderRadius: "999px",
                  width: `${getBarWidth(item.rawPercentage)}%`,
                }}
              ></Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default BudgetAllocation;
