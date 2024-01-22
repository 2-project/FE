import React, { useEffect, useState } from "react";
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
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

function Cart({ onClose }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalShippingPrice, setTotalShippingPrice] = useState(0);

  useEffect(() => {
    let newTotalProductPrice = 0;
    let newTotalShippingPrice = 0;

    checkedUsers.forEach((shoppingId) => {
      const user = users.find((user) => user.shoppingId === shoppingId);
      if (user) {
        newTotalProductPrice += user.price * user.quantity;
        newTotalShippingPrice += user.shopping;
      }
    });

    setTotalProductPrice(newTotalProductPrice);
    setTotalShippingPrice(newTotalShippingPrice);
  }, [checkedUsers, users]);

  const handleDelete = async () => {
    setIsDeleting(true);

    //     try {
    //         const response = await fetch(`$http://localhost:3000s/deleteShopper`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 product_id: productId,
    //             }),
    //         });
    //
    //         const serverData = await response.json();
    //
    //         if (serverData.success) {
    //             alert('선택하신 상품을 성공적으로 삭제했습니다.');
    //             onClose();
    //         } else {
    //             alert('선택하신 상품 삭제에 실패했습니다: ' + serverData.message);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('오류가 발생했습니다: ' + error.message);
    //     } finally {
    //         setIsDeleting(false);
    //     }
    // };
    //
    // // 페이지에 상품 목록이 없을 경우에 대한 처리
    // if (!shoppingId) {
    //     console.error('No shoppingId provided to Cart');
    //     return <p>오류: 상품 ID가 s제공되지 않았습니다.</p>;
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setCheckedUsers([]);
      setSelectAll(false);
    } else {
      setCheckedUsers(users.map((user) => user.shoppingId));
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (shoppingId) => {
    const currentIndex = checkedUsers.indexOf(shoppingId);
    const newCheckedUsers = [...checkedUsers];

    if (currentIndex === -1) {
      newCheckedUsers.push(shoppingId);
    } else {
      newCheckedUsers.splice(currentIndex, 1);
    }

    setCheckedUsers(newCheckedUsers);
  };

  const paymentHandleSubmit = () => {
    navigate("/order");
  };

  return (
    <>
      <Container maxWidth={false}>
        <Box className={styles.cartContainer}>
          <Box className={styles.header}>
            <Typography variant="h4" className={styles.title}>
              장바구니
            </Typography>
          </Box>

          <Typography variant="subtitle1" className={styles.notice}>
            장바구니에 저장된 상품이 없습니다
          </Typography>

          <Box className={styles.productContainer}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          checkedUsers.length > 0 &&
                          checkedUsers.length < users.length
                        }
                        checked={selectAll}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell>상품정보</TableCell>
                    <TableCell>판매가</TableCell>
                    <TableCell>배송비</TableCell>
                    <TableCell>주문금액</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.shoppingId}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={() => handleCheckboxChange(user.shoppingId)}
                          checked={checkedUsers.includes(user.shoppingId)}
                        />
                      </TableCell>
                      <TableCell>{user.productInfo}</TableCell>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.quantity}</TableCell>
                      <TableCell>{user.subtotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className={styles.productList}>
            <Box className={styles.product}>
              <Typography className={styles.productName}>
                선택한 상품
              </Typography>
              <Button
                className={styles.productDelete}
                onClick={handleDelete}
                variant="contained"
                disabled={isDeleting}
              >
                {isDeleting ? "삭제 중..." : "X 삭제하기"}
              </Button>
            </Box>

            <Button
              sx={{
                fontSize: "x-large",
                color: "white",
                padding: "15px 45px",
                margin: "30px 0 100px 0",
              }}
              onClick={paymentHandleSubmit}
              variant="contained"
            >
              주문하기
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Cart;
