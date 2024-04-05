import React from "react";
import MainBanner from "../components/MainBanner";
import { Box, Grid } from "@mui/material";
import { useFetchCart } from "../Hooks/getCartData";

function Cart() {
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useFetchCart();

  console.log("cartData", cartData);

  return (
    <React.Fragment>
      {" "}
      <Box
        sx={{
          background: "#FBFFFE",
          overflow: "hidden",
        }}
      >
        <MainBanner
          mainText={"Cart"}
          image={
            "https://res.cloudinary.com/spark-cloud/image/upload/v1711707451/Banners/ProductPageBanner.svg"
          }
          width={"950px"}
          imageHeight={"55vh"}
          paddingbottom={""} // only giving it to this page due there will be images on the background
        />
        <Grid
          container
          sx={{
            height: "100vh",
          }}
        >
          {cartData?.productData?.map((x, i) => {
            return (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={i}>
                <Box>{x.product}</Box>
                <Box>{x.quantity}</Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Cart;
