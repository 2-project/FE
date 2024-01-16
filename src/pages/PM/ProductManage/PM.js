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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PM = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const [productInputs, setProductInputs] = useState({
    productId: "",
    productName: "",
    categoryName: "",
    productOption: "",
    price: 0,
    totalStock: 0,
    description: "",
    set: "set",
  });

  const [isEditing, setIsEditing] = useState(false);

  const rows = [
    {
      productId: productInputs.productId,
      productName: productInputs.productName,
      categoryName: productInputs.categoryName,
      productOption: productInputs.productOption,
      price: productInputs.price,
      totalStock: productInputs.totalStock,
      description: productInputs.description,
      set: productInputs.set,
    },
  ];
  const columns = [
    { id: "productId", label: "PRODUCT ID" },
    { id: "productName", label: "PRODUCT NAME" },
    { id: "categoryName", label: "CATEGORY" },
    { id: "productOption", label: "PRODUCT OPTION" },
    { id: "price", label: "PRICE", type: "number" },
    {
      id: "totalStock",
      label: "TOTAL STOCK",
      type: "number",
    },
    { id: "description", label: "DESCRIPTION" },
    { id: "set", label: "SET" },
  ];

  const handleRegister = () => {
    setIsRegistered(false);
    navigate("/product_register");
  };

  const handleIncrement = () => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      totalStock: prevInputs.totalStock + 1,
      price: calculatePrice(),
    }));
  };

  const handleDecrement = () => {
    if (productInputs.totalStock > 1) {
      setProductInputs((prevInputs) => ({
        ...prevInputs,
        totalStock: prevInputs.totalStock - 1,
        price: calculatePrice(),
      }));
    }
  };

  const handleTotalStockChange = (e) => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      totalStock: parseInt(e.target.value),
    }));
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
          <Box className="pm-title" sx={{ paddingTop: 5, flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Product Manage
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <TableContainer sx={{ paddingTop: 5, paddingBottom: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} sx={{ textAlign: "center" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {row.productId}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {" "}
                      {row.productName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {" "}
                      {row.categoryName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {" "}
                      {row.productOption}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {" "}
                      {row.price}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {isEditing ? (
                        <>
                          <ButtonGroup>
                            <Button onClick={handleDecrement}>-</Button>
                            <TextField
                              type="number"
                              pattern="[0-9]*"
                              value={productInputs.totalStock}
                              onChange={handleTotalStockChange}
                              sx={{ width: 80 }}
                            />
                            <Button onClick={handleIncrement}>+</Button>
                          </ButtonGroup>
                        </>
                      ) : (
                        <>{row.totalStock}</>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {" "}
                      {row.description}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {isEditing ? (
                        <Button variant="contained" onClick={handleEdit}>
                          Done
                        </Button>
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
