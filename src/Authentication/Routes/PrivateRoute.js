import { Navigate } from "react-router";
import { loggedIn } from "../Utils";

const PrivateRoute = ({ loggedin, children }) => {
  return loggedIn() || loggedin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
