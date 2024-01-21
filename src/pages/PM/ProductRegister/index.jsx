import React, { useEffect, useState } from "react";
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
  const { state } = useLocation(); // state.isEditing의 값에 따라 새 물품 등록인지 편집인지 결정
  const [date, setDate] = useState(dayjs());
  const isEditing = state ? state.isEditing : false;
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
    if (productInputs.options.length === 0) {
      alert("최소 1개의 옵션을 선택하세요.");
    } else if (productInputs.options.length < 5) {
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
      alert("옵션은 최대 5개까지 선택됩니다.");
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
    // 이미지 업로드
    const files = e.target.files;

    if (productInputs.productImages.length + files.length > 5) {
      alert("파일은 최대 5개까지 업로드됩니다.");
    } else {
      const newProductImages = [...productInputs.productImages, ...files].slice(
        0,
        5
      );

      setProductInputs((prevInputs) => ({
        ...prevInputs,
        productImages: newProductImages,
        imageIndex: newProductImages.length - 1,
      }));
    }
  };

  const handlePrevNextImage = (direction) => {
    if (productInputs.productImages.length > 1) {
      const newIndex =
        (productInputs.imageIndex +
          direction +
          productInputs.productImages.length) %
        productInputs.productImages.length;

      setProductInputs((prevInputs) => ({
        ...prevInputs,
        imageIndex: newIndex,
      }));
    }
  };

  const handlePrevImage = () => handlePrevNextImage(-1);
  const handleNextImage = () => handlePrevNextImage(1);

  const onSubmit = async () => {
    // post 요청
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
            options: productInputs.options.map((option) => ({
              optionCid: option.optionCid,
              optionName: option.optionName,
              optionStock: option.optionStock,
            })),
            category: productInputs.categoryName,
          })
        );

        for (let i = 0; i < productInputs.productImages.length; i++) {
          formData.append("productImages", productInputs.productImages[i]);
        }
        const response = await addProduct(formData);

        console.log(response);

        alert("상품 등록이 완료되었습니다.");
        navigate("/product_manage", { state: { products: productInputs } });
      } else {
        if (!isFormValid) {
          alert("빈칸을 채워주세요.");
        }
        if (productInputs.productImages.length === 0) {
          alert("파일을 한 개 이상 올려주세요.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // state.isEditing으로 edit mode
    if (state.isEditing) {
      const editingProducts = async () => {
        try {
          const optionsArray = Array.isArray(state.optionCid)
            ? state.optionCid
            : [];

          setProductInputs({
            productId: state.productId,
            productImages: state.productId,
            productName: state.productName,
            categoryName: state.categoryName,
            options:
              optionsArray.length > 0
                ? optionsArray
                : [
                    {
                      optionCid: "",
                      optionName: "",
                      optionStock: "",
                    },
                  ],
            totalStock: state.totalStock,
            productPrice: state.productPrice,
            productDescription: state.productDescription,
            productSaleStart: state.productSaleStart,
            productSaleEnd: state.productSaleEnd,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      };
      editingProducts();
    }
  }, [state.isEditing, state.optionCid]);

  const handleEdit = async () => {
    // 수량 수정
    const { options } = productInputs;

    try {
      if (state.isEditing) {
        const hasValidOption = options.every(
          (sku) => sku.optionStock === 0 || sku.optionStock > 0
        );

        if (hasValidOption) {
          const optionStockUpdates = options.map((sku) => ({
            optionCid: sku.optionCid,
            optionStock: sku.optionStock,
          }));

          const requestBody = {
            options: optionStockUpdates,
          };

          const response = await editProduct(requestBody);
          console.log(response);

          alert("상품이 업데이트되었습니다.");
          navigate("/product_manage");
        } else {
          alert("수량을 입력해주세요.");
        }
      } else {
        alert("상품을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("상품 업데이트 중 오류가 발생했습니다.");
    }
  };

  const onReset = () => {
    // 초기화
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
    alert("모든 입력이 초기화되었습니다.");
  };

  return (
    <>
      <Container className="pr-container">
        <Box className="pr-title" sx={{ paddingTop: 5, flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ background: "none", color: "#000000DE" }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                상품 등록
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
              파일 선택
              <ImageUploadInput
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </Button>

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
                    disabled={state.isEditing}
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
                    disabled={state.isEditing}
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
                초기화
              </Button>

              <Button
                variant="contained"
                onClick={state.isEditing ? handleEdit : onSubmit}
              >
                {state.isEditing ? "수정" : "등록"}
              </Button>
            </Box>
          </Container>
        </Container>
      </Container>
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
