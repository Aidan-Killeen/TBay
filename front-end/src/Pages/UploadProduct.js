import "../Styles/App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// import Autocomplete from "./TempAutocomplete.js";
import Autocomplete from "@mui/material/Autocomplete";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { styled } from "@mui/material/styles";

import UploadIcon from "@mui/icons-material/Upload";

const Input = styled("input")({
  display: "none",
});

function UploadProduct() {
  let navigate = useNavigate();
  var postedFlag = false;
  const [category, setCategory] = useState(
    {
      title: ""
    });
    
  function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //handle product requirements (required fields)
    if (data.get("productTitle").toString().length < 3) {
      alert("Title must be more than two characters in length.")
      console.log("Title must be more than two characters in length.");
      return;
    }
    if (data.get("productPrice").toString().length < 2 || !isNumeric(data.get("productPrice").toString())) {
      alert("Must specify a valid product price.")
      console.log("Must specify a product price.");
      return;
    }
    if (category.title=="") {
      alert("Must select a category.")
      console.log("Must select a category.");
      return;
    }
    console.log("Category: ", category);

    try {
      //console.log(data.get(localStorage.getItem("userID")));
      var postData = {
        //category: data.get("category"),
        category: category.title,
        description: data.get("productDesc"),
        //image: data.get("image"),
        image: "test.jpg",
        price: data.get("productPrice"),
        //Hardcoding this until everyone is using the login
        //sellerUserID: data.get(localStorage.getItem("userID")),
        //sellerUserID: "John Doe",
        sellerUserID: localStorage.getItem("userEmail"),
        title: data.get("productTitle"),
      };
      
      // Simple PUT request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };
      fetch("http://localhost:3001/users/post-product", requestOptions)
          .then(response => response.json())
          .then((data) => {
            console.log("Created product with ID = " + data); 
            postedFlag = true;
            navigate("/")
          });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };

  function submitCategory(value){
    if(value!==null){
      setCategory({
        title: value
      })
    }
    else{
      setCategory({
        title: ""
      })
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${LoginImg}`} />
        </Box>
      </Grid>
    */}
      <Grid item xs={12} sm={12} md={6} >
        <Box
          sx={{
            mt: "1em",
            mb: "5em",
            mx: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography className="sellProductTextPrimary" gutterBottom>
            Sell your item
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button
                className="photosUploadButton"
                fullWidth
                variant="outlined"
                component="span"
              >
                <UploadIcon />
                Add photos
              </Button>
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productTitle"
              label="Title"
              name="productTitle"
              variant="outlined"
            />
            <FormControl required margin="normal" fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="productPrice"
                name="productPrice"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                label="Price"
              />
            </FormControl>
            
            <Autocomplete
              clearOnEscape
              id="category"
              onChange={(event, value) => submitCategory(value)}
              options={categories}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  placeholder="Category"
                  margin="normal"
                  variant="standard"
                  required
                />
              )}
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={4}
              id="productDesc"
              label="Description"
              name="productDesc"
              variant="outlined"
            />
            <Button
              className="buttonMain"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sell
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
const categories = [
  { title: "Mobile" },
  { title: "Laptops" },
  { title: "Books" },
  { title: "Furniture" },
  { title: "Clothes" },
];

export default UploadProduct;
