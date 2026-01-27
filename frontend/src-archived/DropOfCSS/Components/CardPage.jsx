import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reactElementToJSXString from "react-element-to-jsx-string";
//make this cardcss func
import { cardCSSFunc } from "./CardCSS";
import { download } from "./Download";
import { cssCreateCodeFile } from "../../store";

const ProductCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border: 3px solid ${(props) => props.colors.primary};
background-color: ${(props) => props.colors.bg}0D;
color: ${(props) => props.colors.bgColorContrast};
border-radius: 6px;
padding: 4px;
box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
box-sizing: border-box;

&:hover{
  transform: scale(1.01);
}

img {
  width: 95%;
  height: auto;
  box-shadow: 0 3px 3px 0px ${(props) => props.colors.secondary};
  margin: 1rem 0.5rem;
}
.cardcontent{
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 0.5vw);
    padding: 8px;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.action-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;
    padding: .25rem;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.button {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    font-size: calc(6px + 0.5vw);
    background-color: 0;
    border: none;
    color: black;
    margin: 4px;
    padding: .3rem;
    border-radius: 5px;
    @media screen and (max-width: 550px) {
      font-size: calc(10px + 2.5vw);
    }

    &:hover{
      background-color: ${(props) => props.colors.bg}40;
      color: ${(props) => props.colors.bgColorContrast};
      cursor: pointer;
    }
  }
}
`;

const ProductCardGradient = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border: 3px solid ${(props) => props.colors.primary};
background: linear-gradient(
  to right,
  ${(props) => props.colors.bg},
  ${(props) => props.colors.secondary}
);
color: ${(props) => props.colors.secondaryColorContrast};
border-radius: 6px;
padding: 4px;
box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
box-sizing: border-box;

&:hover{
  transform: scale(1.01);
}

img {
  width: 95%;
  height: auto;
  box-shadow: 0 3px 3px 0px ${(props) => props.colors.secondary};
  margin: 1rem 0.5rem;
}
.cardcontent{
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 0.5vw);
    padding: 8px;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.action-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;
    padding: .25rem;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.button {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    font-size: calc(6px + 0.5vw);
    border: 1px solid ${(props) => props.colors.primary};
    color: ${(props) => props.colors.secondaryColorContrast};
    margin: 4px;
    padding: .3rem;
    border-radius: 5px;
    @media screen and (max-width: 550px) {
      font-size: calc(10px + 2.5vw);
    }

    &:hover{
      background-color: ${(props) => props.colors.bg}40;
      color: ${(props) => props.colors.bgColorContrast};
      cursor: pointer;
    }
  }
}
`;

const ProductCardSubtle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border: 1px solid ${(props) => props.colors.primary};
background-color: ${(props) => props.colors.bg}0D;
color: ${(props) => props.colors.bgColorContrast};
border-radius: 3px;
padding: 4px;
box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
box-sizing: border-box;

&:hover{
  transform: scale(1.01);
}

