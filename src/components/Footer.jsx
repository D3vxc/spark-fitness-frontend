import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import LogoImage from "../assets/HomePageImages/Logo.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import UpArrow from "../assets/FooterImages/Up Arrow.svg";
import one from "../assets/FooterImages/1.svg";
import two from "../assets/FooterImages/2.svg";
import three from "../assets/FooterImages/3.svg";
import four from "../assets/FooterImages/4.svg";
import five from "../assets/FooterImages/5.svg";
import six from "../assets/FooterImages/6.svg";
import { useNavigate } from "react-router-dom";

const FooterImages = [
  {
    id: 1,
    image: one,
  },
  {
    id: 2,
    image: two,
  },
  {
    id: 3,
    image: three,
  },
  {
    id: 4,
    image: four,
  },
  {
    id: 5,
    image: five,
  },
  {
    id: 6,
    image: six,
  },
];
function Footer() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box
        sx={{
          background: "#1C2229",
          position: "relative",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            ".image-overlay": {
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(255, 0, 0, 0.5)", // Example red color
                mixBlendMode: "multiply", // This blend mode will colorize the image similarly to your example
              },
            },
            img: {
              width: "100%",
              height: "auto",
              display: "block",
            },
          }}
        >
          {FooterImages?.map((data) => {
            return (
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2} key={data?.id}>
                <Box className='image-overlay'>
                  <Box component='img' src={data?.image} />
                </Box>{" "}
              </Grid>
            );
          })}
        </Grid>
        <Typography
          sx={{
            position: "absolute",
            top: "18%",
            left: "50%",
            zIndex: 1,
            transform: "translate(-50%, -50%)",
            fontFamily: "poppins",
            fontSize: "30px",
            fontWeight: 800,
            letterSpacing: "0em",
            textAlign: "center",
            color: "#FBFFFE",
          }}
        >
          {" "}
          follow us on instagram
        </Typography>
        <Box
          sx={{
            background: "#1C2229",
            height: "350px",
            padding: "50px",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={4.5}
              sm={4.5}
              md={4.5}
              lg={4.5}
              xl={4.5}
              sx={{
                background: "transparent",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component='img'
                    src={LogoImage}
                    sx={
                      {
                        //  height: "30px", width: "30px"
                      }
                    }
                  />{" "}
                  <Typography
                    sx={{
                      mx: "10px",
                      color: "#FBFFFE",
                      fontFamily: "Inter",
                      fontSize: "22px",
                      fontWeight: 800,
                      letterSpacing: "0em",
                      textAlign: "left",
                    }}
                  >
                    Spark Fitness
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: "16px",
                    color: "#BCBCBC",
                    mt: "20px",
                    mb: "30px",
                  }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quidem, esse aperiam error?
                </Typography>
              </Box>
              <Box sx={ContactDetailsBox}>
                <Box>
                  {" "}
                  <Typography sx={DetailLabel}> call :</Typography>{" "}
                  <Typography
                    sx={DetailData}
                    component='a'
                    // href='tel:+919327771958'
                  >
                    +91 9327771958
                  </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography sx={DetailLabel}> Mail :</Typography>
                  <Typography sx={DetailData}>
                    {" "}
                    sf.support@gmail.com{" "}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              sx={{
                background: "transparent",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={UtilityPagesMainText}>Utility Pages</Typography>
              <Box sx={utilsPageLinks}>
                <Typography
                  sx={UtilityPagesSubText}
                  onClick={() => navigate("/")}
                >
                  Home
                </Typography>
                <Typography sx={UtilityPagesSubText}>Privacy Policy</Typography>
                <Typography
                  sx={UtilityPagesSubText}
                  onClick={() => navigate("/contactus")}
                >
                  Contact
                </Typography>
                <Typography sx={UtilityPagesSubText}>Help us</Typography>
                <Typography
                  sx={UtilityPagesSubText}
                  onClick={() => navigate("/about")}
                >
                  About
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={4.5}
              sm={4.5}
              md={4.5}
              lg={4.5}
              xl={4.5}
              sx={{
                background: "transparent",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    color: "#FBFFFE",
                    fontFamily: "Inter",
                    fontSize: "22px",
                    fontWeight: 800,
                    letterSpacing: "0em",
                    textAlign: "left",
                  }}
                >
                  Newsletter
                </Typography>
                <Box
                  sx={{
                    mt: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <TextField
                    type='email'
                    placeholder='Enter your email'
                    sx={{
                      border: "1px solid #485059",
                      background: "#242A32",
                      color: "#BCBCBC", // Text color
                      "& .MuiInputBase-root": {
                        border: "none", // Removes border
                        background: "#242A32",
                        "& input": {
                          "-webkit-appearance": "none", // Targets WebKit browsers to remove default styling
                          color: "#BCBCBC", // Ensures text color consistency
                          "::placeholder": {
                            color: "#BCBCBC",
                            opacity: 1,
                          },
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                  <Box sx={ButtonStyle}>Subscribe</Box>
                </Box>
                <Box sx={{ display: "flex", gap: "7px", mt: "20px" }}>
                  <InstagramIcon sx={iconStyle} />
                  <FacebookIcon sx={iconStyle} />
                  <TwitterIcon sx={iconStyle} />
                </Box>

                <Box
                  sx={{
                    pt: "30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "25px",
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid #485059",
                      width: "250px",
                      height: 0,
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <Box
                      component='img'
                      src={UpArrow}
                      sx={{
                        color: "#FBFFFE",
                        width: "50px",
                        cursor: "pointer",
                      }} // Ensure cursor changes to pointer on hover
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      } // Scrolls to the top of the page smoothly
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Footer;

const UtilityPagesMainText = {
  color: "#FBFFFE",
  fontFamily: "poppins",
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "0em",
  textAlign: "left",
  py: "10px",
};

const UtilityPagesSubText = {
  color: "#BCBCBC",
  fontFamily: "poppins",
  fontSize: "16px",
  fontWeight: 500,
  letterSpacing: "0em",
  textAlign: "left",
  "&:hover": {
    cursor: "pointer", // Changes the cursor to pointer
    textDecoration: "underline", // Underlines text on hover
  },
};

const ContactDetailsBox = {
  border: "1px solid #485059",
  background: "#242A32",
  padding: "20px",
};

const DetailLabel = {
  color: "#A1F65E",
  fontFamily: "poppins",
  fontSize: "18px",
  fontWeight: 500,
  letterSpacing: "0em",
  textAlign: "left",
};

const DetailData = {
  color: "#BCBCBC",
  fontFamily: "poppins",
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: "0em",
  textAlign: "left",
  mb: "10px",
  cursor: "pointer",
};

const utilsPageLinks = {
  display: "flex",
  flexDirection: "column",
  pt: "10px",
  gap: "10px",
};

const ButtonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "poppins",
  fontSize: "18px",
  fontWeight: 500,
  width: "180px",
  height: "50px",
  border: "1px solid #FBFFFE",
  background: "transparent",
  color: "#FBFFFE",
  "&:hover": {
    border: "1px solid transparent",
    background: "#A1F65E",
    color: "#1B1B1E",
    cursor: "pointer",
  },
};

const iconStyle = {
  color: "#FBFFFE",
  fontSize: "20px",
  cursor: "pointer",
};
