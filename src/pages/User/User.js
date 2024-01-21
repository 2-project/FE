// import React, { useState, useEffect } from "react";
// //import axios from "axios";
// import { localToken } from "../../utils/auth";
// import { toast } from "react-toastify";
// import { Container, Box, Typography, Button, Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import styles from "./User.module.css";
// import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";

// function User({ onClose }) {
//   const [name, setName] = useState("");
//   const navigate = useNavigate();
//   const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

//   async function fetchAndGreetUser() {
//     const searchParams = new URLSearchParams({
//       // Uncomment and set this if needed: loginId: loginId,
//     });

//     try {
//       const response = await fetch(
//         `http://localhost:3000/getUserName?${searchParams.toString()}`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("서버와의 통신 중 오류가 발생했습니다.");
//       }

//       const data = await response.json();
//       setName(data.name); // 서버에서 반환된 사용자 이름 설정
//     } catch (error) {
//       alert(
//         "서버와의 통신간에 오류가 발생하였습니다.\n잠시 후, 다시 시도해 주세요."
//       );
//       console.error(error);
//     }
//   }

//   const handleButton = (event) => {
//     navigate("/purchasehistory");
//   };

//   const handleButton1 = (event) => {
//     navigate("/userinfo");
//   };

//   const handleButton2 = (event) => {
//     setIsDeleteAccountOpen(true);
//   };

//   useEffect(() => {
//     fetchAndGreetUser();
//   }, []);

//   return (
//     <Container maxWidth={false} className={styles.userContainer}>
//       <Box className={styles.card}>
//         <Box className={styles.leftItem}>
//           <Stack direction="column" spacing={2}>
//             <Typography variant="h8" className={styles.leftTitle}>
//               나의 주문
//             </Typography>
//             <Button
//               variant="text"
//               color="primary"
//               className={styles.leftBody}
//               onClick={handleButton}
//             >
//               주문내역
//             </Button>
//             <Typography variant="h8" className={styles.leftTitle}>
//               회원 정보
//             </Typography>
//             <Button
//               variant="text"
//               color="primary"
//               className={styles.leftBody}
//               onClick={handleButton1}
//             >
//               회원정보 수정
//             </Button>
//             <Button
//               variant="text"
//               color="primary"
//               className={styles.leftBody}
//               onClick={handleButton2}
//             >
//               회원탈퇴
//             </Button>
//           </Stack>
//         </Box>
//         <Box className={styles.rightItem}>
//           <Box
//             sx={{
//               position: "relative",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "60rem",
//               height: "40em",
//               marginTop: "5rem",
//               p: 4,
//             }}
//           >
//             <Box className={styles.header}>
//               <Typography variant="h4" className={styles.title}>
//                 마이페이지
//               </Typography>
//             </Box>

//             <Stack spacing={2} className={styles.userBodyContainer}>
//               <Typography variant="h5" className={styles.name}>
//                 {name}님
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   width="25"
//                   height="25"
//                   viewBox="-5 -3 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m8.25 4.5 7.5 7.5-7.5 7.5"
//                   />
//                 </svg>
//               </Typography>

//               <Button
//                 variant="text"
//                 color="primary"
//                 className={styles.purchaseHistoryButton}
//                 onClick={handleButton}
//               >
//                 주문내역
//               </Button>
//               {isDeleteAccountOpen && (
//                 <DeleteAccountModal
//                   onClose={() => setIsDeleteAccountOpen(false)}
//                 />
//               )}
//             </Stack>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default User;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";
import { Button } from "@mui/material"; // Import Button from Material-UI

function User({ onClose }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  async function fetchAndGreetUser() {
    const searchParams = new URLSearchParams({});

    try {
      const response = await fetch(
        `http://localhost:3000/getUserName?${searchParams.toString()}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("서버와의 통신 중 오류가 발생했습니다.");
      }

      const data = await response.json();
      setUserName(data.userName);
    } catch (error) {
      alert(
        "서버와의 통신간에 오류가 발생하였습니다.\n잠시 후, 다시 시도해 주세요."
      );
      console.error(error);
    }
  }
  const handleButton = (event) => {
    navigate("/orderhistory");
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
          <span className={styles.rightTitle}>마이페이지</span>
        </div>

        <div className={styles.userBodyContainer}>
          <span className={styles.userName}>
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
          </span>

          <Button
            className={`${styles.purchaseHistoryButton} ${styles.transparentButton}`} // Add a transparentButton class to apply transparent styles
            onClick={handleButton}
          >
            주문내역
          </Button>
          {isDeleteAccountOpen && (
            <DeleteAccountModal onClose={() => setIsDeleteAccountOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
