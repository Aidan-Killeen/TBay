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
import LoginImg from "../Content/Images/Login.svg";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    //handle email & password requirements
    if(!data.get("email").toString().includes('@')){
      console.log("No @ provided in email.")
      return;
    }
    if(data.get("password").toString().length<5){
      console.log("Password must be atleast 5 characters long.")
      return;
    }
    
    try{
      fetch('http://localhost:3001/users/login?email='+data.get("email")+'&password='+data.get("password"))
      .then(res => res.json())
      .then((result) => {
        if(result==false) console.log("Login Failed!");
        else {
          localStorage.setItem('idToken', result.idToken)
          console.log("Successfully logged in! idToken: ", localStorage.getItem('idToken'))
        }
      });
    }
    catch (e) {
      console.log("Error logging in: ", e.message);
    }
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
            `url(${LoginImg})`,
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
          <Typography className="textPrimary">Login</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: "1rem" }}
          >
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
              autoComplete="current-password"
              variant="standard"
            />
            <Button
              className="buttonMain"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs={12} sx={{ mt: "1rem" }}>
                {"or, login with..."}
                <Button
                  className="buttonGoogle"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <GoogleLogo className="googleLogo" /> Sign in with Google
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1rem" }}>
                {"New to Tbay? "}
                <Link className="linkMain" to="/signup" variant="body2">
                  {"Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
