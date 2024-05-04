import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { useFetchCart } from "../Hooks/getCartData";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateCart, useRemoveFromCart } from "../Hooks/CartActions";
import { FetchUser } from "../Hooks/GetCurrentUserData";
import { useFetchAllProduct } from "../Hooks/getAllproduct";
import rightArrow from "../../assets/HeaderComponentImages/rightArrow.svg";

function CartPopUp(props) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useFetchCart();
  // console.log("cartData", cartData);

  const {
    mutate: updateCartItem,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateCart();

  const {
    mutate: deleteCartItem,
    isLoading: deleteLoading,
    error: deleteError,
  } = useRemoveFromCart();

  const {
    data: getAllProduct,
    isLoading: getproductLoading,
    error: getproductError,
    refetch: refetchProduct,
  } = useFetchAllProduct();

  const {
    data: LoggedInUser,
    error: LoggedInUserError,
    isLoading: LoggedInUserLoading,
    refetch: LoggedInUserRefetch,
  } = FetchUser();

  useEffect(() => {
    if (cartData?.productData) {
      const initialQuantities = cartData.productData.reduce((acc, item) => {
        acc[item.product._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartData]);

  const calculateTotal = () => {
    return cartData?.productData?.reduce((total, item) => {
      const itemTotal =
        item?.product?.price *
        (quantities[item?.product?._id] || item?.quantity);
      return total + itemTotal;
    }, 0);
  };
  const total = calculateTotal();

  const updateQuantity = (productId, delta) => {
    setQuantities((prev) => {
      const product = cartData.productData.find(
        (p) => p.product._id === productId
      );
      const newQuantity = Math.max(
        1,
        Math.min(product.product.stock, prev[productId] + delta)
      );
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handleRemoveItem = (productId) => {
    deleteCartItem(productId);
  };

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
        amount: total,
      });
      console.log("data", data);
      initPayment(data.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <React.Fragment>
      {!cartData?.productData ? (
        <Box
          sx={{
            display: "flex",
            background: "#FBFFFE",
            flexDirection: "column",
            width: "30%",
            justifyContent: "flex-end",
            ml: "auto",
            height: "100%",
            borderRadius: "25px 0px 0px 25px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              mx: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "50px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <CloseIcon
                  onClick={props.CloseModal}
                  sx={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "auto",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontSize: "26px",
                  color: "#000000",
                  fontWeight: 600,
                }}
              >
                Your cart is empty
              </Typography>
              <Box
                onClick={() => {
                  navigate("/products");
                  props.CloseModal();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                  height: "50px",
                  background: "#000000",
                  borderRadius: "25px",
                  cursor: "pointer",
                  color: "#FBFFFE",
                  fontFamily: "poppins",
                  border: "1px solid #000",
                  padding: "0px 25px 0px 25px",
                  "&:hover": {
                    background: "transparent",
                    color: "#000",
                    border: "1px solid #000",
                  },
                }}
              >
                continue shopping
              </Box>
            </Box>

            <Grid
              container
              sx={{
                display: "flex",
                width: "100%",
                height: "450px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid #D3D3D3",
                overflowY: "auto",
              }}
            >
              {getAllProduct?.slice(-1)?.map((item, index) => (
                <Grid
                  container
                  alignItems='center'
                  key={index}
                  sx={{
                    width: "65%",
                    height: "400px",
                    paddingBottom: "15px",
                    border: "1px solid #000",
                    borderRadius: "20px",
                    mx: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // borderBottom: "1px solid #D3D3D3",
                  }}
                >
                  <Box
                    component='img'
                    src={item?.image}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        padding: "5px 5px 5px 15px",
                      }}
                    >
                      Just In
                    </Typography>
                    <Box component='img' src={rightArrow} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            background: "#FBFFFE",
            flexDirection: "column",
            width: "30%",
            justifyContent: "flex-end",
            ml: "auto",
            height: "100%",
            borderRadius: "25px 0px 0px 25px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              mx: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "50px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: "26px",
                    color: "#000000",
                    fontWeight: 600,
                  }}
                >
                  Your Cart
                </Typography>
                <CloseIcon
                  onClick={props.CloseModal}
                  sx={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "50px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #D3D3D3",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: "12px",
                    color: "#6A6A6A",
                    fontWeight: 300,
                    textTransform: "uppercase",
                  }}
                >
                  Product
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: "12px",
                    color: "#6A6A6A",
                    fontWeight: 300,
                    textTransform: "uppercase",
                  }}
                >
                  Total
                </Typography>
              </Box>
            </Box>

            <Grid
              container
              sx={{
                display: "flex",
                width: "100%",
                height: "450px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid #D3D3D3",
                overflowY: "auto",
              }}
            >
              {cartData?.productData?.map((item, index) => (
                <Grid
                  container
                  alignItems='center'
                  key={item?.product?._id}
                  sx={{
                    width: "100%",
                    height: "120px",
                    paddingBottom: "15px",

                    // borderBottom: "1px solid #D3D3D3",
                  }}
                >
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    textAlign='center'
                  >
                    <img
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      style={{ width: "80px", height: "100px" }}
                    />
                  </Grid>

                  <Grid
                    item
                    xl={6.5}
                    lg={6.5}
                    md={6.5}
                    sm={6.5}
                    xs={6.5}
                    sx={{
                      display: "flex",
                      width: "80%",
                      mx: "auto",
                      padding: "0px 10px 0px 10px",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                          fontSize: "14px",
                          color: "#000000",
                          fontWeight: 600,
                          // padding: "5px",
                          lineHeight: "20px",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {item?.product?.name}
                      </Typography>
                      <Typography>₹{item?.product?.price}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "30px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        key={item.product._id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border: "1px solid #000",
                          borderRadius: "5px",
                          width: "100px",
                          height: "30px",
                          cursor: "pointer",
                          borderRadius: "30px",
                          padding: "10px",
                        }}
                      >
                        <Box
                          onClick={() => updateQuantity(item.product._id, -1)}
                        >
                          -
                        </Box>
                        <Box>{quantities[item.product._id]}</Box>
                        <Box
                          onClick={() => updateQuantity(item.product._id, 1)}
                        >
                          +
                        </Box>
                      </Box>

                      <Box
                        onClick={() => handleRemoveItem(item?.product?._id)}
                        component='img'
                        src={
                          "https://res.cloudinary.com/spark-cloud/image/upload/v1713675394/utility/TrashCan.svg"
                        }
                        alt='delete'
                        sx={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={2.5}
                    xs={2.5}
                    textAlign='center'
                  >
                    ₹
                    {item?.product?.price *
                      (quantities[item?.product?._id] || item?.quantity)}{" "}
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "150px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: "20px",
                    color: "#000000",
                    fontWeight: 600,
                    // padding: "5px",
                    lineHeight: "20px",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Estimated total
                </Typography>
                <Typography variant='subtitle1'>
                  ₹{total?.toFixed(2)}
                </Typography>{" "}
              </Box>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontSize: "12px",
                  color: "#6A6A6A",
                  fontWeight: 300,
                  textTransform: "none",
                  textAlign: "Left",
                  py: "10px",
                }}
              >
                Tax included. Shipping and discounts calculated at checkout.
              </Typography>
              <Box
                onClick={handlePayment}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "50px",
                  background: "#000000",
                  borderRadius: "25px",
                  cursor: "pointer",
                  color: "#FBFFFE",
                  fontFamily: "poppins",
                  border: "1px solid #000",
                  "&:hover": {
                    background: "transparent",
                    color: "#000",
                    border: "1px solid #000",
                  },
                }}
              >
                Checkout
              </Box>
            </Box>
          </Box>
        </Box>
      )}{" "}
    </React.Fragment>
  );
}

export default CartPopUp;
