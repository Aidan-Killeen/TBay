import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

//temp
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
//temp end
import Product from "../component/ProductCard";

const Homepage = () => {
  var items = [];
  const [items2, setItems] = useState([
    {
      iD: "",
      data: {
        category: "",
        description: "",
        image: "",
        price: "",
        sellerUserID: "",
        title: "",
      },
    },
  ]);

  useEffect(() => {
    // adjust dependencies to your needs
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
          }
        });
    } catch (e) {
      console.log("Error retrieving result: ", e.message);
    }
  }, []);

  function click() {
    console.log(items2);
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
            <div className="container">
              {items2 &&
                items2.map((item2) => (
                  <>
                    <Card
                      className="productCard"
                      sx={{
                        mt: "2em",
                        mb: "2em",
                      }}
                    >
                      <CardMedia
                        className="productImage"
                        component="img"
                        height="50%"
                        image={item2.data.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Grid container>
                          <Grid item xs={12}>
                            <Stack
                              direction="column"
                              justifyContent="flex-end"
                              alignItems="flex-start"
                            >
                              <Typography
                                className="productInfoText productTitle"
                                gutterBottom
                              >
                                {item2.data.title}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography className="productInfoText productPrice">
                                {item2.data.price + `€`}
                              </Typography>

                              <Chip
                                className="productInfoText productOwnerInfo"
                                icon={<FaceIcon />}
                                label={`by` + item2.data.sellerUserID}
                                variant="outlined"
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </>
                ))}
            </div>
          </Grid>
        </Box>
        <button onClick={click}></button>
      </Grid>
    </div>
  );
};

export default Homepage;
