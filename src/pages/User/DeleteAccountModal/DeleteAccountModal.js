import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CardContent,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteAccountModal.css";
import Alert from "@mui/material/Alert";

function DeleteAccountModal({ onClose }) {
  const [LoginPassword, setLoginPassword] = useState("");
  const [isLoginPasswordCorrect, setIsLoginPasswordCorrect] = useState(true);

  const handlePasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const verifyLoginPassword = async () => {
    try {
      const response = await fetch("/http://localhost:3000/verifyPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ LoginPassword }),
      });

      if (!response.ok) {
        throw new Error("Password verification failed");
      }

      const data = await response.json();
      return data.isLoginPasswordCorrect;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const handleWithdrawal = async () => {
    const isCorrect = await verifyLoginPassword();
    setIsLoginPasswordCorrect(isCorrect);

    if (isCorrect) {
      alert("회원 탈퇴가 완료되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 50 * 8,
          height: 50 * 8,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            비밀번호 확인
          </Typography>

          <Typography
            variant="h7"
            className={styles.UserId}
            style={{ color: "black" }}
          >
            회원님의 개인정보 보호를 위해 비밀번호를 다시 한번 입력해주세요.
          </Typography>

          <TextField
            type="password"
            label="비밀번호 확인"
            variant="outlined"
            fullWidth
            value={LoginPassword}
            onChange={handlePasswordChange}
            error={!isLoginPasswordCorrect}
            helperText={
              !isLoginPasswordCorrect && "비밀번호가 일치하지 않습니다."
            }
            style={{ marginTop: "2rem" }}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleWithdrawal}
            className={styles.outButton}
            style={{ marginTop: "8rem" }}
          >
            회원 탈퇴
          </Button>
        </CardContent>
      </Box>
    </Modal>
  );
}

export default DeleteAccountModal;
