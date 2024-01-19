import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/MainPage/Main";
import ProductList from "./pages/Main/ProductList/ProductList";
import Order from "./pages/Order/Order";
import PM from "./pages/PM/PM";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import HeaderLayout from "./pages/HeaderLayout";
import UserInfo from "./pages/User/UserInfo/UserInfo";
import PurchaseHistory from "./pages/User/PurchaseHistory/PurchaseHistory";
import PM from "./pages/PM/ProductManage";
import ProductRegister from "./pages/PM/ProductRegister";
import Detail from "./pages/Detail/Detail";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/main" replace />} />
    <Route path="/login" element={<Login />} />
        <Route element={<HeaderLayout />}/>
        <Route path="/main" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pm" element={<PM />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/purchasehistory" element={<PurchaseHistory />} />
        <Route path="/product_manage" element={<PM />}></Route>
        <Route path="/product_register" element={<ProductRegister />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        {/* <Route path="/login" element={<Cart />}></Route> */}
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/order" component={Order} />
        <Route path="/cart" component={Cart} />
    </Routes>
  )
};

export default App;
