import React, { useContext } from "react";
import ErpContext from "../store/erp-context";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const [{ auth }] = useContext(ErpContext);
  const location = useLocation();
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  const decodedJwt = parseJwt(auth.AccesToken);
  console.log(Date.now());
  console.log(decodedJwt.exp*1000);

  if (decodedJwt.exp * 1000 < Date.now()) {
    localStorage.removeItem("auth");
    window.location.reload();
  }

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
