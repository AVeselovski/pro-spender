import { useEffect, useRef, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectCategoryNames } from "app/categories/categories.selector";
import { selectExpenses, selectExpensesPagination } from "app/expenses/expenses.selector";
import { formatStringDate } from "utils/dates";
import { formatCurrency } from "utils/numbers";

import useDebounce from "views/hooks/useDebounce";
import {
  Box,
  FormControl,
  FormLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "views/components/common";
import { visuallyHidden } from "@mui/utils";

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
  const [rows, setRows] = useState(10);
  const [sort, setSort] = useState<Sortable>("date");
  const [order, setOrder] = useState<Order>("desc");
  const [period, setPeriod] = useState(MONTHS[0].value);
  const [selectedCategory, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [queryInput, setQueryInput] = useState("");

  const categories = useAppSelector((state) => selectCategoryNames(state));
  const expenses = useAppSelector((state) => selectExpenses(state, 0));
  const pagination = useAppSelector((state) => selectExpensesPagination(state));

  const queryRef = useRef<HTMLInputElement>();
  let [, setSearchParams] = useSearchParams();

  const handlePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: Sortable) => {
    const isAsc = sort === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setSort(property);
  };

  const handlePeriod = (val: string) => {
    setPage(0);
    setPeriod(val);
  };

  const handleCategory = (val: string) => {
    setPage(0);
    setCategory(val);
  };

  const handleSearch = () => {
    setPage(0);
    setQuery(queryInput);
  };

  // Allow for instant "enter" key search.
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  // Delay setting url params (and calling API) to minimize unnecessary calls.
  useDebounce(handleSearch, 500, [queryInput]);

  // Actively track filters state changes and apply url params.
  useEffect(() => {
    setSearchParams(
      createSearchParams({
        page: (page + 1).toString(),
        rows: rows.toString(),
        sort,
        order,
        period,
        category: selectedCategory,
        q: query,
      })
    );
  }, [setSearchParams, page, rows, sort, order, period, selectedCategory, query]);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page === pagination.pages - 1 ? Math.max(0, (1 + page) * rows - pagination.rows) : 0;

  return (
    <Paper sx={{ px: 0 }}>
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
              displayEmpty
              id="month-select"
              onChange={(e) => handlePeriod(e.target.value)}
              size="small"
              value={period}
            >
              <MenuItem value="">All</MenuItem>
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
              displayEmpty
              id="month-select"
              onChange={(e) => handleCategory(e.target.value)}
              size="small"
              value={selectedCategory}
            >
              <MenuItem value="">All</MenuItem>
              {Object.keys(categories).map((key) => (
                <MenuItem key={key} value={key}>
                  {categories[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <form onSubmit={handleSubmitSearch}>
          <TextField
            id="expense-search"
            InputProps={{
              startAdornment: (
                <InputAdornment disablePointerEvents position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Search expense..."
            inputRef={queryRef}
            size="small"
            sx={{ width: 310 }}
            type="search"
            value={queryInput}
          />
        </form>
      </Box>
      <TableContainer>
        <Table aria-label="a table of expenses" size="medium" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  align={cell.isNumeric ? "right" : "left"}
                  key={cell.id}
                  sortDirection={sort === cell.id ? order : false}
                >
                  <TableSortLabel
                    active={sort === cell.id}
                    direction={sort === cell.id ? order : "asc"}
                    onClick={() => handleSort(cell.id)}
                  >
                    {cell.label}
                    {sort === cell.id ? (
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
              <TableRow hover key={i}>
                <TableCell component="th" scope="row" width={170}>
                  {formatStringDate(row.date)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell component="th" scope="row" width={200}>
                  {row.description}
                </TableCell>
                <TableCell
                  align="right"
                  component="th"
                  scope="row"
                  sx={{ color: "red" }}
                  width={140}
                >
                  {formatCurrency(row.amount)}
                </TableCell>
              </TableRow>
            ))}

            {/* Avoid a layout jump when reaching the last page with empty rows. */}
            {/* 
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )} 
            */}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.rows || 0}
        rowsPerPage={rows}
        page={page}
        onPageChange={handlePage}
        onRowsPerPageChange={handleRowsPerPage}
        sx={{ alignSelf: "center", mt: 1 }}
      />
    </Paper>
  );
}

export default ExpensesTable;
