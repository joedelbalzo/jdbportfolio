import React from "react";
import { Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "verdana",
          fontSize: "calc(12px + 1vw)",
          fontWeight: "500",
          mx: "auto",
          marginTop: "2rem",
          marginBottom: "1rem",
          maxWidth: "70%",
        }}
      >
        Thank you for your order! <br /> Your order number is {location.pathname.slice(21)}.<br />{" "}
        You will get a confirmation email when your order has shipped!
        <br />
        <br />
        <br />
        <Link to="/home">Home</Link>
      </Typography>
    </div>
  );
};

export default Order;
