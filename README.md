# Spendly App

App for tracking monthly spending. Organize your spending by categories, assign budgets to categories and see if the budgets hold. Get true monthly averages and make monthly adjustments to your budgets (or spending habits) to hit consistency.

Future features:

1. Graphs and statistics to help visualize spending patterns.
2. "Insights". Generated based on available data (e.g. "Category X overflows 2nd time this year, consider adjusting the budget or your spending").
3. Recurring expenses (subscriptions).
4. Budget buidler. Helps defining a budget with the help of recurring expenses and "soft" estimations.

## Tech

### Frontend

Basic fully client-side React-Redux app with MUI. Bootstrapped with CRA. Recharts will be used for drawing graphs later down the line. NextJS might be adopted later if the need for serverside rendering occurs.

Testing will be handled with `jest`and `cypress`.

### Backend

Backend will most likely be built with NestJS with SQL database structure. _More details later..._

## Developing

### To run:

```bash
yarn
```

```bash
yarn start
```

### Code guide

#### **Actions**

Async operations dispatch 2 actions, start and finish. Async action types consist of 2-3 parts `ASYNC_[action description](_FINISHED)`:

- Flagging as async operation (`ASYNC_`)
- Action description (`ADD_EXPENSE`, `GET_CATEGORIES`, etc.)
- When dispatching the second action (`_FINISHED`)

Example: `ASYNC_ADD_EXPENSE`, `ASYNC_ADD_EXPENSE_FINISHED`

Async processing state can then be tracked via selector:

```jsx
import { ASYNC_ADD_EXPENSE } from "app/expenses/expenses.action";

// ...
const loading = useAppSelector((state) => selectLoadingStates(state, [ASYNC_ADD_EXPENSE]));
```

1. Use vanilla function declarations for components and basic functions. Use arrow functions for component methods.
2. Prepend `_` to function/method names and variables in following cases:
   - Helper function that is not exported (used locally by exportable function)
   - Makes sense to be named similarly, but clashes with argument / prop name (`abc` and `_abc`, rather than `abc` and `anotherAbc`)
     - Example: In-component `_handleSubmit` to handle some operations before calling `handleSubmit` prop
