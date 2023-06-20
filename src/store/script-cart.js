import axios from "axios";
const scriptCart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
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

export const scriptAddToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "/api/script/orders/cart",
      {
        product,
        quantity,
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

export const scriptRemoveFromCart = (product, quantityToRemove) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
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
