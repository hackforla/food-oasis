import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "./contexts/user-context";

function PrivateRoute({ path, children, roles }) {
  const { user } = useUserContext();

  if (!user || !roles.some((role) => user[role])) {
    return <Redirect to="/login" />;
  }

  return <Route path={path}>{children}</Route>;
}

export default PrivateRoute;
