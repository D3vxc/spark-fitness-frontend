import { Box, Button, Grid, Typography, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoImage from "../assets/HomePageImages/Logo.svg";
import { useNavigate } from "react-router-dom";
import { FetchUser, Logout } from "./Hooks/GetCurrentUserData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { getToken } from "../utils/token";
import { toast } from "react-toastify";
import BasicPlanIcon from "../assets/HomePageImages/BasicPlanIcon.svg";
import StandardPlanIcon from "../assets/HomePageImages/StandardPlanIcon.svg";
import PremiumPlanIcon from "../assets/HomePageImages/PremiumPlanIcon.svg";
import CartPopUp from "../components/Pages/CartPopUp";
import Cookies from "js-cookie";

function Header(props) {
  const navigate = useNavigate();
  const token = getToken();
  const [openProfile, setOpenProfile] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };

  const handleCartClose = () => {
    setOpenCart(false);
  };

  const handleCartOpen = () => {
    setOpenCart(true);
  };

  const {
    data: LoggedInUser,
    error: LoggedInUserError,
    isLoading: LoggedInUserLoading,
    refetch: LoggedInUserRefetch,
  } = FetchUser();

  const {
    data: LogoutData,
    error: LogoutError,
    isLoading: LogoutLoading,
    refetch: LogoutRefetch,
  } = Logout();

  const handleLogout = async () => {
    try {
      await LogoutRefetch();
      toast.success("Logged out successfully");
      Cookies.remove("token");
      // Remove the token from local storage
      localStorage.removeItem("token");

      LoggedInUserRefetch();
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

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
          sx={{ ...NavbarBtn }}
          onClick={() => navigate("/bmi")}
        >
          {" "}
          <Typography sx={TextStyle}>BMI</Typography>
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

        {!token ? (
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
            }}
          >
            <Typography
              onClick={() => navigate("/login")}
              sx={{
                ...TextStyleForLogin,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                  transition: "0.5s",
                },
              }}
            >
              {" "}
              Login
            </Typography>
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
              justifyContent: "space-evenly",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <AccountCircleIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={handleProfileOpen}
            />
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={handleCartOpen}
            />
          </Grid>
        )}
      </Grid>
      <Modal open={openProfile} onClose={handleProfileClose}>
        <Box
          sx={{
            position: "absolute",
            top: "24%",
            left: "87.6%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            bgcolor: "#FBFFFE",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            outline: "none",
            "::before": {
              content: '""',
              position: "absolute",
              bottom: "100%", // This positions the pseudo-element above the Box
              left: "50%",
              transform: "translateX(-50%)",
              borderWidth: "10px",
              borderStyle: "solid",
              borderColor: "transparent transparent #FBFFFE transparent",
            },
          }}
        >
          {!LoggedInUser?.email && LoggedInUser?.email === "N/A" ? ( // Check if the token is not available
            <Typography
              sx={{
                cursor: "pointer",
                textAlign: "center",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Typography>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                  gap: "5px",
                  borderBottom: "1px solid #D3D3D3",
                  paddingBottom: "5px",
                }}
              >
                <Box
                  component='img'
                  src={
                    "https://res.cloudinary.com/spark-cloud/image/upload/v1712830751/utility/userIcon.svg"
                  }
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />{" "}
                <Typography id='modal-modal-title' variant='h5' component='h2'>
                  Hello {LoggedInUser?.user?.name || "N/A"}!!
                </Typography>
              </Box>
              <Typography
                id='modal-modal-description'
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Box
                  component='img'
                  src={
                    "https://res.cloudinary.com/spark-cloud/image/upload/v1712830751/utility/mailIcon.svg"
                  }
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />{" "}
                : {LoggedInUser?.user?.email || "N/A"}
              </Typography>
              <Typography
                id='modal-modal-description'
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Box
                  component='img'
                  src={
                    "https://res.cloudinary.com/spark-cloud/image/upload/v1712830855/utility/phoneIcon.svg"
                  }
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />{" "}
                : {LoggedInUser?.user?.phone || "N/A"}
              </Typography>
              <Typography
                id='modal-modal-description'
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {LoggedInUser?.user?.membershipPlanDetails?.PlanName ===
                "Basic" ? (
                  <Box
                    component='img'
                    src={BasicPlanIcon}
                    sx={{ height: "30px", width: "30px" }}
                  />
                ) : LoggedInUser?.user?.membershipPlanDetails?.PlanName ===
                  "Standard" ? (
                  <Box
                    component='img'
                    src={StandardPlanIcon}
                    sx={{ height: "30px", width: "30px" }}
                  />
                ) : LoggedInUser?.user?.membershipPlanDetails?.PlanName ===
                  "Premium" ? (
                  <Box
                    component='img'
                    src={PremiumPlanIcon}
                    sx={{ height: "30px", width: "30px" }}
                  />
                ) : null}
                {LoggedInUser?.user?.membershipPlanDetails?.PlanName || "N/A"}
              </Typography>
              <Typography
                id='modal-modal-description'
                sx={{ mt: 2, textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  Cookies.remove("token");
                  navigate("/");
                }}
              >
                Logout
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
      <Modal
        open={openCart}
        onClose={handleCartClose}
        sx={{
          "& .MuiPaper-root": {
            animation: "slide-in 2s forwards",
          },
          "@keyframes slide-in": {
            from: {
              transform: "translateX(50%)",
            },
            to: {
              transform: "translateX(0)",
            },
          },
        }}
        closeAfterTransition
      >
        <CartPopUp CloseModal={handleCartClose} />
      </Modal>
    </React.Fragment>
  );
}

export default Header;
const NavbarBtn = {
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
