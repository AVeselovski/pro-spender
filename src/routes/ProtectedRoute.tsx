import { useLocation, Navigate } from "react-router-dom";

import { useAppSelector } from "app/store";
import { selectUser } from "app/user/user.selector";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAppSelector(selectUser);

  const location = useLocation();

  console.log(user);

  // Pass location to be able to get back after login
  if (!user.id) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
