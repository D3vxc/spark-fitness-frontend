import React from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import MainBanner from "../components/MainBanner";

const ContactUs = () => {
  return (
    <React.Fragment>
      <MainBanner
        mainText={"Contact Us"}
        image={
          "https://res.cloudinary.com/spark-cloud/image/upload/v1711707437/Banners/ClassesPageBanner.svg"
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
          my: "100px",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            padding={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: "20px",
              justifyContent: "center",
              alignItems: "flex",
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
              Welcome to STRENGTHY
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
              Get In Touch With Us
            </Typography>
            <Typography
              sx={{
                width: "80%",
                fontFamilu: "poppins",
                color: "#6A6A6A",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              If you have any feedback or questions about our clubs, our website
              or our services in general, please contact us by filling out the
              form.
            </Typography>

            <Typography
              sx={{
                fontFamilu: "poppins",
                color: "#000",
                fontSize: "22px",
                fontWeight: 600,
                lineHeight: "60px",
                borderBottom: "2px solid #D3D3D3",
                width: "50%",
              }}
            >
              Open Hours
            </Typography>
            <Typography sx={HoursText}>
              <b
                style={{
                  color: "#000",
                }}
              >
                Mon - Fri:
              </b>{" "}
              &nbsp; 08:00 AM to 09:00 PM
            </Typography>
            <Typography sx={HoursText}>
              <b
                style={{
                  color: "#000",
                }}
              >
                Sat:
              </b>{" "}
              &nbsp; 09:00 AM to 06:00 PM
            </Typography>
            <Typography sx={HoursText}>
              <b
                style={{
                  color: "#000",
                }}
              >
                Sunday:
              </b>
              &nbsp; 09:00 AM to 02:00 PM
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#F9F9F9",
          }}
        >
          <Box
            padding={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <Typography
              sx={{
                fontFamilu: "poppins",
                color: "#000",
                fontSize: "35px",
                fontWeight: 700,
                lineHeight: "40px",
                width: "95%",
                mx: "auto",
              }}
            >
              Send Us a Message
            </Typography>
            <Typography
              sx={{
                fontFamilu: "poppins",
                color: "#524FF5",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "0px",
                width: "95%",
                mx: "auto",
              }}
            >
              Your email address will not be published *
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "95%",
                mx: " auto",
              }}
            >
              <TextField fullWidth label='your full name' type='text' />
              <TextField fullWidth label='e-mail address' type='email' />
              <TextField fullWidth label='subject' type='text' />
              <TextField
                fullWidth
                label='message'
                margin='normal'
                multiline
                type='text'
                rows={4}
              />
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "poppins",
                  fontSize: "18px",
                  fontWeight: 500,
                  width: "180px",
                  height: "50px",
                  border: "2px solid #FBFFFE",
                  background: "#000",
                  color: "#FBFFFE",
                  "&:hover": {
                    border: "2px solid #000",
                    background: "transparent",
                    color: "#000",
                    cursor: "pointer",
                  },
                }}
              >
                Send Now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ContactUs;

const HoursText = {
  fontFamilu: "poppins",
  color: "#6A6A6A",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 400,
};
