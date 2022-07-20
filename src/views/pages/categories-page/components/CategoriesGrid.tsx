import { useAppSelector } from "app/store";
import { selectCategoriesWithExpenses } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "views/components/common";
import { ICategoryWithExpenses } from "app/categories/types";
import { FC } from "react";

// TEMP > from backend
const COLORS: { [key: number]: string } = {
  1: "#F2F2F4",
  2: "#E8F4FD",
  3: "#F5E9F7",
  4: "#EBEDF8",
  5: "#FFF4E7",
  6: "#FFE6EC",
};

type CategoryProps = {
  category: ICategoryWithExpenses;
};

const Category: FC<CategoryProps> = ({ category }) => (
  <Card
    sx={{
      backgroundColor: COLORS[category.color],
    }}
  >
    <CardActionArea>
      <CardContent sx={{ height: 158 }}>
        <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h6" component="div">
            {category.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {formatCurrency(category.budget)}
          </Typography>
        </Box>
        <Box sx={{ justifyContent: "flex-start", display: "flex", mx: 1, mt: 1 }}>
          <CircularProgress size="small" value={category.percentage} />
          <Typography color="text.secondary" variant="body1" sx={{ mt: 1, textAlign: "left" }}>
            {category.description}
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

type CategoryAddButtonProps = {
  onAction: () => void;
};

const CategoryAddButton: FC<CategoryAddButtonProps> = ({ onAction }) => {
  const handleAction = onAction;

  return (
    <Card sx={{ backgroundColor: "#fff" }} variant="outlined">
      <CardActionArea>
        <CardContent
          sx={{ alignItems: "center", display: "flex", height: 160, justifyContent: "center" }}
        >
          <Typography
            color="text.secondary"
            onClick={handleAction}
            sx={{ textAlign: "center" }}
            variant="h5"
          >
            + Add category
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CategoriesGrid = () => {
  const categories = useAppSelector((state) => selectCategoriesWithExpenses(state));

  return (
    <>
      {categories.map((c) => (
        <Grid item key={c.id} xs={12} sm={12} md={6} lg={4}>
          <Category category={c} />
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <CategoryAddButton onAction={() => {}} />
      </Grid>
    </>
  );
};

export default CategoriesGrid;
