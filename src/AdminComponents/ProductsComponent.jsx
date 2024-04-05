import React, { useState } from "react";
import { Typography, Box, Grid, Button, Modal, TextField } from "@mui/material";
import { useFetchAllProduct } from "../components/Hooks/getAllproduct";
import axios from "axios";
import { toast } from "react-toastify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

function ProductsComponent() {
  const navigate = useNavigate();
  const {
    data: getAllProduct,
    isLoading: getProductLoading,
    refetch: refetchProducts,
  } = useFetchAllProduct();

  console.log("getAllProduct", getAllProduct);

  const [products, setProducts] = useState([]); // Mocked products state
  const [isLoading, setIsLoading] = useState(false);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(1);
  const handleAddProductOpen = () => {
    setOpenAddProductDialog(true);
  };

  const handleAddProductClose = () => {
    setOpenAddProductDialog(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    setNameError(!name);
    setDescriptionError(!description);
    setPriceError(!price);
    setStockError(!stock);
    setImageError(!image);

    if (name && description && price && stock && image) {
      try {
        const response = await axios.post("/products/addproduct", {
          name,
          description,
          price,
          stock,
          image,
        });

        handleAddProductClose();
        toast.success("Product added successfully");
        refetchProducts();
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Error adding product");
      }
    } else {
      setIsLoading(false);
    }
  };

  if (getProductLoading) {
    return <Typography>Loading...</Typography>; // Display loading state
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant='h4' component='div'>
            Products
          </Typography>
          <PersonAddIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/addProduct")}
          />
        </Box>

        <Grid
          container
          sx={{
            height: "100%",
            maxHeight: "600px",
            overflow: "scroll",
          }}
        >
          {/* Header */}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              bgcolor: "#F3F3F3",
              borderBottom: "1px solid #E9EEF3",
              padding: "20px",
            }}
          >
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              Sr. No.
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Name
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
              Description
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Image
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Price
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Stock
            </Grid>
          </Grid>
          {/* Product Rows */}
          {getAllProduct?.map((data, i) => (
            <Grid
              key={i}
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                bgcolor: "#F3F3F3",
                borderBottom: "1px solid #E9EEF3",
                padding: "20px",
              }}
            >
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                {i + 1}
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                {data?.name}
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                {data?.description}
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Box
                  component='img'
                  src={data?.image}
                  alt='class image'
                  sx={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid
                item
                xl={2}
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{
                  display: "flex",
                }}
              >
                <Typography>₹</Typography> {data?.price}
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                {data?.stock}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default ProductsComponent;
