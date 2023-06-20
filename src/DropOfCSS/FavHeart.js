import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { cssCreateTemplate, cssSetTemplates, cssDeleteTemplate } from "../store";

const FavHeart = ({ component }) => {
  const { cssTemplates, cssAuth } = useSelector((state) => state);
  const [heartClicked, setHeartClicked] = useState(false);
  const dispatch = useDispatch();

  // things that need to happen:
  // 1. a click needs to turn the object red, and it also needs to submit the current code to favorites.
  // 2. an unclick needs to clear the code from the template list, but doesn't clear local storage.

  // if (cssTemplates && cssTemplates.find((template) => template.id === component.id)) {
  //   setHeartClicked(!isHeartClicked);
  // }

  useEffect(() => {
    if (cssAuth) {
      dispatch(cssSetTemplates(cssAuth.id));
    }
  }, [cssAuth]);

  const isFavorite = cssTemplates.some((fav) => component.htmlText === fav.htmlText);
  const toUnfavorite = cssTemplates.find((fav) => component.htmlText === fav.htmlText);

  // console.log(component ? component : "no component");
  // console.log(cssTemplates ? cssTemplates : "no templates");
  // console.log(isFavorite ? isFavorite : "favorites");
  // console.log(cssAuth ? cssAuth : "no cssAuth");

  const onHandleHeartClick = async () => {
    if (cssAuth) {
      component.userId = cssAuth.id;
      // console.log("favorited");
      dispatch(cssCreateTemplate(component));
      await setHeartClicked(true);
      // console.log("dispatched");
      // console.log("isfavorite?", isFavorite);
    }
    // if (!cssAuth) {
    //   <HeartBrokenIcon />;
    //   ("not logged in");
    // }
  };
  const offHandleHeartClick = async () => {
    dispatch(cssDeleteTemplate(toUnfavorite.id));
    await setHeartClicked(false);
  };

  return (
    <span>
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "#f44336" }} onClick={offHandleHeartClick} />
      ) : (
        <FavoriteBorderIcon onClick={onHandleHeartClick} />
      )}
    </span>
  );
};

export default FavHeart;
