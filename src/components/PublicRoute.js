import { Navigate } from 'react-router-dom';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/contacts" replace={true} />;
  }

  return children;
};

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node,
};
