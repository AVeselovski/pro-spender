import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import App from "views/App";

const Dashboard = lazy(() => import("views/dashboard-page"));
const Categories = lazy(() => import("views/categories-page"));
const Expenses = lazy(() => import("views/expenses-page"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="expenses" element={<Expenses />} />
            <Route
              path="*"
              element={
                <main>
                  <p>404 | There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
