import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Stack, Container } from "@mui/material";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "../DeleteAccountModal/DeleteAccountModal";

function UserInfo({ userId, onClose }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setLoginId(userData.loginId);
        setName(userData.name);
        setPhoneNumber(userData.phoneNumber);
        setEmail(userData.email);
      } catch (error) {

      }
    };

    fetchUserData();
  }, [userId]);

    const handleUpdate = () => {
        fetch(`http://localhost:3000/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginId, password, name, phoneNumber, email }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("회원 정보가 업데이트 되었습니다.");
                } else {
                    alert("업데이트에 실패했습니다: " + data.message);
                }
            })
            .catch(error => {
                alert("업데이트 중 오류가 발생했습니다.");
            });
    };

    const handleButton = (event) => {
        navigate("/purchasehistory");
    };

    const handleButton1 = (event) => {
        navigate("/userinfo");
    };

    const handleButton2 = (event) => {
        setIsDeleteAccountOpen(true);
    };

  return (
      <Container maxWidth={false} className={styles.userContainer}>
          <Box className={styles.card}>
              <Box className={styles.leftItem}>
                  <Stack direction="column" spacing={2}>
                      <Typography variant="h8" className={styles.leftTitle}>
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
                  <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60rem',
                      height: '40em',
                      marginTop: '5rem',
                      p: 4,
                  }}>
                      <Typography variant="h4" gutterBottom>
                          회원 정보 수정
                      </Typography>

                      <TextField
                          label={name}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={loginId}
                          disabled
                          className={styles.inputField}
                      />
                      <TextField
                          label="새 비밀번호"
                          type="password"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={styles.inputField}
                      />
                      <TextField
                          label="이름"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={styles.inputField}
                      />
                      <TextField
                          label="전화번호"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={styles.inputField}
                      />
                      <TextField
                          label="이메일"
                          type="email"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={styles.inputField}
                      />
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