img {
  width: 95%;
  height: auto;
  box-shadow: 0 2px 2px 0px ${(props) => props.colors.secondary};
  margin: 1rem 0.5rem;
}
.cardcontent{
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 0.5vw);
    padding: 8px;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.action-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;
    padding: .25rem;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.button {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    font-size: calc(6px + 0.5vw);
    background-color: 0;
    border: none;
    color: black;
    margin: 4px;
    padding: .3rem;
    border-radius: 5px;
    @media screen and (max-width: 550px) {
      font-size: calc(10px + 2.5vw);
    }

    &:hover{
      background-color: ${(props) => props.colors.bg}40;
      color: ${(props) => props.colors.bgColorContrast};
      cursor: pointer;
    }
  }
}
`;

const PhotoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.colors.primary};
  background-color: ${(props) => props.colors.bg}0D;
  color: ${(props) => props.colors.bgColorContrast};
  border-radius: 3px;
  padding: 2px;
  box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  .image-wrapper {
    width: 95%;
    margin: 0;

    img {
      width: 100%;
      height: auto;
      box-shadow: 0 2px 2px 0px ${(props) => props.colors.secondary};
    }
  }

  .cardcontent {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 0.5vw);
    padding: 8px;

    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
  }

  .action-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    padding: 0.25rem;

    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
  }

  .button {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    font-size: calc(6px + 0.5vw);
    background-color: 0;
    border: none;
    color: black;
    margin: 4px;
    padding: 0.3rem;
    border-radius: 5px;

    @media screen and (max-width: 550px) {
      font-size: calc(10px + 2.5vw);
    }

    &:hover {
      background-color: ${(props) => props.colors.bg}40;
      outline: 1px solid green;
      cursor: pointer;
    }
  }
`;
const SocialMediaCard = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: white;
  box-sizing: border-box;
  margin-bottom: 30px;
  font-family: Arial, sans-serif;

  .card-header {
    display: flex;
    align-items: center;
    padding: 16px;

    img {
      border-radius: 50%;
      height: 32px;
      width: 32px;
      margin-right: 16px;
    }

    .username {
      font-weight: 400;
      font-size: calc(6px + 1vw);
    }
  }

  .card-image img {
    width: 100%;
    height: auto;
  }

  .card-content {
    padding: 16px;

    .icons {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
    }

    .icon {
      height: 20px;
      cursor: pointer;
    }

    .caption {
      margin-bottom: 8px;
      font-size: calc(6px + 1vw);
    }

    #likesandcomments {
      font-size: 14px;

      .likes {
        font-weight: 600;
        margin-bottom: 4px;
      }
    }
  }
