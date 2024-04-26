import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import MainBanner from "../components/MainBanner";

const BMI = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          background: "#FBFFFE",
        }}
      >
        <MainBanner
          mainText={"BMI Calculator"}
          image={
            "https://res.cloudinary.com/spark-cloud/image/upload/v1713607169/Banners/BMIPageBanner.svg"
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
                Fill details and receive email
              </Typography>
              <Typography
                sx={{
                  fontFamilu: "poppins",
                  color: "#000",
                  fontSize: "35px",
                  fontWeight: 700,
                  lineHeight: "20px",
                }}
              >
                Your BMI
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
                Overrideds on hanging fruits to identify ball park value added
                activity to beta overrided the digitals divided with additionals
                clickthroughs from line.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "20px", width: "100%" }}>
                    <TextField
                      label='Height / cm'
                      type='number'
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label='Weight / kg'
                      type='number'
                      sx={{ flex: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: "20px", width: "100%" }}>
                    <TextField label='Age' type='number' sx={{ flex: 1 }} />
                    <TextField label='Sex' type='text' sx={{ flex: 1 }} />
                  </Box>
                  <TextField fullWidth label='Enter your email' type='email' />
                  <Button
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 500,
                      width: "180px",
                      height: "50px",
                      border: "2px solid #FBFFFE",
                      background: "#000",
                      color: "#FBFFFE",
                      textTransform: "none",
                      "&:hover": {
                        border: "2px solid #000",
                        background: "transparent",
                        color: "#000",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Submit Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              padding={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "20px",
                position: "relative",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamilu: "poppins",
                    color: "#000",
                    fontSize: "35px",
                    fontWeight: 700,
                    lineHeight: "40px",
                    width: "100%",
                  }}
                >
                  BMI Chart
                </Typography>

                <Typography
                  sx={{
                    position: "absolute",
                    top: "-25%",
                    left: "50%",
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
                  BMI
                </Typography>
              </Box>
              <TableContainer
                sx={{
                  width: "500px",
                  zIndex: 1,
                  background: "#1C2128",
                  ".MuiTableCell-root": {
                    textAlign: "center",
                    padding: "30px",
                  },
                  ".MuiTableCell-body": {
                    borderLeft: "1px solid #FBFFFE", // This adds a vertical line on the left of each right-hand cell
                  },
                }}
              >
                <Table aria-label='BMI chart table'>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "#FBFFFE",
                          borderBottom: "1px solid #FBFFFE", // This adds a border below the BMI header cell
                        }}
                      >
                        BMI
                      </TableCell>
                      <TableCell
                        align='right'
                        sx={{
                          color: "#FBFFFE",
                          borderBottom: "1px solid #FBFFFE", // This adds a border below the Weight Status header cell
                        }}
                      >
                        WEIGHT STATUS
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#FBFFFE" }}>
                        Below 18.5
                      </TableCell>
                      <TableCell align='right' sx={{ color: "#F8C800" }}>
                        Underweight
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#FBFFFE" }}>
                        18.5 - 24.9
                      </TableCell>
                      <TableCell align='right' sx={{ color: "#A1F65E" }}>
                        Healthy
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#FBFFFE" }}>
                        25.0 - 29.9
                      </TableCell>
                      <TableCell align='right' sx={{ color: "#FFA24B" }}>
                        Overweight
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#FBFFFE" }}>
                        30.0 and Above
                      </TableCell>
                      <TableCell align='right' sx={{ color: "#FF4B4B" }}>
                        Obese
                      </TableCell>
                    </TableRow>{" "}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            background: "#524FF5",
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            my: "100px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "poppins",
              color: "#FBFFFE",
              fontSize: "34px",
              fontWeight: 600,
              lineHeight: "40px",
            }}
          >
            Subscribe to my weekly <br /> newsletter today!
          </Typography>
          <TextField
            type='email'
            placeholder='enter your email'
            fullWidth
            sx={{
              mt: 2,
              border: "1px solid #FBFFFE",
              background: "transparent",
              color: "#BCBCBC",
              width: "25%",
              "& .MuiInputBase-root": {
                color: "#BCBCBC",
                "& input": {
                  color: "#BCBCBC", // Text color inside input field
                  border: "none",
                  "::placeholder": {
                    color: "#BCBCBC",
                    opacity: 1,
                  },
                },
              },
              "& .MuiInput-underline:after, & .MuiInput-underline:before": {
                borderBottom: "none", // Removes bottom border in focused and unfocused state
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none", // Removes bottom border on hover
              },
              // For outlined variant
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FBFFFE", // Sets default border color
                  border: "none",
                },
                "&:hover fieldset": {
                  borderColor: "#FBFFFE", // Sets border color on hover (if needed)
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FBFFFE", // Sets border color on focus
                  borderWidth: "1px", // You can set the borderWidth on focus here if needed
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "poppins",
                      fontSize: "12px",
                      fontWeight: 500,
                      width: "100px",
                      height: "50px",
                      background: "#1C2128",
                      textTransform: "none",
                      color: "#FBFFFE",
                      "&:hover": {
                        background: "#FBFFFE",
                        color: "#1B1B1E",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Subscribe
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default BMI;

const HoursText = {
  fontFamilu: "poppins",
  color: "#6A6A6A",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: 400,
};
