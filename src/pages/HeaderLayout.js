import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";

function HeaderLayout() {
  return (
    <>
      <Header />
      <Outlet />
      {/*<Footer/>*/}
    </>
  );
}

export default HeaderLayout;
