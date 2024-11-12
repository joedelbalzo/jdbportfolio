// react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Rating, Button, TextField, Box, Stack } from "@mui/material";

//component imports

//store imports
import { placesFetchUserFavorites, placesAddUserFavorite, placesRemoveUserFavorite } from "../../store/index";

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

const Favorites = () => {
  const { placesAuth, placesNearbyPlaces, placesFavorites } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (!placesAuth && !placesNearbyPlaces && !placesFavorites) {
    return "wtf";
  }

  const [username, setUsername] = useState(placesAuth.username);
  const [checked, setChecked] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(-1);
  const [deletedFavorite, setDeletedFavorite] = useState("");

  useEffect(() => {
    dispatch(placesFetchUserFavorites(placesAuth));
  }, []);

  const handleFavoriteClick = (place) => {
    // console.log(place)
    if (placesFavorites.includes(place)) {
      // console.log('already a favorite, going to unfavorite!')
      dispatch(placesRemoveUserFavorite(place, placesAuth));
      setDeletedFavorite(place);
    }
    if (!placesFavorites.includes(place)) {
      // console.log('NOT already a favorite, going to favorite!')
      dispatch(placesAddUserFavorite(place, placesAuth));
    }
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

  const placeDistance = (lat1, lon1, placeGeometry) => {
    const { lat, lng } = placeGeometry.location;
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat - lat1) * p) / 2 + (c(lat1 * p) * c(lat * p) * (1 - c((lng - lon1) * p))) / 2;
    const distance = 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
    return distance;
  };

  const openNow = (place) => {
    const today = googleDate();
    const time = googleTime();
    for (let openingHours of place.opening_hours)
      if (openingHours.open.day === today && openingHours.close.day === today) {
        if (time > openingHours.open.time && time < openingHours.close.time) {
          return true;
        }
      } else if (openingHours.open.day === today && openingHours.close.day !== today) {
        if (time > openingHours.open.time) {
          return true;
        }
      } else if (openingHours.open.day !== today && openingHours.close.day === today) {
        if (time < openingHours.close.time) {
          return true;
        }
      }
    return false;
  };

  const openSoon = (timeQueried, place) => {
    const today = googleDate();
    const time = googleTime();
    for (let hours of place.opening_hours) {
      if (hours.open.day === today && time < hours.open.time * 1 && time > hours.open.time * 1 - timeQueried) {
        return true;
      }
      return false;
    }
  };

  const closingSoon = (timeQueried, place) => {
    const today = googleDate();
    const time = googleTime();
    for (let hours of place.opening_hours) {
      if (
        (hours.open.day === today || hours.open.day === today + 1) &&
        time < hours.close.time * 1 &&
        time > hours.close.time * 1 - timeQueried
      ) {
        return true;
      }
      return false;
    }
  };

  if (!placesFavorites) {
    console.log("fuuu");
  }

  return (
    <>
      <div>
        <div id="places-categoryContainer">
          <div id="places-categoryHeader">Favorites</div>
          {deletedFavorite ? <div id="places-opensSoon">{deletedFavorite.name} just removed from favorites.</div> : ""}
          <div>
            {placesFavorites.map((place, i) => {
              return (
                <div key={place.id}>
                  {/* {place.name} */}
                  <Card
                    sx={{
                      maxWidth: "700px",
                      width: "90%",
                      marginTop: "1rem",
                      mx: "auto",
                      // borderTop: 1,
                      borderBottom: 1,
                    }}
                  >
                    <CardHeader action={<IconButton aria-label="settings"></IconButton>} title={place.name} />
                    <CardMedia component="img" alt={place.name} height="400" image={place.photo} />
                    <CardContent>
                      {openNow(place) ? (
                        <span id="places-openNow">Currently Open!</span>
                      ) : (
                        <span id="places-opensSoon">Currently Closed!</span>
                      )}
                      {openSoon(30, place) ? <span id="places-opensSoon">but it opens soon, hang on!</span> : ""}
                      {closingSoon(120, place) ? <span id="places-opensSoon">but it closes soon! go go go!</span> : ""}

                      <Typography color="text.secondary" textAlign={"left"} sx={{ fontSize: "1.3rem" }}>
                        <Link to={place.url} style={{ color: "inherit" }}>
                          Address: {place.vicinity || place.formatted_address}
                        </Link>
                        <br />
                        Distance:{" "}
                        {placeDistance(placesAuth.settingHomeLat, placesAuth.settingHomeLng, place.geometry) < 0.1
                          ? "Less than .1 miles away!"
                          : `${
                              Math.floor(
                                Math.round(placeDistance(placesAuth.settingHomeLat, placesAuth.settingHomeLng, place.geometry) * 10)
                              ) / 10
                            } miles away`}
                        <br />
                        Google Rating: {place.rating} with {place.user_ratings_total} reviews.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" onClick={() => handleFavoriteClick(place)}>
                        {placesFavorites.includes(place) ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}
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
                      <Box sx={{ display: "flex", gap: 2 }} justifyContent="space-around" textAlign="left">
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
                            <Button onClick={(ev) => saveNotesAndRating(place, placesAuth, ev.target.value)}>Save</Button>
                          </Stack>
                        </Box>
                      </Box>{" "}
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

export default Favorites;
