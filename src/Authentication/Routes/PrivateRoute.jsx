import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { loggedIn } from '../Utils';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ loggedin, children }) {
    return loggedIn() || loggedin ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    loggedin: PropTypes.bool.isRequired
};
