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
// get - api/product/getCategoryProduct
// delete - api/product/{productId}
import { getProduct, deleteProduct } from "../../../api/pmApi";

const PM = () => {
  const navigate = useNavigate();
  const { state: productInputs } = useLocation();
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productInputs) {
      const getRegisteredProducts = async () => {
        try {
          const fetchedProducts = await getProduct(productInputs);
          setProducts(fetchedProducts || []);
        } catch (error) {
          console.error(error);
        }
      };
      getRegisteredProducts();
    } else {
      // productInputs 없을시, mockProduct 불러오기
      setProducts([mockProduct]);
    }
  }, [productInputs]);

  const mockProduct = {
    productId: 1,
    productName: "mock",
    categoryName: "인기상품",
    options: [
      {
        optionName: "s",
        optionStock: 10,
      },
      {
        optionName: "m",
        optionStock: 10,
      },
      {
        optionName: "l",
        optionStock: 10,
      },
    ],
    productPrice: 100,
    productSaleStart: "2022-01-01",
    productSaleEnd: "2022-01-10",
  };

  // const [products, setProducts] = useState(
  //   productInputs && Array.isArray(productInputs.products)
  //     ? productInputs.products
  //     : []
  // );

  // useEffect(() => {
  //   if (productInputs) {
  //     const getRegisteredProducts = async () => {
  //       try {
  //         const fetchedProducts = await getProduct(productInputs);
  //         setProducts(fetchedProducts || []);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getRegisteredProducts();
  //   }
  // }, [productInputs]);

  const handleRegister = () => {
    navigate("/product_register", { state: { isEditing: false } });
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setCheckedProducts([]);
      setSelectAll(false);
    } else {
      setCheckedProducts(products.map((product) => product.productId));
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (productId) => {
    const currentIndex = checkedProducts.indexOf(productId);
    const newCheckedProducts = [...checkedProducts];

    if (currentIndex === -1) {
      newCheckedProducts.push(productId);
    } else {
      newCheckedProducts.splice(currentIndex, 1);
    }

    setCheckedProducts(newCheckedProducts);
  };

  const handleEdit = (productId) => {
    navigate("/product_register", {
      state: { isEditing: true, productId: productId },
    });
  };

  const handleDelete = async () => {
    try {
      if (checkedProducts.length === 0) {
        alert("선택된 상품이 없습니다.");
        return;
      }

      const promises = checkedProducts.map(async (productId) => {
        await deleteProduct(productId);
      });

      await Promise.all(promises);

      const updatedProducts = products.filter(
        (product) => !checkedProducts.includes(product.productId)
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

  const sumTotalStock = (options) => {
    const totalStock = (options || []).reduce((result, sku) => {
      result += parseFloat(sku.optionStock) || 0;
      return result;
    }, 0);

    return totalStock;
  };

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
                {/* <TableCell>이미지</TableCell> */}
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
                  상품 가격
                </TableCell>
                {/* <TableCell>상품 설명</TableCell> */}
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  판매시작일
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  판매종료일
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      onChange={() => handleCheckboxChange(product.productId)}
                      checked={checkedProducts.includes(product.productId)}
                    />
                  </TableCell>
                  <TableCell align="center">{product.productId}</TableCell>
                  {/* <TableCell>
                      {Array.isArray(product.productImages) &&
                      product.productImages.length > 0 ? (
                        <img
                          src={product.productImages[0]}
                          alt="Product Image"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell> */}
                  <TableCell align="center">{product.productName}</TableCell>
                  <TableCell align="center">{product.categoryName}</TableCell>
                  <TableCell align="center">
                    {product.options.map((option, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <br />}
                        {`${option.optionName} (${option.optionStock})`}
                      </React.Fragment>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {sumTotalStock(product.options)}
                  </TableCell>
                  <TableCell align="center">{product.productPrice}</TableCell>
                  {/* <TableCell>{product.productDescription}</TableCell> */}
                  <TableCell align="center">
                    {product.productSaleStart}
                  </TableCell>
                  <TableCell align="center">{product.productSaleEnd}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(product.productId)}>
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
