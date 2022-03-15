import { useState } from "react";
import { useAppSelector } from "app/store";
import { selectCategoryNames } from "app/categories/categories.selector";
import { selectExpenses } from "app/expenses/expenses.selector";

import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/SearchRounded";

import { Order, Sortable } from "app/expenses/types";

// temp
const MONTHS = [
  { label: "3/2022", value: "2022-03-01" },
  { label: "2/2022", value: "2022-02-01" },
  { label: "1/2022", value: "2022-01-01" },
];

interface HeadCell {
  id: Sortable;
  label: string;
  isNumeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "date",
    label: "Date",
    isNumeric: false,
  },
  {
    id: "category",
    label: "Category",
    isNumeric: false,
  },
  {
    id: "expense",
    label: "Expense",
    isNumeric: false,
  },
  {
    id: "amount",
    label: "Amount",
    isNumeric: true,
  },
];

function ExpensesTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<Sortable>("date");
  const [order, setOrder] = useState<Order>("desc");
  const [month, setMonth] = useState(MONTHS[0].value);
  const [selectedCategory, setCategory] = useState("all");

  const categories = useAppSelector((state) => selectCategoryNames(state));
  const expenses = useAppSelector((state) => selectExpenses(state));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    // call API
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    // call API
  };

  const handleRequestSort = (property: Sortable) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    // call API
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;

  return (
    <Paper
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
          alignItems: "flex-end",
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          px: 2,
        }}
      >
        <Box>
          <FormControl sx={{ mr: 2, width: 150 }}>
            <FormLabel htmlFor="month-select">Month</FormLabel>
            <Select
              id="month-select"
              onChange={(e) => setMonth(e.target.value)}
              size="small"
              value={month}
            >
              {MONTHS.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 250 }}>
            <FormLabel htmlFor="month-select">Category</FormLabel>
            <Select
              id="month-select"
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              value={selectedCategory}
            >
              <MenuItem value="all">All</MenuItem>
              {Object.keys(categories).map((key) => (
                <MenuItem key={key} value={key}>
                  {categories[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="expense-search"
          InputProps={{
            startAdornment: (
              <InputAdornment disablePointerEvents position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search expense..."
          size="small"
          sx={{ width: 310 }}
          type="search"
        />
      </Box>
      <TableContainer>
        <Table aria-label="A table of expenses" size="medium" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  align={cell.isNumeric ? "right" : "left"}
                  key={cell.id}
                  sortDirection={orderBy === cell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === cell.id}
                    direction={orderBy === cell.id ? order : "asc"}
                    onClick={() => handleRequestSort(cell.id)}
                  >
                    {cell.label}
                    {orderBy === cell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row" width={170}>
                  {row.date}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell component="th" scope="row" width={200}>
                  {row.expense}
                </TableCell>
                <TableCell
                  align="right"
                  component="th"
                  scope="row"
                  sx={{ color: "red" }}
                  width={140}
                >
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}

            {/* Avoid a layout jump when reaching the last page with empty rows. */}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={expenses.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignSelf: "center", mt: 1 }}
      />
    </Paper>
  );
}

export default ExpensesTable;
