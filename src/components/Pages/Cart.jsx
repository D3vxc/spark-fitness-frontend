import React from "react";
import MainBanner from "../components/MainBanner";
import { Box } from "@mui/material";
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
        <Box
          sx={{
            height: "100vh",
          }}
        >
          {}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Cart;
