import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import placesAuth from "./places-auth";
import placesFavorites from "./places-favorites";
import placesNearbyPlaces from "./places-nearbyplaces";
import placesRegister from "./places-register";
import scriptAuth from "./script-auth";
import sciprtCart from "./script-cart";
import scriptRegister from "./script-register";
import scriptDrinks from "./script-drinks";
import scriptMerches from "./script-merches";
import scriptReviews from "./script-reviews";
import cssAuth from "./css-auth";
import { cssComponents } from "./css-components";
import { cssComponentColors } from "./css-components";
import cssCpg from "./css-cpg";
import cssTemplates from "./css-templates";

const reducer = combineReducers({
  placesAuth,
  placesFavorites,
  placesRegister,
  placesNearbyPlaces,
  scriptAuth,
  sciprtCart,
  scriptRegister,
  scriptDrinks,
  scriptMerches,
  scriptReviews,
  cssAuth,
  cssCpg,
  cssComponents,
  cssComponentColors,
  cssTemplates,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./places-auth";
export * from "./places-favorites";
export * from "./places-nearbyplaces";
export * from "./places-register";
export * from "./script-auth";
export * from "./script-cart";
export * from "./script-register";
export * from "./script-drinks";
export * from "./script-merches";
export * from "./script-reviews";
export * from "./css-auth";
export * from "./css-components";
export * from "./css-cpg";
export * from "./css-templates";
