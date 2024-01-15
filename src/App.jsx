import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main/Main";
import Login from "./pages/Login/Login";
import PM from "./pages/PM/PM";
import ProductRegister from "./pages/PM/ProductRegister";

function App() {
  return (
    <Routes>
      {/* 라우팅: path를 정하고 페이지 컴포넌트를 element에 넣어주면 됨 */}
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/product_manage" element={<PM />}></Route>
      <Route path="/product_register" element={<ProductRegister />}></Route>
    </Routes>
  );
}

export default App;
