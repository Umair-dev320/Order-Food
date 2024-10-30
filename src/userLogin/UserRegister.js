import { useContext, useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddToCartContext } from "../context/AddToCart";

const UserRegister = () => {
  const { signupUserwithEmailAndPassword, isLoggedIn } =
    useContext(AddToCartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/userlogin");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Signing up a user...");

    try {
      const result = await signupUserwithEmailAndPassword(email, password);
      console.log("Successfully signed up:", result);
    } catch (error) {
      console.error("Error signing up:", error);
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
        type="string"
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
        Create Account
      </Button>
    </Box>
  );
};

export default UserRegister;
