import { Redirect, Route } from "react-router";
import { isLoggedIn } from "../Utils";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn() ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

export default PrivateRoute;
