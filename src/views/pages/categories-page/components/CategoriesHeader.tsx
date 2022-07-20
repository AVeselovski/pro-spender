import { useAppDispatch, useAppSelector } from "app/store";
import { selectTotalBudgetSummary, selectTabs } from "app/categories/categories.selector";
import { setTab } from "app/categories/categories.action";
import { formatCurrency } from "utils/numbers";

import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  IconTabNav,
  RouterTabNav,
  TabNav,
  Typography,
} from "views/components/common";
import { AddIcon, GridViewIcon, ListIcon } from "views/components/icons";

const CategoriesHeader = () => {
  const budgetSummary = useAppSelector((state) => selectTotalBudgetSummary(state));
  const tabs = useAppSelector((state) => selectTabs(state));
  const dispatch = useAppDispatch();

  const handleChangeTab = (key: string) => (event: React.SyntheticEvent, value: number) => {
    dispatch(setTab(key, value));
  };

  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: ["flex", "grid"],
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyContent: "space-between",
          mb: [3],
        }}
      >
        <Box sx={{ justifySelf: "start" }}>
          <RouterTabNav
            name="categories"
            onChange={handleChangeTab("nav")}
            tabs={[
              { label: "Overview", route: "/categories/overview" },
              { label: "Allocation", route: "/categories/allocation" },
            ]}
            value={tabs.nav}
          />
        </Box>
        <Box sx={{ alignItems: "center", justifySelf: "center", display: ["none", "flex"] }}>
          <Typography component="span" sx={{ fontWeight: "fontWeightBold" }} variant="body1">
            <Typography component="span" sx={{ fontWeight: "fontWeightRegular" }}>
              Total:
            </Typography>{" "}
            {formatCurrency(budgetSummary.totalBudget)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifySelf: "end" }}>
          <IconButton sx={{ display: ["inline-flex", "none"], p: 0.25 }}>
            <AddIcon fontSize="large" titleAccess="Add category" />
          </IconButton>
          <IconTabNav
            name="categories"
            onChange={handleChangeTab("layout")}
            sx={{ display: ["none", "none", "inline-flex"] }}
            tabs={[<GridViewIcon />, <ListIcon />]}
            value={tabs.layout}
          />
          <Button
            color="inherit"
            size="small"
            sx={{
              borderRadius: 10,
              display: ["none", "inline-block"],
              ml: 2,
              textTransform: "none",
            }}
            variant="outlined"
          >
            + Add category
          </Button>
        </Box>
      </Box>

      {/* <Box sx={{ alignItems: "center", display: ["none", "flex"], justifyContent: "end", mb: 2 }}>
        <IconTabNav
          name="categories"
          onChange={handleChangeTab("layout")}
          tabs={[<GridViewIcon />, <ListIcon />]}
          value={tabs.layout}
        />
      </Box> */}
    </>
  );
};

export default CategoriesHeader;
