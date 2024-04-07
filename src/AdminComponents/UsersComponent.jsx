import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Modal,
  TextField,
} from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchAllUsers } from "../components/Hooks/GetAllUsers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UsersComponent() {
  const {
    data: getAllUsers,
    isLoading: getUsersLoading,
    refetch: refetchUsers,
  } = useFetchAllUsers();

  // console.log("getAllUsers", getAllUsers);

  const [currentUser, setCurrentUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleAddUserOpen = () => {
    setOpenAddUserDialog(true);
  };

  const handleAddUserClose = () => {
    setOpenAddUserDialog(false);
  };

  const handleDeleteUserConfirmation = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = () => {
    // console.log("Deleting user:", currentUser);
    // Call delete API here
    setOpenDialog(false);
    refetchUsers();
  };

  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    // const data = new FormData(event.currentTarget);

    // const name = data.append("name");
    // const phone = data.append("phone");
    // const email = data.append("email");
    // const password = data.append("password");

    // Basic validation
    setNameError(!firstName);
    setPhoneError(!phone);
    setEmailError(!email);
    setPasswordError(!password);

    if (firstName && phone && email && password) {
      try {
        // Adjust URL to your API endpoint for registration
        const response = await axios.post("/user/register", {
          name: firstName,
          phone,
          email,
          password,
        });

        handleAddUserClose();
        // Show success message and navigate or take other actions
        toast.success("User add successful!");
        setIsLoading(false);
        refetchUsers();
        // Navigate to login page or dashboard as per your flow
        // navigate("/login");
      } catch (error) {
        // Handle errors (e.g., email already in use)
        toast.error("Add failed. Please try again.");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   const data = new FormData(event.currentTarget);

  //   // Extracting form data
  //   const name = data.get("name");
  //   const phone = data.get("phone");
  //   const email = data.get("email");
  //   const password = data.get("password");

  //   // Proceed only if all fields are filled (simple validation)
  //   if (name && phone && email && password) {
  //     try {
  //       // POST request to your API endpoint
  //       await axios.post("/user", { name, phone, email, password });
  //       // If you're using toast notifications
  //       // toast.success("User added successfully!");
  //       alert("User added successfully!"); // Fallback to alert
  //       handleAddUserClose(); // Close the modal
  //       refetchUsers(); // Refetch users to update the list
  //     } catch (error) {
  //       // Handle errors (e.g., user already exists, server error)
  //       // toast.error("Failed to add user. Please try again.");
  //       alert("Failed to add user. Please try again."); // Fallback to alert
  //     }
  //   } else {
  //     alert("All fields are required."); // Fallback to alert for missing fields
  //   }
  //   setIsLoading(false);
  // };
  if (getUsersLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant='h4' component='div'>
            User Management
          </Typography>
          <PersonAddIcon onClick={handleAddUserOpen} />
        </Box>
        <Modal
          open={openAddUserDialog}
          onClose={handleAddUserClose}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          onSubmit={handleSubmit}
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='new-password'
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
              />
            </Grid>
            <Grid>
              {" "}
              <Button
                type='submit'
                onClick={handleSubmit}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                add user
              </Button>
            </Grid>
          </Grid>
        </Modal>
        <Grid
          container
          sx={{
            height: "100%",
            maxHeight: "600px",
            overflow: "scroll",
          }}
        >
          {/* Header */}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              bgcolor: "#F3F3F3",
              borderBottom: "1px solid #E9EEF3",
              padding: "20px",
            }}
          >
            <Grid item xs={1}>
              Sr. No.
            </Grid>
            <Grid item xs={3}>
              Name
            </Grid>
            <Grid item xs={3}>
              Email
            </Grid>
            <Grid item xs={2}>
              Phone
            </Grid>
            {/* <Grid item xs={1.5}>Edit</Grid> */}
            <Grid item xs={1.5}>
              Delete
            </Grid>
          </Grid>

          {getAllUsers?.map((data, i) => (
            <Grid
              key={i}
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                bgcolor: "#F3F3F3",
                borderBottom: "1px solid #E9EEF3",
                padding: "20px",
              }}
            >
              <Grid item xs={1}>
                {i + 1}
              </Grid>
              <Grid item xs={3}>
                {data?.name}
              </Grid>
              <Grid item xs={3}>
                {data?.email}
              </Grid>
              <Grid item xs={2}>
                {data?.phone}
              </Grid>
              {/* <Grid item xs={1.5}>
                <IconButton onClick={() => handleEditUser(data)}>
                  <EditIcon />
                </IconButton>
              </Grid> */}
              <Grid item xs={1.5}>
                <IconButton onClick={() => handleDeleteUserConfirmation(data)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* Confirmation Dialog for Deleting a User */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {"Are you sure you want to delete this user?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteUser} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </React.Fragment>
  );
}

export default UsersComponent;
