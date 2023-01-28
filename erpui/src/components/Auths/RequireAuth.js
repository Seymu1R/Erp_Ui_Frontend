import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ErpContext from "../store/erp-context";

function RequireAuth({children, allowedRoles}) {
  const [{ auth }] = useContext(ErpContext);
  const location = useLocation();

  const Role = auth?.Roles?.find((role) => allowedRoles?.includes(role));

  if (!Role) {
    return (
        <Navigate
          to="/authirize"
          state={{
            return_url: location.pathname,
          }}
        />
      );
  } 
  return <>{children}</>;
}

export default RequireAuth;
