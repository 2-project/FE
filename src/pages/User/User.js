import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";

function User({ onClose }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  async function fetchAndGreetUser() {
    // const searchParams = new URLSearchParams({
    //     // Uncomment and set this if needed: loginId: loginId,
    // });
    //
    // try {
    //     const response = await fetch(`http://localhost:3000/getUserName?${searchParams.toString()}`, {
    //         method: "GET",
    //     });
    //
    //     if (!response.ok) {
    //         throw new Error("서버와의 통신 중 오류가 발생했습니다.");
    //     }
    //
    //     const data = await response.json();
    //     setUserName(data.name); // 서버에서 반환된 사용자 이름 설정
    // } catch (error) {
    //     alert("서버와의 통신간에 오류가 발생하였습니다.\n잠시 후, 다시 시도해 주세요.");
    //     console.error(error);
    // }
  }

  const handleButton = (event) => {
    navigate("/purchasehistory");
  };

  const handleButton1 = (event) => {
    navigate("/userinfo");
  };

  const handleButton2 = (event) => {
    setIsDeleteAccountOpen(true);
  };

  useEffect(() => {
    fetchAndGreetUser();
  }, []);

  const productManage = () => {
    navigate("/product_manage");
  };

  return (
    <Container maxWidth={false} className={styles.userContainer}>
      <Button variant="contained" onClick={productManage}>
        상품 관리
      </Button>
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
          <Box className={styles.header}>
            <Typography variant="h4" className={styles.title}>
              마이페이지
            </Typography>
          </Box>

          <Stack spacing={2} className={styles.userBodyContainer}>
            <Typography variant="h5" className={styles.userName}>
              {userName}님
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="25"
                height="25"
                viewBox="-5 -3 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Typography>

            <Button
              variant="text"
              color="primary"
              className={styles.purchaseHistoryButton}
              onClick={handleButton}
            >
              주문내역
            </Button>
            {isDeleteAccountOpen && (
              <DeleteAccountModal
                onClose={() => setIsDeleteAccountOpen(false)}
              />
            )}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default User;
