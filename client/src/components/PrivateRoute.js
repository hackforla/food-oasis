import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/user-context";
import { useLocation } from "react-router-dom";
import { useToasterContext } from "../contexts/toaster-context";

function PrivateRoute({ path, children, roles }) {
  const { user } = useUserContext();
  const { setToast } = useToasterContext();
  const location = useLocation();

  if (!user || !roles.some((role) => user[role])) {
    const rolesStr = roles
      .slice(0, roles.length - 1)
      .map((role) => role.slice(2));

    setToast({
      message: `Please login to ${rolesStr} or ${roles[roles.length - 1].slice(
        2
      )} roles to access ${location.pathname}`,
    });

    return (
      <Redirect
        to={{ pathname: "/login", state: { from: location.pathname } }}
      />
    );
  }

  return <Route path={path}>{children}</Route>;
}

export default PrivateRoute;
