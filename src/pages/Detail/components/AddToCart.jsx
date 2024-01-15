import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

const AddToCart = () => {
  const [chosenOption, setChosenOption] = useState();
  const optionData = ["S", "M", "L"];
  const [quantity, setQuantity] = useState(1);
  const handleChangeOption = (e, newValue) => {
    setChosenOption(newValue);
  };
  return (
    <div style={{ width: "280px", margin: "20px 0 10px 0" }}>
      <p>옵션 선택</p>
      <ToggleButtonGroup
        color="primary"
        value={chosenOption}
        exclusive
        onChange={handleChangeOption}
      >
        {optionData.map((item) => {
          return (
            <ToggleButton
              value={item}
              style={{
                // padding: "3px",
                border: "3px",
                width: "36px",
                height: "36px",
              }}
            >
              {item}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <p>수량선택</p>
        <div>
          <button
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid #e7e7e7",
              padding: "0",
              backgroundColor: "white",
            }}
          >
            -
          </button>
          <input
            value={quantity}
            style={{
              textAlign: "center",
              width: "100px",
              height: "30px",
              padding: "0",
              border: "1px solid #e7e7e7",
              backgroundColor: "white",
            }}
            disabled
          ></input>
          <button
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid #e7e7e7",
              padding: "0",
              backgroundColor: "white",
            }}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" disabled style={{ width: "88px" }}>
          WISH
        </Button>
        <Button variant="contained" disabled style={{ width: "88px" }}>
          바로구매
        </Button>
        <Button variant="contained" style={{ width: "88px" }}>
          장바구니
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
