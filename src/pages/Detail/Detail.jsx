import React, { useEffect, useState } from "react";
import ImageViewer from "./components/ImageViewer";
import ProductInfo from "./components/ProductInfo";
import AddToCart from "./components/AddToCart";
import Description from "./components/Description";
import ScrollToTop from "../../components/ScrollToTop";
import { getGoodsDetails } from "../../api/detailApi";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const { state } = useLocation();
  const [goodsInfo, setGoodsInfo] = useState({});
  const requestGoodsDetail = async () => {
    try {
      console.log("state?.productId", state);
      const res = await getGoodsDetails(state?.productId || 1);
      console.log("res", res);
      setGoodsInfo(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestGoodsDetail();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "760px",
          margin: "50px 55px 0 25%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ImageViewer data={goodsInfo}></ImageViewer>
          <div>
            <ProductInfo data={goodsInfo}></ProductInfo>
            <AddToCart data={goodsInfo}></AddToCart>
          </div>
        </div>
        <Description data={goodsInfo}></Description>
        <ScrollToTop></ScrollToTop>
      </div>
    </div>
  );
};

export default Detail;
