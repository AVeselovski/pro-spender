import { useState } from "react";

import { useAppSelector } from "app/store";
import { selectTotalBudgetSummary } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import { Box, Button, IconButton, TabNav, Typography } from "views/components/common";
import { GridViewIcon, ListIcon } from "views/components/icons";

const CategoriesHeader = () => {
  const [value, setValue] = useState(0);

  const budgetSummary = useAppSelector((state) => selectTotalBudgetSummary(state));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{ alignItems: "center", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", mb: 1.5 }}
      >
        <Box sx={{ justifySelf: "start" }}>
          <TabNav
            name="categories"
            onChange={handleChange}
            tabs={["Overview", "Allocation"]}
            value={value}
          />
        </Box>
        <Box sx={{ alignItems: "center", justifySelf: "center", display: "flex" }}>
          <Typography component="span" sx={{ fontWeight: "fontWeightBold" }} variant="body1">
            <Typography component="span" sx={{ fontWeight: "fontWeightRegular" }}>
              Total:
            </Typography>{" "}
            {formatCurrency(budgetSummary.totalBudget)}
          </Typography>
        </Box>
        <Box sx={{ justifySelf: "end" }}>
          <Button
            color="inherit"
            size="small"
            sx={{ borderRadius: 10, textTransform: "none" }}
            variant="outlined"
          >
            + Add category
          </Button>
        </Box>
      </Box>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "flex-start", mb: 1.5 }}>
        <IconButton sx={{ borderRadius: "4px", p: 0.5 }}>
          <GridViewIcon />
        </IconButton>
        <IconButton sx={{ borderRadius: "4px", p: 0.5 }}>
          <ListIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default CategoriesHeader;
