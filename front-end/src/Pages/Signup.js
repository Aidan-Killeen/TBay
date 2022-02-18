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
    //handle  & password requirements
    if (!data.get("email").toString().includes("@")) {
      console.log("No @ provided in email.");
      return;
    }
    //Check are passwords equal
    if (data.get("password").toString().length < 5) {
      console.log("Password must be atleast 5 characters long.");
      return;
    }

    try {
      fetch(
        "http://localhost:3001/users/signup?email=" +
          data.get("email") +
          "&password=" +
          data.get("password")
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === false) console.log("Sign up failed!");
          else {
            console.log("Successfully signed up!");
            //Route user to log in (or log user in manually and route them to homepage)
          }
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/*  
     <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${SignupImg}`} />
        </Box>
      </Grid>
  */}
      <Grid item xs={12} sm={12} md={6} square>
        <Box
          sx={{
            my: "1em",
            mx: "1em",
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
            <Grid item>
              <Button
                className="buttonGoogle"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: "1em" }}
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
              <Grid item xs={12} sx={{ mt: "1em", mb: "5em" }}>
                {"Already have an account? "}
                <Link className="linkMain" to="/login">
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
