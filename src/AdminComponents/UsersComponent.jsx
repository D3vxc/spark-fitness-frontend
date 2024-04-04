// import React from "react";
// import {
//   Typography,
//   Grid,
//   Box,
// } from "@mui/material";
// import { useFetchAllUsers } from "../components/Hooks/GetAllUsers";

// function UsersComponent() {
//   const {
//     data: getAllUsers,
//     isLoading: getusersLoading,
//     refetch: refetchUsers,
//   } = useFetchAllUsers();

//   console.log("getAllUsers", getAllUsers);

//   if (getusersLoading) {
//     return <Typography>Loading...</Typography>; // Display loading state
//   }
  
//   return (
//     <React.Fragment>
//       <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
//         <Typography variant="h4" component="div">
//           User Management
//         </Typography>
//         <Grid
//           container
//           sx={{
//             height: "100%",
//             maxHeight: "600px",
//             overflow: "scroll",
//           }}
//         >
//           <Grid
//             item
//             xl={12}
//             lg={12}
//             md={12}
//             sm={12}
//             xs={12}
//             sx={{
//               display: "flex",
//               bgcolor: "#F3F3F3",
//               borderBottom: "1px solid #E9EEF3",
//               padding: "20px",
//             }}
//           >
//             <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
//               Sr. No.
//             </Grid>
//             <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
//               Name
//             </Grid>
//             <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
//               email
//             </Grid>
//             <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
//               phone
//             </Grid>
//           </Grid>
//           {getAllUsers?.map((data, i) => {
//             return (
//               <Grid
//                 key={i}
//                 item
//                 xl={12}
//                 lg={12}
//                 md={12}
//                 sm={12}
//                 xs={12}
//                 sx={{
//                   display: "flex",
//                   background: "#F3F3F3",
//                   borderBottom: "1px solid #E9EEF3",
//                   padding: "20px",
//                 }}
//               >
//                 <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
//                   {/* //i want seriel number here */}
//                   {i + 1}
//                 </Grid>
//                 <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
//                   {data?.name}
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
//                   {data?.email}
//                 </Grid>
//                 <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
//                   {data?.phone}
//                 </Grid>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Box>
//     </React.Fragment>
//   );
// }

// export default UsersComponent;


import React from "react";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Button
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchAllUsers } from "../components/Hooks/GetAllUsers";

function UsersComponent() {
  const {
    data: getAllUsers,
    isLoading: getUsersLoading,
    refetch: refetchUsers
  } = useFetchAllUsers();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
    // Open edit user modal/dialog here
  };

  const handleDeleteUserConfirmation = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = () => {
    console.log("Deleting user:", currentUser);
    // Call delete API here
    setOpenDialog(false);
    refetchUsers();
  };

  if (getUsersLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Typography variant="h4" component="div">
          User Management
        </Typography>
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
            <Grid item xs={1}>Sr. No.</Grid>
            <Grid item xs={3}>Name</Grid>
            <Grid item xs={3}>Email</Grid>
            <Grid item xs={2}>Phone</Grid>
            <Grid item xs={1.5}>Edit</Grid>
            <Grid item xs={1.5}>Delete</Grid>
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
              <Grid item xs={1}>{i + 1}</Grid>
              <Grid item xs={3}>{data?.name}</Grid>
              <Grid item xs={3}>{data?.email}</Grid>
              <Grid item xs={2}>{data?.phone}</Grid>
              <Grid item xs={1.5}>
                <IconButton onClick={() => handleEditUser(data)}>
                  <EditIcon />
                </IconButton>
              </Grid>
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
          <DialogTitle>{"Are you sure you want to delete this user?"}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteUser} autoFocus>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </React.Fragment>
  );
}

export default UsersComponent;

