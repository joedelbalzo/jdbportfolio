import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reactElementToJSXString from "react-element-to-jsx-string";
//make this sidenavcss func
import { sideNavCSSFunc } from "./SideNavCSS";
import { download } from "./Download";
import { cssCreateCodeFile } from "../../store";

const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 130px;
  justify-self: center;
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  min-height: 70vh;
  overflow: auto;
  border: 2px solid ${(props) => props.colors.primary};
  font-size: calc(10px + 0.5vw);
`;

const SideNav2 = styled.div`
  @media screen and (max-width: 900px) {
    display: none;
  }
  width: 130px;
  justify-self: center;
  margin: 0;
  padding: 0;

  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  min-height: 70vh;
  overflow: auto;
  border: 2px solid ${(props) => props.colors.primary};

  a {
    font-size: calc(10px + 0.5vw);

    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.colors.secondary};
      color: ${(props) => props.colors.secondaryColorContrast};
    }
  }
`;

const SideNav3 = styled.div`
  @media screen and (max-width: 900px) {
    display: none;
  }
  width: 130px;
  justify-self: center;
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  height: 100%;
  overflow: auto;
  border-right: 2px solid ${(props) => props.colors.primary};
  padding-top: 20px;

  a {
    font-size: calc(10px + 0.5vw);

    display: block;
    color: ${(props) => props.colors.secondary};
    border-bottom: 2px solid ${(props) => props.colors.bg};
    padding: 0.3rem 0.7rem;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.colors.tertiaryColor};
      color: ${(props) => props.colors.tertiaryColorContrast};
      border-bottom: 2px solid ${(props) => props.colors.secondary};
    }
  }
`;
const DropdownSideNav = styled.div`
  @media screen and (max-width: 900px) {
    display: none;
  }
  width: 130px;
  justify-self: center;
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  height: 70vh;
  overflow: auto;
  border-right: 2px solid ${(props) => props.colors.primary};
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: calc(10px + 0.5vw);
  position: relative;

  a {
    display: block;
    color: ${(props) => props.colors.bgColorContrast};
    padding: 10px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.colors.primary};
      color: ${(props) => props.colors.primaryColorContrast};
    }

    &.active {
      background-color: ${(props) => props.colors.secondary};
      color: ${(props) => props.colors.secondaryColorContrast};
    }

    &.has-dropdown::after {
      content: " ▼";
      margin-left: 5px;
    }

    &.has-dropdown:hover::after {
      color: ${(props) => props.colors.tertiaryColor};
    }
  }

  .dropdown {
    position: relative;

    &:hover .dropdown-content {
      display: block;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    margin-bottom: 50px;
    width: 100%;
    background-color: ${(props) => props.colors.bg};
    color: ${(props) => props.colors.bgColorContrast};
    border: 2px solid ${(props) => props.colors.primary};
    z-index: 1;

    a {
      display: block;
      padding: 8px 16px;
      color: ${(props) => props.colors.bgColorContrast};
            text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${(props) => props.colors.secondary};
        color: ${(props) => props.colors.secondaryColorContrast};
      }
    }
  


`;

const SideNavbarPage = ({ sideNav }) => {
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
  const [sideNavbarPage, setSideNavbarPage] = useState("");
  const [jsxString, setJsxString] = useState("");
  const [downloadableCSS, setDownloadableCSS] = useState("");
  const [dl, setDl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");

  if (!cssCpg) {
    return null;
  }
  if (sideNav) {
    // console.log("sideNav:", sideNav.name);
  } else {
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
    setSideNavbarPage(sideNavFunc(sideNav));
    setDownloadableCSS(sideNavCSSFunc(sideNav));
  }, [sideNav, bgColorContrast]);

  useEffect(() => {
    try {
      setJsxString(reactElementToJSXString(sideNavbarPage, { indent: 2 }));
    } catch (err) {
      console.log();
    }
  }, [sideNav]);
  useEffect(() => {
    setJsxString(jsxString.replaceAll("styled", tagName));
  }, [jsxString]);

  useEffect(() => {
    try {
      const result = download(jsxString, downloadableCSS, sideNav);
      setDl(result);
    } catch (err) {
      console.log();
    }
  }, [jsxString]);

  useEffect(() => {
    try {
      dispatch(cssCreateCodeFile(dl, sideNav.type));
    } catch (err) {
      console.log();
    }
  }, [dl]);

  const sideNavFunc = (sideNav) => {
    if (sideNav.name === "Side Nav") {
      setTagName("SideNav");

      return (
        <SideNav
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
          }}
        >
          <a className="active" href="/#/dropofcss">
            Home
          </a>
          <a href="/#/dropofcss">News</a>
          <a href="/#/dropofcss">Contact</a>
          <a href="/#/dropofcss">About</a>
        </SideNav>
      );
    } else if (sideNav.name === "SideNav 2") {
      setTagName("SideNav2");

      return (
        <SideNav2
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
          <a className="active" href="/#/dropofcss">
            Home
          </a>
          <a href="/#/dropofcss">News</a>
          <a href="/#/dropofcss">Contact</a>
          <a href="/#/dropofcss">About</a>
        </SideNav2>
      );
    } else if (sideNav.name === "SideNav 3") {
      setTagName("SideNav3");

      return (
        <SideNav3
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            tertiaryColorContrast: tertiaryColorContrast,
            bg: bgColor,
          }}
        >
          <a className="active" href="/#/dropofcss">
            Home
          </a>
          <a href="/#/dropofcss">News</a>
          <a href="/#/dropofcss">Contact</a>
          <a href="/#/dropofcss">About</a>
          <a href="/#/dropofcss">Services</a>
          <a href="/#/dropofcss">Portfolio</a>
          <a href="/#/dropofcss">Gallery</a>
          <a href="/#/dropofcss">Blog</a>
          <a href="/#/dropofcss">Shop</a>
          <a href="/#/dropofcss">Events</a>
          <a href="/#/dropofcss">Team</a>
          <a href="/#/dropofcss">FAQ</a>
          <a href="/#/dropofcss">Pricing</a>
          <a href="/#/dropofcss">Testimonials</a>
          <a href="/#/dropofcss">Contact Us</a>
        </SideNav3>
      );
    } else if (sideNav.name === "Dropdown SideNav") {
      setTagName("DropdownSideNav");

      return (
        <DropdownSideNav
          colors={{
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <a className="active" href="/#/dropofcss">
            Home
          </a>
          <a href="/#/dropofcss">News</a>
          <a href="/#/dropofcss">About</a>
          <a href="/#/dropofcss">Blog</a>
          <a href="/#/dropofcss">Testimonials</a>
          <div className="dropdown">
            <a className="has-dropdown" href="/#/dropofcss">
              Contact
            </a>
            <div className="dropdown-content">
              <a href="/#/dropofcss">Sublink 1</a>
              <a href="/#/dropofcss">Sublink 2</a>
            </div>{" "}
          </div>
        </DropdownSideNav>
      );
    }
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "unset", margin: "auto" }}>
      {sideNavbarPage}
    </div>
  );
};

export default SideNavbarPage;
