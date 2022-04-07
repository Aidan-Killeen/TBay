import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import {
  Grid,
  Box,
  InputBase,
  Typography,
  Stack,
  CardActions,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Pagination,
} from "@mui/material";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import FaceIcon from "@mui/icons-material/Face";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Product from "../component/ProductCard";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Homepage = () => {
  function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
      per_page = per_page_items || 2,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);
    console.log(total_pages, items.length, per_page);
  
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }
  var items = [];
  const [page, setPage] = React.useState(1);

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
        status: "",
      },
    },
  ]);

  const handleChange = (event, value) => {
    setPage(paginator(products, value, 1).page);
  };

  useEffect(() => {
    // adjust dependencies to your needs
    try {
      fetch("http://localhost:3001/users/product")
        .then((res) => res.json())
        .then((result) => {
          if (result === false) console.log("Backend retrieval failed!");
          else {
            console.log("Retrieved products:", result);

            //remove inactive products from fetched products
            for (let i = 0; i < result.length; i++) {
              if (result[i].data.status != "active")
                delete result[i];
            }
            
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
              {products &&
              paginator(products, page, 5).data.map((product) => (
                // products.map((product) => (
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
                        alt={product.data.title}
                      />
                      <CardContent>
                        <Grid container>
                          <Grid item xs={12}>
                            <Stack
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="flex-start"
                            >
                              <Typography
                                className="productInfoText productTitle"
                                gutterBottom
                              >
                                {product.data.title}
                              </Typography>
                              <Chip
                                className="productInfoText productOwnerInfo"
                                icon={<FaceIcon />}
                                label={`by ` + product.data.sellerUserID}
                                variant="outlined"
                              />
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography className="productInfoText productPrice">
                                {product.data.price + `€`}
                              </Typography>

                              <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                              >
                                <ExpandMoreIcon />
                              </ExpandMore>
                            </Stack>
                            <Button
                              className="buttonMain"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 2 }}
                              to="#"
                              onClick={() =>
                                window.open(
                                  "mailto:" +
                                    product.data.sellerUserID +
                                    "?subject=TBay Purchase inquiry: " +
                                    product.data.title
                                )
                              }
                            >
                              Contact
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Stack justifyContent="flex-start" spacing={2}>
                            <Typography
                              className="productInfoText"
                              align="left"
                            >
                              Item Description
                            </Typography>
                            <Typography align="left">
                              {product.data.description}
                            </Typography>
                          </Stack>
                          <Stack justifyContent="flex-start" spacing={2}>
                            <Typography
                              className="productInfoText"
                              align="left"
                            >
                              Category
                            </Typography>
                            <Typography align="left">
                              {product.data.category.title}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </React.Fragment>
                ))}
            </div>
            <Pagination
              count={paginator(products, page, 5).total_pages}
              page={paginator(products, page, 5).page}
              onChange={handleChange}
              color="success"
            />
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default Homepage;
