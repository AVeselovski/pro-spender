import { useAppSelector } from "app/store";
import { selectExpenses } from "app/expenses/expenses.selector";

import Link from "@mui/material/Link";
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
      color="primary"
      component="h2"
      gutterBottom
      sx={{
        alignItems: "center",
        display: "flex",
        pl: 2,
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
    <TableContainer>
      <Title>Latest expenses</Title>
      <Table aria-label="A table of expenses" size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Expense</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((row, i) => (
            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.expense}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right" component="th" scope="row" sx={{ color: "red" }}>
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography align="center" sx={{ fontSize: 14, mt: 3 }}>
        <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 30 }}>
          Show more...
        </Link>
      </Typography>
    </TableContainer>
  );
}

export default ExpensesTable;
