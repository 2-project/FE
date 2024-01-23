import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import PolicyTable from "./PolicyTable";

const Description = ({ data }) => {
  return (
    <>
      <div style={{ position: "sticky", top: 0, marginTop: "40px" }}>
        <ToggleButtonGroup style={{ backgroundColor: "white" }}>
          <a href="#section01" style={{ textDecoration: "none" }}>
            <ToggleButton style={{ width: "380px" }}>상세정보</ToggleButton>
          </a>

          <a href="#section02" style={{ textDecoration: "none" }}>
            <ToggleButton style={{ width: "380px" }}>
              배송/교환/반품 정보
            </ToggleButton>
          </a>
        </ToggleButtonGroup>
      </div>
      <div
        id="section01"
        style={{
          display: "flex",
          borderBottom: "1px solid black",
          fontSize: "17px",
          fontWeight: "bold",
          padding: "60px 0 10px 0",
          marginBottom: "20px",
        }}
      >
        상품 상세 설명
      </div>
      <span>{data.productDescription}</span>
      <div
        id="section02"
        style={{
          display: "flex",
          borderBottom: "1px solid black",
          fontSize: "17px",
          fontWeight: "bold",
          padding: "60px 0 10px 0",
          marginBottom: "20px",
        }}
      >
        배송/교환/반품 정보
      </div>
      <PolicyTable></PolicyTable>
    </>
  );
};

export default Description;
