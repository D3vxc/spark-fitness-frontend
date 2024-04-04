import React from "react";
import MainBanner from "../components/MainBanner";
import Banner from "../../assets/AboutPageImages/banner.svg";
import { Box } from "@mui/material";
import AboutBannerImageOne from "../../assets/AboutPageImages/AboutBannerImageOne.svg";
import AboutBannerImageTwo from "../../assets/AboutPageImages/AboutBannerImageTwo.svg";

const About = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          background: "#FBFFFE",
          position: "relative",
        }}
      >
        <MainBanner
          mainText={"Start with us the body and mind clensing"}
          image={Banner}
          width={"950px"}
          imageHeight={"80vh"}
          paddingbottom={"100px"} // only giving it to this page due there will be images on the background
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            gap: "30px",
            position: "absolute",
            background: "#FBFFFE",
            //i want this images in center
            top: "400px",
            left: "200px",
          }}
        >
          <Box component='img' src={AboutBannerImageOne} />
          <Box component='img' src={AboutBannerImageTwo} />
        </Box>
        <Box
          sx={{
            height: "400px",
          }}
        />
        <Box>ewfewfj</Box>
      </Box>
    </React.Fragment>
  );
};

export default About;
