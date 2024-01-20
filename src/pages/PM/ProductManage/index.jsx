import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// get - api/product/getCategoryProduct
// delete - api/product/{productId}
import { getProduct, deleteProduct } from "../../../api/pmApi";

const PM = () => {
  const navigate = useNavigate();
  const { productInputs } = useLocation(); // productInputs으로 product 불러오기
  const [isRegistered, setIsRegistered] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getRegisteredProducts = async () => {
      try {
        const products = await getProduct();
        setProducts(products || []);
      } catch (error) {
        console.error(error);
      }
    };
    getRegisteredProducts();
  }, []);

  const handleRegister = () => {
    setIsRegistered(false);
    navigate("/product_register", { state: { isEditing: false } });
  };

  const handleEdit = (tableMeta) => {
    console.log("tableMeta", tableMeta);
    const { rowData } = tableMeta;
    navigate("/product_register", {
      state: { isEditing: true, productId: rowData[0] },
    });
  };

  const handleDelete = async (tableMeta) => {
    console.log("tableMeta", tableMeta);
    const { rowData } = tableMeta;
    const productId = rowData[0];
    try {
      const response = await deleteProduct(productId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const sumTotalStock = () => {
    const totalStock = (productInputs.options || []).reduce((result, sku) => {
      result += parseFloat(sku.optionStock) || 0;
      return result;
    }, 0);

    return totalStock;
  };

  const calculateTotalPrice = () => {
    const productPrice = parseFloat(productInputs.productPrice) || 0;
    return productPrice * sumTotalStock();
  };

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "multiple",
  };

  const columns = [
    { name: "productId", label: "ID" },
    {
      name: "productImages",
      label: "이미지",
      options: {
        customBodyRender: (value) => {
          const representativeImage =
            Array.isArray(value) && value.length > 0 ? value[0] : <></>;
          return (
            <img
              src={representativeImage}
              alt="Representative Image"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          );
        },
      },
    },
    { name: "productName", label: "상품명" },
    { name: "categoryName", label: "카테고리" },
    { name: "optionName", label: "옵션명" },
    {
      name: "optionStock",
      label: "옵션 수량",
      type: "number",
    },
    { name: "totalStock", label: "총 수량", type: "number" },
    {
      name: "productPrice",
      label: "상품 가격",
      type: "number",
    },
    { name: "totalPrice", label: "총 가격", type: "number" },
    { name: "productDescription", label: "상품 설명" },
    { name: "productSaleStart", label: "판매시작일" },
    { name: "productSaleEnd", label: "판매종료일" },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Button onClick={() => handleEdit(tableMeta)}>Edit</Button>;
        },
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: "0",
            background: "white",
            zIndex: 100,
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 0,
            background: "var(--main-color)",
            color: "white",
            zIndex: 101,
          },
        }),
      },
    },
  ];

  // const rows = [
  //   {
  //     productId: productInputs.productId,
  //     productImages: productInputs.productImages,
  //     productName: productInputs.productName,
  //     categoryName: productInputs.categoryName,
  //     options: productInputs.options,
  //     productPrice: productInputs.productPrice,
  //     totalStock: sumTotalStock(productInputs.options),
  //     totalPrice: calculateTotalPrice(
  //       productInputs.productPrice,
  //       productInputs.options
  //     ),
  //     productDescription: productInputs.productDescription,
  //     productSaleStart: productInputs.productSaleStart,
  //     productSaleEnd: productInputs.productSaleEnd,
  //   },
  // ];

  const rows = products.map((product) => ({
    productId: product.productId,
    productImages: product.productImages,
    productName: product.productName,
    categoryName: product.categoryName,
    options: product.options,
    productPrice: product.productPrice,
    totalStock: sumTotalStock(product.options),
    totalPrice: calculateTotalPrice(product.productPrice, product.options),
    productDescription: product.productDescription,
    productSaleStart: product.productSaleStart,
    productSaleEnd: product.productSaleEnd,
  }));

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
              <Button variant="contained" onClick={handleRegister}>
                상품 등록
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
          <MUIDataTable
            title={"MUJI MALL"}
            data={rows}
            columns={columns}
            options={options}
            onRowClick={(rowData) => handleEdit({ rowData })}
            contextActions={[
              {
                icon: "delete",
                tooltip: "Delete Product",
                onClick: (event, rowData) => handleDelete({ rowData }),
              },
            ]}
          />
        </Box>
      </Container>
    </>
  );
};

export default PM;
