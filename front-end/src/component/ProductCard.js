import "../Styles/App.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

export default function ImgMediaCard() {
  return (
    <Card className="productCard" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          className="productImage"
          component="img"
          height="300px"
          image="..Content/Images/test.png"
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
                  component="div"
                >
                  Product
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  className="productInfoText productPrice"
                  component="div"
                >
                  15€
                </Typography>
                <Chip
                  className="productInfoText productOwnerInfo"
                  icon={<FaceIcon />}
                  label="by John Doe"
                  variant="outlined"
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
