import React from "react";
import style from "./cartitem.module.css";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { style } from "@mui/system";
import styles from "./Login.module.css";

function cartItem() {
  const handleOption = () => {};

  const handleCash = () => {};
  return (
    <Container maxWidth={false} className={styles.content}>
      <Box className={style.image}>
        <img className={styles.loginLogo} src={loginImage} alt="Login" />
      </Box>
      <Box className={style.text}>
        <Box className={style.textTheory}></Box>
        <Box className={style.textName}></Box>
        <button className={style.option} onClick={handleOption}></button>
      </Box>
      <Box className={style.delivery}>
        <Box className={style.deliveryText}></Box>
      </Box>
      <Box className={style.cash}>
        <Box className={style.cashMoney}></Box>
        <Button className={style.cashClick} onClick={handleCash}></Button>
      </Box>
    </Container>
  );
}
export default cartItem;
