import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthState";

interface Props extends RouteProps  {

}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const authContext = useContext(AuthContext);
  const { loading, isAuthenticated } = authContext;

  if(!isAuthenticated && !loading) {
    return <Redirect
    to={{
      pathname: "/login",
      state: { from: props.location.pathname },
    }}
  />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
          <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
