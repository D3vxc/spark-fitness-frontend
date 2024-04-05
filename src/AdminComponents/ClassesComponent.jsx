import React, { useState, useRef } from "react";
import { Typography, Box, Grid, Button, Modal, TextField } from "@mui/material";
import { useFetchAllClasses } from "../components/Hooks/getAllClasses";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { toast } from "react-toastify";

function ClassesComponent() {
  const inputRef = useRef();

  const {
    data: getAllClasses,
    isLoading: getClassesLoading,
    refetch: refetchClasses,
  } = useFetchAllClasses();

  console.log("getAllClasses", getAllClasses);

  const [isLoading, setIsLoading] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [trainerError, settrainerError] = useState(false);
  const [durationError, setdurationError] = useState(false);
  const [imageError, setimageError] = useState(false);
  const [dateError, setdateError] = useState(false);
  const [timeError, settimeError] = useState(false);

  const handleAddUserOpen = () => {
    setOpenAddUserDialog(true);
  };

  const handleAddUserClose = () => {
    setOpenAddUserDialog(false);
  };

  const [firstName, setFirstName] = useState("");
  const [description, setdescription] = useState("");
  const [trainer, settrainer] = useState("");
  const [duration, setduration] = useState("");
  const [image, setimage] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    // const data = new FormData(event.currentTarget);

    // const name = data.append("name");
    // const phone = data.append("phone");
    // const email = data.append("email");
    // const password = data.append("password");

    // Basic validation
    setNameError(!firstName);
    setdescriptionError(!description);
    setdurationError(!duration);
    settrainerError(!trainer);
    setimageError(!image);
    setdateError(!date);
    settimeError(!time);

    if (
      firstName &&
      description &&
      duration &&
      trainer &&
      image &&
      date &&
      time
    ) {
      try {
        // Adjust URL to your API endpoint for registration
        const response = await axios.post("/classes/newclass", {
          name: firstName,
          description,
          duration,
          trainer,
          image,
          date,
          time,
        });

        handleAddUserClose();
        // Show success message and navigate or take other actions
        toast.success("class add successful!");
        setIsLoading(false);
        refetchClasses();

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

  if (getClassesLoading) {
    return <Typography>Loading...</Typography>; // Display loading state
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
            Classes Management
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
            bgcolor: "#FBFFFE",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
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
                autoComplete='description'
                name='description'
                required
                fullWidth
                id='description'
                label='description'
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                autoFocus
                error={descriptionError}
                helperText={descriptionError ? "description is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='duration'
                label='duration'
                name='duration'
                autoComplete='duration'
                value={duration}
                onChange={(e) => setduration(e.target.value)}
                error={durationError}
                helperText={durationError ? "duration is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='trainer'
                label='trainer'
                type='trainer'
                id='trainer'
                value={trainer}
                onChange={(e) => settrainer(e.target.value)}
                autoComplete='new-trainer'
                error={trainerError}
                helperText={trainerError ? "trainer is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='image'
                // label='image'
                type='file'
                id='image'
                value={image}
                autoComplete='new-image'
                error={imageError}
                helperText={imageError ? "image is required" : ""}
                multiple
                onChange={(e) => setimage(e.target.value)}
                hidden
                accept='.png,.pdf,.mp4,.jpeg,.gif'
                ref={inputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='date'
                // label='date'
                type='date'
                id='date'
                value={date}
                onChange={(e) => setdate(e.target.value)}
                autoComplete='new-date'
                error={dateError}
                helperText={dateError ? "date is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='time'
                // label='time'
                type='time'
                id='time'
                value={time}
                onChange={(e) => settime(e.target.value)}
                autoComplete='new-time'
                error={timeError}
                helperText={timeError ? "time is required" : ""}
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
                add class
              </Button>
            </Grid>
          </Grid>
        </Modal>
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
