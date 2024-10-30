import React, { useState } from "react";
import { TextField, Grid, Button, Typography, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

const Address = () => {
  const [addressDetails, setAddressDetails] = useState({
    country: "",
    province: "",
    city: "",
    address: "",
    famousPlace: "",
    contactNumber: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    setAddressDetails({
      ...addressDetails,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Address details submitted:", addressDetails);

    // Clear input fields after submission
    setAddressDetails({
      country: "",
      province: "",
      city: "",
      address: "",
      famousPlace: "",
      contactNumber: "",
    });
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: "100vh",
        mx: "auto",
        backgroundColor: "#EEF5FF",
        mt: "5rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Delivery Address
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              variant="outlined"
              name="country"
              value={addressDetails.country}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Province"
              variant="outlined"
              name="province"
              value={addressDetails.province}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"
              name="city"
              value={addressDetails.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={addressDetails.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nearly Famous Place"
              variant="outlined"
              name="Famous Place"
              value={addressDetails.famousPlace}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              variant="outlined"
              name="contactNumber"
              value={addressDetails.contactNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Address Form Submission Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <NavLink to="/paymentmethod">
            <Button variant="contained" color="secondary">
              Proceed to Payment
            </Button>
          </NavLink>
        </div>
      </form>
    </Paper>
  );
};

export default Address;
