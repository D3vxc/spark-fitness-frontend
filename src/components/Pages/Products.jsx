import React from "react";
import MainBanner from "../components/MainBanner";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useFetchAllProduct } from "../Hooks/getAllproduct";

function Products() {
  const {
    data: getAllProduct,
    isLoading: getproductLoading,
    refetch: refetchProduct,
  } = useFetchAllProduct();

  console.log("getAllProduct", getAllProduct);

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
            // pb: "200px",
            width: "79%",
            flexWrap: "wrap",
            mx: "auto",
          }}
        >
          {getAllProduct?.map((x, i) => {
            return (
              <Paper
                key={i}
                elevation={0}
                container
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
                }}
              >
                <Box
                  component='img'
                  src={x?.image}
                  sx={{
                    width: "100%",
                    height: "auto",
                    mx: "auto",
                  }}
                />

                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    maxHeight: "40px",
                    overflow: "hidden",
                    fontFamily: "poppins",
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {x?.description}
                </Typography>
                <Typography
                  sx={{
                    width: "100%",
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
                    width: "100%",
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
            );
          })}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Products;
