import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginLogo from "../../assets/image/Login-MujiLogo.png";
import goSignUpIcon from "../../assets/icons/goSignUpIcon.svg";
// import LoginLogo from "../../assets/image/Login-MujiLogo.png";
// import goSignUpIcon from "../../assets/icons/goSignUpIcon.svg";
import styles from "./Login.module.css";
import MemberLoginModal from "./Modal/SignUp";

function Login({ onClose }) {
  const [LoginId, setLoginId] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [ismemberLoginOpen, setMemberLoginOpen] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = /^(?=.*[a-z\d])[a-z\d]+@[a-z]+\.[a-z]+$/i.test(LoginId);
  const isPasswordValid = /^(?=.*[a-z])(?=.*\d).{8,20}$/.test(LoginPassword);

  const handleLoginIdChange = (event) => {
    setLoginId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleButton = async (event) => {
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await fetch("여러분의_백엔드_로그인_엔드포인트", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: LoginId,
            password: LoginPassword,
          }),
        });

        if (response.ok) {
          // 로그인 성공, 필요한 경우 추가 작업 수행
          // 예를 들어 다른 페이지로 이동할 수 있습니다.
          // navigate('/main');
        } else {
          // 로그인 실패 처리, 사용자에게 오류 메시지를 표시할 수 있습니다.
          console.error("로그인 실패");
        }
      } catch (error) {
        console.error("로그인 중 오류 발생:", error);
      }
    }
    const handleButton = (event) => {
      // navigate('/main');
    };

    const handleMemberButton = (event) => {
      setMemberLoginOpen(true);
    };

    return (
      <Container maxWidth="false" className={styles.loginContainer}>
        <Box sx={{ mt: 4, mb: 4 }} className={styles.loginBox}>
          <Box className={styles.loginHeader}>
            <Typography variant="h4" gutterBottom className={styles.formTitle}>
              로그인
            </Typography>
            <span>
              <img
                className={styles.loginLogo}
                src={LoginLogo}
                alt="로고"
              ></img>
              {/* <img className={styles.loginLogo} src={LoginLogo} alt="로고"></img> */}
            </span>
          </Box>
          <Box className={styles.textContainer}>
            <TextField
              label="이메일"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={LoginId}
              onChange={handleLoginIdChange}
              placeholder="이메일 아이디를 입력하세요."
              className="form-input"
              error={!isEmailValid && LoginId.trim() !== ""}
              helperText={
                !isEmailValid &&
                LoginId.trim() !== "" &&
                "올바른 이메일 형식이 아닙니다."
              }
            />
            <TextField
              label="비밀번호"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={LoginPassword}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요."
              className="form-input"
              error={!isPasswordValid && LoginPassword.trim() !== ""}
              helperText={
                !isPasswordValid &&
                LoginPassword.trim() !== "" &&
                "비밀번호는 소문자와 숫자를 포함한 8~20자여야 합니다."
              }
            />
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
              className={styles.buttonBox}
            >
              <Button
                variant="contained"
                color="primary"
                className={styles.createButton}
                onClick={handleButton}
                disabled={!isEmailValid || !isPasswordValid}
              >
                로그인
              </Button>
            </Box>
            <div className={styles.goSignUp}>
              <span onClick={handleMemberButton}>회원가입 하러가기</span>
              <img className={styles.goSignUpArrowIcon} src={goSignUpIcon} />
              {/* <img className={styles.goSignUpArrowIcon} src={goSignUpIcon} /> */}
            </div>
          </Box>
        </Box>
        {ismemberLoginOpen && (
          <MemberLoginModal onClose={() => setMemberLoginOpen(false)} />
        )}
      </Container>
    );
  };
}

export default Login;

// import React, { useState } from "react";
// import { Container, Box, Typography, TextField, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import loginImage from "../../assets/images/login-image.png";
// import styles from "./Login.module.css";
// import MemberLoginModal from "./Modal/MemberLoginModal";

