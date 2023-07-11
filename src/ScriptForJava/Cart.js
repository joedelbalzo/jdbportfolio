import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { scriptLogout, scriptRemoveFromCart, scriptAddToCart } from "../store/index";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const Cart = () => {
  const { scriptCart } = useSelector((state) => state);
  if (!scriptCart) {
    return null;
  } else {
    console.log(scriptCart);
  }

  console.log("are we getting to this page???");
  const dispatch = useDispatch();
  const products = scriptCart.lineItems;

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

  return (
    <div id="scriptforjava-cart">
      <h1>Shopping Cart</h1>

      <div>
        {products
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .map((prod) => {
            return (
              <Accordion key={prod.id} sx={{ minWidth: 275, maxWidth: 800 }} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <Button onClick={() => _removeFromCart(prod.product, 1)}>-</Button>
                    {prod.quantity}
                    <Button onClick={() => _addToCart(prod.product, 1)}>+</Button>{" "}
                    {prod.product.name}
                    <Button onClick={() => _removeFromCart(prod.product, prod.quantity)}>
                      X
                    </Button>{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Size: {prod.product.size}
                    <br />
                    Price: ${prod.product.price}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}

        <Card sx={{ minWidth: 275, maxWidth: 800, textAlign: "right" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Cart Total: ${getTotal()}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button component="span" size="small" sx={{ fontSize: 18 }}>
              {getTotal() === 0 ? (
                <Link to="/scriptforjava/menu" sx={{ color: "black" }}>
                  Add items to your Cart to Checkout
                </Link>
              ) : (
                <Link to="/scriptforjava/checkout">Checkout</Link>
              )}
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
