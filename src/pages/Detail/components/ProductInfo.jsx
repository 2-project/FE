import React from "react";
import "./index.css";

const ProductInfo = () => {
  return (
    <div
      style={{
        width: "280px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #e1e1e1",
      }}
    >
      <div className="product-title">
        여성 · 사이드 심리스 · 이중 가제 파자마
      </div>
      <div className="info-layout">
        <div className="info-title">가격</div>
        <div className="info-content" style={{ fontSize: "18px" }}>
          59,000원
        </div>
      </div>
      <div className="info-layout">
        <div className="info-title">배송비</div>
        <div className="info-content">무료배송</div>
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
        <div className="info-content">FD1JGA4S</div>
      </div>
    </div>
  );
};

export default ProductInfo;
