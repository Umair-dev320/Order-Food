import { useContext, useState, useEffect } from "react";
import { AddToCartContext } from "../context/AddToCart";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const UserLogin = () => {
  const { loginUserwithEmailAndPassword, signinWithGoogle, isLoggedIn } =
    useContext(AddToCartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/menu");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Logging in a user...");

    try {
      await loginUserwithEmailAndPassword(email, password);
      console.log("Successfully logged in");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        marginY: "40px",
      }}
    >
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        required
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => navigate("/userregister")}
      >
        Register User
      </Button>

      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 5 }}>
        OR
      </Typography>
      <Button
        onClick={signinWithGoogle}
        variant="contained"
        color="secondary"
        sx={{ backgroundColor: "#db4437", color: "white" }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default UserLogin;
