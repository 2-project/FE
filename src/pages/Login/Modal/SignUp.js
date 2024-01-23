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
import userBasicIcon_1 from "../../../assets/icons/basic_profile_1.png";
import { addSignUp } from "../../../api/signUpApi";

function MemberLoginModal({ onClose }) {
  const [userId, setuserId] = useState("");
  const [userPwd, setuserPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(userBasicIcon_1);
  const [isCheckboxChecked, setCheckboxChecked] = useState(true);
  const [isProfilePictureValid, setIsProfilePictureValid] = useState(true);

  const isEmailValid = /^(?=.*[a-z\d])[a-z\d]+@[a-z]+\.[a-z]+$/i.test(userId);
  const isPasswordValid = /^(?=.*[a-z])(?=.*\d).{8,20}$/.test(userPwd);
  const isuserPhoneValid = /^\d{11}$/.test(userPhone);
  const isuserNameValid = /^[가-힣]+$/.test(userName);
  const isuserAddressValid = /^[가-힣\d\s-]+$/i.test(userAddress);

  const isSignupButtonEnabled =
    isuserNameValid &&
    isEmailValid &&
    isPasswordValid &&
    confirmPassword === userPwd &&
    isuserPhoneValid &&
    isuserAddressValid &&
    isProfilePictureValid &&
    isCheckboxChecked;

  // 휴대폰 번화 폼에서 중간에 -을 넣어주는 기능
  const formatuserPhone = (userPhone) => {
    const cleaned = userPhone.replace(/\D/g, "");

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
        userName,
        user_id: userId,
        user_pwd: userPwd,
        confirmPassword,
        userPhone,
        userAddress,
        profilePicture: profilePicture ? profilePicture.userName : null,
        // 기타 필요한 회원가입 정보 추가
      };

      fetch(
        "http://ec2-43-203-169-73.ap-northeast-2.compute.amazonaws.com:8080/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          /* body: JSON.stringify(signupData), */
          body: JSON.stringify({
            user_id: userId,
            user_pwd: userPwd,
            user_name: userName,
            user_phone: userPhone,
            user_address: userAddress,
          }),
        }
      );
      // addSignUp 함수 호출
      addSignUp(signupData)
        .then((data) => {
          // 서버 응답에 대한 처리
          console.log("회원가입 성공:", data);
          // 추가적인 프론트엔드 로직 수행
          alert("가입을 축하합니다.");
          onClose();
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
          label="*이름"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          className={styles.inputField}
          placeholder="한글로만 입력"
          size="small"
          error={!isuserNameValid && userName.trim() !== ""}
          helperText={
            !isuserNameValid &&
            userName.trim() !== "" &&
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
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
            className={styles.inputField}
            placeholder="@ 필수 입력"
            size="small"
            error={!isEmailValid && userId.trim() !== ""}
            helperText={
              !isEmailValid &&
              userId.trim() !== "" &&
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
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userPwd}
          onChange={(e) => setuserPwd(e.target.value)}
          className={styles.inputField}
          placeholder="영문(소문자), 숫자 합쳐서 8~20자"
          size="small"
          error={!isPasswordValid && userPwd.trim() !== ""}
          helperText={
            !isPasswordValid &&
            userPwd.trim() !== "" &&
            "비밀번호는 소문자와 숫자를 포함한 8~20자여야 합니다."
          }
        />
        <TextField
          label="*비밀번호 확인"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
          placeholder="영문(소문자), 숫자 합쳐서 8~20자"
          size="small"
          error={confirmPassword !== userPwd && confirmPassword !== ""}
          helperText={
            confirmPassword !== userPwd &&
            confirmPassword !== "" &&
            "비밀번호가 일치하지 않습니다."
          }
        />
        <TextField
          label="*휴대폰 번호"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formatuserPhone(userPhone)}
          onChange={(e) => setuserPhone(e.target.value)}
          className={styles.inputField}
          placeholder="'-' 없이 숫자만 입력"
          size="small"
          error={!isuserPhoneValid && userPhone.trim() !== ""}
          helperText={
            !isuserPhoneValid &&
            userPhone.trim() !== "" &&
            "올바른 휴대폰 번호를 입력하세요."
          }
        />
        <TextField
          label="*주소"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userAddress}
          onChange={(e) => setuserAddress(e.target.value)}
          className={styles.inputField}
          placeholder="상세주소까지 입력"
          size="small"
          error={!isuserAddressValid && userAddress.trim() !== ""}
          helperText={
            !isuserAddressValid &&
            userAddress.trim() !== "" &&
            "올바른 주소를 입력하세요."
          }
        />
        <div className={styles.profileUploadBox}>
          <img
            className={styles.userBasicIcon}
            //src={userBasicIcon_1}
            src={profilePicture}
            alt="프로필사진"
          />
          <input
            className={styles.uploadName}
            value={profilePicture ? profilePicture.userName : "첨부파일"}
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
          label="개인정보 제3자 동의 체크"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          className={styles.signupButton}
          disabled={!isSignupButtonEnabled}
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
