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
import { useNavigate, useLocation } from "react-router-dom";
import {} from "react-router-dom";
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
import axios from "axios";

const ProductRegister = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation(); // state.isEditing의 값에 따라 새 물품 등록인지 편집인지 결정. state.productId로 데이터 요청
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showFileUploadError, setShowFileUploadError] = useState(false);
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [isEditing, setIsEditing] = useState(false);

  const [productInputs, setProductInputs] = useState({
    productImages: [],
    imageIndex: 0, // 대표이미지 설정?
    productName: "",
    categoryName: "",
    options: [
      {
        optionCid: "",
        optionName: "",
        optionStock: "",
      },
    ],
    totalStock: 0,
    productPrice: "",
    productDescription: "",
    productSaleStart: null,
    productSaleEnd: null,
  });

  const handleSelectCategory = (e) => {
    setProductInputs({ ...productInputs, categoryName: e.target.value });
  };

  const handleAddOption = () => {
    if (productInputs.options.length < 5) {
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
    } else {
      setShowInfoAlert(true);
    }
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
    if (productInputs.productImages.length > 1) {
      const newIndex =
        (productInputs.imageIndex - 1 + productInputs.productImages.length) %
        productInputs.productImages.length;

      setProductInputs((prevInputs) => ({
        ...prevInputs,
        imageIndex: newIndex,
      }));
    }
  };

  const handleNextImage = () => {
    if (productInputs.productImages.length > 1) {
      const newIndex =
        (productInputs.imageIndex + 1) % productInputs.productImages.length;

      setProductInputs((prevInputs) => ({
        ...prevInputs,
        imageIndex: newIndex,
      }));
    }
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async () => {
    // post
    const isFormValid =
      productInputs.productName &&
      productInputs.categoryName &&
      productInputs.options.length > 0 &&
      productInputs.options.some((sku) => sku.optionName && sku.optionStock) &&
      productInputs.productPrice &&
      productInputs.productDescription &&
      productInputs.productSaleStart &&
      productInputs.productSaleEnd;

    if (isFormValid && productInputs.productImages.length > 0) {
      const formData = new FormData();
      formData.append("productName", productInputs.productName);
      formData.append("categoryName", productInputs.categoryName);
      formData.append("productPrice", productInputs.productPrice);
      formData.append("productDescription", productInputs.productDescription);
      formData.append("productSaleStart", productInputs.productSaleStart);
      formData.append("productSaleEnd", productInputs.productSaleEnd);

      productInputs.options.forEach((sku, index) => {
        formData.append(`options[${index}][optionName]`, sku.optionName);
        formData.append(`options[${index}][optionStock]`, sku.optionStock);
      });

      productInputs.productImages.forEach((image, index) => {
        formData.append(`productImages[${index}]`, image);
      });
      try {
        const response = await axios.post("/api/submit-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setShowSuccessAlert(true);
        setShowErrorAlert(false);
      } catch (error) {
        console.error("Error submitting product:", error);
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      }
    } else if (!isFormValid) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    } else if (productInputs.productImages.length === 0) {
      setShowFileUploadError(true);
    }

    // if (isFormValid && productInputs.productImages.length > 0) {
    //   setShowSuccessAlert(true);
    //   setShowErrorAlert(false);
    // } else if (!isFormValid) {
    //   setShowErrorAlert(true);
    //   setShowSuccessAlert(false);
    // } else if (productInputs.productImages.length === 0) {
    //   setShowFileUploadError(true);
    // }
  };

  const handleFormUpdate = async () => {
    // put
    const hasValidOption = productInputs.options.some(
      (sku) => sku.optionStock === 0 || sku.optionStock > 0
    );

    if (hasValidOption) {
      const optionStockUpdates = productInputs.options.map((sku) => ({
        optionCid: sku.optionCid, // Assuming you have an optionCid property
        optionStock: sku.optionStock,
      }));

      try {
        const response = await axios.put("/api/update-product-options", {
          optionStockUpdates,
        });

        setShowSuccessAlert(true);
        setShowErrorAlert(false);
      } catch (error) {
        console.error("Error updating product options:", error);
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      }
    } else {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }

    // if (hasValidOption) {
    //   setShowSuccessAlert(true); // Update success alert
    //   setShowErrorAlert(false);
    // } else {
    //   setShowErrorAlert(true);
    //   setShowSuccessAlert(false);
    // }
  };

  const handleAlertClose = () => {
    if (showErrorAlert || showFileUploadError || showInfoAlert) {
      setShowErrorAlert(false);
      setShowFileUploadError(false);
      setShowInfoAlert(false);
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
      productSaleStart: null,
      productSaleEnd: null,
    });

    setShowSuccessAlert(false);
    setShowErrorAlert(false);
    setShowFileUploadError(false);
    setShowInfoAlert(false);
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
          <Button variant="contained" onClick={handleEditing}>
            Edit
          </Button>
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
                disabled={isEditing}
              >
                upload img
                <ImageUploadInput
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Button>

              <Box sx={{ marginBottom: 2 }}>
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

              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: 500,
                }}
              >
                <CardMedia
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                    height: 400,
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    maxWidth: 500,
                    width: 500,
                    height: 104,
                  }}
                >
                  <Button
                    onClick={handlePrevImage}
                    disabled={productInputs.productImages.length <= 1}
                  >
                    {"<"}
                  </Button>
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
                  <Button
                    onClick={handleNextImage}
                    disabled={productInputs.productImages.length <= 1}
                  >
                    {">"}
                  </Button>
                </Box>
                <Divider
                  orientation="horizontal"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                ></Divider>
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar src="/broken-image.jpg" />
                  <Typography sx={{ paddingLeft: 1 }}>Administrator</Typography>
                </Box>

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
                  disabled={isEditing}
                />
                <FormControl sx={{ marginTop: 2 }} disabled={isEditing}>
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
                        disabled={isEditing}
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
                          <Button
                            onClick={() => handleDeleteOption(skuIndex)}
                            sx={{ marginLeft: 1, height: 20, width: 20 }}
                            disabled={isEditing}
                          >
                            <RemoveIcon />
                          </Button>
                        )}
                        {skuIndex === productInputs.options.length - 1 && (
                          <Button
                            onClick={() => handleAddOption(skuIndex)}
                            sx={{ marginLeft: 1, height: 20, width: 20 }}
                            disabled={isEditing}
                          >
                            <AddIcon />
                          </Button>
                        )}
                      </ButtonGroup>
                    </Box>
                  </div>
                ))}

                {showInfoAlert && (
                  <Alert
                    severity="info"
                    sx={{ marginTop: 2 }}
                    onClose={handleAlertClose}
                  >
                    up to 5 options
                  </Alert>
                )}

                <TextField
                  id="totalStock"
                  label="total stock"
                  value={sumTotalStock()}
                  sx={{ marginTop: 2 }}
                  disabled={isEditing}
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
                  disabled={isEditing}
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
                  disabled={isEditing}
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
                      disabled={isEditing}
                    />
                    <DatePicker
                      label="Sale End Date"
                      value={productInputs.productSaleEnd}
                      onChange={(newDate) =>
                        setProductInputs((prevInputs) => ({
                          ...prevInputs,
                          productSaleEnd: newDate,
                        }))
                      }
                      disabled={isEditing}
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
                <Button
                  variant="contained"
                  onClick={handleReset}
                  disabled={isEditing}
                >
                  reset
                </Button>

                {isEditing ? (
                  <Button variant="contained" onClick={handleFormUpdate}>
                    Update
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleFormSubmit}>
                    Submit
                  </Button>
                )}
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
