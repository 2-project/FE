import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  Modal,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import styles from "./Order.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactComponent as CardSvg } from "../../assets/icons/card.svg";
import { ReactComponent as PhoneSvg } from "../../assets/icons/phone.svg";
import { ReactComponent as MoneySvg } from "../../assets/icons/money.svg";
import { ReactComponent as PaySvg } from "../../assets/icons/pay.svg";
function Order({ onClose }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalShippingPrice, setTotalShippingPrice] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  useEffect(() => {
    let newTotalProductPrice = 0;
    let newTotalShippingPrice = 0;

    checkedUsers.forEach((shoppingId) => {
      const user = users.find((user) => user.shoppingId === shoppingId);
      if (user) {
        newTotalProductPrice += user.price * user.quantity;
        newTotalShippingPrice += user.shopping;
      }
    });

    setTotalProductPrice(newTotalProductPrice);
    setTotalShippingPrice(newTotalShippingPrice);
  }, [checkedUsers, users]);

  const handleSelectAllClick = () => {
    if (selectAll) {
      setCheckedUsers([]);
      setSelectAll(false);
    } else {
      setCheckedUsers(users.map((user) => user.shoppingId));
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (shoppingId) => {
    const currentIndex = checkedUsers.indexOf(shoppingId);
    const newCheckedUsers = [...checkedUsers];

    if (currentIndex === -1) {
      newCheckedUsers.push(shoppingId);
    } else {
      newCheckedUsers.splice(currentIndex, 1);
    }

    setCheckedUsers(newCheckedUsers);
  };
  const userName = "하름";
  const recipientName = userName;
  const phoneNum = "123-456-7890";
  const message = "안전배송~ 빠른배송~~";
  const userPhone = "123-456-7890";
  const userAddress = "서울시";

  const newAddressHandleSubmit = () => {
    // 새로운 주소 입력 모달을 열기
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const submitNewAddress = () => {
    // 여기에 새로운 주소를 처리하는 로직

    closeModal();
  };

  const paymentHandleSubmit = async () => {
    try {
      // 서버로 전송할 데이터 준비
      const orderData = {
        recipientName,
        phoneNum,
        address,
        message,
        isDefaultAddress,
        selectedProducts: users.map((user) => ({
          productInfo: user.productName,
          price: user.price,
          quantity: user.quantity,
          subtotal: user.subtotal,
        })),
      };
      // 서버에 주문 데이터 전송
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      // 응답 확인
      if (response.ok) {
        window.alert("주문이 완료되었습니다.");
        navigate("/User");
      } else {
        window.alert("주문에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during order submission:", error);
      window.alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  const textFieldStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
    color: "black",
  };
  const textFieldStyleInput = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    margin: "8px auto",
  };

  const svgComponents = [CardSvg, PhoneSvg, MoneySvg, PaySvg];
  const textContents = ["신용카드", "휴대폰결제", "계좌이체", "전용계좌"];

  return (
    <>
      <Container maxWidth={false}>
        <Box className={styles.cartContainer}>
          <Box className={styles.header}></Box>

          <Box className={styles.productContainer}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table aria-label="simple table">
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.shoppingId}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={() => handleCheckboxChange(user.shoppingId)}
                          checked={checkedUsers.includes(user.shoppingId)}
                        />
                      </TableCell>
                      <TableCell>{user.productInfo}</TableCell>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.quantity}</TableCell>
                      <TableCell>{user.subtotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            className={styles.productList}
            style={{
              textAlign: "center",
            }}
          >
            <Box className={styles.product}>
              {/* <Typography className={styles.productName}>
                선택한 상품
              </Typography> */}
            </Box>

            <Box
              style={{
                borderTop: "2px solid black ",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 340px 0 340px",
              }}
            >
              <InputLabel
                htmlFor="orderTitle"
                style={{
                  fontSize: "2.1rem",
                  color: "black",
                  marginTop: "10px",
                  paddingTop: "20px",
                  textAlign: "center",
                }}
              >
                배송지 정보
              </InputLabel>
              <Button
                style={{
                  marginTop: "40px",
                  padding: "8px 17px 8px 17px",
                  fontSize: "medium",
                }}
                className={styles.newAddressBtn}
                onClick={newAddressHandleSubmit}
                variant="contained"
              >
                + 새로운 배송지
              </Button>
            </Box>

            <Modal open={isModalOpen} onClose={closeModal}>
              <Box
                style={{
                  position: "absolute",
                  width: 500,
                  backgroundColor: "white",
                  padding: 25,
                  top: `50%`,
                  left: `50%`,
                  transform: `translate(-50%, -50%)`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography>새로운 주소를 입력하세요.</Typography>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <TextField
                    label="새로운 주소"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    style={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    disabled={false}
                    sx={{ padding: "15px 5px 15px 5px", margin: "8px 0 0 5px" }}
                  >
                    우편번호
                  </Button>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button variant="outlined" onClick={submitNewAddress}>
                    확인
                  </Button>
                  <Button onClick={closeModal}>닫기</Button>
                </Box>
              </Box>
            </Modal>
            <Box
              className={styles.userInfoForm}
              style={{ textAlign: "center", marginTop: "30px" }}
            >
              <InputLabel htmlFor="userName" style={textFieldStyle}>
                이 름*
              </InputLabel>
              <TextField
                label="이  름"
                variant="outlined"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                style={textFieldStyleInput}
              />
              <InputLabel htmlFor="phone-number" style={textFieldStyle}>
                휴 대 폰*
              </InputLabel>
              <TextField
                label="휴대폰 번호"
                variant="outlined"
                value={userPhone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                margin="normal"
                style={textFieldStyleInput}
              />
              <InputLabel htmlFor="userAddress" style={textFieldStyle}>
                배송주소*
              </InputLabel>
              <TextField
                label="배송 주소"
                variant="outlined"
                value={userAddress}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="normal"
                style={textFieldStyleInput}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefaultAddress}
                    onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                    color="primary"
                  />
                }
                label="기본 배송지로 저장"
                sx={{
                  width: "50%",
                  paddingBottom: "10px",
                }}
              />

              <InputLabel htmlFor="message" style={textFieldStyle}>
                배송메세지
              </InputLabel>
              <TextField
                label="배송 메시지"
                variant="outlined"
                value={message}
                onChange={(e) => setDeliveryMessage(e.target.value)}
                fullWidth
                margin="normal"
                style={textFieldStyleInput}
              />
            </Box>

            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                justifyContent: "center",
                width: "24%",
                margin: "auto",
                borderTop: "2px solid black",
                marginTop: "50px",
                padding: "50px 0 30px 0",
              }}
            >
              {Array.from(Array(4)).map((_, index) => (
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                  key={index}
                  sx={{
                    "&:hover": {
                      border: "2px solid rgb(152, 41, 41)",
                      borderRadius: "8px",
                      cursor: "pointer",
                    },
                  }}
                  className={styles.gridItem}
                >
                  {React.createElement(
                    svgComponents[index % svgComponents.length]
                  )}
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {textContents[index % textContents.length]}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <InputLabel
              htmlFor="Message"
              style={{
                fontSize: "small",
                marginTop: "100px",
              }}
            >
              위 주문내역을 확인했으며 결제에 동의합니다.
            </InputLabel>
            <Button
              sx={{
                fontSize: "x-large",
                padding: "15px 40px",
                margin: "30px 0 30px 0",
              }}
              onClick={paymentHandleSubmit}
              variant="contained"
            >
              결제하기
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Order;
