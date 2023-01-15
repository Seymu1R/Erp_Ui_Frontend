import React, {  useState } from "react";
import ErpContext from "./erp-context";

function ErpProvider(props) {
 
  const [deleteState, setDeleteState] = useState(false)

  return (
    <ErpContext.Provider value={[{deleteState,setDeleteState}]}>{props.children}</ErpContext.Provider>
  );
}

export default ErpProvider;
