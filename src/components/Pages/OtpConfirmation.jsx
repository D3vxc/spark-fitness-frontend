import React, { useState } from "react";
// import { useHistory } from "react-router-dom"; // Import useHistory from React Router
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFetchAllUsers } from "../Hooks/GetAllUsers";
import { useNavigate } from "react-router-dom";

function OtpConfirmation() {
  const navigate = useNavigate();
  const {
    data: getAllUsers,
    isLoading: getusersLoading,
    refetch: refetchUsers,
  } = useFetchAllUsers();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [error, setError] = useState("");
  //   const history = useHistory();

  const handleRequestOTP = () => {
    const matchingUser = getAllUsers.find(
      (user) => user.email === enteredEmail
    );

    if (matchingUser) {
      // Email matches, navigate to OTP confirmation page
      //   history.push("/otpconfirmation"); // Replace "/otpconfirmation" with your actual route
      navigate("/otp-confirmation");
    } else {
      setError("Email not found. Please enter a valid email.");
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography>Enter otp here</Typography>
        <TextField
          type='number'
          placeholder=''
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
        />
        <Button
          sx={{
            background: "#445FD2",
            color: "#fff",
            "&:hover": {
              background: "#445FD2",
              color: "#fff",
            },
          }}
          onClick={handleRequestOTP} // Add the click handler
        >
          Request reset password
        </Button>
        {error && <Typography color='error'>{error}</Typography>}
      </Box>
    </React.Fragment>
  );
}

export default OtpConfirmation;
