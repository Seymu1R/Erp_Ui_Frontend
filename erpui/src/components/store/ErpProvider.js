import React, { useEffect, useState } from "react";
import ErpContext from "./erp-context";

function ErpProvider(props) {
  const [deleteState, setDeleteState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState("");
  const [auth, setAuth] = useState( JSON.parse(localStorage.getItem("auth")) || false);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <ErpContext.Provider
      value={[
        {
          deleteState,
          setDeleteState,
          loading,
          setLoading,
          total,
          setTotal,
          id,
          setId,
          auth,
          setAuth,
        },
      ]}
    >
      {props.children}
    </ErpContext.Provider>
  );
}

export default ErpProvider;
