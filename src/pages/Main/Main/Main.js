import React, { useRef } from "react";
import ReactDOM from "react-dom";
import ImageSlider from "./ImageSlider";
import HeaderMain from "./HeaderMain";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop";
import ProductListComponent from "./ProductListComponent";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Main() {
  const productListComponentRef = useRef();

  const handleSubSectionClick = (category) => {
    if (productListComponentRef.current) {
      productListComponentRef.current.scrollToCategory(category);
    }
  };

  return (
    <>
      <HeaderMain onSubSectionClick={handleSubSectionClick} />
      <Button style={{ float: "right" }} as={Link} to="/product_manage">
        상품 관리
      </Button>
      <ImageSlider></ImageSlider>
      <ProductListComponent ref={productListComponentRef} />
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </>
  );
}

export default Main;
