import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  ButtonGroup,
  AppBar,
  Toolbar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PM = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const [productInputs, setProductInputs] = useState({
    productId: "",
    productName: "",
    productCategory: "",
    productOption: "",
    price: null,
    productQuantity: 1,
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const rows = [
    {
      productId: productInputs.productId,
      productName: productInputs.productName,
      productCategory: productInputs.productCategory,
      productOption: productInputs.productOption,
      price: productInputs.price,
      productQuantity: productInputs.productQuantity,
      description: productInputs.description,
    },
  ];
  const columns = [
    { id: "productId", label: "PRODUCT ID" },
    { id: "productName", label: "PRODUCT NAME" },
    { id: "productCategory", label: "PRODUCT CATEGORY" },
    { id: "productOption", label: "PRODUCT OPTION" },
    { id: "price", label: "PRICE", type: "number" },
    {
      id: "productQuantity",
      label: "PRODUCT QUANTITY",
      type: "number",
    },
    { id: "description", label: "DESCRIPTION" },
  ];

  const handleRegister = () => {
    setIsRegistered(false);
    navigate("/product_register");
  };

  const handleIncrement = () => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      productQuantity: prevInputs.productQuantity + 1,
      price: calculatePrice(),
    }));
  };

  const handleDecrement = () => {
    if (productInputs.productQuantity > 1) {
      setProductInputs((prevInputs) => ({
        ...prevInputs,
        productQuantity: prevInputs.productQuantity - 1,
        price: calculatePrice(),
      }));
    }
  };

  const calculatePrice = () => {
    return;
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <header>header section</header>
      <main>
        <Button variant="contained" onClick={handleRegister}>
          product register
        </Button>
        <Container>
          <Box className="pm-title" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Product Manage
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.productId}
                    </TableCell>
                    <TableCell> {row.productName}</TableCell>
                    <TableCell> {row.productCategory}</TableCell>
                    <TableCell> {row.productOption}</TableCell>
                    <TableCell> {row.price}</TableCell>
                    <TableCell> {row.productQuantity}</TableCell>
                    <TableCell> {row.description}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <>
                          <Button variant="contained" onClick={handleEdit}>
                            Done
                          </Button>
                          <ButtonGroup>
                            <Button onClick={handleDecrement}>-</Button>
                            <Button>{productInputs.productQuantity}</Button>
                            <Button onClick={handleIncrement}>+</Button>
                          </ButtonGroup>
                        </>
                      ) : (
                        <Button variant="contained" onClick={handleEdit}>
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
      <footer>footer section</footer>
    </div>
  );
};

export default PM;
