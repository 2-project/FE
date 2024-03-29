import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProduct, deleteProduct } from "../../../api/pmApi";

const PM = () => {
  const navigate = useNavigate();
  const { state: productInputs } = useLocation();
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [products, setProducts] = useState([]);

  const getAll = async () => {
    try {
      const res = await getAllProduct();
      setProducts(res.productDetailList || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const handleEdit = (productCid) => {
    navigate("/product_register", {
      state: { isEditing: true, productCid },
    });
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setCheckedProducts([]);
      setSelectAll(false);
    } else {
      setCheckedProducts(products.map((product) => product.productCid));
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (productCid) => {
    const currentIndex = checkedProducts.indexOf(productCid);
    const newCheckedProducts = [...checkedProducts];

    if (currentIndex === -1) {
      newCheckedProducts.push(productCid);
    } else {
      newCheckedProducts.splice(currentIndex, 1);
    }

    setCheckedProducts(newCheckedProducts);
  };

  const handleDelete = async () => {
    try {
      if (checkedProducts.length === 0) {
        alert("선택된 상품이 없습니다.");
        return;
      }

      // await Promise.all(
      //   checkedProducts.map(async (productCid) => {
      //     await deleteProduct(productCid);
      //   })
      // );

      const updatedProducts = products.filter(
        (product) => !checkedProducts.includes(product.productCid)
      );

      setProducts(updatedProducts);
      setCheckedProducts([]);
      setSelectAll(false);

      alert("선택한 상품이 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("상품 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleRegister = () => {
    navigate("/product_register", { state: { isEditing: false } });
  };

  const sumTotalStock = (options) => {
    return (options || []).reduce((result, option) => {
      result += parseFloat(option.optionStock) || 0;
      return result;
    }, 0);
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await getAllProduct();
  //       setCategories(response || []);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchProducts();
  // }, [productInputs]);

  // const handleEdit = (optionCid) => {
  //   navigate("/product_register", {
  //     state: { isEditing: true, optionCid },
  //   });
  // };

  // const handleSelectAllClick = () => {
  //   if (selectAll) {
  //     setCheckedProducts([]);
  //     setSelectAll(false);
  //   } else {
  //     setCheckedProducts(products.map((product) => product.productCid));
  //     setSelectAll(true);
  //   }
  // };

  // const handleCheckboxChange = (productCid) => {
  //   const currentIndex = checkedProducts.indexOf(productCid);
  //   const newCheckedProducts = [...checkedProducts];

  //   if (currentIndex === -1) {
  //     newCheckedProducts.push(productCid);
  //   } else {
  //     newCheckedProducts.splice(currentIndex, 1);
  //   }

  //   setCheckedProducts(newCheckedProducts);
  // };

  // const handleDelete = async () => {
  //   try {
  //     if (checkedProducts.length === 0) {
  //       alert("선택된 상품이 없습니다.");
  //       return;
  //     }

  //     await Promise.all(
  //       checkedProducts.map(async (optionCid) => {
  //         await deleteProduct(optionCid);
  //       })
  //     );

  //     const updatedProducts = products.filter(
  //       (product) => !checkedProducts.includes(product.optionCid)
  //     );

  //     setProducts(updatedProducts);
  //     setCheckedProducts([]);
  //     setSelectAll(false);

  //     alert("선택한 상품이 삭제되었습니다.");
  //   } catch (error) {
  //     console.error(error);
  //     alert("상품 삭제 중 오류가 발생했습니다.");
  //   }
  // };

  return (
    <>
      <Container>
        <Box className="pm-title" sx={{ paddingTop: 5, flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ background: "none", color: "#000000DE" }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                상품 관리
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{ marginTop: 2, marginBottom: 2, float: "right" }}
        >
          상품 등록
        </Button>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  <Checkbox
                    indeterminate={
                      checkedProducts.length > 0 &&
                      checkedProducts.length < products.length
                    }
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  상품명
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  카테고리
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  옵션 (수량)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  총 수량
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  STATUS
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  상품 가격
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  판매 시작일
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  판매 종료일
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productCid}>
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      onChange={() => handleCheckboxChange(product.productCid)}
                      checked={checkedProducts.includes(product.productCid)}
                    />
                  </TableCell>
                  <TableCell align="center">{product.productCid}</TableCell>
                  <TableCell align="center">{product.productName}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">
                    {product.options?.map((option, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <br />}
                        {`${option.optionName} (${option.optionStock})`}
                      </React.Fragment>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {sumTotalStock(product.options)}
                  </TableCell>
                  <TableCell align="center">
                    {sumTotalStock(product.options) <= 0 ||
                    new Date(product.productSaleEnd) < new Date()
                      ? "판매 종료"
                      : "판매 중"}
                  </TableCell>
                  <TableCell align="center">{product.productPrice}</TableCell>
                  <TableCell align="center">
                    {product.productSaleStart}
                  </TableCell>
                  <TableCell align="center">{product.productSaleEnd}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(product.productCid)}>
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" onClick={handleDelete}>
          삭제
        </Button>
      </Container>
    </>
  );
};

export default PM;
