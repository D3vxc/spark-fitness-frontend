import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useFetchAllClasses } from "../components/Hooks/getAllClasses";

function ClassesComponent() {
  const {
    data: getAllClasses,
    isLoading: getClassesLoading,
    refetch: refetchUsers,
  } = useFetchAllClasses();

  console.log("getAllClasses", getAllClasses);

  if (getClassesLoading) {
    return <Typography>Loading...</Typography>; // Display loading state
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
        <Typography variant='h4' component='div'>
          Class Schedule
        </Typography>
        <Grid
          container
          sx={{
            height: "100%",
            maxHeight: "600px",
            overflow: "auto",
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
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              Sr. No.
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Name
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
              Description
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Image
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Trainer
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              Duration (mins)
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              Date & Time
            </Grid>
          </Grid>
          {/* Class details */}
          {getAllClasses?.map((data, i) => (
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
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                {i + 1}
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                {data?.name}
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                {data?.description}
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Box
                  component='img'
                  src={data?.image}
                  alt='class image'
                  sx={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                {data?.trainer}
              </Grid>
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                {data?.duration}
              </Grid>
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                {data?.date} {data?.time}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default ClassesComponent;
