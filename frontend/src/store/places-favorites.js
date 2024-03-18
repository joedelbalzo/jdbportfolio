import axios from "axios";

const placesFavorites = (state = [], action) => {
  if (action.type === "SET_FAVORITES") {
    return action.favorites;
  }
  if (action.type === "ADD_FAVORITE") {
    return [action.favorite, ...state];
  }
  if (action.type === "REMOVE_FAVORITE") {
    return state.filter((_fav) => _fav.id !== action.favorite.id);
  }
  return state;
};

export const placesFetchUserFavorites = (auth) => {
  return async (dispatch) => {
    // console.log()
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/openplaces/auth/favorites`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_FAVORITES", favorites: response.data });
  };
};
export const placesAddUserFavorite = (place, auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    // console.log('add user favorite store func')
    const response = await axios.put(
      `/api/openplaces/auth/favorites/add/`,
      { place },
      {
        headers: {
          authorization: token,
        },
      }
    );
    // console.log('STORE RESPONSE TO ADD', response.data)
    dispatch({ type: "ADD_FAVORITE", favorite: response.data });
  };
};
export const placesRemoveUserFavorite = (place, auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    // console.log('remove user favorite store func', place.id)
    const response = await axios.delete(`/api/openplaces/auth/favorites/remove/${place.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "REMOVE_FAVORITE", favorite: place });
  };
};

export default placesFavorites;
