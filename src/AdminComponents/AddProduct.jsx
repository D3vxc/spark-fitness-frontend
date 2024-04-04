import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  price: z.number().min(0, "Price must be a positive number."),
  stock: z.number().min(0, "Stock must be a positive number."),
  description: z.string().min(1, "Product description is required."),
  imageFile: z.any(), // For file inputs, validation can be customized
});

function AddProduct() {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files);
  };

  // const imageFile = watch("imageFile");

  const onSubmit = async (formDataValues) => {
    console.log("Form data received:", formDataValues);
    let imageUrl = ""; // Placeholder for the uploaded image URL

    // Check if there's an image to upload first
    if (image && image.length > 0) {
      const imageFormData = new FormData();
      imageFormData.append("file", image[0]); // Assuming `image` state holds FileList
      imageFormData.append("upload_preset", "spark_fitness");
      imageFormData.append("cloud_name", "spark-cloud");

      // Attempt to upload the image
      try {
        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/spark-cloud/image/upload",
          {
            method: "post",
            body: imageFormData,
          }
        );
        const imageData = await uploadResponse.json();
        imageUrl = imageData.url; // Assuming the response contains the URL of the uploaded image
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        console.error("Image upload error:", error);
        return; // Abort product submission if image upload fails
      }
    }

    // Submit product data to the server
    try {
      const response = await axios.post("/products/newproducts", {
        ...formDataValues,
        image: imageUrl,
      });

      console.log("Server response:", response.data);
      reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <Container
      sx={{ mt: 4, backgroundColor: "#A1F65E", p: 3, borderRadius: 2 }}
    >
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main" }}
      >
        Add a New Product
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "300px" },
          "& .MuiButton-root": { width: "150px" },
          backgroundColor: "white",
          p: 3,
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          label='Product Name'
          variant='outlined'
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register("name")}
        />
        <TextField
          label='Price'
          variant='outlined'
          type='number'
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
        />
        <TextField
          label='Stock'
          variant='outlined'
          type='number'
          error={Boolean(errors.stock)}
          helperText={errors.stock?.message}
          {...register("stock", { valueAsNumber: true })}
        />
        <TextField
          label='Product Description'
          variant='outlined'
          multiline
          rows={4}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          {...register("description")}
        />
        <Box
          sx={{
            border: "2px dashed #445FD2",
            background: "#fff",
            width: "30%",
            maxWidth: "270px",
            p: "4%",
            mx: "auto",
            position: "relative",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Box
            sx={{
              display: "grid",
              width: "60%",
              mx: " auto",
            }}
          >
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                tetxAlign: "center",
              }}
            >
              <Box
                component='img'
                // src={UploadtoCloud}
                sx={{
                  position: "absolute",
                  left: "5%",
                  textalign: "center",
                }}
              />
              <Typography
                onClick={() => inputRef.current.click()}
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#6B7A99",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                  textalign: "center",
                }}
              >
                Drag & Drop upload or browse to choose a file
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "8px",
                  color: "#676767",
                  textAlign: "center",
                }}
              >
                Supported format : JPEG, PNG, GIF, MP4, PDF
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", mt: "1%" }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {
                  xl: "10px",
                  lg: "10px",
                  md: "10px",
                  sm: "8px",
                  xs: "8px",
                },
                color: "#445FD2",
              }}
            >
              Mandatory Photos : Front View, Back View, Close Fabric View, Model
              Wearing View , Size Chart & Privacy Policy
            </Typography>
          </Box>
          <input
            type='file'
            multiple
            onChange={(event) => setImage(event.target.files)}
            hidden
            accept='.png,.pdf,.mp4,.jpeg,.gif'
            ref={inputRef}
          />
        </Box>

        {errors.image && (
          <Typography color='error' sx={{ mt: 2, width: "100%" }}>
            {errors.image.message}
          </Typography>
        )}
        <Button
          type='submit'
          variant='contained'
          color='success'
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </Box>
    </Container>
  );
}

export default AddProduct;
