import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placesEditUserSettings } from "../../store/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormLabel } from "@mui/material";
import { Grid } from "@mui/material";

const Settings = () => {
  const { placesAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!placesAuth) {
    return "wtf";
  }

  const [username, setUsername] = useState(placesAuth.username);
  const [settingRadius, setSettingRadius] = useState(placesAuth.settingRadius);
  const [settingHomeLat, setSettingHomeLat] = useState(placesAuth.settingHomeLat);
  const [settingHomeLng, setSettingHomeLng] = useState(placesAuth.settingHomeLng);
  const [settingFavCategories, setSettingFavCategories] = useState(placesAuth.settingFavCategories);
  const [checked, setChecked] = useState("");

  // useEffect(() => {
  //   if (placesAuth) {
  //   }
  // }, [placesAuth]);

  const handleChange = (ev) => {
    // const idx = formattedTypes.indexOf(ev.target.name);
    // console.log(idx)
    const category = ev.target.name;
    if (ev.target.checked && settingFavCategories.length < 5) {
      setSettingFavCategories([...settingFavCategories, category]);
    } else {
      setSettingFavCategories(settingFavCategories.filter((c) => c !== category));
    }
  };

  const googleTypes = [
    "amusement_park",
    "bakery",
    "bank",
    "bar",
    "book_store",
    "bowling_alley",
    "cafe",
    "clothing_store",
    "convenience_store",
    "department_store",
    "doctor",
    "drugstore",
    "gym",
    "hair_care",
    "hardware_store",
    "home_goods_store",
    "hospital",
    "laundry",
    "library",
    "liquor_store",
    "meal_takeaway",
    "movie_theater",
    "museum",
    "park",
    "restaurant",
    "shoe_store",
    "shopping_mall",
    "spa",
    "store",
    "supermarket",
    "tourist_attraction",
  ];

  const formattedTypes = [
    "Amusement Parks",
    "Bakeries",
    "Banks",
    "Bars",
    "Book Stores",
    "Bowling Alleys",
    "Cafes",
    "Clothing Stores",
    "Convenience Stores",
    "Department Stores",
    "Doctors",
    "Drugstores",
    "Gyms",
    "Hair Care",
    "Hardware Stores",
    "Home Goods Stores",
    "Hospitals",
    "Laundromats",
    "Libraries",
    "Liquor Stores",
    "Meal Takeaway",
    "Movie Theaters",
    "Museums",
    "Parks",
    "Restaurants",
    "Shoe Stores",
    "Shopping Malls",
    "Spas",
    "Stores",
    "Supermarkets",
    "Tourist Attractions",
  ];

  const onSubmit = (ev, placesAuth) => {
    ev.preventDefault();
    console.log("wtf");
    dispatch(
      placesEditUserSettings({
        placesAuth,
        username,
        settingRadius,
        settingHomeLat,
        settingHomeLng,
        settingFavCategories,
      })
    );
    useNavigate("/openplaces/home");
  };

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setSettingHomeLat(position.coords.latitude);
      setSettingHomeLng(position.coords.longitude);
    });
  };

  return (
    <div id="places-categoryContainer">
      <div id="places-categoryHeader">Settings</div>
      <Box component="form" sx={{ "& > :not(style)": { mx: 4, mt: 2 } }} noValidate autoComplete="off">
        <p style={{ fontSize: "calc(12px + 0.5vw)", textAlign: "left", width: "calc(30% + 20vw)" }}>
          note: your device will fetch your current location every time you pick a new category. this is just your default home setting
        </p>

        <TextField
          key={username}
          id="outlined-controlled"
          label="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <TextField
          key={settingRadius}
          id="outlined-controlled"
          label="Radius (in meters)"
          value={settingRadius}
          onChange={(ev) => setSettingRadius(ev.target.value)}
        />

        <TextField
          key={settingHomeLat}
          id="outlined-controlled"
          label="Home Latitude"
          value={settingHomeLat}
          onChange={(ev) => setSettingHomeLat(ev.target.value)}
        />

        <TextField
          key={settingHomeLng}
          id="outlined-controlled"
          label="Home Longitude"
          value={settingHomeLng}
          onChange={(ev) => setSettingHomeLng(ev.target.value)}
        />
        <Button variant="outlined" size="small" sx={{ fontSize: ".9rem", width: "fit-content" }} onClick={() => setLocation()}>
          set your current latitude and longitude
        </Button>

        <FormLabel>Choose up to 5 categories:</FormLabel>
        <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
          {googleTypes.map((category, idx) => (
            <Grid item xs={8} sm={6} md={6} sx={{ textAlign: "left", fontSize: "2rem", margin: "-1rem", padding: "-1rem" }} key={category}>
              <FormControlLabel
                // error={}
                control={
                  <Checkbox
                    checked={settingFavCategories.includes(category)}
                    onChange={(ev) =>
                      setSettingFavCategories(
                        ev.target.checked ? [...settingFavCategories, category] : settingFavCategories.filter((c) => c !== category)
                      )
                    }
                    name={category}
                  />
                }
                label={formattedTypes[idx]}
                // className={classes.formControlLabel}
                style={{
                  formControlLabel: {
                    marginBottom: "10px",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" size="large" sx={{ fontSize: "2rem", marginBottom: "1rem" }} onClick={(ev) => onSubmit(ev, placesAuth)}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Settings;
