import { Navigate } from "react-router";
import { isLoggedIn } from "../Utils";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
