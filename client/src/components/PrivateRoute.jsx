import { useUserContext } from "../contexts/userContext";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({ children, roles, redirectTo = "/admin/login" }) {
  const { user } = useUserContext();
  const location = useLocation();

  // If userContext is not yet initialized, return null
  if (user === undefined) {
    return null;
  }

  if (!user || !roles.some((role) => user[role])) {
    let rolesStr = "";
    if (roles.length > 1) {
      rolesStr =
        " " +
        roles
          .slice(0, roles.length - 1)
          .map((role) => role.slice(2))
          .join(", ") +
        " or ";
    }
    const message = `Only users with the role(s)${rolesStr} ${roles[
      roles.length - 1
    ].slice(2)} can access this page "${location.pathname}". Please
    log into an account with either of these roles to access this page.`;

    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname, message: message }}
      />
    );
  }

  return children;
}

export default PrivateRoute;
