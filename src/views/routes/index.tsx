import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CircularProgress } from "../components/common";
import ProtectedRoute from "./ProtectedRoute";
import App from "../App";

const Login = lazy(() => import("../pages/login-page"));
const Signup = lazy(() => import("../pages/signup-page"));
const Dashboard = lazy(() => import("../pages/dashboard-page"));
const Categories = lazy(() => import("../pages/categories-page"));
const Expenses = lazy(() => import("../pages/expenses-page"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App isProtected />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route
              path="*"
              element={
                <main>
                  <p>404 | There's nothing here!</p>
                </main>
              }
            />
          </Route>

          <Route path="/auth" element={<App />}>
            <Route index element={<Navigate replace to="/auth/login" />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
