import React, { useMemo } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  LineElement,
  PointElement,
} from "chart.js";
import { useFetchAllUsers } from "../components/Hooks/GetAllUsers";
import { useFetchAllClasses } from "../components/Hooks/getAllClasses";
import { useFetchAllProduct } from "../components/Hooks/getAllproduct";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  LineElement,
  PointElement
);

// The colors for the doughnut chart
const doughnutColors = ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB"];

// Mock data for the Doughnut and Line charts
const roleData = [
  { name: "Total Classes", value: 11 },
  { name: "All User", value: 88 },
  { name: "Product", value: 16 },
  { name: "Admin", value: 2 },
];

const productSalesData = [
  { name: "Jan", sales: 2400 },
  { name: "Feb", sales: 1398 },
  { name: "Mar", sales: 9800 },
  { name: "Apr", sales: 3908 },
  { name: "May", sales: 4800 },
  { name: "Jun", sales: 3800 },
  { name: "Jul", sales: 4300 },
  // ... include all other months as needed
];

// Doughnut chart data and options
const doughnutData = {
  labels: roleData.map((item) => item.name),
  datasets: [
    {
      data: roleData.map((item) => item.value),
      backgroundColor: doughnutColors,
      hoverBackgroundColor: doughnutColors,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

// Line chart data and options
// const lineData = {
//   labels: productSalesData.map((item) => item.name),
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: productSalesData.map((item) => item.sales),
//       fill: false,
//       borderColor: "red",
//     },
//     {
//       label: "Dataset 2",
//       data: productSalesData.map((item) => item.sales + 20), // example for second dataset
//       fill: false,
//       borderColor: "blue",
//     },
//   ],
// };

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

function DashboardComponent() {
  const {
    data: getAllUsers,
    isLoading: getusersLoading,
    refetch: refetchUsers,
  } = useFetchAllUsers();

  const {
    data: allClasses,
    isLoading: classesLoading,
    refetch: refetchClasses,
  } = useFetchAllClasses();

  const {
    data: getAllProduct,
    isLoading: getproductLoading,
    error: getproductError,
    refetch: refetchProduct,
  } = useFetchAllProduct();

  console.log(getAllProduct);

  const doughnutData = useMemo(() => {
    const dataValues = [
      allClasses?.length || 0, // Replace with actual count if available
      getAllUsers?.length || 0, // Replace with actual count if available
      getAllProduct?.length || 0, // Replace with actual count if available
      // Add other data if needed
    ];

    return {
      labels: ["Total Classes", "All User", "Product"], // Add more labels if needed
      datasets: [
        {
          data: dataValues,
          backgroundColor: doughnutColors,
          hoverBackgroundColor: doughnutColors,
        },
      ],
    };
  }, [allClasses, getAllUsers, getAllProduct]);

  const lineData = useMemo(() => {
    const dataValues = [
      getAllUsers?.length || 0, // Replace with actual count if available
      getAllProduct?.length || 0, // Replace with actual count if available
    ];
    return {
      labels: ["All User", "Product"], // Add more labels if needed
      datasets: [
        {
          label: "Users",
          data: dataValues,
          fill: false,
          borderColor: "green",
        },
        {
          label: "Product",
          data: dataValues,
          fill: false,
          borderColor: "blue",
        },
      ],
    };
  }, [, getAllUsers, getAllProduct]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Typography variant='h4' component='div'>
          Dashboard Overview
        </Typography>
        <Grid container spacing={10}>
          {/* Doughnut chart for Role Distribution */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              height: "600px",
            }}
          >
            <Paper
              sx={{
                p: 2,
                bgcolor: "#F3F3F3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant='h6' component='h2'>
                Role Distribution
              </Typography>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </Paper>
          </Grid>
          {/* Line chart for Monthly Product Sales */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              height: "600px",
            }}
          >
            <Paper
              sx={{
                p: 2,
                bgcolor: "#F3F3F3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant='h6' component='h2'>
                Monthly Product Sales
              </Typography>
              <Line data={lineData} options={lineOptions} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default DashboardComponent;
