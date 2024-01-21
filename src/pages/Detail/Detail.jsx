import React from "react";
import ImageViewer from "./components/ImageViewer";
import ProductInfo from "./components/ProductInfo";
import AddToCart from "./components/AddToCart";
import Description from "./components/Description";
import ScrollToTop from "../../assets/ScrollToTop";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Detail = () => {
  return (
    <div>
      <Header></Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "760px",
          margin: "50px 55px 0 25%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ImageViewer></ImageViewer>
          <div>
            <ProductInfo></ProductInfo>
            <AddToCart></AddToCart>
          </div>
        </div>
        <Description></Description>
        <ScrollToTop></ScrollToTop>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
