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

  useEffect(() => {
    if (cssAuth) {
      dispatch(cssSetTemplates(cssAuth.id));
    }
  }, [cssAuth]);

  if (cssAuth) {
    console.log("css auth id", cssAuth);
  }

  const isFavorite = cssTemplates.some((fav) => component.htmlText === fav.htmlText);
  const toUnfavorite = cssTemplates.find((fav) => component.htmlText === fav.htmlText);

  const onHandleHeartClick = async () => {
    if (cssAuth) {
      component.userId = cssAuth.id;
      console.log("favorite clicked", component);
      dispatch(cssCreateTemplate(component));
      await setHeartClicked(true);
    }
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
