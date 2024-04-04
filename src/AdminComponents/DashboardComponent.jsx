import React from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Mock data for the charts
const roleData = [
  { name: "Total Classes", value: 11 },
  { name: "All User", value: 88 },
  { name: "Guest", value: 33 },
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
  { name: "Aug", sales: 2400 },
  { name: "Sep", sales: 1398 },
  { name: "Oct", sales: 9800 },
  { name: "Nov", sales: 3908 },
  { name: "Dec", sales: 4800 },
  // Add more months as needed
];

// Colors for the PieChart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];

function DashboardComponent() {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Typography variant='h4'  component="div">
          Dashboard Overview
        </Typography>
        <Grid container spacing={10}>
          {/* PieChart for User Roles */}
          <Grid item xs={12} sm={6} >
            <Paper
              sx={{
                p: 2,
                bgcolor: "#F3F3F3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant='h6' component='h2'>
                Role Distribution
              </Typography>
              <PieChart width={400} height={450}>
                {" "}
                {/* Increased height to 600 */}
                <Pie
                  data={roleData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={60}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 150).toFixed(0)}%`
                  }
                  sx={{
                    height: "300px", // This style might not be necessary for adjusting the chart's height
                  }}
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      sx={{}}
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
          {/* BarChart for Product Sales */}
          <Grid item xs={12} sm={6} >
            <Paper
              sx={{
                p: 2,
                bgcolor: "#F3F3F3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant='h6' component='h2'>
                Monthly Product Sales
              </Typography>
              <BarChart
                width={500}
                height={350}
                data={productSalesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='sales' fill='#8884d8' />
              </BarChart>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default DashboardComponent;
