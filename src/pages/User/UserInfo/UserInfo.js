import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  InputLabel,
} from "@mui/material";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "../DeleteAccountModal/DeleteAccountModal";

function UserInfo({ userInfo, onClose }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserId(userData.userId);
        setUserName(userData.userName);
        setUserPhoneNumber(userData.userPhoneNumber);
        setUserAddress(userData.userAddress);
      } catch (error) {}
    };

    fetchUserData();
  }, [userId]);

  const handleUpdate = () => {
    fetch(`http://localhost:3000/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userPassword,
        userName,
        userPhoneNumber,
        userAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("회원 정보가 업데이트 되었습니다.");
        } else {
          alert("업데이트에 실패했습니다: " + data.message);
        }
      })
      .catch((error) => {
        alert("업데이트 중 오류가 발생했습니다.");
      });
  };

  const handleButton = (event) => {
    navigate("/orderhistory");
  };

  const handleButton1 = (event) => {
    navigate("/userinfo");
  };

  const handleButton2 = (event) => {
    setIsDeleteAccountOpen(true);
  };

  const textFieldStyle = {
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
    // width: "60%",
    margin: "8px auto",
  };
  // const textFieldStyleInput = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "60%",
  //   margin: "8px auto",
  // };

  return (
    <Container maxWidth={false} className={styles.userContainer}>
      <Box className={styles.card}>
        <Box className={styles.leftItem}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" className={styles.leftTitle}>
              나의 주문
            </Typography>
            <Button
              variant="text"
              color="primary"
              className={styles.leftBody}
              onClick={handleButton}
            >
              주문내역
            </Button>
            <Typography variant="h8" className={styles.leftTitle}>
              회원 정보
            </Typography>
            <Button
              variant="text"
              color="primary"
              className={styles.leftBody}
              onClick={handleButton1}
            >
              회원정보 수정
            </Button>
            <Button
              variant="text"
              color="primary"
              className={styles.leftBody}
              onClick={handleButton2}
            >
              회원탈퇴
            </Button>
          </Stack>
        </Box>
        <Box className={styles.rightItem}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60rem",
              height: "40em",
              marginTop: "5rem",
              p: 4,
            }}
          >
            <Typography variant="h4" className={styles.title}>
              회원 정보 수정
            </Typography>
          </Box>
        </Box>

        <Box
          className={styles.rightItem}
          style={{
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60rem",
              height: "40em",
              marginTop: "10rem",
              p: 4,
            }}
          >
            <Box
              className={styles.userInfoForm}
              style={{ textAlign: "center", marginTop: "30px" }}
            >
              <InputLabel htmlFor="userName" style={textFieldStyle}>
                아 이 디*
              </InputLabel>
              <TextField
                label={userId}
                variant="outlined"
                fullWidth
                margin="normal"
                value={userId}
                disabled
                className={styles.inputField}
              />

              <InputLabel htmlFor="phone-number" style={textFieldStyle}>
                새 비밀번호*
              </InputLabel>
              <TextField
                label="새 비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className={styles.inputField}
              />

              <InputLabel htmlFor="userAddress" style={textFieldStyle}>
                이 름*
              </InputLabel>
              <TextField
                label={userName}
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                disabled
                className={styles.inputField}
              />

              <InputLabel htmlFor="message" style={textFieldStyle}>
                주 소*
              </InputLabel>
              <TextField
                label="주소"
                type="address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                className={styles.inputField}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdate}
              className={styles.updateButton}
              style={{ marginTop: "2rem" }}
            >
              정보 수정
            </Button>
          </Box>
          {isDeleteAccountOpen && (
            <DeleteAccountModal onClose={() => setIsDeleteAccountOpen(false)} />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default UserInfo;
