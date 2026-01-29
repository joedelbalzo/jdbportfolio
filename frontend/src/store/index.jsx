import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// Legacy app imports (hidden - restorable)
// import placesAuth from "./places-auth";
// import placesFavorites from "./places-favorites";
// import placesNearbyPlaces from "./places-nearbyplaces";
// import placesRegister from "./places-register";
// import scriptAuth from "./script-auth";
// import scriptCart from "./script-cart";
// import scriptRegister from "./script-register";
// import scriptDrinks from "./script-drinks";
// import scriptMerches from "./script-merches";
// import scriptReviews from "./script-reviews";
// import cssAuth from "./css-auth";
// import { cssComponents, cssCodeFile, cssComponentColors } from "./css-components";
// import cssCpg from "./css-cpg";
// import cssTemplates from "./css-templates";

// Dummy reducer to satisfy Redux (all legacy app reducers are hidden)
const dummyReducer = (state = {}, action) => state;

const reducer = combineReducers({
  dummy: dummyReducer,
  // Legacy app reducers (hidden - restorable)
  // placesAuth,
  // placesFavorites,
  // placesRegister,
  // placesNearbyPlaces,
  // scriptAuth,
  // scriptCart,
  // scriptRegister,
  // scriptDrinks,
  // scriptMerches,
  // scriptReviews,
  // cssAuth,
  // cssCpg,
  // cssComponents,
  // cssComponentColors,
  // cssCodeFile,
  // cssTemplates,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

// Legacy app exports (hidden - restorable)
// export * from "./places-auth";
// export * from "./places-favorites";
// export * from "./places-nearbyplaces";
// export * from "./places-register";
// export * from "./script-auth";
// export * from "./script-cart";
// export * from "./script-register";
// export * from "./script-drinks";
// export * from "./script-merches";
// export * from "./script-reviews";
// export * from "./css-auth";
// export * from "./css-components";
// export * from "./css-cpg";
// export * from "./css-templates";
