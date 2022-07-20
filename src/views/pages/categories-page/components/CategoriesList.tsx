import { useAppSelector } from "app/store";
import { selectCategoriesWithExpenses } from "app/categories/categories.selector";
import { formatCurrency, formatPercentage } from "utils/numbers";

import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "views/components/common";

interface HeadCell {
  id: string;
  label: string;
  isNumeric: boolean;
  col: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Name",
    isNumeric: false,
    col: 2,
  },
  {
    id: "description",
    label: "Description",
    isNumeric: false,
    col: 7,
  },
  {
    id: "budget",
    label: "Budget",
    isNumeric: true,
    col: 1,
  },
  {
    id: "actual",
    label: "Actual",
    isNumeric: true,
    col: 1,
  },
  {
    id: "percentage",
    label: "Percentage",
    isNumeric: true,
    col: 1,
  },
];

const CategoriesList = () => {
  const categories = useAppSelector((state) => selectCategoriesWithExpenses(state));

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} sx={{ px: 0, py: 2 }}>
        <Table aria-label="a table of expenses" size="medium">
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  align={cell.isNumeric ? "right" : "left"}
                  colSpan={cell.col}
                  key={cell.id}
                >
                  {cell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row, i) => (
              <TableRow hover key={i}>
                <TableCell colSpan={2} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" colSpan={7} scope="row">
                  {row.description}
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={1}
                  component="th"
                  scope="row"
                  sx={{ minWidth: 100 }}
                >
                  {formatCurrency(row.budget)}
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={1}
                  component="th"
                  scope="row"
                  sx={{ minWidth: 100 }}
                >
                  {formatCurrency(row.sum)}
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={1}
                  component="th"
                  scope="row"
                  sx={{
                    color: row.percentage > 100 ? "error.main" : "primary.main",
                    fontWeight: 500,
                    minWidth: 80,
                  }}
                >
                  {formatPercentage(row.percentage)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={() => {}} size="small" sx={{ textTransform: "none" }}>
            + Add category
          </Button>
        </Box>
      </TableContainer>
    </Grid>
  );
};

export default CategoriesList;
