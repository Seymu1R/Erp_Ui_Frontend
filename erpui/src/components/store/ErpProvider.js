import React, { useState } from "react";
import ErpContext from "./erp-context";

function ErpProvider(props) {
  const [deleteState, setDeleteState] = useState(false);
  const [id, setId] = useState(null);
  const [item, setItem] = useState({});

  return (
    <ErpContext.Provider
      value={[{ deleteState, setDeleteState, setItem, item, id, setId }]}
    >
      {props.children}
    </ErpContext.Provider>
  );
}

export default ErpProvider;
