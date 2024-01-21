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
import OrderHistory from "./pages/User/OrderHistory/OrderHistory";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import ProductList from "./pages/Main/ProductList/ProductList";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import HeaderLayout from "./pages/HeaderLayout";
import UserInfo from "./pages/User/UserInfo/UserInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route element={<HeaderLayout />}>
        <Route path="/main" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pm" element={<PM />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
