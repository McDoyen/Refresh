import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { loggedIn } from '../Utils';

function PrivateRoute({ loggedin, children }) {
    return loggedIn() || loggedin ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    loggedin: PropTypes.bool.isRequired,
    children: PropTypes.objectOf.isRequired
};
