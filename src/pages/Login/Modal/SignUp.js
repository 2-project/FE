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
<<<<<<< HEAD
import userBasicIcon_1 from "../../../assets/icons/basic_profile_1.png";
=======
>>>>>>> origin

function MemberLoginModal({ onClose }) {
  const [LoginId, setLoginId] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
<<<<<<< HEAD
  const [profilePicture, setProfilePicture] = useState(userBasicIcon_1);
  const [isCheckboxChecked, setCheckboxChecked] = useState(true);
  const [isProfilePictureValid, setIsProfilePictureValid] = useState(true);

  const isEmailValid = /^(?=.*[a-z\d])[a-z\d]+@[a-z]+\.[a-z]+$/i.test(LoginId);
  const isPasswordValid = /^(?=.*[a-z])(?=.*\d).{8,20}$/.test(LoginPassword);
  const isPhoneNumberValid = /^\d{11}$/.test(phoneNumber);
  const isNameValid = /^[가-힣]+$/.test(name);
  const isAddressValid = /^[가-힣\d\s-]+$/i.test(address);

  const isSignupButtonEnabled =
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    confirmPassword === LoginPassword &&
    isPhoneNumberValid &&
    isAddressValid &&
    isProfilePictureValid &&
    isCheckboxChecked;

  // 휴대폰 번화 폼에서 중간에 -을 넣어주는 기능
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    // 11자리의 숫자를 입력했을 때만 형식을 변경
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    // 그 외의 경우는 그대로 반환
    return cleaned;
  };

  const handleSignup = () => {
    if (isSignupButtonEnabled) {
      const signupData = {
        name,
        email: LoginId,
        password: LoginPassword,
        confirmPassword,
        phoneNumber,
        address,
        profilePicture: profilePicture ? profilePicture.name : null,
        // 기타 필요한 회원가입 정보 추가
      };

      fetch("백엔드API주소", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => response.json())
        .then((data) => {
          // 서버 응답에 대한 처리
          console.log("회원가입 성공:", data);
          // 추가적인 프론트엔드 로직 수행
        })
        .catch((error) => {
          console.error("회원가입 실패:", error);
          // 오류 처리
        });
    } else {
      alert("회원가입 조건을 확인해주세요.");
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      // 유효한 이미지 유형인지 확인
      const isValidImageType = /^image\/(jpeg|jpg|png)$/i.test(file.type);

      if (isValidImageType) {
        setProfilePicture(file);
        setIsProfilePictureValid(true);
      } else {
        setProfilePicture(userBasicIcon_1);
        setIsProfilePictureValid(false);
      }
    }
  };

=======
  const [profilePicture, setProfilePicture] = useState("");

  const handleSignup = () => {};
>>>>>>> origin
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
<<<<<<< HEAD
          label="*이름"
=======
          label="이름"
>>>>>>> origin
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
          placeholder="한글로만 입력"
<<<<<<< HEAD
          size="small"
          error={!isNameValid && name.trim() !== ""}
          helperText={
            !isNameValid &&
            name.trim() !== "" &&
            "올바른 한글 이름을 입력하세요."
          }
        />
        <Box
          className={styles.emailContainer}
          sx={{
            width: 400,
            maxWidth: "100%",
          }}
        >
          <TextField
            label="*이메일"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={LoginId}
            onChange={(e) => setLoginId(e.target.value)}
            className={styles.inputField}
            placeholder="@ 필수 입력"
            size="small"
            error={!isEmailValid && LoginId.trim() !== ""}
            helperText={
              !isEmailValid &&
              LoginId.trim() !== "" &&
              "올바른 이메일 형식이 아닙니다."
            }
          />
          <Button
            variant="outlined"
            color="primary"
            //onClick={handleEmailCheck}
            size="small"
            className={styles.emailDoubleCheck}
          >
            중복확인
          </Button>
        </Box>
        <TextField
          label="*비밀번호"
=======
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
>>>>>>> origin
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={LoginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className={styles.inputField}
          placeholder="영문(소문자), 숫자 합쳐서 8~20자"
<<<<<<< HEAD
          size="small"
          error={!isPasswordValid && LoginPassword.trim() !== ""}
          helperText={
            !isPasswordValid &&
            LoginPassword.trim() !== "" &&
            "비밀번호는 소문자와 숫자를 포함한 8~20자여야 합니다."
          }
        />
        <TextField
          label="*비밀번호 확인"
=======
        />
        <TextField
          label="비밀번호 확인"
>>>>>>> origin
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
          placeholder="영문(소문자), 숫자 합쳐서 8~20자"
<<<<<<< HEAD
          size="small"
          error={confirmPassword !== LoginPassword && confirmPassword !== ""}
          helperText={
            confirmPassword !== LoginPassword &&
            confirmPassword !== "" &&
            "비밀번호가 일치하지 않습니다."
          }
        />
        <TextField
          label="*휴대폰 번호"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formatPhoneNumber(phoneNumber)}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.inputField}
          placeholder="'-' 없이 숫자만 입력"
          size="small"
          error={!isPhoneNumberValid && phoneNumber.trim() !== ""}
          helperText={
            !isPhoneNumberValid &&
            phoneNumber.trim() !== "" &&
            "올바른 휴대폰 번호를 입력하세요."
          }
        />
        <TextField
          label="*주소"
=======
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
>>>>>>> origin
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.inputField}
<<<<<<< HEAD
          size="small"
          error={!isAddressValid && address.trim() !== ""}
          helperText={
            !isAddressValid &&
            address.trim() !== "" &&
            "올바른 주소를 입력하세요."
          }
        />
        <div className={styles.profileUploadBox}>
          <img
            className={styles.userBasicIcon}
            //src={userBasicIcon_1}
            src={profilePicture}
            alt="프로필사진"
          ></img>
          <input
            className={styles.uploadName}
            value={profilePicture ? profilePicture.name : "첨부파일"}
            placeholder="프로필 사진 업로드"
            readOnly
          />
          <label htmlFor="file" className={styles.profileLabel}>
            사진 찾기
          </label>
          <input
            id="file"
            type="file"
            className={styles.userProfilePicture}
            onChange={handleFileChange}
          />
        </div>

        <FormControlLabel
          /* control={<Checkbox defaultChecked />} */
          control={
            <Checkbox
              checked={isCheckboxChecked}
              onChange={() => setCheckboxChecked(!isCheckboxChecked)}
            />
          }
=======
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
>>>>>>> origin
          label="개인정보 제3자 동의 체크"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          className={styles.signupButton}
<<<<<<< HEAD
          disabled={!isSignupButtonEnabled}
=======
>>>>>>> origin
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
