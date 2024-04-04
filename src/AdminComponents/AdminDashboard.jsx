// import React, { useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { useFetchAllUsers } from "../components/Hooks/GetAllUsers";
// import logo from "../assets/HomePageImages/Logo.svg";
// // Import your components
// import DashboardComponent from "./DashboardComponent.jsx";
// import UsersComponent from "./UsersComponent.jsx";
// import ProductsComponent from "./ProductsComponent.jsx";
// import ClassesComponent from "./ClassesComponent.jsx";
// // import { Routes, Route, Link } from 'react-router-dom';
// // import { useNavigate } from "react-router-dom";

// function AdminDashboard() {
//   //  const navigate = useNavigate();
//   const [currentView, setCurrentView] = useState("Dashboard"); // Default view

//   // Function to change view based on clicked item
//   const changeView = (view) => {
//     setCurrentView(view);
//   };

//   return (
//     <React.Fragment>
//       <Box
//         sx={{
//           display: "flex",
//           background: "#A1F65E",
//           justifyContent: "flex-start",
//           alignItems: "center",
//           padding: "10px",
//           gap: "10px",
//           borderBottom: "2px solid #E9EEF3",
//         }}
//       >
//         <Box
//           component='img'
//           src={logo}
//           sx={{ height: "50px", width: "50px", border: "1px solid #000",
//           borderRadius: "50px", }}
//         />
//         <Typography
//           sx={{
//             fontFamily: "poppins",
//             fontSize: "22px",
//             fontWeight: 800,
//             letterSpacing: "0em",
//             textAlign: "left",
//             cursor: "pointer",
//           }}
//         >
//           Spark Fitness
//         </Typography>
//       </Box>{" "}
//       <Grid container>
//         <Grid
//           item
//           xl={3}
//           lg={3}
//           md={3}
//           sm={6}
//           xs={12}
//           sx={{
//             bgcolor: "#FBFFFE",
//             borderRight: "2px solid #E9EEF3",
//             padding: "50px",
//             height: "112.5vh",

//             /* Your styles here */
//           }}
//         >
//           {/* Navigation */}
//           <Box>
//             <Typography
//               onClick={
//                 () => changeView("Dashboard") /*navigate("/admin/Dashboard")*/
//               }
//               sx={NavText}
//             >
//               Dashboard
//             </Typography>
//             <Typography onClick={() => changeView("Users")} sx={NavText}>
//               Users
//             </Typography>
//             <Typography onClick={() => changeView("Products")} sx={NavText}>
//               Products
//             </Typography>
//             <Typography onClick={() => changeView("Classes")} sx={NavText}>
//               Classes
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xl={9} lg={9} md={9} sm={6} xs={12} sx={{}}>
//           {/* Conditional Rendering based on currentView */}
//           {currentView === "Dashboard" && <DashboardComponent />}
//           {currentView === "Users" && <UsersComponent />}
//           {currentView === "Products" && <ProductsComponent />}
//           {currentView === "Classes" && <ClassesComponent />}
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }

// export default AdminDashboard;

// const NavText = {
//   fontFamily: "Poppins",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontSize: {
//     xl: "20px",
//     lg: "20px",
//     md: "20px",
//     sm: "16px",
//     xs: "16px",
//   },
//   color: "#6B7A99",
//   cursor: "pointer",
//   "&:hover": {
//     color: "#000",
//   },
// };



import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// Assume these hooks and logo import paths are correctly set
import { useFetchAllUsers } from "../components/Hooks/GetAllUsers";
import logo from "../assets/HomePageImages/Logo.svg";

// Import your components
import DashboardComponent from "./DashboardComponent.jsx";
import UsersComponent from "./UsersComponent.jsx";
import ProductsComponent from "./ProductsComponent.jsx";
import ClassesComponent from "./ClassesComponent.jsx";

function AdminDashboard() {
  const [currentView, setCurrentView] = useState("Dashboard");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const NavButton = ({ onClick, icon, text }) => (
    <Button
      startIcon={icon}
      onClick={onClick}
      sx={{
        justifyContent: "flex-start",
        color: "#6B7A99",
        "&:hover": { color: "#000", bgcolor: "transparent" },
      }}
    >
      {text}
    </Button>
  );

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#A1F65E",
          padding: "10px",
          borderBottom: "2px solid #E9EEF3",
        }}
      >
        <img src={logo} alt="Logo" sx={{ height: "50px", width: "50px", border: "1px solid #000",
          borderRadius: "50px", }} />
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
      <Grid container>
        <Grid item xs={3} sx={{ bgcolor: "#FBFFFE", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", minHeight: "calc(100vh - 62px)", borderRight: "1px solid #E9EEF3" }}>
          {/* Navigation */}
          <NavButton onClick={() => changeView("Dashboard")} icon={<DashboardIcon />} text="Dashboard" />
          <NavButton onClick={() => changeView("Users")} icon={<GroupIcon />} text="Users" />
          <NavButton onClick={() => changeView("Products")} icon={<ShoppingBasketIcon />} text="Products" />
          <NavButton onClick={() => changeView("Classes")} icon={<ClassIcon />} text="Classes" />
        </Grid>
        <Grid item xs={9} sx={{ padding: "20px" }}>
          {/* Conditional Rendering based on currentView */}
          {currentView === "Dashboard" && <DashboardComponent />}
          {currentView === "Users" && <UsersComponent />}
          {currentView === "Products" && <ProductsComponent />}
          {currentView === "Classes" && <ClassesComponent />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AdminDashboard;

