import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

function MemberLoginModal({ onClose }) {
  const [LoginId, setLoginId] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleSignup = () => {};
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box className={styles.modalContainer}>
        <Typography
          variant="h5"
          id="login-modal-title"
          className={styles.modalTitle}
        >
          회원가입
        </Typography>
        <TextField
          label="이름"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
          placeholder="한글로만 입력"
        />
        <TextField
          label="이메일"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={LoginId}
          onChange={(e) => setLoginId(e.target.value)}
          className={styles.inputField}
          placeholder="@ 필수 입력"
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={LoginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className={styles.inputField}
          placeholder="영문(소문자), 숫자 합쳐서 8~20자"
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
          placeholder="영문(소문자), 숫자 합쳐서 8~20자"
        />
        <TextField
          label="휴대폰 번호"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.inputField}
          placeholder="'-' 없이 숫자만 입력"
        />
        <TextField
          label="주소"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.inputField}
        />
        <TextField
          label="프로필사진"
          type="file"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          className={styles.inputField}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="개인정보 제3자 동의 체크"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          className={styles.signupButton}
        >
          회원가입
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
          className={styles.cancelButton}
        >
          취소
        </Button>
      </Box>
    </Modal>
  );
}
export default MemberLoginModal;
