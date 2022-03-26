import { NavLink } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectExpenses } from "app/expenses/expenses.selector";
import { formatStringDate } from "utils/dates";
import { formatCurrency } from "utils/numbers";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

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

function ExpensesTable() {
  const expenses = useAppSelector((state) => selectExpenses(state, 5));

  return (
    <TableContainer
      component={Paper}
      sx={{
        px: 0,
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
      variant="outlined"
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          px: 2,
        }}
      >
        <Title>Latest expenses</Title>
        <Button size="small">+ Add</Button>
      </Box>
      <Table aria-label="A table of expenses" size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Expense</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!expenses.length && (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", fontWeight: "fontWeightMedium" }}
                >
                  Looks empty!
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {expenses.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {formatStringDate(row.date)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right" component="th" scope="row" sx={{ color: "error.main" }}>
                {formatCurrency(row.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        align="right"
        color="primary"
        component={NavLink}
        sx={{ display: "block", fontWeight: "fontWeightMedium", mr: 2, mt: 2 }}
        to="/expenses"
      >
        Show more...
      </Link>
    </TableContainer>
  );
}

export default ExpensesTable;
