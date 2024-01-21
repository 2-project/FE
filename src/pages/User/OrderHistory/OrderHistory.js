// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import styles from "./PurchaseHistory.module.css";
// import { useNavigate } from "react-router-dom";

// function PurchaseHistory({ onClose }) {
//   const navigate = useNavigate();
//   const [checkedUsers, setCheckedUsers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [totalProductPrice, setTotalProductPrice] = useState(0);
//   const [totalShippingPrice, setTotalShippingPrice] = useState(0);

//   useEffect(() => {
//     let newTotalProductPrice = 0;
//     let newTotalShippingPrice = 0;

//     checkedUsers.forEach((shoppingId) => {
//       const user = users.find((user) => user.shoppingId === shoppingId);
//       if (user) {
//         newTotalProductPrice += user.price * user.quantity;
//         newTotalShippingPrice += user.shopping;
//       }
//     });

//     setTotalProductPrice(newTotalProductPrice);
//     setTotalShippingPrice(newTotalShippingPrice);
//   }, [checkedUsers, users]);

//   const handleDelete = async () => {
//     setIsDeleting(true);

//     //     try {
//     //         const response = await fetch(`$http://localhost:3000s/deleteShopper`, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 product_id: productId,
//     //             }),
//     //         });
//     //
//     //         const serverData = await response.json();
//     //
//     //         if (serverData.success) {
//     //             alert('선택하신 상품을 성공적으로 삭제했습니다.');
//     //             onClose();
//     //         } else {
//     //             alert('선택하신 상품 삭제에 실패했습니다: ' + serverData.message);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error:', error);
//     //         alert('오류가 발생했습니다: ' + error.message);
//     //     } finally {
//     //         setIsDeleting(false);
//     //     }
//     // };
//     //
//     // // 페이지에 상품 목록이 없을 경우에 대한 처리
//     // if (!shoppingId) {
//     //     console.error('No shoppingId provided to Cart');
//     //     return <p>오류: 상품 ID가 s제공되지 않았습니다.</p>;
//   };

//   const handleSelectAllClick = () => {
//     if (selectAll) {
//       setCheckedUsers([]);
//       setSelectAll(false);
//     } else {
//       setCheckedUsers(users.map((user) => user.shoppingId));
//       setSelectAll(true);
//     }
//   };

//   const handleCheckboxChange = (shoppingId) => {
//     const currentIndex = checkedUsers.indexOf(shoppingId);
//     const newCheckedUsers = [...checkedUsers];

//     if (currentIndex === -1) {
//       newCheckedUsers.push(shoppingId);
//     } else {
//       newCheckedUsers.splice(currentIndex, 1);
//     }

//     setCheckedUsers(newCheckedUsers);
//   };

//   const paymentHandleSubmit = () => {
//     navigate("/order");
//   };

//   return (
//     <>
//       <Container maxWidth={false}>
//         <Box className={styles.cartContainer}>
//           <Box className={styles.header}>
//             <Typography variant="h4" className={styles.title}>
//               주문내역
//             </Typography>
//           </Box>

//           <Box className={styles.productContainer}>
//             <TableContainer component={Paper} className={styles.tableContainer}>
//               <Table aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     {/* <TableCell padding="checkbox">
//                       <Checkbox
//                         indeterminate={
//                           checkedUsers.length > 0 &&
//                           checkedUsers.length < users.length
//                         }
//                         checked={selectAll}
//                         onChange={handleSelectAllClick}
//                       />
//                     </TableCell> */}
//                     <TableCell>주문날짜</TableCell>
//                     <TableCell>상품이미지</TableCell>
//                     <TableCell>상품명</TableCell>
//                     <TableCell>금액</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {users.map((user) => (
//                     <TableRow key={user.shoppingId}>
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           onChange={() => handleCheckboxChange(user.shoppingId)}
//                           checked={checkedUsers.includes(user.shoppingId)}
//                         />
//                       </TableCell>
//                       <TableCell>{user.productInfo}</TableCell>
//                       <TableCell>{user.price}</TableCell>
//                       <TableCell>{user.quantity}</TableCell>
//                       <TableCell>{user.subtotal}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//           <Box className={styles.productList}>
//             <Box className={styles.product}>
//               {/* <Typography className={styles.productName}>
//                 선택한 상품
//               </Typography> */}
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default PurchaseHistory;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../OrderHistory/OrderHistory.module.css";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("/api/order-history");
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleButton = (event) => {
    navigate("/orderhistory");
  };

  const handleButton1 = (event) => {
    navigate("/userinfo");
  };

  const handleButton2 = (event) => {
    setIsDeleteAccountOpen(true);
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
          <span className={styles.rightTitle}>주문내역</span>
        </div>
        <Box className={styles.productContainer}>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>상품리스트</TableCell>
                  <TableCell>총 금액</TableCell>
                  <TableCell>주문날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.productInfo}</TableCell>
                    <TableCell>{user.totalPrice}</TableCell>
                    <TableCell>{user.orderDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <List>
          {orderHistory.map((order, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt="Product Image" src={order.productImage} />
              </ListItemAvatar>
              <ListItemText
                primary={order.productName}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      총 가격: {order.totalPrice} 원
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default OrderHistory;
