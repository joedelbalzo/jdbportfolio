// react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// mui imports
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Rating, Button, TextField, Box, Stack } from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

//component imports

//store imports
import {
  placesFetchNearbyPlaces,
  placesFetchUserFavorites,
  placesAddUserFavorite,
  placesRemoveUserFavorite,
  placesEditNearbyPlaces,
} from "../store/index";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NearbyPlaces = () => {
  const { placesNearbyPlaces, placesAuth, placesFavorites } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCoords, setCurrentCoords] = useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(placesFetchUserFavorites());
    const { settingHomeLat, settingHomeLng, settingRadius, settingFavCategories } = placesAuth;

    if (!placesAuth.settingRadius) {
      console.log(["shit dont exist yet"]);
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log("actual", lat, "actual", lng);
    });

    let lat, lng;
    if (currentCoords) {
      lat = currentCoords.lat;
      lng = currentCoords.lng;
    } else {
      lat = settingHomeLat;
      lng = settingHomeLng;
    }
    let radius = settingRadius;
    let type = settingFavCategories[0];
    dispatch(placesFetchNearbyPlaces({ lat, lng, radius, type }));
    setCategoryName(type);
    setSelectedCategory(type);
  }, []);

  useEffect(() => {
    dispatch(placesFetchUserFavorites());
  }, []);

  if (!placesNearbyPlaces) return null;
  if (!placesAuth) {
    navigate("../");
  }

  const handleFavoriteClick = (place) => {
    if (placesFavorites.includes(place)) {
      dispatch(placesRemoveUserFavorite(place, placesAuth));
    }
    if (!placesFavorites.includes(place)) {
      dispatch(placesAddUserFavorite(place, placesAuth));
    }
    dispatch(placesFetchUserFavorites());
  };

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
    setExpanded(false);
  };

  const googleDate = () => {
    return new Date().getDay();
  };

  const googleTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return parseInt(`${hours < 10 ? "0" + hours : hours}${minutes < 10 ? "0" + minutes : minutes}`);
  };
  const openNow = (category) => {
    // for seeded data
    let placesWithHours = placesNearbyPlaces
      .filter((place) => place.opening_hours)
      .filter((place) => place.types.includes(category));
    const today = googleDate();
    const time = googleTime();
    const placesOpenNow = [];
    for (let place of placesWithHours) {
      for (let hours of place.opening_hours) {
        if (hours.open.day === today && time > hours.open.time) {
          if (hours.open.day === hours.close.day && time < hours.close.time) {
            placesOpenNow.push(place);
          }
          if (hours.open.day !== hours.close.day) {
            let afterMidnight = hours.close.time * 1 + 2400;
            if (time < afterMidnight) {
              placesOpenNow.push(place);
            }
          }
        }
      }
    }
    return placesOpenNow;
    // for fetched data
    // return placesNearbyPlaces.filter(place => place.opening_hours.open_now === true)
  };

  const fetchByCategory = (ev) => {
    let lat, lng;
    if (currentCoords) {
      lat = currentCoords.lat;
      lng = currentCoords.lng;
    } else {
      lat = placesAuth.settingHomeLat;
      lng = placesAuth.settingHomeLng;
    }
    let type = ev.target.value;
    let radius = placesAuth.settingRadius;
    dispatch(placesFetchNearbyPlaces({ lat, lng, radius, type }));
    setCategoryName(type);
    setSelectedCategory(type);
  };

  const placeDistance = (lat1, lon1, placeGeometry) => {
    const { lat, lng } = placeGeometry.location;
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a =
      0.5 - c((lat - lat1) * p) / 2 + (c(lat1 * p) * c(lat * p) * (1 - c((lng - lon1) * p))) / 2;
    const distance = 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
    return distance;
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  function pluralize(word, count) {
    if (count === 1) {
      return word;
    } else if (word === "bowling_alley") {
      return word + "s";
    } else if (word.endsWith("y")) {
      return word.slice(0, -1) + (count === 0 || count > 1 ? "ies" : "y");
    } else {
      return word + "s";
    }
  }

  const openSoon = (timeQueried, category) => {
    const placesWithHours = placesNearbyPlaces
      .filter((place) => place.opening_hours)
      .filter((place) => place.types.includes(category));
    const today = googleDate();
    const time = googleTime();
    const placesOpenSoon = [];
    for (let place of placesWithHours) {
      for (let hours of place.opening_hours) {
        if (
          hours.open.day === today &&
          time < hours.open.time * 1 &&
          time > hours.open.time * 1 - timeQueried
        ) {
          placesOpenSoon.push(place);
        }
      }
    }
    return placesOpenSoon;
  };

  const closingSoon = (timeQueried, category) => {
    const placesWithHours = placesNearbyPlaces
      .filter((place) => place.opening_hours)
      .filter((place) => place.types.includes(category));
    const today = googleDate();
    const time = googleTime();
    const placesClosingSoon = [];
    for (let place of placesWithHours) {
      for (let hours of place.opening_hours) {
        if (
          (hours.open.day === today || hours.open.day === today + 1) &&
          time < hours.close.time * 1 &&
          time > hours.close.time * 1 - timeQueried
        ) {
          placesClosingSoon.push(place);
        }
      }
    }
    return placesClosingSoon;
  };

  const saveNotesAndRating = (place, placesAuth) => {
    console.log(place, rating, notes, placesAuth);
    dispatch(placesEditNearbyPlaces(place, rating, notes, placesAuth));
  };

  return (
    <>
      <div>
        <div id="places-welcomePage">
          {capitalizeFirstLetter(placesAuth.username || "")}, {openNow(categoryName).length}{" "}
          {openNow(categoryName).length === 1
            ? `${categoryName.split("_").join(" ")} is`
            : `${pluralize(categoryName, 0).split("_").join(" ")} are`}{" "}
          open now!
          <br />
          <div id="places-welcomeSmaller">
            {openSoon(30, categoryName).length === 0
              ? ""
              : `${openSoon(30, categoryName).length} more within 30 minutes.${(<br />)}`}
            {closingSoon(120, categoryName).length === 0
              ? ""
              : `${closingSoon(120, categoryName).length} will close within two hours.`}
            <br />
          </div>
        </div>

        <div id="places-categoryButtonContainer">
          {placesAuth.settingFavCategories?.map((category) => {
            return (
              <Button
                key={category}
                variant="outlined"
                sx={{
                  fontSize: "calc(14px + 2vw)",
                  marginBottom: 0.4,
                  mx: 0.4,
                  backgroundColor: selectedCategory === category ? "#1C5D99;" : "transparent",
                  color: selectedCategory === category ? "white" : "black",
                  "&:hover": {
                    color: "white",
                    backgroundColor: selectedCategory === category ? "#1C5D99;" : "#A2A3BB",
                  },
                }}
                onClick={(ev) => fetchByCategory(ev)}
                value={category}
                id={category}
              >
                {pluralize(category, 0).split("_").join(" ")}
              </Button>
            );
          })}
        </div>

        <div id="places-categoryContainer">
          <div id="places-categoryHeader">{pluralize(categoryName, 0).split("_").join(" ")}</div>
          <div>
            {openNow(categoryName)
              .filter((place) => place.types.includes(categoryName))
              .map((place, i) => {
                const isFavorite = placesFavorites.includes(place);
                return (
                  <div key={place.id}>
                    <Card
                      sx={{
                        maxWidth: "700px",
                        width: "90%",
                        marginTop: "1rem",
                        mx: "auto",
                        borderRight: 1,
                        borderBottom: 1,
                        borderColor: "#A2A3BB",
                      }}
                    >
                      <CardHeader
                        sx={{
                          fontSize: 51,
                        }}
                        variant="h1"
                        title={place.name}
                      />
                      <CardMedia
                        component="img"
                        alt={place.name}
                        image={place.photo}
                        sx={{
                          maxHeight: "400px",
                        }}
                      />
                      <CardContent>
                        <Typography
                          color="text.secondary"
                          textAlign={"left"}
                          sx={{ fontSize: "1.3rem" }}
                        >
                          <Link to={place.url} style={{ color: "inherit" }}>
                            Address: {place.vicinity || place.formatted_address}
                          </Link>
                          <br />
                          Distance:{" "}
                          {placeDistance(
                            placesAuth.settingHomeLat,
                            placesAuth.settingHomeLng,
                            place.geometry
                          ) < 0.1
                            ? "Less than .1 miles away!"
                            : `${
                                Math.floor(
                                  Math.round(
                                    placeDistance(
                                      placesAuth.settingHomeLat,
                                      placesAuth.settingHomeLng,
                                      place.geometry
                                    ) * 10
                                  )
                                ) / 10
                              } miles away`}
                          <br />
                          Google Rating: {place.rating} with {place.user_ratings_total} reviews.
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton
                          aria-label="add to favorites"
                          onClick={() => handleFavoriteClick(place)}
                          className={isFavorite ? "favoriteButton" : "notFavoriteButton"}
                        >
                          {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <ExpandMore
                          expand={expanded}
                          onClick={() => handleExpandClick(i)}
                          aria-expanded={expandedId === i}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                        <Box
                          sx={{ display: "flex", gap: 2 }}
                          justifyContent="space-around"
                          textAlign="left"
                        >
                          <Box>
                            <Typography>Open:</Typography>

                            <ul style={{ paddingLeft: "8px", fontSize: "1.1rem" }}>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[0]}</li>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[1]}</li>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[2]}</li>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[3]}</li>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[4]}</li>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[5]}</li>
                              <li style={{ listStyleType: "none" }}>{place.weekday_text[6]}</li>
                            </ul>
                          </Box>
                          <Box>
                            <Stack spacing={1}>
                              <Typography>Rating:</Typography>

                              <Rating
                                style={{ paddingLeft: "8px" }}
                                name="no-value"
                                precision={0.5}
                                defaultValue={place.your_rating * 1}
                                // value={place.your_rating}
                                size="large"
                                onChange={(ev, newRating) => setRating(newRating)}
                              />
                              <Typography>Notes:</Typography>

                              <TextField
                                style={{ paddingLeft: "8px" }}
                                id="outlined-multiline-static"
                                multiline
                                defaultValue={place.notes}
                                // value={place.notes}
                                rows={4}
                                variant="outlined"
                                onChange={(ev) => setNotes(ev.target.value)}
                              />
                              <Button
                                onClick={(ev) =>
                                  saveNotesAndRating(place, placesAuth, ev.target.value)
                                }
                              >
                                Save
                              </Button>
                            </Stack>
                          </Box>
                        </Box>
                      </Collapse>
                    </Card>
                  </div>
                );
              })}
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default NearbyPlaces;
