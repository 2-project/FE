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

    checkedUsers.forEach((LoginId) => {
      const user = users.find((user) => user.LoginId === LoginId);
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
      setCheckedUsers(users.map((user) => user.LoginId));
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (LoginId) => {
    const currentIndex = checkedUsers.indexOf(LoginId);
    const newCheckedUsers = [...checkedUsers];

    if (currentIndex === -1) {
      newCheckedUsers.push(LoginId);
    } else {
      newCheckedUsers.splice(currentIndex, 1);
    }

    setCheckedUsers(newCheckedUsers);
  };

  const newAddressHandleSubmit = () => {
    // 새로운 주소 입력 모달을 열기
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const submitNewAddress = () => {
    // 여기에 새로운 주소를 처리하는 로직을 추가하세요.
    // 예를 들어, 새로운 주소를 서버에 저장하거나 다른 필요한 작업을 수행할 수 있습니다.

    closeModal();
  };

  const paymentHandleSubmit = async () => {
    window.alert("주문이 완료되었습니다.");
    navigate("/User");
  };
  const textFieldStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    color: "black",
  };
  const textFieldStyleInput = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
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
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          checkedUsers.length > 0 &&
                          checkedUsers.length < users.length
                        }
                        checked={selectAll}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell>상품정보</TableCell>
                    <TableCell>판매가</TableCell>
                    <TableCell>배송비</TableCell>
                    <TableCell>주문금액</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.LoginId}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={() => handleCheckboxChange(user.LoginId)}
                          checked={checkedUsers.includes(user.LoginId)}
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
            sx={{
              textAlign: "center",
            }}
          >
            <Box className={styles.product}>
              {/* <Typography className={styles.productName}>
                선택한 상품
              </Typography> */}
            </Box>

            <Box
              sx={{
                borderTop: "2px solid black ",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 280px 0 280px",
              }}
            >
              <InputLabel
                htmlFor="orderTitle"
                sx={{
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
                sx={{
                  marginTop: "40px",
                  padding: "10px 20px 10px 20px",
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
                sx={{
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
                  sx={{
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
                    sx={{ flex: 1 }}
                    // 필요한 경우 onChange 이벤트 핸들러 등을 추가
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
                  sx={{
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
              sx={{ textAlign: "center", marginTop: "30px" }}
            >
              <InputLabel htmlFor="userName" style={textFieldStyle}>
                이 름*
              </InputLabel>
              <TextField
                label="이  름"
                variant="outlined"
                value={name}
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
                value={phoneNumber}
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
                value={address}
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
                  width: "60%",
                  paddingBottom: "10px",
                }}
              />

              <InputLabel htmlFor="message" style={textFieldStyle}>
                배송메세지
              </InputLabel>
              <TextField
                label="배송 메시지"
                variant="outlined"
                value={deliveryMessage}
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
              sx={{
                fontSize: "small",
                marginTop: "100px",
              }}
            >
              위 주문내역을 확인했으며 결제에 동의합니다.
            </InputLabel>
            <Button
              sx={{
                fontSize: "x-large",
                color: "white",
                padding: "15px 45px",
                margin: "30px 0 100px 0",
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