`;

const CardPage = ({ card }) => {
  const { cssAuth, cssCpg } = useSelector((state) => state);

  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [primaryColorContrast, setPrimaryColorContrast] = useState("");
  const [secondaryColorContrast, setSecondaryColorContrast] = useState("");
  const [tertiaryColorContrast, setTertiaryColorContrast] = useState("");
  const [bgColorContrast, setBgColorContrast] = useState("");
  const [error, setError] = useState("");
  const [cardPage, setCardPage] = useState("");
  const [jsxString, setJsxString] = useState("");
  const [downloadableCSS, setDownloadableCSS] = useState("");
  const [dl, setDl] = useState("");
  const [tagName, setTagName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cssCpg) {
    return null;
  }
  if (card) {
    // console.log("card:", card.name);
  } else {
    return null;
  }

  useEffect(() => {
    try {
      let savedColors = JSON.parse(localStorage.getItem("colors"));
      if (cssCpg) {
        setColorsFromRedux();
        localStorage.setItem("colors", JSON.stringify(cssCpg));
      } else {
        localStorage.setItem("colors", JSON.stringify(cssCpg));
        setPrimaryColor(savedColors[0].hex.value);
        setSecondaryColor(savedColors[1].hex.value);
        setTertiaryColor(savedColors[2].hex.value);
        setBgColor(savedColors[3].hex.value);
        setPrimaryColorContrast(savedColors[0].contrast.value);
        setSecondaryColorContrast(savedColors[1].contrast.value);
        setTertiaryColorContrast(savedColors[2].contrast.value);
        setBgColorContrast(savedColors[3].contrast.value);
      }
      setForceRerender((prev) => prev + 1);
    } catch (err) {
      console.error("Error reading colors from localStorage", err);
    }
  }, [cssCpg]);

  const setColorsFromRedux = () => {
    setPrimaryColor(cssCpg[0].hex.value);
    setSecondaryColor(cssCpg[1].hex.value);
    setTertiaryColor(cssCpg[2].hex.value);
    setBgColor(cssCpg[3].hex.value);
    setPrimaryColorContrast(cssCpg[0].contrast.value);
    setSecondaryColorContrast(cssCpg[1].contrast.value);
    setTertiaryColorContrast(cssCpg[2].contrast.value);
    setBgColorContrast(cssCpg[3].contrast.value);
  };

  useEffect(() => {
    setCardPage(cardFunc(card));
    setDownloadableCSS(cardCSSFunc(card));
  }, [card, primaryColor, secondaryColor, tertiaryColor, bgColor]);

  useEffect(() => {
    try {
      setJsxString(reactElementToJSXString(cardPage, { indent: 2 }));
    } catch (err) {
      console.log();
    }
  }, [cardPage]);

  useEffect(() => {
    setJsxString(jsxString.replaceAll("styled", tagName));
  }, [jsxString]);

  useEffect(() => {
    try {
      const result = download(jsxString, downloadableCSS, card);
      setDl(result);
    } catch (err) {
      console.log();
    }
  }, [jsxString]);

  useEffect(() => {
    try {
      dispatch(cssCreateCodeFile(dl, card.type));
    } catch (err) {
      console.log();
    }
  }, [dl]);

  const cardFunc = (card) => {
    // console.log(card.name);
    if (card.name === "Product - Generic") {
      setTagName("ProductCard");

      return (
        <ProductCard
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            tertiaryColorContrast: tertiaryColorContrast,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>

          <div className="cardcontent">
            Here's some fun text about whatever item you're putting in here!
            <div className="action-items">
              <div className="button">Learn More!</div>
              <div className="button">Add to Cart!</div>
              <div className="button">&#x2665;</div>
            </div>
          </div>
        </ProductCard>
      );
    } else if (card.name === "Product - Gradient") {
      setTagName("ProductCardGradient");

      return (
        <ProductCardGradient
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>
          <div className="cardcontent">
            Here's some fun text about whatever item you're putting in here!
            <div className="action-items">
              <div className="button">Learn More!</div>
              <div className="button">Add to Cart!</div>
              <div className="button">&#x2665;</div>
            </div>
          </div>
        </ProductCardGradient>
      );
    } else if (card.name === "Product Card Subtle") {
      setTagName("ProductCardSubtle");

      return (
        <ProductCardSubtle
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>
          <div className="cardcontent">
            A subtle, more professional, but still light-hearted card!
            <div className="action-items">
              <div className="button" style={{ width: "fit-content" }}>
                Learn More
              </div>
              <div className="button" style={{ width: "fit-content" }}>
                Add to Cart
              </div>
              <div className="button">&#x2665;</div>
            </div>
          </div>
        </ProductCardSubtle>
      );
    } else if (card.name === "Photo Card") {
      setTagName("PhotoCard");

      return (
        <PhotoCard
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <div className="image-wrapper">
            <img
              src={
                "https://media.istockphoto.com/id/930042758/photo/the-milford-sound-fiord-fiordland-national-park-new-zealand.jpg?s=612x612&w=0&k=20&c=-VB_QaZ3aVn8UXTzknTACyOIr6x0ByiYzc2QbgwlX98="
              }
              alt="card content"
            />
          </div>
          <div className="cardcontent">I want to go back!</div>
          <div className="action-items">
            <button className="button" onClick={() => console.log("liked!")}>
              Like
            </button>
            <button className="button" onClick={() => console.log("shared!")}>
              Share
            </button>
          </div>
        </PhotoCard>
      );
    } else if (card.name === "Social Media Photo") {
      setTagName("SocialMediaCard");

      return (
        <SocialMediaCard
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <div className="card-header">
            <img
              src={"https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"}
              alt="username"
            />
            <span className="username">username</span>
          </div>
          <div className="card-image">
            <img
              src={
                "https://media.istockphoto.com/id/930042758/photo/the-milford-sound-fiord-fiordland-national-park-new-zealand.jpg?s=612x612&w=0&k=20&c=-VB_QaZ3aVn8UXTzknTACyOIr6x0ByiYzc2QbgwlX98="
              }
              alt="Post"
            />
          </div>
          <div className="card-content">
            <div className="icons">
              <img
                className="icon"
                src="https://clipart-library.com/new_gallery/23-239546_png-black-and-white-library-chalk-heart-clipart.png"
                alt="Like"
              />
              <img className="icon" src="https://clipart-library.com/images/8T686eR7c.png" alt="Comment" />
              <img className="icon" src="https://clipart-library.com/data_images/405621.png" alt="Share" />
            </div>
            <p className="caption">Caption</p>
            <div id="likesandcomments">
              <p className="likes">Likes: 12,034</p>
              <p className="comments">Comments: 847</p>
            </div>
          </div>
        </SocialMediaCard>
      );
    }
  };

  return <div style={{ height: "100%", width: "100%", display: "unset", margin: "auto" }}>{cardPage}</div>;
};

export default CardPage;
