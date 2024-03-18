import axios from "axios";
const scriptCart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    console.log("setting cart");
    return action.cart;
  }

  return state;
};

export const scriptFetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/script/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};
export const scriptClearCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete("/api/script/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const scriptAddToCart = (product, quantity, auth) => {
  return async (dispatch) => {
    console.log("adding to cart in store", product, quantity);
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "/api/script/orders/cart",
      {
        product,
        quantity,
        auth,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(response.data, "response in store");
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const scriptRemoveFromCart = (product, quantityToRemove) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (product === "all") {
      dispatch({ type: "SET_CART", cart: null });
    }
    const response = await axios.put(
      "/api/script/orders/cart",
      {
        product,
        quantityToRemove,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export default scriptCart;
