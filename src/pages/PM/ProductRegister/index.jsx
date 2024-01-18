import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
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
  ButtonGroup,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ProductRegister = () => {
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showFileUploadError, setShowFileUploadError] = useState(false);
  const [date, setDate] = useState(dayjs("2024-01-01"));

  const [productInputs, setProductInputs] = useState({
    productImages: [],
    imageIndex: 0,
    productName: "",
    categoryName: "",
    options: [
      {
        optionName: "",
        optionStock: "",
      },
    ],
    totalStock: 0,
    productPrice: "",
    productDescription: "",
    productSaleStart: dayjs(),
    productSaleDelete: dayjs(),
  });

  const handleSelectCategory = (e) => {
    setProductInputs({ ...productInputs, categoryName: e.target.value });
  };

  const handleAddOption = () => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      options: [
        ...prevInputs.options,
        {
          optionName: "",
          optionStock: "",
        },
      ],
    }));
  };

  const handleDeleteOption = (skuIndex) => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      options: prevInputs.options.filter((_, index) => index !== skuIndex),
    }));
  };

  const sumTotalStock = () => {
    const totalStock = productInputs.options.reduce((result, sku) => {
      result += parseFloat(sku.optionStock) || 0;
      return result;
    }, 0);

    return totalStock;
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (productInputs.productImages.length + files.length > 5) {
      setShowFileUploadError(true);
    } else {
      const newProductImages = [...productInputs.productImages, ...files].slice(
        0,
        5
      );

      setProductInputs({
        ...productInputs,
        productImages: newProductImages,
        imageIndex: newProductImages.length - 1,
      });

      setShowFileUploadError(false);
    }
  };

  const handlePrevImage = () => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      imageIndex:
        (prevInputs.imageIndex - 1 + prevInputs.productImages.length) %
        prevInputs.productImages.length,
    }));
  };

  const handleNextImage = () => {
    setProductInputs((prevInputs) => ({
      ...prevInputs,
      imageIndex: (prevInputs.imageIndex + 1) % prevInputs.productImages.length,
    }));
  };

  const handleFormSubmit = () => {
    const isFormValid =
      productInputs.productImages.length > 0 &&
      productInputs.productName &&
      productInputs.categoryName &&
      productInputs.options.length > 0 &&
      productInputs.options.some((sku) => sku.optionName && sku.optionStock) &&
      productInputs.productPrice &&
      productInputs.productDescription &&
      productInputs.productSaleStart &&
      productInputs.productSaleDelete;

    setShowSuccessAlert(isFormValid);
    setShowErrorAlert(!isFormValid);
    setShowFileUploadError(productInputs.productImages.length === 0);
  };

  const handleAlertClose = () => {
    if (showErrorAlert || showFileUploadError) {
      setShowErrorAlert(false);
      setShowFileUploadError(false);
    } else if (showSuccessAlert) {
      navigate("/product_manage");
    }
  };

  const handleReset = () => {
    setProductInputs({
      productImages: [],
      imageIndex: 0,
      productName: "",
      categoryName: "",
      options: [
        {
          optionName: "",
          optionStock: "",
        },
      ],
      productPrice: "",
      productDescription: "",
      productSaleStart: dayjs(),
      productSaleDelete: dayjs(),
    });

    setShowSuccessAlert(false);
    setShowErrorAlert(false);
    setShowFileUploadError(false);
  };

  return (
    <div>
      <Header />
      <main>
        <Container className="pr-container">
          <Box className="pr-title" sx={{ paddingTop: 5, flexGrow: 1 }}>
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
              flexDirection: "row",
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Container
              className="pr-img-box"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ marginBottom: 5 }}
              >
                upload img
                <ImageUploadInput
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Button>
              <Box>up to 5 files</Box>

              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: 500,
                }}
              >
                <Button onClick={handlePrevImage}>{"<"}</Button>
                <CardMedia
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 350,
                    height: 350,
                  }}
                  component="img"
                  alt={`Product Image ${productInputs.imageIndex + 1}`}
                  src={
                    productInputs.productImages.length > 0
                      ? URL.createObjectURL(
                          productInputs.productImages[productInputs.imageIndex]
                        )
                      : ""
                  }
                />
                <Button onClick={handleNextImage}>{">"}</Button>
              </Card>

              <Box
                className="pr-image-list"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Divider
                  orientation="horizontal"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  IMAGE LIST
                </Divider>

                <ImageList cols={5}>
                  {productInputs.productImages.map((image, index) => (
                    <ImageListItem
                      key={index}
                      style={{ width: 80, height: 80 }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product Image ${index + 1}`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>

                <Divider
                  orientation="horizontal"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                ></Divider>

                {showFileUploadError &&
                  productInputs.productImages.length === 0 && (
                    <Alert severity="error" onClose={handleAlertClose}>
                      Error: Please upload at least one file.
                    </Alert>
                  )}

                {showFileUploadError &&
                  productInputs.productImages.length > 0 && (
                    <Alert severity="error" onClose={handleAlertClose}>
                      Error: Up to 5 files are allowed.
                    </Alert>
                  )}
              </Box>
            </Container>

            <Container className="pr-description-box">
              <Box
                className="pr-inputs"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Avatar sx={{ marginTop: 2 }}>A</Avatar>
                <TextField
                  id="productName"
                  label="product name"
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
                  <InputLabel>category</InputLabel>
                  <Select
                    id="categoryName"
                    label="category"
                    value={productInputs.categoryName}
                    onChange={handleSelectCategory}
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="인기상품">인기상품</MenuItem>
                    <MenuItem value="주간특가">주간특가</MenuItem>
                    <MenuItem value="매거진">매거진</MenuItem>
                    <MenuItem value="아울렛">아울렛</MenuItem>
                  </Select>
                </FormControl>

                {productInputs.options.map((sku, skuIndex) => (
                  <div key={skuIndex}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        label="size or color"
                        value={sku.optionName}
                        onChange={(e) =>
                          setProductInputs((prevInputs) => {
                            const updatedOptions = [...prevInputs.options];
                            updatedOptions[skuIndex] = {
                              ...updatedOptions[skuIndex],
                              optionName: e.target.value,
                            };
                            return {
                              ...prevInputs,
                              options: updatedOptions,
                              totalStock: sumTotalStock(updatedOptions),
                            };
                          })
                        }
                        required
                        sx={{ marginTop: 2 }}
                      />

                      <TextField
                        label="stock"
                        value={sku.optionStock}
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) =>
                          setProductInputs((prevInputs) => {
                            const updatedOptions = [...prevInputs.options];
                            updatedOptions[skuIndex] = {
                              ...updatedOptions[skuIndex],
                              optionStock: e.target.value,
                            };
                            return {
                              ...prevInputs,
                              options: updatedOptions,
                              totalStock: sumTotalStock(updatedOptions),
                            };
                          })
                        }
                        required
                        sx={{ marginTop: 2, marginLeft: 1 }}
                      />

                      <ButtonGroup
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        {productInputs.options.length > 1 && (
                          <RemoveIcon
                            onClick={() => handleDeleteOption(skuIndex)}
                            sx={{ marginLeft: 1 }}
                          />
                        )}

                        {skuIndex === productInputs.options.length - 1 && (
                          <AddIcon
                            onClick={() => handleAddOption(skuIndex)}
                            sx={{ marginLeft: 1 }}
                          />
                        )}
                      </ButtonGroup>
                    </Box>
                  </div>
                ))}

                <TextField
                  id="totalStock"
                  label="total stock"
                  value={sumTotalStock()}
                  sx={{ marginTop: 2 }}
                />

                <TextField
                  id="productPrice"
                  label="product price"
                  value={productInputs.productPrice}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      productPrice: e.target.value,
                    })
                  }
                  type="number"
                  pattern="[0-9]*"
                  required
                  sx={{ marginTop: 2 }}
                />

                <TextField
                  id="productDescription"
                  label="product description"
                  value={productInputs.productDescription}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      productDescription: e.target.value,
                    })
                  }
                  required
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["SaleStartDate", "SaleEndDate"]}>
                    <DatePicker
                      label="Sale Start Date"
                      value={productInputs.productSaleStart}
                      onChange={(newDate) =>
                        setProductInputs((prevInputs) => ({
                          ...prevInputs,
                          productSaleStart: newDate,
                        }))
                      }
                    />
                    <DatePicker
                      label="Sale End Date"
                      value={productInputs.productSaleDelete}
                      onChange={(newDate) =>
                        setProductInputs((prevInputs) => ({
                          ...prevInputs,
                          productSaleDelete: newDate,
                        }))
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
                  <Alert severity="error" onClose={handleAlertClose}>
                    Error: Please fill in all required fields.
                  </Alert>
                )}
              </Box>
            </Container>
          </Container>
        </Container>
      </main>
      <Footer />
    </div>
  );
};
export default ProductRegister;

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
