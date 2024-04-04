import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useFetchAllProduct } from "../components/Hooks/getAllproduct";

function ProductsComponent() {
  const {
    data: getAllProduct,
    isLoading: getProductLoading,
    refetch: refetchUsers,
  } = useFetchAllProduct();

  console.log("getAllProduct", getAllProduct);

  if (getProductLoading) {
    return <Typography>Loading...</Typography>; // Display loading state
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Typography variant='h4' component='div'>
          Products
        </Typography>
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
