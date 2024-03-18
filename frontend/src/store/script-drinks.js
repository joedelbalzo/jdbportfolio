import axios from "axios";

const scriptDrinks = (state = [], action) => {
  if (action.type === "SET_DRINKS") {
    return action.drinks;
  }
  if (action.type === "CREATE_DRINK") {
    return [action.drink, ...state];
  }
  if (action.type === "EDIT_DRINK") {
    state = state.map((drink) => {
      if (drink.id === action.drink.id) {
        return action.drink;
      }
      return drink;
    });
  }
  if (action.type === "DELETE_DRINK") {
    return state.filter((_drink) => _drink.id !== action.drink.id);
  }
  return state;
};

export const scriptFetchDrinks = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/script/menu");
    // console.log("fetch drinks store", response.data);
    dispatch({ type: "SET_DRINKS", drinks: response.data });
  };
};
export const scriptCreateDrink = (drink) => {
  return async (dispatch) => {
    const response = await axios.post(`api/script/menu`, drink);
    dispatch({ type: "CREATE_DRINK", drink: response.data });
  };
};
export const scriptEditDrink = (drink) => {
  return async (dispatch) => {
    const response = await axios.put(`api/script/menu/${drink.id}`, drink);
    dispatch({ type: "EDIT_DRINK", drink: response.data });
  };
};
export const scriptDeleteDrink = (drink) => {
  return async (dispatch) => {
    await axios.delete(`api/script/menu/${drink.id}`);
    dispatch({ type: "DELETE_DRINK", drink });
  };
};

export default scriptDrinks;
