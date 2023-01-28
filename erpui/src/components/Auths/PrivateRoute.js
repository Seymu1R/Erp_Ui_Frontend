import React, { useContext } from "react";
import ErpContext from "../store/erp-context";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const [{ auth }] = useContext(ErpContext);
  const location = useLocation();

  if (!auth) {
    return (
      <Navigate
        to="/login"
        state={{
          return_url: location.pathname,
        }}
      />
    );
  }

  return <>{children}</>;
}

export default PrivateRoute;
