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
  const [productInputs, setProductInputs] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const getRegisteredProducts = async () => {
      try {
        const products = await getProduct();
        setProductInputs(products);
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
      label: "PRODUCT IMAGES",
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
      productId: productInputs.productId,
      productImages: productInputs.productImages,
      productName: productInputs.productName,
      categoryName: productInputs.categoryName,
      options: productInputs.options,
      productPrice: productInputs.productPrice,
      totalStock: sumTotalStock(),
      totalPrice: calculateTotalPrice(),
      productDescription: productInputs.productDescription,
      productSaleStart: productInputs.productSaleStart,
      productSaleEnd: productInputs.productSaleEnd,
    },
  ];

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
      </main>
      <Footer />
    </div>
  );
};

export default PM;
