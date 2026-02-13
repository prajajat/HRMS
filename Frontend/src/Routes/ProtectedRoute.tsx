import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, redirectTo = "/login" }) => {
  const { userId, roles } = useSelector((state) => state.user);

  if (userId == -1) {
    return <Navigate to={redirectTo} replace />;
  }
  const isAllowed = roles?.some((role) =>
    allowedRoles.includes(role.title.toLowerCase()),
  );

  console.log(allowedRoles);
  console.log(roles);
  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
