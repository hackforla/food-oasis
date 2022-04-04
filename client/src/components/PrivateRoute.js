import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { useLocation } from "react-router-dom";
import { useToasterContext } from "../contexts/toasterContext";

function PrivateRoute({ path, children, roles }) {
  const { user } = useUserContext();
  const { setToast } = useToasterContext();
  const location = useLocation();

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

    setToast({
      message: message,
    });

    return (
      <Redirect
        to={{
          pathname: "/fallback",
          state: {
            from: location.pathname,
            message: message,
          },
        }}
      />
    );
  }

  return <Route path={path}>{children}</Route>;
}

export default PrivateRoute;
