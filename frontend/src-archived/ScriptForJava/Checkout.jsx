import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { scriptLogout, scriptAddToCart, scriptRemoveFromCart } from "../store/index";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Checkout = () => {
  const { scriptCart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = scriptCart.lineItems;

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    email: "",
    phone: "",
    creditCard: "",
    securityCode: "",
  });
  const [creditCardError, setCreditCardError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { scriptAuth } = useSelector((state) => state);

  useEffect(() => {
    setIsFormValid(
      !creditCardError &&
        !phoneError &&
        !emailError &&
        customer.firstName &&
        customer.lastName &&
        customer.address &&
        customer.zip &&
        customer.email &&
        customer.phone &&
        customer.creditCard &&
        customer.securityCode
    );
  }, [creditCardError, phoneError, emailError, customer]);

  const _removeFromCart = (product, quantityToRemove) => {
    dispatch(scriptRemoveFromCart(product, quantityToRemove));
  };

  const _addToCart = (product, quantity) => {
    dispatch(scriptAddToCart(product, quantity));
  };

  const getTotal = () => {
    let sum = 0;
    products.forEach((product) => {
      sum += product.product.price * product.quantity;
    });
    return sum;
  };

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));

    if (name === "creditCard") {
      setCreditCardError(!isValidCreditCard(value));
    } else if (name === "phone") {
      setPhoneError(!isValidPhoneNumber(value));
    } else if (name === "email") {
      setEmailError(!isValidEmail(value));
    }
  };

  const isValidCreditCard = (input) => {
    const creditCardRegex = /^\d{16}$/; // Regular expression for 16-digit numeric input
    return creditCardRegex.test(input);
  };

  const isValidPhoneNumber = (input) => {
    const phoneRegex = /^\d{10}$/; // Regular expression for 10-digit numeric input
    return phoneRegex.test(input);
  };

  const isValidEmail = (input) => {
    const emailRegex = /^\S+@\S+\.\S+$/; // Basic email format validation
    return emailRegex.test(input);
  };

  const pay = async (ev) => {
    ev.preventDefault();
    console.log("in cart pay function", ev, scriptCart);
    dispatch(scriptRemoveFromCart("all", 0));
    const orderNum = Math.floor(Math.random() * 1000000);
    navigate(`/scriptforjava/order/${orderNum}`);
  };

  return (
    <div id="scriptforjava-checkoutPage">
      <div id="scriptforjava-checkoutPageCart">
        <h1>Shopping Cart</h1>

        {products
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .map((prod) => {
            return (
              <Accordion key={prod.id} sx={{ minWidth: 200, maxWidth: 800 }} disableGutters>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>
                    {prod.quantity} - {prod.product.name}, ${prod.product.price} Each
                  </Typography>
                </AccordionSummary>
              </Accordion>
            );
          })}
      </div>
      <div id="scriptforjava-checkoutPageForm">
        <form onSubmit={pay}>
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="First Name"
            variant="outlined"
            name="firstName"
            value={customer.firstName}
            onChange={handleInputChange}
          />
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={customer.lastName}
            onChange={handleInputChange}
          />
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="Address"
            variant="outlined"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
          />
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="ZIP"
            variant="outlined"
            name="zip"
            value={customer.zip}
            onChange={handleInputChange}
          />
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="E-mail"
            variant="outlined"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
            error={emailError}
            helperText={emailError ? "Invalid email" : ""}
          />
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="Phone"
            variant="outlined"
            name="phone"
            value={customer.phone}
            onChange={handleInputChange}
            error={phoneError}
            helperText={phoneError ? "Invalid phone number" : ""}
          />
          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="Credit Card"
            variant="outlined"
            name="creditCard"
            value={customer.creditCard}
            onChange={handleInputChange}
            error={creditCardError}
            helperText={creditCardError ? "Invalid credit card" : ""}
          />

          <TextField
            style={{ margin: 4, backgroundColor: "white" }}
            label="Security Code"
            variant="outlined"
            name="securityCode"
            value={customer.securityCode}
            onChange={handleInputChange}
          />

          <Button onClick={pay} sx={{ fontSize: "1.5rem" }} disabled={!isFormValid}>
            Place Order!
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
