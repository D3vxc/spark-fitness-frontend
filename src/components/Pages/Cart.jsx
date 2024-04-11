import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainBanner from "../components/MainBanner";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { useFetchCart } from "../Hooks/getCartData";
import axios from "axios";

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

  useEffect(() => {
    refetchCart();
  }, [selectedProducts, refetchCart]);

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

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_1XPSzkXhpRhsTx",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Test Transaction",
      image: data.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:7001/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          navigate("/payment-success");
        } catch (error) {
          console.log(error);
          navigate("/payment-failed");
        }
      },
      theme: {
        color: "#A1F65E",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:7001/payment/orders";
      const { data } = await axios.post(orderUrl, {
        amount: totalAmount,
      });
      console.log("data", data);
      initPayment(data.data);
    } catch (error) {
      console.error("Error", error);
    }
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
          mainText={"your Cart"}
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
          {cartData?.productData?.length > 0 ? (
            <Grid
              container
              sx={{
                mt: "20px",
                display: "flex",
                background: "#F0F0F0",
                height: "70px",
                borderRadius: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={1} textAlign='center'>
                Select
              </Grid>
              <Grid item xs={2} textAlign='center'>
                Image
              </Grid>
              <Grid item xs={3} textAlign='center'>
                Name
              </Grid>
              <Grid item xs={3} textAlign='center'>
                Description
              </Grid>
              <Grid item xs={1} textAlign='center'>
                Quantity
              </Grid>
              <Grid item xs={2} textAlign='center'>
                Price
              </Grid>
            </Grid>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                component='img'
                src={
                  "https://res.cloudinary.com/spark-cloud/image/upload/v1712482976/utility/emptyCartGrey.svg"
                }
                sx={{
                  width: "400px",
                  height: "400px",
                }}
              />
              {/* <Box
                component='img'
                src={
                  "https://res.cloudinary.com/spark-cloud/image/upload/v1712482730/utility/emptyCart.svg"
                }
                sx={{
                  width: "400px",
                  height: "400px",
                }}
              /> */}
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#BABABA",
                  textAlign: "center",
                }}
              >
                your cart is empty, <br />
                to add product click the button below!!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "15px",
                  background: "#F2F2F2",
                  color: "#FBFFFE",
                  borderRadius: "10px",
                  height: "35px",
                  width: "100px",
                  mt: "30px",
                  cursor: "pointer",
                  transform: "rotateX(70deg) rotateZ(30deg)",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s",
                  transition: "all 0.5s ease",
                  "&:hover": {
                    transform: "skew(0deg, 0deg) scale(1.1)",
                    fontSize: "18px",
                    background: "#A1F65E",
                  },
                }}
                onClick={() => navigate("/products")}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  Add now!!
                </Typography>
              </Box>
            </Box>
          )}

          {/* Cart Items */}
          {cartData?.productData?.map((item, index) => (
            <Grid
              container
              alignItems='center'
              key={index}
              sx={{ borderBottom: "1px solid #ddd", p: 2 }}
            >
              <Grid item xs={1} textAlign='center'>
                <Checkbox
                  checked={selectedProducts.includes(item.product._id)}
                  onChange={() => handleSelectProduct(item.product._id)}
                />
              </Grid>
              <Grid item xs={2} textAlign='center'>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </Grid>
              <Grid item xs={3} textAlign='center'>
                {item.product.name}
              </Grid>
              <Grid item xs={3} textAlign='center'>
                {item.product.description}
              </Grid>
              <Grid item xs={1} textAlign='center'>
                {item.quantity}
              </Grid>
              <Grid item xs={2} textAlign='center'>
                ₹{item.product.price}
              </Grid>
            </Grid>
          ))}

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
                  handlePayment();
                  // navigate("/checkout");
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
