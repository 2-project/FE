import React, { useEffect } from "react";
import ImageViewer from "./components/ImageViewer";
import ProductInfo from "./components/ProductInfo";
import AddToCart from "./components/AddToCart";
import Description from "./components/Description";
import ScrollToTop from "../../components/ScrollToTop";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getGoodsDetails } from "../../api/detailApi";

const Detail = () => {
  const requestGoodsDetail = async () => {
    try {
      const res = await getGoodsDetails(1);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const withFetch = async () => {
    const res = await fetch(
      "http://ec2-3-34-191-119.ap-northeast-2.compute.amazonaws.com:8080/api/product/productDetail/1"
    );
    console.log("ress", res.json());
  };
  useEffect(() => {
    requestGoodsDetail();
    withFetch();
  }, []);
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
