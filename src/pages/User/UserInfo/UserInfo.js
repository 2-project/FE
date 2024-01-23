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
  const [userPwd, setUserPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await fetch(`http://localhost:3000/users/${userId}`);
        const response = await fetch(
          "http://ec2-43-203-169-73.ap-northeast-2.compute.amazonaws.com:8080/api/{userCid}/info"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserId(userData.userId);
        setUserName(userData.userName);
        setUserPhone(userData.userPhone);
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
        userPwd,
        userName,
        userPhone,
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

  return (
    <div className={styles.userContainer}>
      <div className={styles.card}>
        <div className={styles.leftItem}>
          <span className={styles.leftTitle}>나의 주문</span>
          <Button className={styles.leftBody} onClick={handleButton}>
            주문내역
          </Button>
          <span className={styles.leftTitle}>회원 정보</span>
          <Button className={styles.leftBody} onClick={handleButton1}>
            회원정보 수정
          </Button>
          <Button className={styles.leftBody} onClick={handleButton2}>
            회원탈퇴
          </Button>
        </div>
      </div>

      <div className={styles.rightItem}>
        <div className={styles.rightHeader}>
          <span className={styles.rightTitle}>회원정보 수정</span>
        </div>

        <div className={styles.userBodyContainer}>
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
                left: "55%",
                transform: "translate(-50%, -50%)",
                width: "40rem",
                height: "15rem",
                // marginTop: "10rem",
                p: 4,
              }}
            >
              {/* <div className={styles.profileUploadBox}>
                <input
                  className={styles.uploadName}
                  // value={profilePicture ? profilePicture.userName : "첨부파일"}
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
                  // onChange={handleFileChange}
                />
              </div> */}

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

                <InputLabel htmlFor="password" style={textFieldStyle}>
                  새 비밀번호*
                </InputLabel>
                <TextField
                  label="새 비밀번호"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userPwd}
                  onChange={(e) => setUserPwd(e.target.value)}
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
              <DeleteAccountModal
                onClose={() => setIsDeleteAccountOpen(false)}
              />
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
