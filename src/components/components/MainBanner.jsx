import { Box, Typography } from "@mui/material";
import React from "react";

const MainBanner = (props) => {
  return (
    <Box
      sx={{
        // height: "55vh",
        height: `${props.imageHeight}`,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${props.image})`, // Set the background image using props
        backgroundSize: "cover", // Ensure the image covers the entire container
        backgroundPosition: "center", // Center the background image
      }}
    >
      {/* Typography for the main text */}
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "70px",
          fontWeight: 800,
          letterSpacing: "0em",
          textAlign: "center",
          color: "#FFFFFF", // Text color
          width: `${props.width}`,
          position: "relative",
          textShadow:
            "-7px 7px 0 rgba(23, 29, 36, 1), -7.1px 7.1px 0 rgba(255, 255, 255, 1)",
          lineHeight: "95px",
          pb: `${props.paddingbottom}`,
        }}
      >
        {props.mainText}
      </Typography>
    </Box>
  );
};

export default MainBanner;
