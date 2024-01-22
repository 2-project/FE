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
import OrderHistory from "./pages/User/OrderHistory/OrderHistory";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import ProductList from "./pages/Main/ProductList/ProductList";
import Detail from "./pages/Detail/Detail";
import User from "./pages/User/User";
import UserInfo from "./pages/User/UserInfo/UserInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product_manage" element={<PM />} />
        <Route path="/product_register" element={<ProductRegister />} />
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/user" element={<User />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
