import React, { useContext } from "react";
import { BrowserRouter, Navigate, redirect, Route, Routes } from "react-router-dom";
import "./App.scss";
import ForgetPassword from "./components/Auths/ForegetPassword/ForgetPassword";
import ResetPassword from "./components/Auths/ForegetPassword/ResetPassword";
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
         <Routes  >
         <Route path='*' element={<Navigate to='/login' />} />        
         <Route path="/login" element={<Login />}></Route>
         <Route path="/register" element={<Register />}></Route>
         <Route path="/forgotpassword" element={<ForgetPassword/>}></Route>
         <Route path="/resetpassword" element={<ResetPassword />}></Route>
       </Routes>       
      )}
      {auth !== false && (
        <PrivateRoute>
          <SideBar />;
        </PrivateRoute>
      )}
    </>
  );
}

export default App;
