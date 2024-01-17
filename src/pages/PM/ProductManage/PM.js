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

const PM = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const [productInputs, setProductInputs] = useState({
    productId: "",
    productImages: [],
    productName: "",
    categoryName: "",
    options: [
      {
        optionName: "",
        optionStock: "",
      },
    ],
    productPrice: "",
    totalStock: "",
    totalPrice: "",
    productDescription: "",
  });

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
    { name: "optionStock", label: "OPTION STOCK" },
    { name: "totalStock", label: "TOTAL STOCK" },
    { name: "productPrice", label: "PRODUCT PRICE" },
    { name: "totalPrice", label: "TOTAL PRICE" },
    { name: "productDescription", label: "PRODUCT DESCRIPTION" },
  ];

  const rows = productInputs.options.map((sku, skuIndex) => ({
    productId: productInputs.productId,
    productImages: productInputs.productImages.join(", "),
    productName: productInputs.productName,
    categoryName: productInputs.categoryName,
    optionName: sku.optionName,
    optionStock: sku.optionStock,
    productPrice: productInputs.productPrice,
    totalStock: productInputs.totalStock,
    totalPrice: productInputs.totalPrice,
    // totalStock: sumTotalStock(),
    // totalPrice: calculateTotalPrice(),
    productDescription: productInputs.productDescription,
  }));

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "multiple",
  };

  const sumTotalStock = () => {
    const totalStock = productInputs.options.reduce((result, sku) => {
      result += parseFloat(sku.optionStock) || 0;
      return result;
    }, 0);

    return totalStock;
  };

  const calculateTotalPrice = () => {
    const productPrice = parseFloat(productInputs.productPrice) || 0;
    return productPrice * sumTotalStock();
  };

  const handleRegister = () => {
    setIsRegistered(false);
    navigate("/product_register");
  };

  return (
    <div>
      <header>header section</header>
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
      <footer>footer section</footer>
    </div>
  );
};

export default PM;
