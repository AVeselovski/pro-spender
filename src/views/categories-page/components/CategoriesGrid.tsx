import { useAppSelector } from "app/store";
import { selectRawCategories } from "app/categories/categories.selector";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const COLORS: { [key: number]: string } = {
  1: "#F2F2F4",
  2: "#E8F4FD",
  3: "#F5E9F7",
  4: "#EBEDF8",
  5: "#FFF4E7",
  6: "#FFE6EC",
};

function CategoriesGrid() {
  const categories = useAppSelector(selectRawCategories);

  return (
    <>
      {categories.map((c) => (
        <Grid item key={c.id} xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              backgroundColor: COLORS[c.color],
            }}
            variant="outlined"
          >
            <CardActionArea>
              <CardContent sx={{ height: 160 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {c.name}
                </Typography>
                <Typography color="text.secondary" variant="h4" sx={{ mt: 3, textAlign: "center" }}>
                  {c.budget.toFixed(2).replace(".", ",")}€
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Card
          sx={{
            backgroundColor: "#fff",
          }}
          variant="outlined"
        >
          <CardActionArea>
            <CardContent
              sx={{ alignItems: "center", display: "flex", height: 160, justifyContent: "center" }}
            >
              <Typography color="text.secondary" variant="h5" sx={{ textAlign: "center" }}>
                + Add category
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default CategoriesGrid;
