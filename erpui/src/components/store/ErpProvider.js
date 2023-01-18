import React, {  useState } from "react";
import ErpContext from "./erp-context";

function ErpProvider(props) {
 
  const [deleteState, setDeleteState] = useState(false)
  const [item, setItem] = useState({})

  return (
    <ErpContext.Provider value={[{deleteState,setDeleteState,setItem,item}]}>{props.children}</ErpContext.Provider>
  );
}

export default ErpProvider;
