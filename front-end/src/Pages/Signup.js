import "../Styles/App.css";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as GoogleLogo } from "../Content/Images/Google.svg";
import SignupImg from "../Content/Images/Signup.svg";

function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Grid container component="main" sx={{ height: "90vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            `url(${SignupImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography className="textPrimary">Sign up</Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: "1rem" }}
          >
            <Grid item sx={{ mb: "1rem" }}>
              <Button
                className="buttonGoogle"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: "1em", mb: "1em" }}
              >
                <GoogleLogo className="googleLogo" /> Continue with Google
              </Button>
              {"Or, register with email…"}
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm password"
              type="password"
              id="password"
              variant="standard"
            />
            <Button
              className="buttonMain"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create account
            </Button>
            <Grid container>
              <Grid item xs={12} sx={{ mt: "1rem" }}>
                {"Already have an account? "}
                <Link className="linkMain" to="/login" variant="body2">
                  {"Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Signup;
