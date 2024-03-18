import axios from "axios";
import { useNavigate } from "react-router-dom";

const placesNearbyPlaces = (state = [], action) => {
  if (action.type === "SET_NEARBYPLACES") {
    return action.places;
  }
  if (action.type === "EDIT_NEARBYPLACE") {
    return [action.place, ...state];
  }
  return state;
};

export const placesFetchNearbyPlaces = (search) => {
  return async (dispatch) => {
    const { lat, lng, radius, type } = search;
    const response = await axios.get("/api/openplaces/places/nearby", {
      params: { lat: lat, lng: lng, radius: radius, type: type },
    });
    dispatch({ type: "SET_NEARBYPLACES", places: response.data });
  };
};

export const placesEditNearbyPlaces = (place, rating, notes, auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/openplaces/places/nearby/${place.id}`,
      { rating, notes, auth },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "EDIT_NEARBYPLACE", place: response.data });
  };
};

export default placesNearbyPlaces;
