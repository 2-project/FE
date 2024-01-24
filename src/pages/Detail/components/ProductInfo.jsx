import React from "react";
import "./index.css";

const ProductInfo = ({ data }) => {
  return (
    <div
      style={{
        width: "280px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #e1e1e1",
      }}
    >
      <div className="product-title">{data.productName}</div>
      <div className="info-layout">
        <div className="info-title">가격</div>
        <div
          className="info-content"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {data.productPrice}
          <span style={{ fontSize: "12px", fontWeight: "normal" }}>원</span>
        </div>
      </div>
      <div className="info-layout">
        <div className="info-title">배송비</div>
        <div className="info-content">
          <span className="info-shipping">무료배송</span>
        </div>
      </div>
      <div className="info-layout">
        <div className="info-title">배송정보</div>
        <div className="info-content">3일이내 발송(토,일 공휴일제외)</div>
      </div>
      <div className="info-layout">
        <div className="info-title">제조사/원산지</div>
        <div className="info-content">MUJI/MADE IN CAMBODIA</div>
      </div>
      <div className="info-layout">
        <div className="info-title">상품코드</div>
        <div className="info-content">{data.productCid}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
