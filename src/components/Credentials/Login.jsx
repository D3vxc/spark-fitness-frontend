import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/HomePageImages/Logo.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    setEmailError(false);
    setPasswordError(false);

    const email = data.get("email");
    const password = data.get("password");
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);

    if (email && password) {
      try {
        const response = await axios.post("/user/login", { email, password });
        toast.success("Login successful!");
        setIsLoading(false);
        navigate("/");
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component='img'
              src={logo}
              sx={{ height: "50px", width: "50px" }}
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
            >
              Spark Fitness
            </Typography>
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={emailError}
              helperText={emailError ? "Email is required" : ""}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              error={passwordError}
              helperText={passwordError ? "Password is required" : ""}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant='body2'
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant='body2' onClick={() => navigate("/register")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
