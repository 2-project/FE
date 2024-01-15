import React from "react";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import PolicyTable from "./PolicyTable";

const Description = () => {
  return (
    <>
      <div style={{ position: "sticky", top: 0 }}>
        <ToggleButtonGroup style={{ backgroundColor: "white" }}>
          <ToggleButton style={{ width: "380px" }}>상세정보</ToggleButton>
          <ToggleButton style={{ width: "380px" }}>
            배송/교환/반품 정보
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div
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
      <div
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
