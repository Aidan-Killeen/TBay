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

const Profile = () => {
  var items = [];
  const [products, setItems] = useState([
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

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${LoginImg}`} />
        </Box>
      </Grid>
    */}
        <Grid item xs={12} sm={12} md={6}>
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
            <Grid item xs={12}>
              <Typography className="sellProductTextPrimary" gutterBottom>
                Welcome back {localStorage.getItem("userEmail")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="productSectionTitle" gutterBottom>
                Your products
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className="container">
                {products &&
                  products.map((product) => (
                    <React.Fragment key={product.iD}>
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
                          image={product.data.image}
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
                                  {product.data.title}
                                </Typography>
                              </Stack>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography className="productInfoText productPrice">
                                  {product.data.price + `€`}
                                </Typography>

                                <Chip
                                  className="productInfoText productOwnerInfo"
                                  icon={<FaceIcon />}
                                  label={`by` + product.data.sellerUserID}
                                  variant="outlined"
                                />
                              </Stack>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </React.Fragment>
                  ))}
              </div>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