// function Login({ onClose }) {
//   // const handleAdd = async () => {
//   //     const userData = {
//   //         name: name,
//   //         login_id: loginId,
//   //         password: password,
//   //         authority: isAdmin ? 'M' : 'U',
//   //         phone_num: phoneNumber
//   //     };
//   //
//   //     const idCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
//   //     const korean = /^[가-힣]+$/;
//   //     const passwordCheck = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
//   //     const telCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
//   //     const idCheckResponse = await fetch(`${process.env.REACT_APP_AUTH_SERVER}/checkLoginId?loginId=${loginId}`);
//   //     const isIdDuplicate = await idCheckResponse.json();
//   //
//   //     if (loginId === "" || password === "" || name === "" || phoneNumber === "" || confirmPassword === "" || selectedHydrogenCenter === null) {
//   //         alert("공백란 확인 후 다시 작성해주세요.");
//   //     } else if (!passwordCheck.test(password)) {
//   //         alert("비밀번호는 5글자 이상이며, 특수문자를 하나 이상 포함해야 합니다.");
//   //     } else if (password !== confirmPassword) {
//   //         alert("비밀번호와 비밀번호 확인이 일치하지않습니다");
//   //     } else if (!idCheck.test(loginId)) {
//   //         alert("아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.");
//   //     } else if (!korean.test(name)) {
//   //         alert("이름은 한글만 입력할 수 있습니다.");
//   //     } else if (phoneNumber.length > 11 || !telCheck.test(phoneNumber)) {
//   //         alert("전화번호는 11자리 이하의 숫자로만 입력해주세요.");
//   //     } else if (isIdDuplicate) {
//   //         alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.");
//   //     } else {
//   //         fetch(`${process.env.REACT_APP_AUTH_SERVER}/addUser`, {
//   //             method: 'POST',
//   //             headers: {
//   //                 'Content-Type': 'application/json',
//   //             },
//   //             body: JSON.stringify(userData),
//   //         })
//   //             .then(response => response.json())
//   //             .then(data => {
//   //                 console.log(data);
//   //                 if (data.success) {
//   //                     console.log("User added successfully");
//   //                     onClose();
//   //                     alert("사용자 정보가 성공적으로 등록되었습니다.");
//   //                 } else {
//   //                     console.error("Failed to add user");
//   //                     console.error("Error message: " + data.message);
//   //                 }
//   //             })
//   //             .catch(error => {
//   //                 console.error('Error:', error);
//   //             });
//   //     }
//   // };

//   const [loginId, setLoginId] = useState("");
//   const [password, setPassword] = useState("");
//   const [ismemberloginOpen, setMemberloginOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginIdChange = (event) => {
//     setLoginId(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleButton = (event) => {
//     // navigate('/main');
//   };

//   const handleMemberButton = (event) => {
//     setMemberloginOpen(true);
//   };

//   return (
//     <Container maxWidth="sm" className={styles.loginContainer}>
//       <Box sx={{ mt: 4, mb: 4 }} className={styles.loginBox}>
//         <Box className={styles.loginHeader}>
//           <Typography variant="h4" gutterBottom className={styles.formTitle}>
//             로그인
//           </Typography>
//           <img className={styles.loginLogo} src={loginImage} alt="Login" />
//         </Box>
//         <Box className={styles.textContainer}>
//           <TextField
//             label="아이디"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={loginId}
//             onChange={handleLoginIdChange}
//             placeholder="아이디를 입력하세요."
//             className="form-input"
//           />

//           <TextField
//             label="비밀번호"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={handlePasswordChange}
//             placeholder="비밀번호 입력"
//             className="form-input"
//           />
//         </Box>

//         <Box
//           sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
//           className={styles.buttonsBox}
//         >
//           <Button
//             variant="outlined"
//             className={styles.cancelButton}
//             onClick={onClose}
//           >
//             취소
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             className={styles.createButton}
//             onClick={handleButton}
//           >
//             만들기
//           </Button>
//           <Button className={styles.memberButton} onClick={handleMemberButton}>
//             회원가입
//           </Button>
//         </Box>
//       </Box>
//       {ismemberloginOpen && (
//         <MemberLoginModal onClose={() => setMemberloginOpen(false)} />
//       )}
//     </Container>
//   );
// }

// export default Login;
