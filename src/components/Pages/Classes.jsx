import React, { useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useFetchAllClasses } from "../Hooks/getAllClasses";
import Cookies from "js-cookie";
import MainBanner from "../components/MainBanner";
import Banner from "../../assets/ClassesPageImages/BannerForClasses.svg";
import JoinOurClubImage from "../../assets/ClassesPageImages/Join.svg";

function Classes() {
  const {
    data: allClasses,
    isLoading: classesLoading,
    refetch: refetchClasses,
  } = useFetchAllClasses();

  function truncateWithEllipsis(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }
  useEffect(() => {
    //   const navigate = useNavigate();
    const userToken = Cookies.get("token");

    if (!userToken) {
      // i have just commented this line due the token is not available
      // window.location.href = "/login";
    }
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          background: "#FBFFFE",
          overflow: "hidden",
        }}
      >
        <MainBanner
          mainText={"Classes"}
          image={Banner}
          width={"auto"}
          imageHeight={"55vh"}
          // paddingbottom={"100px"} // only giving it to this page due there will be images on the background
        />

        <Box
          container
          sx={{
            width: "80%",
            mx: "auto",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "150px",
              flexDirection: "column",
              alignItems: "center",
              zIndex: "1",
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
              our trainers
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
              We Trained You To Gain
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                position: "absolute",
                top: "7%",
                fontFamily: "poppins",
                fontSize: "230px",
                fontWeight: 800,
                color: "#FBFFFE",
                left: "50%",
                background: "transparent",
                textShadow: `
      -1px -1px 0 #E3E3E3,  
       1px -1px 0 #E3E3E3,
      -1px  1px 0 #E3E3E3,
       1px  1px 0 #E3E3E3`,
              }}
            >
              Classes
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          sx={{
            width: "80%",
            mx: "auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {allClasses?.map((item, index) => (
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={6}
              xs={12}
              key={item.id || index}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "300px",
                height: "550px",
                background: "transparent",
                padding: "20px",
              }}
            >
              <Box
                component='img'
                src={item?.image}
                sx={{ height: "80%", width: "100%", objectFit: "cover" }}
              />
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "left", // Aligned to the left
                  fontFamily: "poppins",
                  color: "#000",
                  fontSize: "24px",
                  fontWeight: 700,
                  mt: "10px", // Optional: Adds a margin-top if needed
                }}
              >
                {item?.name}
              </Typography>
              <Typography
                sx={{
                  width: "100%", // Ensures it occupies the full width
                  fontFamily: "poppins",
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: 500,
                  textAlign: "left", // Aligned to the left
                  mt: "5px", // Optional: Adds a margin-top if needed
                }}
              >
                {truncateWithEllipsis(item?.description, 100)}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            backgroundImage: `url(${JoinOurClubImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "65vh",
            width: "100%",
            position: "relative",
            color: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            my: "150px",
          }}
        >
          <Typography
            sx={{
              width: "auto",
              fontFamily: "poppins",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            {" "}
            Join Our Club
          </Typography>
          <Typography
            sx={{
              width: "30%",
              mx: "auto",
              fontFamily: "poppins",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. point of
            using Lorem Ipsum is{" "}
          </Typography>
          <Button sx={ButtonStyle}>Start Now</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Classes;

const ButtonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "poppins",
  fontSize: "18px",
  fontWeight: 500,
  width: "180px",
  height: "50px",
  border: "2px solid #FBFFFE",
  background: "transparent",
  color: "#FBFFFE",
  "&:hover": {
    border: "2px solid transparent",
    background: "#A1F65E",
    color: "#1B1B1E",
    cursor: "pointer",
  },
};
