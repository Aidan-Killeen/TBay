import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import Product from "../component/ProductCard";

function Homepage() {
  return (
    <div>
      <Grid container component="main">
        <Box
          sx={{
            mt: "2em",
            mb: "5em",
            mx: "1em",
          }}
        >
          <Grid item xs={12}>
            <Box
              className="searchForm"
              component="form"
              sx={{
                p: "0em 0.5em 0em 0.5em",
                display: "flex",
                alignItems: "center",
                mb: "2em",
              }}
            >
              <InputBase
                className="searchFormText"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search items..."
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={2}
              sx={{
                mb: "1em",
              }}
            >
              <Typography className="typographyCategories">
                Trending now
              </Typography>
              <Link className="typographyCategoriesButton" to="/#">
                {"View all"}
              </Link>
            </Stack>

            <Product />
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}

export default Homepage;
