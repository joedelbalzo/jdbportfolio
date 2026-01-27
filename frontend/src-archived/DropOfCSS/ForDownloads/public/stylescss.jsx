import React from "react";

export const stylescss = () => {
  let background;
  const savedWholePageBackground = JSON.parse(localStorage.getItem("savedWholePageBackground"));
  const savedTheme = localStorage.getItem("theme");
  if (!savedWholePageBackground && !savedTheme) {
    background = "white";
  } else if (savedWholePageBackground) {
    background = savedWholePageBackground;
  } else if (savedTheme) {
    background = "#575757";
  } else background = "white";

  return `body {
  background-color: ${background};
}`;
};
