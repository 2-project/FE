import React, { useEffect, useState } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { addGoodsToCart } from "../../../api/detailApi";

const AddToCart = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [chosenOption, setChosenOption] = useState(null);
  const optionData = data.options || [];
  const [quantity, setQuantity] = useState(1);
  const [params, setParams] = useState({
    optionid: null,
    quantity: null,
  });
  const handleChangeOption = (e, newValue) => {
    setChosenOption(newValue);
    setParams((prev) => {
      return { ...prev, optionid: newValue?.optionCid || null };
    });
    console.log("changed", newValue);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else setOpen(true);
  };
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleAddToCart = async () => {
    if (chosenOption === null) {
      setOpenOption(true);
    } else {
      //TODO: add to cart
      const res = await addGoodsToCart(data.productCid, params);
      console.log("res", res);
      if (res.status === 200) {
      }
    }
  };

  useEffect(() => {
    setParams((prev) => {
      return { ...prev, quantity };
    });
  }, [quantity]);
  return (
    <div
      style={{
        width: "280px",
        margin: "20px 0 10px 0",
      }}
    >
      <p>옵션 선택</p>
      <ToggleButtonGroup
        color="primary"
        value={chosenOption}
        exclusive
        onChange={handleChangeOption}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {optionData.map((item, index) => {
          return (
            <ToggleButton
              key={index}
              value={item}
              style={{
                border: "3px",
                minWidth: "36px",
                height: "36px",
              }}
            >
              {item.optionName}
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
            onClick={handleDecrease}
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
            onClick={handleIncrease}
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
        <Tooltip title="Coming Soon" placement="top" arrow>
          <div>
            <Button variant="outlined" disabled style={{ width: "88px" }}>
              WISH
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="Coming Soon" placement="top" arrow>
          <div>
            <Button variant="contained" disabled style={{ width: "88px" }}>
              바로구매
            </Button>
          </div>
        </Tooltip>

        <Button
          variant="contained"
          style={{ width: "88px" }}
          onClick={handleAddToCart}
        >
          장바구니
        </Button>
      </div>

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        message="최소 구매 수량은 1개 입니다."
      />
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openOption}
        onClose={() => setOpenOption(false)}
        message="옵션을 선택해주세요."
      />
    </div>
  );
};

export default AddToCart;
