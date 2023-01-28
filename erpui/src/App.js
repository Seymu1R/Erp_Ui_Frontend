import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Auths/Login/Login";
import PrivateRoute from "./components/Auths/PrivateRoute";
import Register from "./components/Auths/Register/Register";
import SideBar from "./components/SideBar/SideBar";
import ErpContext from "./components/store/erp-context";

function App() {
  const [{ auth }] = useContext(ErpContext);
  return (
    <>
      {auth === false && (
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      )}
      <PrivateRoute>
        <SideBar />;
      </PrivateRoute>
    </>
  );
}

export default App;
