import { useAppSelector } from "app/store";
import { selectRawCategories } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import { Card, CardActionArea, CardContent, Grid, Typography } from "views/components/common";
import { ICategory } from "app/categories/types";
import { FC } from "react";

const CategoriesGrid = () => {
  const categories = useAppSelector(selectRawCategories);

  return (
    <>
      {categories.map((c) => (
        <Grid item key={c.id} xs={12} sm={12} md={6} lg={4}>
          <Category category={c} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <CategoryAddButton onAction={() => {}} />
      </Grid>
    </>
  );
};

export default CategoriesGrid;

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
  category: ICategory;
};

const Category: FC<CategoryProps> = ({ category }) => (
  <Card
    sx={{
      backgroundColor: COLORS[category.color],
    }}
  >
    <CardActionArea>
      <CardContent sx={{ height: 160 }}>
        <Typography gutterBottom variant="h6" component="div">
          {category.name}
        </Typography>
        <Typography color="text.secondary" variant="h4" sx={{ mt: 3, textAlign: "center" }}>
          {formatCurrency(category.budget)}
        </Typography>
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
