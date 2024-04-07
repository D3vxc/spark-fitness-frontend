import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainBanner from "../components/MainBanner";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { useFetchCart } from "../Hooks/getCartData";

function Cart() {
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useFetchCart();
  // console.log("cartData", cartData);

  const navigate = useNavigate();

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (productId) => {
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(newSelection);
  };

  const totalAmount = useMemo(() => {
    return cartData?.productData?.reduce((acc, item) => {
      if (selectedProducts.includes(item.product._id)) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  }, [cartData, selectedProducts]);

  const handleBuyNow = () => {
    console.log("Selected products for purchase:", selectedProducts);
    // Implement buy now functionality here
  };

  return (
    <React.Fragment>
      {" "}
      <Box
        sx={{
          background: "#FBFFFE",
          // overflow: "hidden",
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
            height: "120vh",
            width: "80%",
            mx: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              mt: "20px",
              display: "flex",
              background: "#F0F0F0",
              height: "70px",
              borderRadius: "10px",
            }}
          >
            {" "}
            <Grid item xl={1} lg={1} mx={1} sm={1} xs={1} sx={cartHeaderStyle}>
              Select
            </Grid>
            <Grid item xl={2} lg={2} mx={2} sm={2} xs={2} sx={cartHeaderStyle}>
              Image
            </Grid>
            <Grid item xl={2} lg={2} mx={2} sm={2} xs={2} sx={cartHeaderStyle}>
              Name
            </Grid>
            <Grid item xl={3} lg={3} mx={3} sm={3} xs={3} sx={cartHeaderStyle}>
              Description
            </Grid>
            <Grid item xl={1} lg={1} mx={1} sm={1} xs={1} sx={cartHeaderStyle}>
              Price
            </Grid>
            <Grid item xl={1} lg={1} mx={1} sm={1} xs={1} sx={cartHeaderStyle}>
              Quantity
            </Grid>
            <Grid item xl={2} lg={2} mx={2} sm={2} xs={2} sx={cartHeaderStyle}>
              Payment Status
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              // borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {cartData?.productData?.map((item, index) => (
              <Grid
                item
                xl={12}
                lg={12}
                mx={12}
                sm={12}
                xs={12}
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                  width: "2000px",
                  // borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Grid
                  item
                  xl={1}
                  lg={1}
                  mx={1}
                  sm={1}
                  xs={1}
                  sx={cartDataStyle}
                >
                  <Checkbox
                    checked={selectedProducts.includes(item?.product?._id)}
                    onChange={() => handleSelectProduct(item?.product?._id)}
                  />
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  mx={2}
                  sm={2}
                  xs={2}
                  sx={cartDataStyle}
                >
                  <img
                    src={item?.product?.image}
                    alt={item?.product?.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  mx={2}
                  sm={2}
                  xs={2}
                  sx={cartDataStyle}
                >
                  <Typography>{item?.product.name}</Typography>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  mx={3}
                  sm={3}
                  xs={3}
                  sx={cartDataStyle}
                >
                  <Typography>{item?.product.description}</Typography>
                </Grid>
                <Grid
                  item
                  xl={1}
                  lg={1}
                  mx={1}
                  sm={1}
                  xs={1}
                  sx={cartDataStyle}
                >
                  <Typography>₹{item?.product.price}</Typography>
                </Grid>
                <Grid
                  item
                  xl={1}
                  lg={1}
                  mx={1}
                  sm={1}
                  xs={1}
                  sx={cartDataStyle}
                >
                  <Typography>{item?.quantity}</Typography>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  mx={2}
                  sm={2}
                  xs={2}
                  sx={cartDataStyle}
                >
                  <Typography>
                    {item?.paymentStatus ? "Paid" : "Not Paid"}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>

          {selectedProducts.length > 0 && (
            <React.Fragment>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mt: 2,
                  mb: 4,
                }}
              >
                <Typography variant='h6'>
                  Total Amount: ₹{totalAmount}
                </Typography>
              </Grid>
              <Box
                item
                onClick={() => {
                  handleBuyNow();
                  navigate("/checkout");
                }}
                sx={{
                  mt: 2,
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  height: "50px",
                  border: "1px solid black",
                  borderRadius: "25px",
                  padding: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "#F0F0F0",
                  },
                }}
              >
                Buy Now
              </Box>
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Cart;

const cartHeaderStyle = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cartDataStyle = {
  textAlign: "center",
};
