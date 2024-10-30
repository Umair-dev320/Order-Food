import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);

    // Navigate based on selected payment method
    switch (event.target.value) {
      case "credit-card":
        navigate("/payment/creditcard");
        break;
      case "jazzcash":
        navigate("/payment/jazzcash");
        break;
      case "easypaisa":
        navigate("/payment/easypaisa");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Typography
        sx={{
          mt: 2,
          textAlign: "center", // Simplified for horizontal centering
        }}
        variant="h3"
      >
        Select the payment modes
      </Typography>

      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          display: "flex",
          justifyContent: "center",
          mt: "2rem",
          mx: "55rem",
        }}
        size="small"
      >
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          id="payment-method-select"
          value={paymentMethod}
          label="Select the payment method"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="cash">COD</MenuItem>
          <MenuItem value="credit-card">Credit/Debit Card</MenuItem>
          <MenuItem value="jazzcash">Jazzcash</MenuItem>
          <MenuItem value="easypaisa">Easypaisa</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PaymentMethod;
