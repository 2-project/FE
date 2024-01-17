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
import PM from "./pages/PM/ProductManage";
import ProductRegister from "./pages/PM/ProductRegister";
import Detail from "./pages/Detail/Detail";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/product_manage" element={<PM />}></Route>
      <Route path="/product_register" element={<ProductRegister />}></Route>
      <Route path="/detail" element={<Detail />}></Route>
      {/* <Route path="/login" element={<Cart />}></Route> */}
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/order" component={Order} />
      <Route path="/cart" component={Cart} />
    </Routes>
  );
}

export default App;
