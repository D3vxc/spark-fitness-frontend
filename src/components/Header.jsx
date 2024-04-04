import { Box, Button, Grid, Typography, Modal } from "@mui/material";
import React, { useState } from "react";
import LogoImage from "../assets/HomePageImages/Logo.svg";
import { useNavigate } from "react-router-dom";
import { FetchUser } from "./Hooks/GetCurrentUserData.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getToken } from "../utils/token";

function Header() {
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);

  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };

  const {
    data: LoggedInUser,
    error: LoggedInUserError,
    isLoading: LoggedInUserLoading,
    refetch: LoggedInUserRefetch,
  } = FetchUser();

  // console.log("LoggedInUser", LoggedInUser);

  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          background: "#FBFFFE",
          height: "65px",
        }}
      >
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Box
            component='img'
            src={LogoImage}
            onClick={() => navigate("/")}
            sx={{
              mx: "10px",
              cursor: "pointer",
              //  height: "30px", width: "30px"
            }}
          />

          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "0em",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Spark Fitness
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          sx={{ ...NavbarBtn }}
          onClick={() => navigate("/about")}
        >
          {" "}
          <Typography sx={TextStyle}>About</Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          sx={{ ...NavbarBtn }}
          onClick={() => navigate("/contactus")}
        >
          {" "}
          <Typography sx={TextStyle}>Contact</Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          sx={{
            ...NavbarBtn,
          }}
          onClick={() => navigate("/products")}
        >
          <Typography sx={TextStyle}>Products</Typography>
        </Grid>

        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          sx={{ ...NavbarBtn }}
          onClick={() => navigate("/cart")}
        >
          {" "}
          <Typography sx={TextStyle}> Cart</Typography>
        </Grid>
        {/* <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ ...NavbarBtn }}>
          {" "}
          <Typography sx={TextStyle}>Schedule</Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ ...NavbarBtn }}>
          {" "}
          <Typography sx={TextStyle}>Diet</Typography>
        </Grid> */}

        {LoggedInUser?.user === null ? (
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            <Typography sx={TextStyleForLogin}> Login</Typography>
          </Grid>
        ) : (
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              cursor: "pointer",
            }}
            onClick={handleProfileOpen}
          >
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </Grid>
        )}
      </Grid>

      <Modal open={openProfile} onClose={handleProfileClose}>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "90%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            outline: "none",
          }}
        >
          {getToken() === null ? (
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              <Typography sx={TextStyleForLogin}> Login</Typography>
            </Grid>
          ) : (
            <Box>
              <Typography id='modal-modal-title' variant='h4' component='h2'>
                Hello {LoggedInUser?.user?.name || "N/A"}!!
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Email: {LoggedInUser?.user?.email || "N/A"}
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Phone: {LoggedInUser?.user?.phone || "N/A"}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default Header;
const NavbarBtn = {
  // padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: 600,
  letterSpacing: "0em",
  textAlign: "left",
};

const TextStyle = {
  fontFamily: "Poppins",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 600,
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: window.location.pathname === "/about" ? "underline" : "none",
  "&:hover": {
    fontSize: "20px",
    transition: "0.5s",
    // background: "#E3E3E3",
    textTransform: " underline",
    display: "flex",
    flexWrap: "wrap",
  },
};

const TextStyleForLogin = {
  fontFamily: "Poppins",
  cursor: "pointer",
  fontSize: "22px",
  fontWeight: 600,
  "&:hover": {
    transition: "0.5s",
  },
};