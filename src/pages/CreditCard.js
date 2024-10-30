import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  Container,
  TextField,
  Box,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";

export const CreditCard = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [focus, setFocus] = useState("");

  // onsubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, number, expiry, cvc });
    // Clear input fields
    setName("");
    setNumber("");
    setExpiry("");
    setCVC("");
    setFocus("");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography id="credit-card" variant="h3" textAlign="center" my="50px">
        Card Information
      </Typography>
      <Paper
        elevation={6}
        sx={{ p: 4, maxWidth: "100vh", mx: "auto", backgroundColor: "#EEF5FF" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cardholder Name"
                variant="outlined"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Card Number"
                variant="outlined"
                type="tel"
                name="number"
                placeholder="Card Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date"
                variant="outlined"
                type="text"
                name="expiry"
                placeholder="MM/YY Expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVC"
                variant="outlined"
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCVC(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
