import React , {useState} from "react";
import { 
  Typography, 
  Box, 
  Grid,
  Button,
  Modal,
  TextField
 } from "@mui/material";
import { useFetchAllProduct } from "../components/Hooks/getAllproduct";
import axios from "axios";
import { toast } from "react-toastify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function ProductsComponent() {
  const {
    data: getAllProduct,
    isLoading: getProductLoading,
    refetch: refetchUsers,
  } = useFetchAllProduct();

  console.log("getAllProduct", getAllProduct);

  const [isLoading, setIsLoading] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
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

  const [firstName,setFirstName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");


  const handleSubmit = async () => {
    
    setIsLoading(true);

    setNameError(!firstName);
    setPhoneError(!phone);
    setEmailError(!email);
    setPasswordError(!password);

    if (firstName && phone && email && password) {
      try {
        // Adjust URL to your API endpoint for registration
        const response = await axios.post("/products/addProduct", {
          name : firstName,
          phone,
          email,
          password,
        });

        handleAddUserClose();
        // Show success message and navigate or take other actions
        toast.success("User add successful!");
        setIsLoading(false);

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

  if (getProductLoading) {
    return <Typography>Loading...</Typography>; // Display loading state
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, p: 6, bgcolor: "#FBFFFE", height: "100vh" }}>
      <Box sx={{
          width :"100%",
          display : "flex",
          justifyContent : "space-between",       
        }}>
        <Typography variant='h4' component='div'>
          Products
        </Typography>
        <PersonAddIcon onClick={handleAddUserOpen} />
        </Box>
        <Modal open={openAddUserDialog} onClose={handleAddUserClose} sx={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: 400,
           bgcolor: 'background.paper',
           border: '2px solid #000',
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
                  onChange={(e)=>setFirstName(e.target.value)}

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
                  onChange={(e)=>setPhone(e.target.value)}
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
                  onChange={(e)=>setEmail(e.target.value)}

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
                  onChange={(e)=>setPassword(e.target.value)}
                  autoComplete='new-password'
                  error={passwordError}
                  helperText={passwordError ? "Password is required" : ""}
                />
              </Grid>
              <Grid> <Button
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
              Price
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              Stock
            </Grid>
          </Grid>
          {/* Product Rows */}
          {getAllProduct?.map((data, i) => (
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
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid
                item
                xl={2}
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{
                  display: "flex",
                }}
              >
                <Typography>₹</Typography> {data?.price}
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                {data?.stock}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default ProductsComponent;
