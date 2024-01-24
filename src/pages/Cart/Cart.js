import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Checkbox,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import bucket from "../../assets/images/bucket.png";

function Cart({ onClose }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalShippingPrice, setTotalShippingPrice] = useState(0);
  const [showShadow, setShowShadow] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [productOptions, setProductOptions] = useState({
    size: "",
    quantity: 0,
  });
  const [serverItems, setServerItems] = useState([]);

  useEffect(() => {
    let newTotalProductPrice = 0;
    let newTotalShippingPrice = 0;

    checkedUsers.forEach((productId) => {
      const user = users.find((user) => user.productId === productId);
      if (user) {
        newTotalProductPrice += user.price * user.quantity;
        newTotalShippingPrice += user.shopping;
      }
    });
    ggg();
    setTotalProductPrice(newTotalProductPrice);
    setTotalShippingPrice(newTotalShippingPrice);
  }, [checkedUsers, users]);

  const ggg = async () => {
    try {
      const res = await fetch(
        "  http://ec2-3-34-191-119.ap-northeast-2.compute.amazonaws.com:8080/api/cart"
      );
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const contentType = res.headers.get("Content-Type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }

      const data = await res.json();

      if (!data) {
        throw new Error("Empty response or invalid JSON format");
      }

      console.log("Data from server:", data);
      // 이후 데이터를 사용하는 로직 작성
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
  };

  const buttonStyle = {
    color: "rgb(149, 30, 30)",
    backgroundColor: "white",
    padding: "5px 13px",
    border: "1px solid rgb(149, 30, 30)",
    cursor: "pointer",
    marginTop: "10px",
  };
  const someFunction = (productId) => {
    // 페이지에 상품 목록이 없을 경우에 대한 처리
    if (!productId) {
      console.error("No shoppingId provided to Cart");
      return <p>오류: 상품 ID가 s제공되지 않았습니다.</p>;
    }
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setCheckedUsers([]);
      setSelectAll(false);
    } else {
      setCheckedUsers(users.map((user) => user.productId));
      setSelectAll(true);
    }
  };

  const paymentHandleSubmit = () => {
    navigate("/order");
  };

  const lineTotalPrice = () => {
    const productPrice = 10000;
    const quantityPrice = 10000 * quantity;
    const total = productPrice + quantityPrice;
    setTotalPrice(total);
  };
  useEffect(() => {
    lineTotalPrice();
  }, [quantity, productOptions.size, productOptions.quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleOption = () => {
    setSelectedSize(productOptions.size || "");
    setQuantity(productOptions.quantity || 1);
    setOpen(true);
  };

  const productDelete = () => {};

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    setProductOptions({
      size: selectedSize,
      quantity: quantity,
    });
    setOpen(false);
  };

  const fetchCartItems = async () => {
    const apiUrl = "/api/cart";

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch cart items. Status: ${response.status}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      throw error;
    }
  };

  // const handleQuantityChange = (e) => {
  //   const newQuantity = parseInt(e.target.value, 10);
  //   if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 10) {
  //     setQuantity(newQuantity);
  //   }
  // }

  useEffect(() => {
    lineTotalPrice();
  }, [quantity, productOptions.size, productOptions.quantity]);

  useEffect(() => {
    loadCartItems();
    const fetchData = async () => {
      try {
        const data = await fetchCartItems();
        console.log("Data from server:", data);
        setProductOptions({
          size: data.size,
          quantity: data.quantity,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const loadCartItems = () => {};
  // const loadCartItems = async () => {
  //   const cartItems = await serverData();
  //   console.log("Cart items:", cartItems);
  // };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.cartContainer}>
          <div className={styles.header}>
            <span className={styles.title}>장바구니</span>
          </div>

          <span className={styles.notice}>
            ⌈ 장바구니에 저장된 상품이 없습니다. ⌋
          </span>

          <div className={styles.productContainer}>
            <div className={styles.productItem}>
              <div className={styles.productInfo}>
                {/*{user.productInfo}*/} 상품정보
              </div>
              <div className={styles.productQuantity}>
                {/*{`수량: ${user.quantity}`}*/} 배송비
              </div>
              <div className={styles.productSubtotal}>
                {/*{`합계: ${user.subtotal}`}*/} 주문 금액
              </div>
            </div>

            <div className={styles.secondContainer}>
              <div className={styles.productItems}>
                {/*{users.map((user, index) => (*/}
                {/*    <CartInfo key={index} user={user} />*/}
                {/*))}*/}
                <div>
                  <div className={styles.image}>
                    <img
                      className={styles.bucketRng}
                      src={bucket}
                      alt="이미지"
                    />
                  </div>
                </div>
                <div className={styles.text}>
                  <div className={styles.productName}>productName</div>
                  <div className={styles.description}>description</div>
                  <div className={styles.productOption}>
                    productOption({productOptions.size}/
                    {productOptions.quantity})
                  </div>
                  <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={handleOption}
                  >
                    옵션/수량 변경
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>옵션 및 수량 변경</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        옵션과 수량을 변경하세요.
                      </DialogContentText>
                      <TextField
                        label="사이즈"
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <MenuItem value={String(selectedSize)}>XS</MenuItem>
                        <MenuItem value={String(selectedSize)}>S</MenuItem>
                        <MenuItem value={String(selectedSize)}>M</MenuItem>
                        <MenuItem value={String(selectedSize)}>L</MenuItem>
                      </TextField>
                      <TextField
                        label="수량"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>취소</Button>
                      <Button onClick={handleSave}>저장</Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className={styles.delivery}>
                  <div className={styles.deliveryState}>
                    {totalPrice >= 50000 ? "무료배송" : "배송비 3,000원"}
                  </div>
                  <div className={styles.deliveryText}>
                    (5만원 이상 무료배송)
                  </div>
                </div>
                <div className={styles.cash}>
                  <div className={styles.price}>
                    {totalPrice.toLocaleString()}원
                  </div>
                  <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={() => {
                      window.location.href = "/Order";
                    }}
                  >
                    바로구매
                  </Button>
                  <Button
                    className={styles.productDelete}
                    onClick={productDelete}
                  >
                    X
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.thirdContainer}>
            <div className={styles.Container}>
              <div>
                <div className={styles.productprice}>
                  {totalPrice.toLocaleString()}원
                </div>
                <div className={styles.deliveryText}>상품금액</div>
              </div>
              <div className={styles.plus}>+</div>
              <div>
                <div className={styles.productprice}>
                  <div className={styles.deliveryState}>
                    {totalPrice >= 50000 ? "0원" : "3,000원"}
                  </div>
                </div>
                <div className={styles.deliveryText}>배송비</div>
              </div>
              <div className={styles.sum}>=</div>
              <div>
                <div className={styles.deliveryprice} s>
                  {(
                    totalPrice + (totalPrice >= 50000 ? 0 : 3000)
                  ).toLocaleString()}
                  원
                </div>
                <div className={styles.totalDeliveryPriceText}>총 주문금액</div>
              </div>
            </div>
          </div>

          <div className={styles.productList}>
            {/* <div className={styles.product}>
              <Button
                className={styles.productDelete}
                onClick={handleDelete}
                disabled={isDeleting}
              >
              </Button>
            </div> */}

            <Button
              sx={{
                fontSize: "x-large",
                color: "white",
                padding: "13px 40px",
                marginTop: "10px",
                marginLeft: "15px",
              }}
              onClick={paymentHandleSubmit}
              variant="contained"
            >
              주문하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
