import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const validateInput = () => {
    setEmailError(!email); // Example validation: email field should not be empty
    setOtpError(!otp); // Example validation: OTP field should not be empty
    // You can extend this validation logic as needed
    return email && otp; // Only proceed if both email and otp have values
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateInput();

    if (isValid) {
      console.log("Email:", email, "OTP:", otp);
      // You might want to send this data to your server here
      // Reset error states if needed
      setEmailError(false);
      setOtpError(false);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Forget Password
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={emailError}
            helperText={emailError ? "Email is required" : ""}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={otpError}
            helperText={otpError ? "OTP is required" : ""}
            margin='normal'
            required
            fullWidth
            name='otp'
            label='OTP'
            type='text'
            id='otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgetPassword;
