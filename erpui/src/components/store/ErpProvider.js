import React, { useEffect, useState } from "react";
import ErpContext from "./erp-context";
let setValue = {};

function ErpProvider(props) {
  const [deleteState, setdeleteState] = useState(false);

const a = () => {
  return  setdeleteState(true)
 
}

  useEffect(() => {
    setValue = {
      deletestate : deleteState,
      erpdelete : a,
    };
  },);

  return (
    <ErpContext.Provider value={setValue}>{props.children}</ErpContext.Provider>
  );
}

export default ErpProvider;
