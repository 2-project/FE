import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const PM = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleEdit = (tableMeta) => {
    console.log("tableMeta", tableMeta);
    const { rowData } = tableMeta;
    navigate("/product_register", {
      state: { isEditing: true, productId: rowData[0] },
    });
  };

  const pmData = {
    productId: "number",
    productImages: [], // 대표이미지 설정?
    productName: "string",
    categoryName: "string",
    options: [
      {
        optionName: "string",
        optionStock: "number", // edit
      },
    ],
    productPrice: "number", // edit
    totalStock: "number",
    totalPrice: "number",
    productDescription: "string",
    productSaleStart: "Date",
    productSaleEnd: "Date",
  };

  const columns = [
    { name: "productId", label: "ID" },
    {
      name: "productImages",
      label: "PRODUCT IMAGES",
      options: {
        customBodyRender: (value) =>
          Array.isArray(value) ? value.join(", ") : value,
      },
    },
    { name: "productName", label: "PRODUCT NAME" },
    { name: "categoryName", label: "CATEGORY" },
    { name: "optionName", label: "OPTION NAME" },
    {
      name: "optionStock",
      label: "OPTION STOCK",
      type: "number",
    },
    { name: "totalStock", label: "TOTAL STOCK", type: "number" },
    {
      name: "productPrice",
      label: "PRODUCT PRICE",
      type: "number",
    },
    { name: "totalPrice", label: "TOTAL PRICE", type: "number" },
    { name: "productDescription", label: "PRODUCT DESCRIPTION" },
    { name: "productSaleStart", label: "START DATE" },
    { name: "productSaleDelete", label: "END DATE" },

    { name: "productSaleEnd", label: "END DATE" },
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

  const rows = [
    {
      productId: pmData.productId,
      productImages: pmData.productImages.join(", "),
      productName: pmData.productName,
      categoryName: pmData.categoryName,
      optionName: pmData.options[0].optionName,
      optionStock: pmData.options[0].optionStock,
      productPrice: pmData.productPrice,
      totalStock: pmData.totalStock,
      totalPrice: pmData.totalPrice,
      // totalStock: sumTotalStock(),
      // totalPrice: calculateTotalPrice(),
      productDescription: pmData.productDescription,
      productSaleStart: pmData.productSaleStart,
      productSaleEnd: pmData.productSaleEnd,
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "multiple",
  };

  const sumTotalStock = () => {
    const totalStock = pmData.options.reduce((result, sku) => {
      result += parseFloat(sku.optionStock) || 0;
      return result;
    }, 0);

    return totalStock;
  };
  // if totalStock == 0, 판매 종료, 테이블에서 삭제

  const calculateTotalPrice = () => {
    const productPrice = parseFloat(pmData.productPrice) || 0;
    return productPrice * sumTotalStock();
  };

  const handleRegister = () => {
    setIsRegistered(false);
    navigate("/product_register", { state: { isEditing: false } });
  };

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Box sx={{ paddingTop: 2 }}>
            <Button variant="contained" onClick={handleRegister}>
              Product Register
            </Button>
          </Box>

          <Box className="pm-title" sx={{ paddingTop: 5, flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Product Manage
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
            <MUIDataTable
              title={"MUJI MALL"}
              data={rows}
              columns={columns}
              options={options}
            />
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PM;
