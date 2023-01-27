import React, { useState } from "react";
import ErpContext from "./erp-context";

function ErpProvider(props) {
  const [deleteState, setDeleteState] = useState(false);  
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0);
  const [id, setId] = useState('');  

  return (
    <ErpContext.Provider
      value={[{ deleteState, setDeleteState, loading ,setLoading , total , setTotal ,id , setId}]}
    >
      {props.children}
    </ErpContext.Provider>
  );
}

export default ErpProvider;
