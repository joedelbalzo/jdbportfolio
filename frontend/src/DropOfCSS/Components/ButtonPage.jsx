import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import reactElementToJSXString from "react-element-to-jsx-string";
//make this buttoncss func
import { buttonCSSFunc } from "./ButtonCSS";
import { download } from "./Download";
import { cssCreateCodeFile } from "../../store";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const BasicColorButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  max-width: 100px;
  height: 10vh;
  max-height: 50px;
  color: #fff;
  font-size: calc(8px + 0.5vw);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #888;
    color: #333;
  }

  &.button1 {
    background-color: ${(props) => props.$colors.primary};
  }
  &.button2 {
    background-color: ${(props) => props.$colors.secondary};
  }
  &.button3 {
    background-color: ${(props) => props.$colors.tertiary};
  }
`;

const MixedButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  max-width: 100px;
  height: 10vh;
  max-height: 50px;
  background-color: transparent;
  color: ${(props) => props.$colors.primary};
  font-size: calc(8px + 0.5vw);
  padding: 10px 20px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  margin: 2px;
  &.main {
  }
  &.outlined {
    border: 2px solid ${(props) => props.$colors.primary};
    border-radius: 5px;
  }
  &.contained {
    background-color: ${(props) => props.$colors.secondary};
    color: ${(props) => props.$colors.secondaryColorContrast};
    border-radius: 5px;
  }
`;

const BasicOutlinedButton = styled(MixedButtons)`
  border: 2px solid ${(props) => props.$color};
  border-radius: 5px;
`;

const BasicContainedButton = styled(MixedButtons)`
  background-color: ${(props) => props.$color};
  color: #fff;
  border-radius: 5px;
`;

const BoldButtons = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$bgColor};
  border: ${(props) => props.$border};

  &:hover {
    background-color: #888;
  }
`;

const SocialMediaButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  max-width: 50px;
  min-height: 30px;
  max-height: 50px;
  color: #fff;
  font-size: calc(8px + 0.5vw);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
  transition: background-color 0.3s ease;

  background-color: ${({ $bgColor }) => $bgColor};

  &:hover {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor};
    outline: ${({ $primaryColor }) => `1px solid ${$primaryColor}`};
  }
`;

const IconButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  max-width: 50px;
  min-height: 30px;
  max-height: 50px;
  color: #fff;
  font-size: calc(8px + 0.5vw);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 2px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.disabled ? "#999" : props.$color)};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonPage = ({ button }) => {
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
  const [buttonPage, setButtonPage] = useState("");
  const [jsxString, setJsxString] = useState("");
  const [downloadableCSS, setDownloadableCSS] = useState("");
  const [dl, setDl] = useState("");
  const [tagName, setTagName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cssCpg) {
    return null;
  }
  if (!button) {
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
    setButtonPage(buttonFunc(button));
    setDownloadableCSS(buttonCSSFunc(button));
  }, [button, bgColorContrast]);

  useEffect(() => {
    try {
      setJsxString(reactElementToJSXString(buttonPage, { indent: 2 }));
    } catch (err) {
      console.log();
    }
  }, [buttonPage]);

  useEffect(() => {
    setJsxString(jsxString.replaceAll("styled", tagName));
  }, [jsxString]);

  useEffect(() => {
    try {
      const result = download(jsxString, downloadableCSS, button);
      setDl(result);
    } catch (err) {
      console.log();
    }
  }, [jsxString]);

  useEffect(() => {
    try {
      dispatch(cssCreateCodeFile(dl, button.type));
    } catch (err) {
      console.log();
    }
  }, [dl]);

  const buttonFunc = (button) => {
    if (button.name === "Basic Color Buttons") {
      setTagName("BasicColorButtons");

      return (
        <ButtonWrapper>
          <BasicColorButtons
            className="button1"
            $colors={{
              primary: primaryColor,
            }}
          >
            Click Me
          </BasicColorButtons>
          <BasicColorButtons
            className="button2"
            $colors={{
              secondary: secondaryColor,
            }}
          >
            Click Me
          </BasicColorButtons>
          <BasicColorButtons
            className="button3"
            $colors={{
              tertiary: tertiaryColor,
            }}
          >
            Click Me
          </BasicColorButtons>
        </ButtonWrapper>
      );
    } else if (button.name === "Mixed Bag") {
      setTagName("MixedButtons");

      return (
        <ButtonWrapper>
          <MixedButtons
            className="main"
            $colors={{
              primary: primaryColor,
            }}
          >
            Click Me
          </MixedButtons>
          <MixedButtons
            className="outlined"
            $colors={{
              primary: primaryColor,
            }}
          >
            Click Me
          </MixedButtons>
          <MixedButtons
            className="contained"
            $colors={{
              secondary: secondaryColor,
              secondaryColorContrast: secondaryColorContrast,
            }}
          >
            Click Me
          </MixedButtons>
        </ButtonWrapper>
      );
    } else if (button.name === "Bold Buttons") {
      setTagName("BoldButtons");

      return (
        <ButtonWrapper>
          <BoldButtons $color={primaryColorContrast} $bgColor={primaryColor} href="#">
            Primary
          </BoldButtons>
          <BoldButtons $color={secondaryColorContrast} $bgColor={secondaryColor} href="#">
            Secondary
          </BoldButtons>
          <BoldButtons $color={tertiaryColorContrast} $bgColor={tertiaryColor} href="#">
            Tertiary
          </BoldButtons>
          <BoldButtons
            color={primaryColor}
            $bgColor="transparent"
            $border={`2px solid ${primaryColor}`}
            href="#"
          >
            Outline
          </BoldButtons>
        </ButtonWrapper>
      );
    } else if (button.name === "Social Media Icons") {
      setTagName("SocialMediaButtons");

      return (
        <>
          <Helmet>
            {/*note, you'll need helmet to include this stylesheet*/}
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
          </Helmet>
          <ButtonWrapper>
            <SocialMediaButtons
              $bgColor="#3b5998"
              $hoverBgColor={bgColor}
              $primaryColor={primaryColor}
            >
              <i className="fab fa-facebook-f"></i>
            </SocialMediaButtons>

            <SocialMediaButtons
              $bgColor="#1da1f2"
              $hoverBgColor={bgColor}
              $primaryColor={primaryColor}
            >
              <i className="fab fa-twitter"></i>
            </SocialMediaButtons>

            <SocialMediaButtons
              $bgColor="#e4405f"
              $hoverBgColor={bgColor}
              $primaryColor={primaryColor}
            >
              <i className="fab fa-instagram"></i>
            </SocialMediaButtons>

            <SocialMediaButtons
              $bgColor="#0077b5"
              $hoverBgColor={bgColor}
              $primaryColor={primaryColor}
            >
              <i className="fab fa-linkedin-in"></i>
            </SocialMediaButtons>
          </ButtonWrapper>
        </>
      );
    } else if (button.name === "Icon Buttons") {
      setTagName("IconButtons");

      return (
        <>
          <Helmet>
            {/*note, you'll need helmet to include this stylesheet*/}
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          </Helmet>
          <ButtonWrapper>
            <IconButtons $color={primaryColor}>
              <span className="material-icons">home</span>
            </IconButtons>
            <IconButtons $color={secondaryColor}>
              <span className="material-icons">favorite</span>
            </IconButtons>
            <IconButtons $color={tertiaryColor}>
              <span className="material-icons">settings</span>
            </IconButtons>
          </ButtonWrapper>
        </>
      );
    } else if (button.name === "Disabled Icon Buttons") {
      return (
        <>
          <Helmet>
            {/*note, you'll need helmet to include this stylesheet*/}
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          </Helmet>
          <ButtonWrapper>
            <IconButtons $color={primaryColor} disabled>
              <span className="material-icons">home</span>
            </IconButtons>
            <IconButtons $color={secondaryColor} disabled>
              <span className="material-icons">favorite</span>
            </IconButtons>
            <IconButtons $color={tertiaryColor} disabled>
              <span className="material-icons">settings</span>
            </IconButtons>
          </ButtonWrapper>
        </>
      );
    }
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "unset", margin: "auto" }}>
      {buttonPage}
    </div>
  );
};

export default ButtonPage;
