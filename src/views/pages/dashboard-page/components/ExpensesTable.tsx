import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectExpenses } from "app/expenses/expenses.selector";
import { formatStringDate } from "utils/dates";
import { formatCurrency } from "utils/numbers";

import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "views/components/common";
import ExpenseModal from "views/components/expense-adder/ExpenseModal";

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
  const [isOpen, setIsOpen] = useState(false);
  const expenses = useAppSelector((state) => selectExpenses(state, 5));

  return (
    <>
      <TableContainer component={Paper} sx={{ px: 0 }}>
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
          <Button onClick={() => setIsOpen(true)} size="small">
            + Add
          </Button>
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

      <ExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default ExpensesTable;
