import { Navigate, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import * as ROUTES from '../constants/routes';

const requireAuth =
  (ChildComponnent, roles = []) =>
  () => {
    let isLoggedIn = useSelector((state) => get(state, 'auth.isLoggedIn'));
    console.log('auth', isLoggedIn)
    // if (!isLoggedIn) {
      // return <Navigate to={ROUTES.DASHBOARD} />;
    // }

    return <ChildComponnent />;
  };

export default requireAuth;
