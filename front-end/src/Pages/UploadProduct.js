import "../Styles/App.css";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Autocomplete from "./TempAutocomplete.js";

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
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${LoginImg}`} />
        </Box>
      </Grid>
    */}
      <Grid item xs={12} sm={12} md={6} square>
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
          <Box component="form" noValidate>
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
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Price"
              />
            </FormControl>
            <Autocomplete />
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

export default UploadProduct;
