import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Box, Typography, TextField } from "@mui/material";
import styles from "./Header.module.css";
import { Muji, login, user, bucket } from "../../assets/images";

function Header() {
    return(
        <Container>
            <Box className={styles.loginContainer}>
                <Box className={styles.left}>
                    <NavLink to="/" className={styles.navLinkLogo}>
                        <img className={styles.loginLogo} src={Muji} alt="Muji" />
                    </NavLink>
                </Box>

                <Box className={styles.middle}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        className={styles.searchField}
                    />
                </Box>

                <Box className={styles.rightSection}>
                    <NavLink to="/login" className={styles.navLinkItem}>
                        <img src={login} alt="login" className={styles.navIcon} />
                        <span>Login</span>
                    </NavLink>

                    <NavLink to="/user" className={styles.navLinkItem}>
                        <img src={user} alt="User" className={styles.navIcon} />
                        <span>User</span>
                    </NavLink>

                    <NavLink to="/cart" className={styles.navLinkItem}>
                        <img src={bucket} alt="Cart" className={styles.navIcon} />
                        <span>장바구니</span>
                    </NavLink>
                </Box>
            </Box>
        </Container>
    );
}

export default Header;
