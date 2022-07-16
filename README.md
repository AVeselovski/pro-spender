# ProSpender App (proper name pending...)

App for tracking monthly spending. Organize your spending by categories, assign budgets to categories and see if the budgets hold. Get true monthly averages and make monthly adjustments to your budgets (or spending habits) to hit consistency.

Future features:

1. Graphs and statistics to help visualize spending patterns.
2. "Insights". Generated based on available data (e.g. "Category X overflows 2nd time this year, consider adjusting the budget or your spending"). Backend generated.
3. Recurring expenses (subscriptions).
4. Budget builder. Helps defining a budget with the help of recurring expenses and "soft" estimations.
5. Minimalistic companion mobile app to quickly add expenses.

## Tech

### Frontend

Basic fully client-side React-Redux app with MUI. Bootstrapped with CRA. Recharts will be used for drawing graphs later down the line. NextJS might be adopted later if the need / use-case arises.

Testing will be handled with `jest`and `cypress`.

### Backend

Backend will most likely be built with NestJS with SQL database structure. _More details later..._

## Developing

### To run:

```bash
# install dependencies
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

#### **Commenting**

Loose guide to help where `prettier` an `eslint` can't, not a rule.

Generally, when making comments that are temporary in nature (commented out code or "TODO", etc.) try to use inline comments:

```jsx
// TODO: Figure out "x" and "y"

// const x = a(b)

// function hi() {
//   return "Hello"
// }
```

When making comments that are "there to stay" (e.g. describing functionality, documenting, etc.) use multiline syntax:

```jsx
/* Pass location to be able to get back after login */
if (!user.id) {
  return <Navigate to="/auth" state={{ from: location }} replace />;
}

/* Other named exports */

export { funcA, constB };
```

This helps somewhat by being visually distinctive.

Use JSDoc syntax when describing exportable functions for additional convenience:

```jsx
/**
 * Uses useTimeout hook to delay an action. Use case: "Search on type" - inputs.
 */
const useDebounce = (callback = log, delay = 1000, dependencies: any[] = []) => {
  // ...
};

export default useDebounce;
```

This allows for "at a glance" descriptions when importing these functions.
