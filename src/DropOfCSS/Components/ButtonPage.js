import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
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
  background-color: ${(props) => props.bgColor};

  &:hover {
    background-color: #888;
    color: #333;
  }
`;

const BasicTextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  max-width: 100px;
  height: 10vh;
  max-height: 50px;
  background-color: transparent;
  color: ${(props) => props.color};
  font-size: calc(8px + 0.5vw);
  padding: 10px 20px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  margin: 2px;
`;

const BasicOutlinedButton = styled(BasicTextButton)`
  border: 2px solid ${(props) => props.color};
  border-radius: 5px;
`;

const BasicContainedButton = styled(BasicTextButton)`
  background-color: ${(props) => props.color};
  color: #fff;
  border-radius: 5px;
`;

const CustomAnchor = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};

  &:hover {
    background-color: #888;
  }
`;

const SocialButton = styled.button`
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
  background-color: ${(props) => (props.disabled ? "#999" : props.color)};
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cssCpg) {
    return null;
  }
  if (button) {
    // console.log("button:", button.name);
  } else {
    return null;
  }

  useEffect(() => {
    try {
      console.log(cssCpg);
      setPrimaryColor(cssCpg[0].hex.value);
      setSecondaryColor(cssCpg[1].hex.value);
      setTertiaryColor(cssCpg[2].hex.value);
      setBgColor(cssCpg[3].hex.value);
      setPrimaryColorContrast(cssCpg[0].contrast.value);
      setSecondaryColorContrast(cssCpg[1].contrast.value);
      setTertiaryColorContrast(cssCpg[2].contrast.value);
      setBgColorContrast(cssCpg[3].contrast.value);
    } catch (err) {
      setError(err);
    }
  }, [cssCpg]);

  useEffect(() => {
    setButtonPage(buttonFunc(button));
  }, [button]);

  const buttonFunc = (button) => {
    console.log(button.name);
    if (button.name === "Basic Color Buttons") {
      return (
        <ButtonWrapper>
          <StyledButton bgColor={primaryColor}>Click Me</StyledButton>
          <StyledButton bgColor={secondaryColor}>Click Me</StyledButton>
          <StyledButton bgColor={tertiaryColor}>Click Me</StyledButton>
        </ButtonWrapper>
      );
    } else if (button.name === "Mixed Bag") {
      return (
        <ButtonWrapper>
          <BasicTextButton color={primaryColor}>Click Me</BasicTextButton>
          <BasicOutlinedButton color={primaryColor}>Click Me</BasicOutlinedButton>
          <BasicContainedButton color={primaryColor}>Click Me</BasicContainedButton>
        </ButtonWrapper>
      );
    } else if (button.name === "Bold Buttons") {
      return (
        <ButtonWrapper>
          <CustomAnchor color="#fff" bgColor={primaryColor} href="#">
            Primary
          </CustomAnchor>
          <CustomAnchor color="#fff" bgColor={secondaryColor} href="#">
            Secondary
          </CustomAnchor>
          <CustomAnchor color="#fff" bgColor={tertiaryColor} href="#">
            Tertiary
          </CustomAnchor>
          <CustomAnchor
            color={primaryColor}
            bgColor="transparent"
            border={`2px solid ${primaryColor}`}
            href="#"
          >
            Outline
          </CustomAnchor>
        </ButtonWrapper>
      );
    } else if (button.name === "Social Media Icons") {
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
            <SocialButton $bgColor="#3b5998" $hoverBgColor={bgColor} $primaryColor={primaryColor}>
              <i className="fab fa-facebook-f"></i>
            </SocialButton>

            <SocialButton $bgColor="#1da1f2" $hoverBgColor={bgColor} $primaryColor={primaryColor}>
              <i className="fab fa-twitter"></i>
            </SocialButton>

            <SocialButton $bgColor="#e4405f" $hoverBgColor={bgColor} $primaryColor={primaryColor}>
              <i className="fab fa-instagram"></i>
            </SocialButton>

            <SocialButton $bgColor="#0077b5" $hoverBgColor={bgColor} $primaryColor={primaryColor}>
              <i className="fab fa-linkedin-in"></i>
            </SocialButton>
          </ButtonWrapper>
        </>
      );
    } else if (button.name === "Icon Buttons") {
      return (
        <>
          <Helmet>
            {/*note, you'll need helmet to include this stylesheet*/}
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          </Helmet>
          <ButtonWrapper>
            <IconButtons color={primaryColor}>
              <span class="material-icons">home</span>
            </IconButtons>
            <IconButtons color={secondaryColor}>
              <span class="material-icons">favorite</span>
            </IconButtons>
            <IconButtons color={tertiaryColor}>
              <span class="material-icons">settings</span>
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
            <IconButtons color={primaryColor} disabled>
              <span className="material-icons">home</span>
            </IconButtons>
            <IconButtons color={secondaryColor} disabled>
              <span className="material-icons">favorite</span>
            </IconButtons>
            <IconButtons color={tertiaryColor} disabled>
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
