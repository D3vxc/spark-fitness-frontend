import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/HomePageImages/Logo.svg";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const phone = data.get("phone");
    const email = data.get("email");
    const password = data.get("password");

    // Construct address object
    const address = {
      street: data.get("street"),
      city: data.get("city"),
      state: data.get("state"),
      postalCode: data.get("postalCode"),
      country: data.get("country"),
    };

    // Assume a simple validation that all fields are filled
    if (
      name &&
      phone &&
      email &&
      password &&
      address.street &&
      address.city &&
      address.state &&
      address.postalCode &&
      address.country
    ) {
      try {
        await axios.post("/user/register", {
          name,
          phone,
          email,
          password,
          address,
        });
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.log("Registration error", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <ToastContainer />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  autoFocus
                  error={nameError}
                  helperText={nameError ? "First name is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='phone'
                  name='phone'
                  required
                  fullWidth
                  id='phone'
                  label='Phone Number'
                  autoFocus
                  error={phoneError}
                  helperText={phoneError ? "First name is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  error={emailError}
                  helperText={emailError ? "Email is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  error={passwordError}
                  helperText={passwordError ? "Password is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='street'
                  label='Street Address'
                  name='street'
                  autoComplete='shipping street-address'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id='city'
                  label='City'
                  name='city'
                  autoComplete='shipping address-level2'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id='state'
                  label='State'
                  name='state'
                  autoComplete='shipping address-level1'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id='postalCode'
                  label='Postal Code'
                  name='postalCode'
                  autoComplete='shipping postal-code'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id='country'
                  label='Country'
                  name='country'
                  autoComplete='shipping country'
                />
              </Grid>{" "}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link variant='body2' onClick={() => navigate("/login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
