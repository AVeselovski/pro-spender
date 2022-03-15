const PERIODS_DATA = [
  {
    id: 1,
    startDate: "2022-01-01T00:00:00.000Z",
    endDate: "2022-01-31T23:59:59.999Z",
  },
  {
    id: 2,
    startDate: "2022-02-01T00:00:00.000Z",
    endDate: "2022-02-28T23:59:59.999Z",
  },
  {
    id: 3,
    startDate: "2022-03-01T00:00:00.000Z",
    endDate: "2022-03-31T23:59:59.999Z",
  },
];

export function mockResponse(data: any, params: any) {
  const { page, rows, sort, order, ...filters } = params;

  const _filtered = _uglyFilter(data, filters);
  const _sorted = _stableSort(_filtered, _getComparator(order, sort));
  const _paginated = _sorted.slice(
    (Number(page) - 1) * Number(rows),
    (Number(page) - 1) * Number(rows) + Number(rows)
  );

  const processedData = _paginated;

  return processedData;
}

function _uglyFilter(data: any, filters: any) {
  let expenses = data;

  if (filters.period) {
    const _date = new Date(filters.period);
    const _period = PERIODS_DATA.find((p) => {
      return _date >= new Date(p.startDate) && _date <= new Date(p.endDate);
    });

    if (!_period) return []; // if period non-existing, then whole result is naturally empty

    expenses = expenses.filter((ex: any) => ex.periodId === _period.id);
  }

  if (filters.category) {
    expenses = expenses.filter((ex: any) => ex.categoryId === Number(filters.category));
  }

  if (filters.q) {
    expenses = expenses.filter((ex: any) => ex.description.toLowerCase().includes(filters.q));
  }

  return expenses;
}

function _stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function _getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
