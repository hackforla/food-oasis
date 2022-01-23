import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "./contexts/user-context";
import { useLocation } from "react-router-dom";

function PrivateRoute({ path, children, roles }) {
  const { user } = useUserContext();
  let location = useLocation();

  if (!user || !roles.some((role) => user[role])) {
    return (
      <Redirect
        to={{ pathname: "/login", state: { from: location.pathname } }}
      />
    );
  }

  return <Route path={path}>{children}</Route>;
}

export default PrivateRoute;
