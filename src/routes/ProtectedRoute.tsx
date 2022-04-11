import { useLocation, Navigate } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectUser } from "app/user/user.selector";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAppSelector(selectUser);

  const location = useLocation();

  // Pass location to be able to get back after login
  if (!user.id) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
