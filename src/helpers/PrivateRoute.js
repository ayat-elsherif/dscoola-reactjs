import React from "react";
import { Route, Navigate } from "react-router-dom";
 


const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("access_token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token || token === "undefined") {
          return <Navigate to={{ pathname: "/sign-in" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
