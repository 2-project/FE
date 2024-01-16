import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main/Main';
import Login from './pages/Login/Login';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/login" element={<Cart />}></Route>
      <Route path="/login" component={Login} />
      <Route path="/order" component={Order} />
      <Route path="/cart" component={Cart} />
    </Routes>
  );
}

export default App;
