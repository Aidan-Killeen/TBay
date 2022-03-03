import React, { useState } from "react";
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
  var items = [];
  const [items2, setItems] = useState([
    {
      category: "",
      description: "",
      image: "",
      price: "",
      sellerUserID: "",
      title: "",
    },
  ]);
  try {
    fetch("http://localhost:3001/users/product")
      .then((res) => res.json())
      .then((result) => {
        if (result === false) console.log("Backend retrieval failed!");
        else {
          console.log("Retrieved products:", result);
          for (let index = 0; index < result.length; index++) {
            items.push(
              <div>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={2}
                  sx={{
                    mt: "2em",
                    mb: "1em",
                  }}
                >
                  <Typography className="typographyCategories">
                    Electronics Store test
                  </Typography>
                  <Link className="typographyCategoriesButton" to="/#">
                    {"View all"}
                  </Link>
                </Stack>

                <Product />
              </div>
            );
          }
          setItems(result);
          console.log(items);
        }
      });
  } catch (e) {
    console.log("Error retrieving result: ", e.message);
  }

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
            {items}
            <div className="container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {items2 &&
                    items2.map((item2) => (
                      <tr key={item2.sellerUserID}>
                        <td>{item2.title}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}

export default Homepage;
