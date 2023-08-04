import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reactElementToJSXString from "react-element-to-jsx-string";
import { titleCSSFunc } from "./TitleCSS";
import { download } from "./Download";
import { cssCreateCodeFile } from "../../store";

const TitleSubtitle = styled.div`
  display: flex;
  height: 90px;
  color: ${(props) => props.colors.primary};
  font-weight: bold;
  text-align: left;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    font-size: calc(20px + 1vw);
    text-align: center;
  }

  h1 {
    color: ${(props) => props.colors.primary};
    margin: 0 2px;
    padding: 0;
    font-size: calc(20px + 2vw);
    display: block;
  }

  h2 {
    margin: 0 1rem;
    padding: 0;
    font-size: calc(10px + 1vw);
    display: block;
    text-align: left;

    color: ${(props) => props.colors.tertiary};
  }
`;

const TextShadow = styled.h1`
  height: 70px;
  width: 100%;
  margin: 0;

  font-size: calc(32px + 1vw);
  color: ${(props) => props.colors.primary};
  font-weight: bold;
  text-align: left;
  margin: 10px 0;
  text-shadow: 2px 2px 4px ${(props) => props.colors.secondary};
`;

const UppercaseTitle = styled.h1`
  height: 70px;
  width: 100%;
  margin: 0;
  font-size: calc(32px + 1vw);
  color: ${(props) => props.colors.primary};
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 2px ${(props) => props.colors.tertiary};
  text-transform: uppercase;
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const UnderlineTitle = styled.h1`
  height: 70px;
  width: 100%;
  margin: 0;
  font-size: calc(32px + 1vw);
  color: ${(props) => props.colors.primary};
  border-bottom: 4px solid ${(props) => props.colors.secondary};
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 2px ${(props) => props.colors.bg};
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const BorderGradientTitle = styled.h1`
  border-bottom: 8px solid;
  border-image: linear-gradient(
      to right,
      ${(props) => props.colors.bg},
      ${(props) => props.colors.secondary}
    )
    1;
  border-image-slice: 3;
  height: 70px;
  width: 100%;
  margin: 0;
  font-size: calc(32px + 2vw);
  color: ${(props) => props.colors.primary};
  text-align: right;
  font-variant-caps: all-small-caps;
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const DarkModeTitle = styled.h1`
  height: calc(70px-4rem);
  width: 100%;
  margin: 0;
  font-size: calc(32px + 1vw);
  background-color: ${(props) => props.colors.primary};
  color: ${(props) => props.colors.primaryContrast};
  border-bottom: 4px solid ${(props) => props.colors.secondary};
  font-weight: bold;
  text-align: left;
  align-items: center;

  text-shadow: 2px 2px 2px ${(props) => props.colors.secondary};
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const TopBorderTitle = styled.h1`
  height: 70px;
  width: calc(100% - 4rem);
  margin: 0;
  padding: 0 2rem;
  font-size: calc(22px + 1vw);
  color: ${(props) => props.colors.primary};
  border-top: 6px solid ${(props) => props.colors.secondary};
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 1px 1rem ${(props) => props.colors.bg};
  font-variant-caps: all-small-caps;
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const TitlePage = ({ title }) => {
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
  const [titlePage, setTitlePage] = useState("");
  const [jsxString, setJsxString] = useState("");
  const [downloadableCSS, setDownloadableCSS] = useState("");
  const [dl, setDl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cssCpg) {
    return null;
  }
  if (!title) {
    return null;
  }

  useEffect(() => {
    try {
      const savedColors = JSON.parse(localStorage.getItem("colors"));
      if (savedColors) {
        setPrimaryColor(savedColors[0].hex.value);
        setSecondaryColor(savedColors[1].hex.value);
        setTertiaryColor(savedColors[2].hex.value);
        setBgColor(savedColors[3].hex.value);
        setPrimaryColorContrast(savedColors[0].contrast.value);
        setSecondaryColorContrast(savedColors[1].contrast.value);
        setTertiaryColorContrast(savedColors[2].contrast.value);
        setBgColorContrast(savedColors[3].contrast.value);
      } else if (cssCpg) {
        setPrimaryColor(cssCpg[0].hex.value);
        setSecondaryColor(cssCpg[1].hex.value);
        setTertiaryColor(cssCpg[2].hex.value);
        setBgColor(cssCpg[3].hex.value);
        setPrimaryColorContrast(cssCpg[0].contrast.value);
        setSecondaryColorContrast(cssCpg[1].contrast.value);
        setTertiaryColorContrast(cssCpg[2].contrast.value);
        setBgColorContrast(cssCpg[3].contrast.value);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      setTitlePage(titleFunc(title));
      setDownloadableCSS(titleCSSFunc(title));
    } catch (err) {}
  }, [title, bgColorContrast]);

  useEffect(() => {
    try {
      setJsxString(reactElementToJSXString(titlePage, { indent: 2 }));
    } catch (err) {
      console.log();
    }
  }, [titlePage]);

  useEffect(() => {
    try {
      const result = download(jsxString, downloadableCSS, title);
      setDl(result);
    } catch (err) {
      console.log();
    }
  }, [jsxString]);

  useEffect(() => {
    try {
      dispatch(cssCreateCodeFile(dl, title.type));
    } catch (err) {
      console.log();
    }
  }, [dl]);

  const titleFunc = (title) => {
    if (title.name === "Title & Subtitle") {
      return (
        <TitleSubtitle
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          <h1>Your Website Title</h1>
          <h2>Your Website Subtitle</h2>
        </TitleSubtitle>
      );
    } else if (title.name === "Text Shadow") {
      return (
        <TextShadow
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          Your Website Title
        </TextShadow>
      );
    } else if (title.name === "Uppercase") {
      return (
        <UppercaseTitle
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          Your Website Title
        </UppercaseTitle>
      );
    } else if (title.name === "Underline") {
      return (
        <UnderlineTitle
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          Your Website Title
        </UnderlineTitle>
      );
    } else if (title.name === "Border Gradiant") {
      return (
        <BorderGradientTitle
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          Your Website Title
        </BorderGradientTitle>
      );
    } else if (title.name === "Dark Mode") {
      return (
        <DarkModeTitle
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
            primaryContrast: primaryColorContrast,
          }}
          // style={{ padding: "2rem" }}
        >
          Your Website Title
        </DarkModeTitle>
      );
    } else if (title.name === "Top Border") {
      return (
        <TopBorderTitle
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          Your Website Title
        </TopBorderTitle>
      );
    }
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", margin: "auto" }}>
      {titlePage}
    </div>
  );
};

export default TitlePage;
