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
// post - api/product/addProduct
// put - api/product/editProduct{productId}
import { addProduct, editProduct } from "../../../api/pmApi";

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
    productId: "",
    productImages: [],
    imageIndex: 0,
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
    const totalStock = (productInputs.options || []).reduce((result, sku) => {
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

  const onSubmit = async () => {
    try {
      const isFormValid =
        productInputs.productName &&
        productInputs.categoryName &&
        productInputs.options.length > 0 &&
        productInputs.options.every(
          (sku) => sku.optionName && sku.optionStock
        ) &&
        productInputs.productPrice &&
        productInputs.productDescription &&
        productInputs.productSaleStart &&
        productInputs.productSaleEnd;

      if (isFormValid && productInputs.productImages.length > 0) {
        const formData = new FormData();
        formData.append(
          "productInfo",
          JSON.stringify({
            productName: productInputs.productName,
            productDescription: productInputs.productDescription,
            productPrice: Number(productInputs.productPrice),
            productSaleStart: dayjs(productInputs.productSaleStart).format(
              "YYYY-MM-DD"
            ),
            productSaleEnd: dayjs(productInputs.productSaleEnd).format(
              "YYYY-MM-DD"
            ),
            options: productInputs.options,
            category: productInputs.categoryName,
          })
        );

        for (let i = 0; i < productInputs.productImages.length; i++) {
          formData.append("productImages", productInputs.productImages[i]);
        }
        const response = await addProduct(formData);

        console.log(response);
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
        navigate("/product_manage", { state: { productInputs } });
      } else {
        setShowErrorAlert(true);
        setShowSuccessAlert(false);

        if (!isFormValid) {
          setShowErrorAlert(true);
          console.error("Error: Form data is not valid");
        }

        if (productInputs.productImages.length === 0) {
          setShowFileUploadError(true);
          console.error("Error: Please upload at least one file.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  const handleUpdate = async () => {
    const { options, productId } = productInputs;

    try {
      if (state.isEditing && productId) {
        const hasValidOption = options.every(
          (sku) => sku.optionStock === 0 || sku.optionStock > 0
        );

        if (hasValidOption) {
          const optionStockUpdates = options.map((sku) => ({
            optionStock: sku.optionStock,
          }));

          const requestBody = {
            productId: Number(productId),
            options: optionStockUpdates,
          };

          const response = await editProduct(productId, requestBody);
          console.log(response);

          setShowSuccessAlert(true);
          setShowErrorAlert(false);
        } else {
          setShowErrorAlert(true);
          setShowSuccessAlert(false);
          console.error("Error: Please enter valid option stock values.");
        }
      } else {
        console.error("Error: Invalid productId or editing state.");
      }
    } catch (error) {
      console.error("Error:", error);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  const onReset = () => {
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
    <>
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
                disabled={state.isEditing}
              >
                upload
                <ImageUploadInput
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Button>

              <Box sx={{ marginBottom: 2 }}>
                {showFileUploadError &&
                  productInputs.productImages.length === 0 && (
                    <Alert
                      severity="error"
                      onClose={() => setShowErrorAlert(false)}
                    >
                      Error: Please upload at least one file.
                    </Alert>
                  )}

                {showFileUploadError &&
                  productInputs.productImages.length > 0 && (
                    <Alert
                      severity="error"
                      onClose={() => setShowFileUploadError(false)}
                    >
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
                  alt={`이미지 ${productInputs.imageIndex + 1}`}
                  src={
                    productInputs.productImages &&
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
                  sx={{ marginTop: 2, marginBottom: 2, fontSize: 14 }}
                >
                  미리보기
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
                          alt={`이미지 ${index + 1}`}
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
                  <Typography sx={{ paddingLeft: 1 }}>관리자</Typography>
                </Box>

                <TextField
                  id="productName"
                  label="상품명"
                  value={productInputs.productName}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      productName: e.target.value,
                    })
                  }
                  required
                  sx={{ marginTop: 2 }}
                  disabled={state.isEditing}
                />
                <FormControl sx={{ marginTop: 2 }} disabled={state.isEditing}>
                  <InputLabel>카테고리</InputLabel>
                  <Select
                    id="categoryName"
                    label="카테고리"
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
                        label="size / color"
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
                        disabled={state.isEditing}
                      />

                      <TextField
                        label="수량"
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
                            disabled={state.isEditing}
                          >
                            <RemoveIcon />
                          </Button>
                        )}
                        {skuIndex === productInputs.options.length - 1 && (
                          <Button
                            onClick={() => handleAddOption(skuIndex)}
                            sx={{ marginLeft: 1, height: 20, width: 20 }}
                            disabled={state.isEditing}
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
                    onClose={() => setShowInfoAlert(false)}
                  >
                    up to 5 options
                  </Alert>
                )}

                <TextField
                  id="totalStock"
                  label="총 수량"
                  value={sumTotalStock()}
                  sx={{ marginTop: 2 }}
                  disabled={state.isEditing}
                />
                <TextField
                  id="productPrice"
                  label="상품 가격"
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
                  disabled={state.isEditing}
                />
                <TextField
                  id="productDescription"
                  label="상품 설명"
                  value={productInputs.productDescription}
                  onChange={(e) =>
                    setProductInputs({
                      ...productInputs,
                      productDescription: e.target.value,
                    })
                  }
                  required
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  disabled={state.isEditing}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["판매시작일", "판매종료일"]}>
                    <DatePicker
                      label="판매시작일"
                      value={productInputs.productSaleStart}
                      onChange={(newDate) =>
                        setProductInputs((prevInputs) => ({
                          ...prevInputs,
                          productSaleStart: newDate,
                        }))
                      }
                      readOnly={state.isEditing}
                    />
                    <DatePicker
                      label="판매종료일"
                      value={productInputs.productSaleEnd}
                      onChange={(newDate) =>
                        setProductInputs((prevInputs) => ({
                          ...prevInputs,
                          productSaleEnd: newDate,
                        }))
                      }
                      readOnly={state.isEditing}
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
                  onClick={onReset}
                  disabled={state.isEditing}
                >
                  reset
                </Button>

                {isEditing ? (
                  <Button variant="contained" onClick={handleUpdate}>
                    Update
                  </Button>
                ) : (
                  <Button variant="contained" onClick={onSubmit}>
                    Submit
                  </Button>
                )}
              </Box>
              <Box>
                {showSuccessAlert && (
                  <Alert
                    severity="success"
                    onClose={() => setShowSuccessAlert(false)}
                  >
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
      <Footer />
    </>
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
