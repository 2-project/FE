import React from "react";
import "./Detail.module.css";
import ImageViewer from "./components/ImageViewer";
import ProductInfo from "./components/ProductInfo";
import AddToCart from "./components/AddToCart";
import Description from "./components/Description";
import ScrollToTop from "../../components/ScrollToTop";

const Detail = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "760px",
        margin: "0 55px 0 55px",
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
  );
};

export default Detail;
