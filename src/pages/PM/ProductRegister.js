import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  ButtonGroup,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  Card,
  CardMedia,
  Alert,
  FormLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

const ProductRegister = () => {
  const navigate = useNavigate();
  // const [productImage, setProductImage] = useState(null);
  // const [productName, setProductName] = useState("");
  // const [productCategory, setProductCategory] = useState("");
  // const [productOption, setProductOption] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");

  const [productInputs, setProductInputs] = useState({
    productImage: null,
    productName: "",
    productCategory: "",
    productOption: "",
    price: null,
    productQuantity: 1,
    description: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSelectCategory = (e) => {
    setProductInputs({ ...productInputs, productCategory: e.target.value });
  };

  const handleSelectOption = (e) => {
    setProductInputs({ ...productInputs, productOption: e.target.value });
  };

  const ImageUploadInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProductInputs({ ...productInputs, productImage: file });
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

  const handleFormSubmit = () => {
    if (
      productInputs.productImage &&
      productInputs.productName &&
      productInputs.productCategory &&
      productInputs.productOption &&
      productInputs.price &&
      productInputs.productQuantity &&
      productInputs.description
    ) {
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } else {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  const handleAlertClose = () => {
    navigate("/product_manage");
  };

  const handleReset = () => {
    setProductInputs({
      productImage: null,
      productName: "",
      productCategory: "",
      productOption: "",
      price: null,
      productQuantity: 1,
      description: "",
    });

    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  return (
    <div>
      <header>header section</header>
      <main>
        <Box className="category-title">category bar</Box>
        <Container className="pr-container">
          <Box className="pr-title" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Product Register
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 5,
              paddingBottom: 10,
            }}
          >
            <Container
              className="pr-img-box"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: 550,
                height: 600,
                backgroundColor: "pink",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: 500,
                }}
              >
                <Button>prev</Button>
                <CardMedia
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 350,
                    height: 350,
                  }}
                  component="img"
                  alt="Product Image"
                  src={
                    productInputs.productImage
                      ? URL.createObjectURL(productInputs.productImage)
                      : ""
                  }
                />
                <Button>next</Button>
              </Card>

              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ marginTop: 2 }}
              >
                upload img
                <ImageUploadInput
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Button>
            </Container>

            <Container
              className="pr-description-box"
              sx={{ width: 550, height: 600, backgroundColor: "skyblue" }}
            >
              <Box
                className="pr-inputs"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Avatar sx={{ marginTop: 2 }}>staff</Avatar>

                <TextField
                  id="productName"
                  label={"product name"}
                  value={productInputs.productName}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      productName: e.target.value,
                    })
                  }
                  required
                  sx={{ marginTop: 2 }}
                />

                <FormControl sx={{ marginTop: 2 }}>
                  <InputLabel>product category</InputLabel>
                  <Select
                    id="productCategory"
                    value={productInputs.productCategory}
                    onChange={handleSelectCategory}
                    label="product category"
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="남성복">남성복</MenuItem>
                    <MenuItem value="여성복">여성복</MenuItem>
                    <MenuItem value="생활잡화">생활잡화</MenuItem>
                    <MenuItem value="식품">식품</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ marginTop: 2 }}>
                  <InputLabel>product option</InputLabel>
                  <Select
                    id="productOption"
                    value={productInputs.productOption}
                    onChange={handleSelectOption}
                    label="product option"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="price"
                  label={"product price"}
                  value={productInputs.price}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      price: e.target.value,
                    })
                  }
                  type="number"
                  pattern="[0-9]*"
                  required
                  sx={{ marginTop: 2 }}
                />

                <FormControl
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    marginTop: 2,
                  }}
                >
                  <FormLabel sx={{ paddingRight: 2 }}>
                    product quantity
                  </FormLabel>
                  <ButtonGroup>
                    <Button onClick={handleDecrement}>-</Button>
                    <Button>{productInputs.productQuantity}</Button>
                    <Button onClick={handleIncrement}>+</Button>
                  </ButtonGroup>
                </FormControl>

                <TextField
                  id="description"
                  label={"product description"}
                  value={productInputs.description}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      description: e.target.value,
                    })
                  }
                  required
                  sx={{ marginTop: 2 }}
                />
              </Box>
              <Box
                className="pr-description-button"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Button variant="contained" onClick={handleReset}>
                  reset
                </Button>
                <Button variant="contained" onClick={handleFormSubmit}>
                  submit
                </Button>
              </Box>
              <Box>
                {showSuccessAlert && (
                  <Alert severity="success" onClose={handleAlertClose}>
                    Success: Product registered successfully!
                  </Alert>
                )}

                {showErrorAlert && (
                  <Alert
                    severity="error"
                    onClose={() => setShowErrorAlert(false)}
                  >
                    Error: Please fill in all required fields.
                  </Alert>
                )}
              </Box>
            </Container>
          </Container>
        </Container>
      </main>
      <footer>footer section</footer>
    </div>
  );
};

export default ProductRegister;
