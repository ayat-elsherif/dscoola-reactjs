import React from 'react';
import { Navigate } from 'react-router-dom';
const userAuth = () => {
  return localStorage.getItem('access_token');
};
export const RequiredAuth = ({ children, role }) => {
  const auth = userAuth();
  //const loginRole = useSelector((state) => state.user.currentUser);
  const loginRole = localStorage.getItem('role');
  if (!auth) {
    return <Navigate to="/sign-in" />;
  }
  if (auth && loginRole !== role) {
    setTimeout(() => {
      return <Navigate to="*" />;
    }, 200);
  }
  return children;
};
