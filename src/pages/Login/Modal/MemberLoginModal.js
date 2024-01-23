import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./MemberLoginModal.module.css";

function MemberLoginModal({ onClose }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");


    const handleSignup = () => {
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box className={styles.modalContainer}>
                <Typography variant="h5" id="login-modal-title" className={styles.modalTitle}>
                    회원가입
                </Typography>
                <TextField
                    label="아이디"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className={styles.inputField}
                />
                <TextField
                    label="비밀번호"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
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
