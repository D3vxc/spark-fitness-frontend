import React from "react";
import MainBanner from "../components/MainBanner";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useFetchAllProduct } from "../Hooks/getAllproduct";
import "./AddToCartButton.css"; // Adjust the path as per your file structure
import { useNavigate } from "react-router-dom";

function Products() {
  const {
    data: getAllProduct,
    isLoading: getproductLoading,
    refetch: refetchProduct,
  } = useFetchAllProduct();

  const navigate = useNavigate();
  const [product, setProduct] = React.useState([]);

  return (
    <React.Fragment>
      <Box
        sx={{
          background: "#FBFFFE",
          overflow: "hidden",
        }}
      >
        <MainBanner
          mainText={"Our Products"}
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
            width: "80%",
            mx: "auto",
            height: "50vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            // background: "Red",
          }}
        >
          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "150px",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontFamilu: "poppins",
                color: "#524FF5",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              Products
            </Typography>
            <Typography
              sx={{
                fontFamilu: "poppins",
                color: "#000",
                fontSize: "35px",
                fontWeight: 700,
                lineHeight: "40px",
              }}
            >
              Gym Equipments & Supplements
            </Typography>
          </Grid>
          <Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
            <Typography
              sx={{
                position: "absolute",
                top: "7%",
                fontFamily: "poppins",
                fontSize: "230px",
                fontWeight: 800,
                color: "#FBFFFE",
                background: "transparent",
                textShadow: `
      -1px -1px 0 #E3E3E3,  
       1px -1px 0 #E3E3E3,
      -1px  1px 0 #E3E3E3,
       1px  1px 0 #E3E3E3`,
              }}
            >
              Products
            </Typography>
          </Grid>
        </Grid>

        {/* products are showing from here */}
        <Box
          sx={{
            display: "flex",
            width: "79%",
            flexWrap: "wrap",
            mx: "auto",
          }}
        >
          {getAllProduct?.map((x, i) => (
            <Paper
              onClick={() => {
                setProduct(x?._id);
                navigate(`/productView/${x?._id}`);
                // console.log(x, "product data here", x?._id);
              }}
              key={i}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "250px",
                height: "550px",
                background: "transparent",
                margin: "20px",
                gap: "10px",
                cursor: "pointer",
                position: "relative",
                "&:hover .addToCartButton": {
                  visibility: "visible",
                },
                "& .productImage": {
                  // Assign a class for targeting
                  width: "100%",
                  height: "auto",
                  mx: "auto",
                  transition: "height 0.3s ease-out", // Ensure smooth transition for both hover on and off
                },
                "&:hover .productImage": {
                  height: "calc(100% - 150px)", // Shrink the height of the image by 50px only on hover
                },
                "&:hover .productDescription": {
                  maxHeight: "100px", // Allow for one more line of text in description
                },
              }}
            >
              <Box
                component='img'
                className='productImage' // Use this class for the transition effect
                src={x?.image}
              />

              <Box
                className='addToCartButton'
                sx={{
                  width: "100px",
                  height: "50px",
                  position: "absolute",
                  left: "0",
                  background: "#fff",
                  top: "2%",
                  visibility: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "visibility 0.2s",
                }}
              >
                Add To Cart
              </Box>

              <Typography
                className='productDescription'
                sx={{
                  textAlign: "left",
                  maxHeight: "40px",
                  overflow: "hidden",
                  fontFamily: "poppins",
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  transition: "max-height 0.3s ease-in-out",
                }}
              >
                {x?.description}
              </Typography>

              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "poppins",
                  color: "#000",
                  minHeight: "50px",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "25px",
                }}
              >
                {x?.name}
              </Typography>

              <Typography
                sx={{
                  textAlign: "left",
                  color: "#000",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "22px",
                }}
              >
                ₹{x?.price}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Products;
