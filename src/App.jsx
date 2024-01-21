import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate,
  Outlet,
  BrowserRouter,
} from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main/Main';
import Login from './pages/Login/Login';
import PM from './pages/PM/ProductManage';
import ProductRegister from './pages/PM/ProductRegister';
import Detail from './pages/Detail/Detail';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product_manage" element={<PM />} />
      <Route path="/product_register" element={<ProductRegister />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
