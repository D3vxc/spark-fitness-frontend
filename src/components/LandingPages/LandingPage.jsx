import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header.jsx";
import Home from "../Pages/Home.jsx";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />

      {/* <Home /> */}

      <Footer />
    </React.Fragment>
  );
}

export default LandingPage;
